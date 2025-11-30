// Preview limits utility to prevent abuse of preview features
// Users get a limited number of previews per feature per day

const PREVIEW_LIMIT_PER_FEATURE = 5; // Number of uses allowed per feature per day

interface PreviewUsage {
  count: number;
  lastReset: string; // ISO date string (YYYY-MM-DD)
}

interface PreviewData {
  [feature: string]: PreviewUsage;
}

const STORAGE_KEY = 'studymate_preview_usage';

// Get current date as YYYY-MM-DD
function getCurrentDate(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

// Load preview data from localStorage
function loadPreviewData(): PreviewData {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// Save preview data to localStorage
function savePreviewData(data: PreviewData): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Silently fail if localStorage is not available
  }
}

// Check if a feature can be previewed
export function canPreviewFeature(featureName: string): boolean {
  const data = loadPreviewData();
  const currentDate = getCurrentDate();
  const usage = data[featureName];

  // If no usage data or date is old, allow preview
  if (!usage || usage.lastReset !== currentDate) {
    return true;
  }

  // Check if under the limit
  return usage.count < PREVIEW_LIMIT_PER_FEATURE;
}

// Get remaining preview count for a feature
export function getRemainingPreviews(featureName: string): number {
  const data = loadPreviewData();
  const currentDate = getCurrentDate();
  const usage = data[featureName];

  // If no usage data or date is old, return full limit
  if (!usage || usage.lastReset !== currentDate) {
    return PREVIEW_LIMIT_PER_FEATURE;
  }

  return Math.max(0, PREVIEW_LIMIT_PER_FEATURE - usage.count);
}

// Record a preview usage
export function recordPreviewUsage(featureName: string): void {
  const data = loadPreviewData();
  const currentDate = getCurrentDate();
  const usage = data[featureName];

  if (!usage || usage.lastReset !== currentDate) {
    // New day or first usage
    data[featureName] = {
      count: 1,
      lastReset: currentDate
    };
  } else {
    // Increment count
    data[featureName] = {
      count: usage.count + 1,
      lastReset: currentDate
    };
  }

  savePreviewData(data);
}

// Get a user-friendly message about preview limits
export function getPreviewLimitMessage(featureName: string): string {
  const remaining = getRemainingPreviews(featureName);
  
  if (remaining === 0) {
    return 'Preview limit reached for today. Download the app for unlimited access!';
  }
  
  return `${remaining} preview${remaining === 1 ? '' : 's'} remaining today`;
}
