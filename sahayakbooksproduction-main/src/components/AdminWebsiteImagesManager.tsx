import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { WebsiteSiteImages } from '../types';
import { uploadFileToR2, syncSiteImagesToR2 } from '../services/r2MediaService';
import { compressImageToSafeDataUrl } from '../utils/imageUtils';
import { saveSiteImagesToIndexedDB } from '../utils/siteImagesStorage';
import {
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Trash2,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  ExternalLink,
  Layers,
  Save,
  Search,
  Filter,
  Check,
  FolderOpen,
  Sparkles,
  Info,
  X,
} from 'lucide-react';

interface ImageDefinition {
  key: keyof WebsiteSiteImages;
  hiddenKey: keyof WebsiteSiteImages;
  title: string;
  category: 'Homepage' | 'Branding' | 'Institutional' | 'Leadership';
  description: string;
  defaultUrl: string;
  aspectRatio: string;
  whereUsed: string;
}

const WEBSITE_IMAGE_DEFINITIONS: ImageDefinition[] = [
  {
    key: 'heroBackground',
    hiddenKey: 'heroBackgroundHidden',
    title: 'Homepage Hero Backdrop (Bull & Bear Artwork)',
    category: 'Homepage',
    description: 'Wireframe glowing bull and bear artwork stretched edge-to-edge across the entire corporate homepage hero section.',
    defaultUrl: '/assets/corporate/hero_bull_bear.jpg',
    aspectRatio: '16:9 or Ultra-wide (e.g. 1920x1080, 2560x1440)',
    whereUsed: 'Corporate Homepage Hero (Section 1)',
  },
  {
    key: 'officeEntrance',
    hiddenKey: 'officeEntranceHidden',
    title: 'Office Entrance & Reception Showcase',
    category: 'Institutional',
    description: "Photograph of Sahayak Associates' physical office entrance and reception in Sector 31-A, Chandigarh.",
    defaultUrl: 'https://pub-1282ea95dd4a49ebb0c9ac2fbe6d88b9.r2.dev/assets/corporate/office_entrance.jpg',
    aspectRatio: 'Portrait 4:5 or 3:4 (e.g. 800x1000)',
    whereUsed: "Homepage 'About Us' (Section 3) & /about page",
  },
  {
    key: 'officeLibrary',
    hiddenKey: 'officeLibraryHidden',
    title: 'Knowledge Center & Office Library',
    category: 'Institutional',
    description: 'Photograph of the physical library, bookshelf, and academic research facility at Sahayak Associates.',
    defaultUrl: 'https://pub-1282ea95dd4a49ebb0c9ac2fbe6d88b9.r2.dev/assets/corporate/office_library.jpg',
    aspectRatio: 'Landscape 16:9 or 4:3 (e.g. 1200x800)',
    whereUsed: "Homepage 'Sahayak Gurukul' (Section 7) & /gurukul page",
  },
  {
    key: 'logo',
    hiddenKey: 'logoHidden',
    title: 'Primary Brand Logo (Navigation Bar)',
    category: 'Branding',
    description: 'The official Sahayak Associates corporate logo displayed at the top of the website.',
    defaultUrl: '/assets/corporate/sahayak_logo.png',
    aspectRatio: 'Horizontal Transparent PNG / SVG (e.g. 300x80)',
    whereUsed: 'Global Navigation Header (All Pages)',
  },
  {
    key: 'footerLogo',
    hiddenKey: 'footerLogoHidden',
    title: 'Footer Brand Insignia',
    category: 'Branding',
    description: 'Logo displayed in the footer next to the corporate description and regulatory disclosures.',
    defaultUrl: '/assets/corporate/sahayak_logo.png',
    aspectRatio: 'Horizontal Transparent PNG / SVG',
    whereUsed: 'Global Corporate Footer (All Pages)',
  },
  {
    key: 'mascot',
    hiddenKey: 'mascotHidden',
    title: 'Floating Financial Advisor Mascot',
    category: 'Homepage',
    description: 'Cartoon mascot character floating in the bottom-left corner of the website holding a ledger.',
    defaultUrl: '/assets/corporate/sahayak_mascot_full.png',
    aspectRatio: 'Transparent PNG Full Character (e.g. 400x800)',
    whereUsed: 'Global Floating Assistant Widget',
  },
  {
    key: 'founderPortrait',
    hiddenKey: 'founderPortraitHidden',
    title: 'Founder & Author Portrait (Sandeep Sahni)',
    category: 'Leadership',
    description: 'Official portrait photo of Sandeep Sahni, Founder & Managing Director, featured across author profiles.',
    defaultUrl: '/sandeep_sahni.jpg',
    aspectRatio: 'Square or Portrait (e.g. 800x800, 800x1000)',
    whereUsed: '/about page, /books bookstore landing, and Author Profiles',
  },
];

export const AdminWebsiteImagesManager: React.FC = () => {
  const { settings, updateSettings, mediaItems, showToast, navigate } = useStore();

  // Local draft state for siteImages
  const [siteImages, setSiteImages] = useState<WebsiteSiteImages>(() => ({
    heroBackground: '/assets/corporate/hero_bull_bear.jpg',
    officeEntrance: 'https://pub-1282ea95dd4a49ebb0c9ac2fbe6d88b9.r2.dev/assets/corporate/office_entrance.jpg',
    officeLibrary: 'https://pub-1282ea95dd4a49ebb0c9ac2fbe6d88b9.r2.dev/assets/corporate/office_library.jpg',
    logo: '/assets/corporate/sahayak_logo.png',
    footerLogo: '/assets/corporate/sahayak_logo.png',
    mascot: '/assets/corporate/sahayak_mascot_full.png',
    founderPortrait: '/sandeep_sahni.jpg',
    heroBackgroundHidden: false,
    officeEntranceHidden: false,
    officeLibraryHidden: false,
    logoHidden: false,
    footerLogoHidden: false,
    mascotHidden: false,
    founderPortraitHidden: false,
    ...(settings.siteImages || {}),
  }));

  // Filtering & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active Upload / URL input states per item key
  const [activeInputMode, setActiveInputMode] = useState<Record<string, 'file' | 'url'>>({});
  const [customUrlInputs, setCustomUrlInputs] = useState<Record<string, string>>({});
  const [uploadingKeys, setUploadingKeys] = useState<Record<string, boolean>>({});
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [isSavingAll, setIsSavingAll] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [savedKey, setSavedKey] = useState<string | null>(null);

  // Sync draft siteImages whenever stored settings update
  useEffect(() => {
    if (settings.siteImages && !hasUnsavedChanges) {
      setSiteImages((prev) => ({
        ...prev,
        ...settings.siteImages,
      }));
    }
  }, [settings.siteImages, hasUnsavedChanges]);

  // Media Library Picker Modal
  const [pickingForImageKey, setPickingForImageKey] = useState<keyof WebsiteSiteImages | null>(null);
  const [librarySearch, setLibrarySearch] = useState('');

  // Individual file input refs
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Helper to get active URL
  const getActiveUrl = (def: ImageDefinition): string => {
    const val = siteImages[def.key];
    if (typeof val === 'string' && val.trim().length > 0) {
      return val;
    }
    return def.defaultUrl;
  };

  // Helper to check if an image is currently hidden
  const isImageHidden = (def: ImageDefinition): boolean => {
    return Boolean(siteImages[def.hiddenKey]);
  };

  // Helper to check if an image is customized
  const isImageCustomized = (def: ImageDefinition): boolean => {
    const current = siteImages[def.key];
    return Boolean(current && current !== def.defaultUrl);
  };

  // Handle URL change
  const handleApplyUrl = (key: keyof WebsiteSiteImages, url: string) => {
    if (!url || !url.trim()) return;
    setSiteImages((prev) => ({
      ...prev,
      [key]: url.trim(),
      [`${String(key)}Hidden`]: false,
    }));
    setHasUnsavedChanges(true);
    showToast('Image URL updated! Click "Save & Publish Changes" to apply.');
  };

  // Handle File Upload
  const handleFileUpload = async (def: ImageDefinition, file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WebP, SVG, AVIF).');
      return;
    }

    setUploadingKeys((prev) => ({ ...prev, [def.key]: true }));
    setUploadProgress((prev) => ({ ...prev, [def.key]: 20 }));

    try {
      const uploaded = await uploadFileToR2(file, {
        folder: 'branding',
        altText: def.title,
        onProgress: (pct) => {
          setUploadProgress((prev) => ({ ...prev, [def.key]: pct }));
        },
      });

      const effectiveUrl = uploaded.publicUrl || uploaded.url;
      const updatedImages: WebsiteSiteImages = {
        ...siteImages,
        [def.key]: effectiveUrl,
        [def.hiddenKey]: false,
      };
      setSiteImages(updatedImages);
      await saveSiteImagesToIndexedDB(updatedImages);
      await syncSiteImagesToR2(updatedImages);
      await updateSettings({
        siteImages: updatedImages,
        mainLogo: updatedImages.logo || settings.mainLogo,
        footerLogo: updatedImages.footerLogo || settings.footerLogo,
      });
      setHasUnsavedChanges(false);
      showToast(`Uploaded and saved new asset for ${def.title}!`);
    } catch (err: any) {
      console.warn('Remote upload unavailable, optimizing and saving locally:', err);
      try {
        const safeDataUrl = await compressImageToSafeDataUrl(file, 1600, 1600, 0.85);
        const updatedImages: WebsiteSiteImages = {
          ...siteImages,
          [def.key]: safeDataUrl,
          [def.hiddenKey]: false,
        };
        setSiteImages(updatedImages);
        // Automatically save immediately to IndexedDB, R2, and settings
        await saveSiteImagesToIndexedDB(updatedImages);
        await syncSiteImagesToR2(updatedImages);
        await updateSettings({
          siteImages: updatedImages,
          mainLogo: updatedImages.logo || settings.mainLogo,
          footerLogo: updatedImages.footerLogo || settings.footerLogo,
        });
        setHasUnsavedChanges(false);
        showToast(`Loaded, optimized and saved image for ${def.title}!`);
      } catch (procErr: any) {
        showToast(`Failed to process image: ${procErr.message || 'Unknown error'}`);
      }
    } finally {
      setUploadingKeys((prev) => ({ ...prev, [def.key]: false }));
      setUploadProgress((prev) => ({ ...prev, [def.key]: 0 }));
    }
  };

  // Toggle Hide / Remove Image
  const handleToggleHide = (def: ImageDefinition) => {
    const currentlyHidden = isImageHidden(def);
    setSiteImages((prev) => ({
      ...prev,
      [def.hiddenKey]: !currentlyHidden,
    }));
    setHasUnsavedChanges(true);
    showToast(
      !currentlyHidden
        ? `"${def.title}" is now hidden/removed from the website.`
        : `"${def.title}" is now visible again.`
    );
  };

  // Reset Single Image to Factory Default
  const handleResetSingle = (def: ImageDefinition) => {
    setSiteImages((prev) => ({
      ...prev,
      [def.key]: def.defaultUrl,
      [def.hiddenKey]: false,
    }));
    setHasUnsavedChanges(true);
    showToast(`Restored default asset for ${def.title}`);
  };

  // Reset ALL to Defaults
  const handleResetAllToDefaults = () => {
    if (!window.confirm('Are you sure you want to restore all website images to factory defaults?')) {
      return;
    }

    const resetValues: WebsiteSiteImages = {
      heroBackground: '/assets/corporate/hero_bull_bear.jpg',
      officeEntrance: 'https://pub-1282ea95dd4a49ebb0c9ac2fbe6d88b9.r2.dev/assets/corporate/office_entrance.jpg',
      officeLibrary: 'https://pub-1282ea95dd4a49ebb0c9ac2fbe6d88b9.r2.dev/assets/corporate/office_library.jpg',
      logo: '/assets/corporate/sahayak_logo.png',
      footerLogo: '/assets/corporate/sahayak_logo.png',
      mascot: '/assets/corporate/sahayak_mascot_full.png',
      founderPortrait: '/sandeep_sahni.jpg',
      heroBackgroundHidden: false,
      officeEntranceHidden: false,
      officeLibraryHidden: false,
      logoHidden: false,
      footerLogoHidden: false,
      mascotHidden: false,
      founderPortraitHidden: false,
    };

    setSiteImages(resetValues);
    setHasUnsavedChanges(true);
    showToast('All website images have been reset to defaults. Click Save & Publish to save.');
  };

  // Save All Changes to Server & Persistent Storage
  const handleSaveAll = async (targetKey?: string) => {
    setIsSavingAll(true);
    try {
      await saveSiteImagesToIndexedDB(siteImages);
      await syncSiteImagesToR2(siteImages);
      await updateSettings({
        siteImages,
        // Also keep legacy logo and footer fields in sync
        mainLogo: siteImages.logo || settings.mainLogo,
        footerLogo: siteImages.footerLogo || settings.footerLogo,
      });
      setHasUnsavedChanges(false);
      if (targetKey) {
        setSavedKey(targetKey);
        setTimeout(() => setSavedKey(null), 2500);
      }
      showToast('All website images saved and published live to website!');
    } catch (err: any) {
      showToast(`Error saving images: ${err.message || 'Unknown error'}`);
    } finally {
      setIsSavingAll(false);
    }
  };

  // Filtered definitions
  const filteredDefinitions = WEBSITE_IMAGE_DEFINITIONS.filter((def) => {
    const matchesCategory =
      selectedCategory === 'All' || def.category === selectedCategory;
    const matchesSearch =
      def.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      def.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      def.whereUsed.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const hiddenCount = WEBSITE_IMAGE_DEFINITIONS.filter((d) => isImageHidden(d)).length;
  const customCount = WEBSITE_IMAGE_DEFINITIONS.filter((d) => isImageCustomized(d)).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B192C] via-[#102542] to-[#071526] text-white p-6 sm:p-8 rounded-3xl border border-[#C5A059]/30 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#C5A059] uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Visual Assets & Media Control</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
            Website Images Manager
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
            Easily replace, upload, preview, or remove any core image across the entire Sahayak Associates website — including the hero wireframe artwork, office photographs, brand logos, mascot, and author portraits.
          </p>
        </div>

        {/* Global Save & Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-stone-200 border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            title="View live website"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>View Live Site</span>
          </button>

          <button
            onClick={handleResetAllToDefaults}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-red-950/40 hover:bg-red-900/60 text-red-200 border border-red-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Restore all 7 core images to factory defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All to Defaults</span>
          </button>

          <button
            onClick={handleSaveAll}
            disabled={isSavingAll}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg ${
              hasUnsavedChanges
                ? 'bg-gradient-to-r from-[#DEBF6A] via-[#C9A24E] to-[#B08B43] text-[#071526] hover:brightness-110 ring-2 ring-[#C9A24E]/50 animate-pulse'
                : 'bg-[#C5A059] text-[#0B192C] hover:bg-[#D8B76E]'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{isSavingAll ? 'Publishing...' : hasUnsavedChanges ? 'Publish Changes *' : 'Save & Publish'}</span>
          </button>
        </div>
      </div>

      {/* Unsaved Changes Banner */}
      {hasUnsavedChanges && (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex items-center justify-between text-xs text-amber-900 shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>You have unsaved image changes.</strong> Remember to click <strong>&ldquo;Publish Changes&rdquo;</strong> to save them to the database and update the live website.
            </span>
          </div>
          <button
            onClick={handleSaveAll}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg cursor-pointer transition-colors"
          >
            Publish Now
          </button>
        </div>
      )}

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
          <div className="text-[11px] font-mono font-semibold text-stone-500 uppercase">Total Site Images</div>
          <div className="text-2xl font-bold font-serif text-[#0B192C] mt-1">{WEBSITE_IMAGE_DEFINITIONS.length} Assets</div>
          <div className="text-[10px] text-stone-400 mt-0.5">Core site visual components</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
          <div className="text-[11px] font-mono font-semibold text-stone-500 uppercase">Active on Website</div>
          <div className="text-2xl font-bold font-serif text-emerald-700 mt-1">
            {WEBSITE_IMAGE_DEFINITIONS.length - hiddenCount} Visible
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">Currently rendered live</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
          <div className="text-[11px] font-mono font-semibold text-stone-500 uppercase">Custom Uploads</div>
          <div className="text-2xl font-bold font-serif text-blue-700 mt-1">{customCount} Custom</div>
          <div className="text-[10px] text-stone-400 mt-0.5">Replaced from default</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
          <div className="text-[11px] font-mono font-semibold text-stone-500 uppercase">Hidden / Removed</div>
          <div className="text-2xl font-bold font-serif text-red-700 mt-1">{hiddenCount} Hidden</div>
          <div className="text-[10px] text-stone-400 mt-0.5">Removed from storefront</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {['All', 'Homepage', 'Branding', 'Institutional', 'Leadership'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0B192C] text-[#FAF7F2] shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search images or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
          />
        </div>
      </div>

      {/* Image Cards Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredDefinitions.map((def) => {
          const currentUrl = getActiveUrl(def);
          const isHidden = isImageHidden(def);
          const isCustom = isImageCustomized(def);
          const mode = activeInputMode[def.key] || 'file';
          const isUploading = uploadingKeys[def.key] || false;
          const progress = uploadProgress[def.key] || 0;
          const urlInputVal = customUrlInputs[def.key] ?? (isCustom ? currentUrl : '');

          return (
            <div
              key={def.key}
              className={`bg-white rounded-3xl border transition-all duration-200 shadow-sm overflow-hidden flex flex-col justify-between ${
                isHidden
                  ? 'border-red-200 bg-red-50/20 opacity-80'
                  : isCustom
                  ? 'border-[#C5A059]/40 ring-1 ring-[#C5A059]/20'
                  : 'border-stone-200'
              }`}
            >
              {/* Card Header */}
              <div className="p-6 border-b border-stone-100 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-stone-100 text-stone-700 uppercase">
                      {def.category}
                    </span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {def.whereUsed}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#0B192C]">
                    {def.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {def.description}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="shrink-0">
                  {isHidden ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                      <EyeOff className="w-3 h-3" />
                      <span>Removed / Hidden</span>
                    </span>
                  ) : isCustom ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                      <Sparkles className="w-3 h-3" />
                      <span>Custom Image</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Default Image</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body: Preview and Controls */}
              <div className="p-6 space-y-6 flex-1">
                {/* Visual Preview Box */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-semibold text-stone-700">Preview</span>
                    <span className="font-mono text-[10px]">{def.aspectRatio}</span>
                  </div>

                  <div
                    className={`relative w-full h-56 rounded-2xl overflow-hidden border flex items-center justify-center transition-all ${
                      isHidden
                        ? 'border-dashed border-red-300 bg-red-50/50'
                        : 'border-stone-200 bg-[#071526]'
                    }`}
                  >
                    {isHidden ? (
                      <div className="text-center p-6 space-y-2">
                        <EyeOff className="w-8 h-8 text-red-400 mx-auto" />
                        <div className="text-xs font-bold text-red-700">Image is currently hidden/removed</div>
                        <div className="text-[11px] text-stone-500 max-w-xs mx-auto">
                          The website will either gracefully hide this element or display the fallback layout.
                        </div>
                        <button
                          onClick={() => handleToggleHide(def)}
                          className="mt-2 px-3 py-1.5 bg-white border border-stone-300 hover:border-stone-400 text-stone-700 text-xs font-bold rounded-lg cursor-pointer"
                        >
                          Restore Visibility
                        </button>
                      </div>
                    ) : (
                      <img
                        src={currentUrl}
                        alt={def.title}
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = def.defaultUrl;
                        }}
                      />
                    )}

                    {/* Progress overlay */}
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-white space-y-2 p-4">
                        <div className="text-xs font-bold">Uploading new image... {progress}%</div>
                        <div className="w-48 bg-white/20 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-[#C5A059] h-full transition-all duration-200"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Active URL Snippet */}
                  {!isHidden && (
                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200 truncate">
                      <span className="truncate pr-2">{currentUrl}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(currentUrl);
                          showToast('Image URL copied to clipboard');
                        }}
                        className="text-[#C5A059] font-bold hover:underline shrink-0 cursor-pointer"
                      >
                        Copy
                      </button>
                    </div>
                  )}
                </div>

                {/* Replacement Options (Upload vs URL vs Library) */}
                <div className="space-y-3 pt-2 border-t border-stone-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800">Change Image:</span>
                    <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg text-[11px]">
                      <button
                        onClick={() => setActiveInputMode((prev) => ({ ...prev, [def.key]: 'file' }))}
                        className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                          mode === 'file' ? 'bg-white text-[#0B192C] shadow-xs' : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        File Upload
                      </button>
                      <button
                        onClick={() => setActiveInputMode((prev) => ({ ...prev, [def.key]: 'url' }))}
                        className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                          mode === 'url' ? 'bg-white text-[#0B192C] shadow-xs' : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        Image Link
                      </button>
                    </div>
                  </div>

                  {mode === 'file' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={(el) => {
                          fileInputRefs.current[def.key] = el;
                        }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(def, file);
                          e.target.value = '';
                        }}
                      />
                      <button
                        onClick={() => fileInputRefs.current[def.key]?.click()}
                        disabled={isUploading}
                        className="flex-1 py-2.5 px-4 bg-stone-900 hover:bg-[#152A4A] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Upload File from Computer</span>
                      </button>

                      <button
                        onClick={() => setPickingForImageKey(def.key)}
                        className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-stone-200"
                        title="Pick from existing Media Library items"
                      >
                        <FolderOpen className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Library</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="https://example.com/artwork.jpg or /assets/..."
                        value={urlInputVal}
                        onChange={(e) =>
                          setCustomUrlInputs((prev) => ({ ...prev, [def.key]: e.target.value }))
                        }
                        className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                      />
                      <button
                        onClick={() => handleApplyUrl(def.key, urlInputVal)}
                        className="px-4 py-2 bg-[#0B192C] text-[#C5A059] rounded-xl text-xs font-bold hover:bg-[#152A4A] transition-colors cursor-pointer shrink-0"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions: Remove & Reset */}
              <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => handleToggleHide(def)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isHidden
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                  }`}
                >
                  {isHidden ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Unhide & Show</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove / Hide</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  {isCustom && (
                    <button
                      onClick={() => handleResetSingle(def)}
                      className="px-3 py-1.5 rounded-xl text-stone-600 hover:bg-stone-200 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                      title="Reset this specific image back to factory default"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Default</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleSaveAll(def.key as string)}
                    disabled={isSavingAll}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1 ${
                      savedKey === def.key
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#C5A059] text-[#0B192C] hover:bg-[#D8B76E]'
                    }`}
                  >
                    {savedKey === def.key ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{savedKey === def.key ? 'Saved!' : 'Save'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Media Library Picker Modal */}
      {pickingForImageKey && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#0B192C]">
                  Choose from Media Assets Library
                </h3>
                <p className="text-xs text-stone-500">
                  Select an asset to use as{' '}
                  <strong className="text-stone-800">{String(pickingForImageKey)}</strong>
                </p>
              </div>
              <button
                onClick={() => setPickingForImageKey(null)}
                className="p-2 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search */}
            <div className="p-4 bg-stone-50 border-b border-stone-200">
              <input
                type="text"
                placeholder="Search assets by name or object key..."
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
              />
            </div>

            {/* Assets Grid */}
            <div className="p-6 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {mediaItems
                .filter(
                  (m) =>
                    !librarySearch ||
                    m.name.toLowerCase().includes(librarySearch.toLowerCase()) ||
                    m.url.toLowerCase().includes(librarySearch.toLowerCase())
                )
                .map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      const selectedUrl = m.publicUrl || m.url;
                      if (pickingForImageKey) {
                        setSiteImages((prev) => ({
                          ...prev,
                          [pickingForImageKey]: selectedUrl,
                          [`${String(pickingForImageKey)}Hidden`]: false,
                        }));
                        setHasUnsavedChanges(true);
                        showToast(`Selected "${m.name}" for ${String(pickingForImageKey)}`);
                        setPickingForImageKey(null);
                      }
                    }}
                    className="group relative rounded-2xl border border-stone-200 hover:border-[#C5A059] overflow-hidden bg-stone-50 p-2 text-left transition-all hover:shadow-md cursor-pointer flex flex-col"
                  >
                    <div className="w-full h-28 rounded-xl overflow-hidden bg-stone-100 flex items-center justify-center">
                      <img
                        src={m.publicUrl || m.url}
                        alt={m.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="mt-2 space-y-0.5">
                      <div className="text-xs font-bold text-stone-800 truncate">{m.name}</div>
                      <div className="text-[10px] text-stone-400 font-mono truncate">{m.folder || 'Media'}</div>
                    </div>
                  </button>
                ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setPickingForImageKey(null)}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
