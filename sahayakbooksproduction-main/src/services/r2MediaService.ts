import { MediaItem, MediaUsage, R2StorageStatus, Book, Author, BlogPost, WebsiteSettings, WebsiteSiteImages } from '../types';
import { processImageFile } from '../utils/imageUtils';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const env = ((import.meta as any).env || {}) as Record<string, string>;
const R2_PUBLIC_URL = (env.VITE_CLOUDFLARE_R2_PUBLIC_URL || 'https://pub-1282ea95dd4a49ebb0c9ac2fbe6d88b9.r2.dev').replace(/\/+$/, '');
const R2_BUCKET = env.VITE_CLOUDFLARE_R2_BUCKET_NAME || 'sahayak';
const R2_ENDPOINT = env.VITE_CLOUDFLARE_R2_ENDPOINT || 'https://93888554ef9d9e0b8c18b322683a9652.r2.cloudflarestorage.com';
const R2_ACCESS_KEY_ID = env.VITE_CLOUDFLARE_R2_ACCESS_KEY_ID || 'c5d59beff364b2c883f4f2df1883bb60';
const R2_SECRET_ACCESS_KEY = env.VITE_CLOUDFLARE_R2_SECRET_ACCESS_KEY || 'f2b349663c9052ef9db10e365062cf750d53895b33924899d7c98b8a6c8e7661';

let directS3Client: S3Client | null = null;
function getDirectS3Client(): S3Client {
  if (!directS3Client) {
    directS3Client = new S3Client({
      region: 'auto',
      endpoint: R2_ENDPOINT,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
      },
    });
  }
  return directS3Client;
}

export async function directUploadFileToR2(
  file: File | Blob,
  key: string,
  contentType: string = 'image/jpeg'
): Promise<string> {
  const client = getDirectS3Client();
  const buffer = await file.arrayBuffer();
  await client.send(new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    Body: new Uint8Array(buffer),
    ContentType: contentType,
  }));
  return `${R2_PUBLIC_URL}/${key}`;
}

export async function syncSiteImagesToR2(images: WebsiteSiteImages): Promise<boolean> {
  // 1. Try server persistence endpoint first
  try {
    const res = await fetch('/api/site-images/persist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images }),
    });
    if (res.ok) return true;
  } catch {}

  // 2. Direct S3 bucket sync fallback
  try {
    const client = getDirectS3Client();
    const jsonStr = JSON.stringify(images, null, 2);
    await client.send(new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: 'config/site-images.json',
      Body: new TextEncoder().encode(jsonStr),
      ContentType: 'application/json',
    }));
    return true;
  } catch (err) {
    console.warn('Could not sync siteImages config to R2:', err);
    return false;
  }
}

/**
 * Persist any image (file, base64 dataUrl, or remote temporary URL) into a permanent, non-expiring Cloudflare R2 asset
 */
export async function persistCustomImageUrl(urlOrDataUrl: string, keyName: string = 'image'): Promise<string> {
  if (!urlOrDataUrl || typeof urlOrDataUrl !== 'string') return urlOrDataUrl;
  const trimmed = urlOrDataUrl.trim();
  if (!trimmed) return trimmed;

  // If already an unexpiring asset on R2 without temporary query signatures
  if (trimmed.startsWith(R2_PUBLIC_URL) && !trimmed.includes('X-Amz-Expires') && !trimmed.includes('Signature')) {
    return trimmed;
  }

  // 1. Try server persistence endpoint first
  try {
    const res = await fetch('/api/site-images/persist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images: { [keyName]: trimmed } }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.siteImages && data.siteImages[keyName]) {
        return data.siteImages[keyName];
      }
    }
  } catch (err) {
    console.warn('[persistCustomImageUrl] Server persist fallback:', err);
  }

  // 2. Direct browser S3 client upload to R2
  try {
    let blob: Blob | null = null;
    let contentType = 'image/webp';
    let ext = 'webp';

    if (trimmed.startsWith('data:')) {
      const match = trimmed.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        contentType = match[1];
        ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg';
        const bin = atob(match[2]);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
        blob = new Blob([arr], { type: contentType });
      }
    } else if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      const res = await fetch(trimmed);
      if (res.ok) {
        contentType = res.headers.get('content-type') || 'image/jpeg';
        ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg';
        blob = await res.blob();
      }
    }

    if (blob) {
      const objectKey = `branding/${keyName.toLowerCase()}_${Date.now()}.${ext}`;
      const permUrl = await directUploadFileToR2(blob, objectKey, contentType);
      return permUrl;
    }
  } catch (s3Err) {
    console.warn('[persistCustomImageUrl] Direct S3 upload failed:', s3Err);
  }

  return trimmed;
}

export async function fetchSiteImagesFromR2(): Promise<WebsiteSiteImages | null> {
  try {
    const res = await fetch(`${R2_PUBLIC_URL}/config/site-images.json?t=${Date.now()}`, {
      cache: 'no-cache',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data && typeof data === 'object' ? data : null;
  } catch (err) {
    console.warn('Could not fetch siteImages config from R2:', err);
    return null;
  }
}

// Authenticated fetch helper
async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('sahayak_session_token');
  if (!token) throw new Error('Please sign in as an administrator.');
  
  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${token}`);
  
  return await fetch(url, { ...options, headers });
}

/**
 * Upload an image or document to Cloudflare R2 via the server-side API endpoint
 */
export async function uploadFileToR2(
  file: File,
  options: {
    folder?: string;
    categoryFolder?: string;
    altText?: string;
    caption?: string;
    uploadedBy?: string;
    onProgress?: (progressPercent: number) => void;
  } = {}
): Promise<MediaItem> {
  const {
    folder = options.categoryFolder || 'books',
    altText,
    caption,
    uploadedBy,
    onProgress,
  } = options;

  let dimensions = '800 x 800';
  let width = 800;
  let height = 800;
  let dataUrl = '';
  let humanSize = `${(file.size / 1024).toFixed(1)} KB`;

  // 1. Client-side optimization: compress images to keep payloads lightweight & fast
  if (file.type && file.type.startsWith('image/')) {
    try {
      if (onProgress) onProgress(20);
      const processed = await processImageFile(file, 1200, 1200, 0.85);
      dataUrl = processed.dataUrl;
      dimensions = processed.dimensions;
      width = processed.width;
      height = processed.height;
      humanSize = processed.size;
    } catch {
      // Fallback to raw dataUrl if canvas compression fails
      dataUrl = await readFileAsDataURL(file);
    }
  } else {
    dataUrl = await readFileAsDataURL(file);
  }

  const safeFilename = file.name.replace(/\.[^/.]+$/, '');
  const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  const uuid = Math.random().toString(36).substring(2, 8);
  const cleanFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
  const objectKey = `${folder.toLowerCase()}/${timestamp}-${uuid}-${cleanFilename}`;

  const fallbackMedia: MediaItem = {
    id: `med-${Date.now()}-${uuid}`,
    name: safeFilename,
    url: dataUrl,
    publicUrl: dataUrl,
    fileName: file.name,
    originalFileName: file.name,
    objectKey,
    folder: folder.toLowerCase() as any,
    size: humanSize,
    fileSize: humanSize,
    dimensions: dimensions,
    width,
    height,
    mimeType: file.type || 'image/jpeg',
    storageProvider: 'cloudflare-r2',
    altText: altText || file.name,
    caption: caption || '',
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  };

  // 2. Primary: Direct S3 upload to Cloudflare R2 bucket (sahayak)
  try {
    if (onProgress) onProgress(50);
    const publicUrl = await directUploadFileToR2(file, objectKey, file.type || 'image/jpeg');
    if (onProgress) onProgress(100);

    return {
      ...fallbackMedia,
      url: publicUrl,
      publicUrl: publicUrl,
      objectKey,
      storageProvider: 'cloudflare-r2',
    };
  } catch (directErr: any) {
    console.warn('[R2 Direct Upload] Direct S3 upload failed, trying API proxy:', directErr?.message || directErr);
    
    // 3. Fallback: Cloudflare Worker API proxy
    try {
      if (onProgress) onProgress(70);
      const response = await fetch('/api/media/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dataUrl,
          originalFilename: file.name,
          mimeType: file.type || 'image/jpeg',
          folder: folder.toLowerCase(),
          altText,
          caption,
          uploadedBy,
        }),
      });

      if (response && response.ok) {
        const data = await response.json();
        if (onProgress) onProgress(100);
        return {
          ...fallbackMedia,
          ...data.media,
          dimensions,
          width,
          height,
          storageProvider: 'r2',
        };
      }
    } catch (proxyErr) {
      console.warn('API proxy upload also failed, using optimized local asset:', proxyErr);
    }

    if (onProgress) onProgress(100);
    return fallbackMedia;
  }
}

/**
 * Delete an object from Cloudflare R2 bucket
 */
export async function deleteFileFromR2(mediaId: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await authenticatedFetch(`/api/media/${mediaId}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error('Error deleting media:', err);
    return { success: false, message: err.message };
  }
}

/**
 * Fetch masked Cloudflare R2 configuration status from server
 */
export async function fetchR2StorageStatus(): Promise<R2StorageStatus> {
  try {
    const res = await fetch('/api/media/status');
    if (!res.ok) throw new Error('Status check failed');
    return await res.json();
  } catch (err: any) {
    return {
      isConfigured: false,
      isConnected: false,
      provider: 'Local Emulated R2',
      bucketName: 'Not Connected',
      publicUrl: 'Local In-Memory Cache',
      accountIdMasked: 'Not Configured',
      region: 'auto',
      maxImageSizeMB: 10,
      maxLogoSizeMB: 5,
      maxPdfSizeMB: 25,
      error: 'Backend API unavailable',
    };
  }
}

/**
 * Ping Cloudflare R2 server-side test connection
 */
export async function runR2ConnectionTest(): Promise<{
  success: boolean;
  message: string;
  latencyMs?: number;
  bucket?: string;
  objectsCount?: number;
  error?: string;
}> {
  try {
    const res = await fetch('/api/media/test-connection', {
      method: 'POST',
    });
    return await res.json();
  } catch (err: any) {
    return {
      success: false,
      message: `Failed to ping R2 endpoint: ${err.message}`,
      error: 'NETWORK_ERROR',
    };
  }
}

/**
 * Media Usage Tracking Engine:
 * Scans all entities (books, authors, blogs, settings/logos, home banners)
 * to verify if this image is actively referenced anywhere on the public website.
 */
export function calculateMediaUsage(
  mediaUrl: string,
  mediaId: string,
  state: {
    books?: Book[];
    authors?: Author[];
    blogs?: BlogPost[];
    settings?: WebsiteSettings;
  }
): MediaUsage[] {
  const usages: MediaUsage[] = [];
  if (!mediaUrl && !mediaId) return usages;

  const urlMatches = (targetUrl?: string) => {
    if (!targetUrl) return false;
    return targetUrl === mediaUrl || (mediaUrl.length > 50 && targetUrl.includes(mediaUrl.slice(0, 40)));
  };

  // 1. Books
  (state.books || []).forEach((book) => {
    if (urlMatches(book.coverImage)) {
      usages.push({
        locationType: 'book',
        title: `Book: "${book.title}"`,
        field: 'Front Cover Artwork',
        link: `/book/${book.slug || book.id}`,
      });
    }
    if (urlMatches(book.backCoverImage)) {
      usages.push({
        locationType: 'book',
        title: `Book: "${book.title}"`,
        field: 'Back Cover Art',
        link: `/book/${book.slug || book.id}`,
      });
    }
    if (urlMatches(book.spineImage)) {
      usages.push({
        locationType: 'book',
        title: `Book: "${book.title}"`,
        field: 'Spine Art',
        link: `/book/${book.slug || book.id}`,
      });
    }
    const bookGalleries = (book as any).galleryImages || (book as any).gallery;
    if (Array.isArray(bookGalleries) && bookGalleries.some((g: string) => urlMatches(g))) {
      usages.push({
        locationType: 'book',
        title: `Book: "${book.title}"`,
        field: 'Interior Spreads Gallery',
        link: `/book/${book.slug || book.id}`,
      });
    }
  });

  // 2. Authors
  (state.authors || []).forEach((author) => {
    const authorPhoto = (author as any).avatar || (author as any).photoUrl || (author as any).photo;
    if (urlMatches(authorPhoto)) {
      usages.push({
        locationType: 'author',
        title: `Author Profile: "${author.name}"`,
        field: 'Portrait Photo',
        link: `/author/${author.slug || author.id}`,
      });
    }
  });

  // 3. Blogs
  (state.blogs || []).forEach((blog) => {
    if (urlMatches(blog.featuredImage)) {
      usages.push({
        locationType: 'blog',
        title: `Blog Essay: "${blog.title}"`,
        field: 'Featured Hero Image',
        link: `/blog/${blog.slug || blog.id}`,
      });
    }
    if (urlMatches(blog.authorAvatar)) {
      usages.push({
        locationType: 'blog',
        title: `Blog Essay: "${blog.title}"`,
        field: 'Author Avatar',
        link: `/blog/${blog.slug || blog.id}`,
      });
    }
  });

  // 4. Website Settings & Branding Logos
  if (state.settings) {
    const s = state.settings;
    if (urlMatches(s.mainLogo)) {
      usages.push({ locationType: 'branding', title: 'Site Branding', field: 'Main Header Logo' });
    }
    if (urlMatches(s.darkLogo)) {
      usages.push({ locationType: 'branding', title: 'Site Branding', field: 'Dark Mode Insignia' });
    }
    if (urlMatches(s.lightLogo)) {
      usages.push({ locationType: 'branding', title: 'Site Branding', field: 'Light Mode Insignia' });
    }
    if (urlMatches(s.mobileLogo)) {
      usages.push({ locationType: 'branding', title: 'Site Branding', field: 'Mobile Navigation Logo' });
    }
    if (urlMatches(s.footerLogo)) {
      usages.push({ locationType: 'branding', title: 'Site Branding', field: 'Footer Insignia' });
    }
    if (urlMatches(s.favicon)) {
      usages.push({ locationType: 'branding', title: 'Site Branding', field: 'Browser Favicon' });
    }
    if (urlMatches(s.socialShareLogo)) {
      usages.push({ locationType: 'branding', title: 'Site Branding', field: 'OpenGraph Social Share Image' });
    }
  }

  return usages;
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
