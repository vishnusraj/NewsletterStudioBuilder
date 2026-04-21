/**
 * colorSystem.ts
 *
 * Design token color system for Newsletter Studio.
 * Manages 5 customisable color slots, CSS class injection, and WCAG contrast helpers.
 *
 * Approach
 * ────────
 * Newsletter.tsx uses Tailwind arbitrary-value classes like `bg-[#041627]`.
 * Tailwind compiles these to CSS rules: `.bg-\[\#041627\] { background-color: #041627 }`
 * We override them at runtime by injecting a <style> element into <head> with
 * higher-specificity rules scoped to `[data-newsletter-root]`.
 */

// ── Token types ────────────────────────────────────────────────────────────────

export interface ThemeColors {
  primary: string;  // Deep navy  — header, snapshot, dark section accents
  accent:  string;  // Brand orange — highlights, nav underline, year display
  success: string;  // Teal        — "On Track", positive trend indicators
  danger:  string;  // Red         — watch badge, critical SVG strokes
  warning: string;  // Orange-red  — "Input Needed" badge, carried-fwd icon
}

export const DEFAULT_THEME_COLORS: ThemeColors = {
  primary: '#041627',
  accent:  '#f05a29',
  success: '#006b5f',
  danger:  '#dc2626',
  warning: '#ea580c',
};

export interface ColorSlotMeta {
  key:         keyof ThemeColors;
  label:       string;
  description: string;
  examples:    string[];
}

export const COLOR_SLOT_META: ColorSlotMeta[] = [
  {
    key: 'primary',
    label: 'Primary Dark',
    description: 'Main header, Monthly Snapshot background, dark accents',
    examples: ['Header bg', 'Snapshot bg', 'Bar chart dark bars', 'Section dots'],
  },
  {
    key: 'accent',
    label: 'Brand Accent',
    description: 'Orange highlight for active & emphasis states',
    examples: ['Year "2026"', 'Nav active underline', 'Metric card 2 border'],
  },
  {
    key: 'success',
    label: 'Success / On Track',
    description: 'Positive status — "On Track" badges and trend lines',
    examples: ['Metric card 1 border', 'Trend "↑" text', 'Resolution icon'],
  },
  {
    key: 'danger',
    label: 'Danger / Watch',
    description: 'Critical watch-item badge and icon strokes',
    examples: ['WATCH badge text', 'Watch icon stroke'],
  },
  {
    key: 'warning',
    label: 'Warning / Input Needed',
    description: 'In-progress and action-required indicators',
    examples: ['INPUT NEEDED badge', 'Carried-fwd icon', 'Watch item 2'],
  },
];

// ── Color utilities ────────────────────────────────────────────────────────────

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '');
  if (!/^[0-9A-Fa-f]{6}$/.test(clean)) return null;
  const num = parseInt(clean, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

/** WCAG relative luminance → pick black or white text */
export function getContrastColor(hex: string): '#ffffff' | '#000000' {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#ffffff';
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.55 ? '#000000' : '#ffffff';
}

/** True if the color has good contrast against a white background */
export function hasGoodContrast(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance < 0.6;
}

export function isValidHex(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

/** Normalise hex to lowercase with # */
export function normaliseHex(raw: string): string {
  const cleaned = raw.trim().replace(/^#?/, '#').toUpperCase();
  return cleaned;
}

// ── CSS injection ──────────────────────────────────────────────────────────────

/**
 * Escape a hex color so it can appear in a Tailwind arbitrary-value CSS selector.
 *
 * Tailwind class:    bg-[#041627]
 * CSS selector:      .bg-\[\#041627\]
 * In JS string:      '.bg-\\[\\#041627\\]'
 */
function escapeTailwindArbitrary(hex: string): string {
  const escapedHash = hex.replace('#', '\\#');
  return `\\[${escapedHash}\\]`;
}

/**
 * Generate CSS that overrides newsletter Tailwind color classes.
 * Scoped to [data-newsletter-root] so it doesn't bleed into the studio UI.
 * Uses !important to beat the Tailwind-generated rules.
 */
export function generateThemeCSS(theme: ThemeColors): string {
  const orig = DEFAULT_THEME_COLORS;
  const lines: string[] = ['/* Newsletter Studio — Dynamic Theme Overrides */'];

  const addRules = (origColor: string, newColor: string) => {
    if (origColor.toLowerCase() === newColor.toLowerCase()) return;
    const esc = escapeTailwindArbitrary(origColor);
    const scope = '[data-newsletter-root]';

    // Background colors
    lines.push(`${scope} .bg-${esc} { background-color: ${newColor} !important; }`);
    // Text colors
    lines.push(`${scope} .text-${esc} { color: ${newColor} !important; }`);
    // Border (all sides)
    lines.push(`${scope} .border-${esc} { border-color: ${newColor} !important; }`);
    // Border directional overrides (e.g. border-t-2 border-[#006b5f])
    lines.push(`${scope} .border-t-2.border-${esc} { border-top-color: ${newColor} !important; }`);
    lines.push(`${scope} .border-b-2.border-${esc} { border-bottom-color: ${newColor} !important; }`);
    // SVG fills / strokes via class
    lines.push(`${scope} .fill-${esc} { fill: ${newColor} !important; }`);
    lines.push(`${scope} .stroke-${esc} { stroke: ${newColor} !important; }`);

    // Also handle color variants that differ in case
    const escUpper = escapeTailwindArbitrary(origColor.toUpperCase());
    if (escUpper !== esc) {
      lines.push(`${scope} .bg-${escUpper} { background-color: ${newColor} !important; }`);
      lines.push(`${scope} .text-${escUpper} { color: ${newColor} !important; }`);
      lines.push(`${scope} .border-${escUpper} { border-color: ${newColor} !important; }`);
    }
  };

  addRules(orig.primary, theme.primary);
  addRules(orig.accent,  theme.accent);
  addRules(orig.success, theme.success);
  addRules(orig.danger,  theme.danger);
  addRules(orig.warning, theme.warning);

  // SVG CSS custom-property overrides used by specific icons in the newsletter
  const scope = '[data-newsletter-root]';
  if (theme.success !== orig.success) {
    // Resolution-rate success icon: fill="var(--fill-0, #006B5F)"
    lines.push(`${scope} svg path[fill*="006B5F"] { fill: ${theme.success} !important; }`);
    lines.push(`${scope} svg path[fill*="006b5f"] { fill: ${theme.success} !important; }`);
  }
  if (theme.danger !== orig.danger) {
    // Watch 1 danger icon: stroke="var(--stroke-0, #DC2626)"
    lines.push(`${scope} svg path[stroke*="DC2626"] { stroke: ${theme.danger} !important; }`);
    lines.push(`${scope} svg path[stroke*="dc2626"] { stroke: ${theme.danger} !important; }`);
  }
  if (theme.warning !== orig.warning) {
    // Watch 2 / carried-fwd warning icon: stroke="var(--stroke-0, #EA580C)"
    lines.push(`${scope} svg path[stroke*="EA580C"] { stroke: ${theme.warning} !important; }`);
    lines.push(`${scope} svg path[stroke*="ea580c"] { stroke: ${theme.warning} !important; }`);
  }

  return lines.join('\n');
}

// ── Injected style element management ────────────────────────────────────────

const STYLE_ELEMENT_ID = 'newsletter-studio-theme';

export function injectThemeCSS(theme: ThemeColors): void {
  let el = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement('style');
    el.id = STYLE_ELEMENT_ID;
    document.head.appendChild(el);
  }
  el.textContent = generateThemeCSS(theme);
}

export function removeThemeCSS(): void {
  document.getElementById(STYLE_ELEMENT_ID)?.remove();
}
