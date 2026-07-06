import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Newsletter from '../../../imports/Newsletter';
import {
  useNewsletterStore,
  DEFAULT_COVER_DATA,
  type CoverData,
} from '../../store/useNewsletterStore';
import { buildSectionReplacements, applyTextReplacements } from '../../utils/dataMapper';
import { injectThemeCSS } from '../../utils/colorSystem';
import { ProductionSupportSection } from './ProductionSupportSection';
import { ReleaseForecastSection } from './ReleaseForecastSection';
import { ModernisationSection } from './ModernisationSection';
import { PortfolioSection } from './PortfolioSection';
import { MetricsSection } from './MetricsSection';
import { BusinessImpactSection } from './BusinessImpactSection';
import { FooterSection } from './FooterSection';
import { WatchItemsSection } from './WatchItemsSection';
import { Top3OutcomesSection } from './Top3OutcomesSection';
import { MonthlySnapshotSection } from './MonthlySnapshotSection';
import { ClientPartnersSection } from './ClientPartnersSection';
import { ThankYouSection } from './ThankYouSection';

interface NewsletterCanvasProps {
  canvasRef: React.MutableRefObject<HTMLDivElement | null>;
}

// ── Stable DOM containers (module-level singletons) ───────────────────────────
// Created once; re-inserted into the canvas on every rebuild.
// React portals render into these and survive detach/re-attach cycles.

const PS_CONTAINER = document.createElement('div');
PS_CONTAINER.style.width = '100%';
PS_CONTAINER.setAttribute('data-dynamic-section', 'production-support');

const CLIENT_PARTNERS_CONTAINER = document.createElement('div');
CLIENT_PARTNERS_CONTAINER.style.width = '100%';
CLIENT_PARTNERS_CONTAINER.setAttribute('data-dynamic-section', 'client-partners');

const RF_CONTAINER = document.createElement('div');
RF_CONTAINER.style.width = '100%';
RF_CONTAINER.setAttribute('data-dynamic-section', 'release-forecast');

const SNAPSHOT_CONTAINER = document.createElement('div');
SNAPSHOT_CONTAINER.style.width = '100%';
SNAPSHOT_CONTAINER.setAttribute('data-dynamic-section', 'monthly-snapshot');

const MOD_CONTAINER = document.createElement('div');
MOD_CONTAINER.style.width = '100%';
MOD_CONTAINER.setAttribute('data-dynamic-section', 'modernisation');

const PORTFOLIO_CONTAINER = document.createElement('div');
PORTFOLIO_CONTAINER.style.width = '100%';
PORTFOLIO_CONTAINER.setAttribute('data-dynamic-section', 'portfolio');

const METRICS_CONTAINER = document.createElement('div');
METRICS_CONTAINER.style.width = '100%';
METRICS_CONTAINER.setAttribute('data-dynamic-section', 'metrics');

const BI_CONTAINER = document.createElement('div');
BI_CONTAINER.style.width = '100%';
BI_CONTAINER.setAttribute('data-dynamic-section', 'business-impact');

const OUTCOMES_CONTAINER = document.createElement('div');
OUTCOMES_CONTAINER.style.width = '100%';
OUTCOMES_CONTAINER.setAttribute('data-dynamic-section', 'top3-outcomes');

const WATCH_CONTAINER = document.createElement('div');
WATCH_CONTAINER.style.width = '100%';
WATCH_CONTAINER.setAttribute('data-dynamic-section', 'watch-items');

const THANK_YOU_CONTAINER = document.createElement('div');
THANK_YOU_CONTAINER.style.width = '100%';
THANK_YOU_CONTAINER.setAttribute('data-dynamic-section', 'thank-you');

const FOOTER_CONTAINER = document.createElement('div');
FOOTER_CONTAINER.style.width = '100%';
FOOTER_CONTAINER.setAttribute('data-dynamic-section', 'footer');

// ── Dynamic section types ─────────────────────────────────────────────────────
const DYNAMIC_SECTION_TYPES = new Set([
  'production-support',
  'client-partners',
  'release-forecast',
  'monthly-snapshot',
  'modernisation',
  'portfolio',
  'metrics',
  'business-impact',
  'top3-outcomes',
  'watch-items',
  'thank-you',
]);

// ── Static section text-element tags ─────────────────────────────────────────
const TEXT_TAGS = 'p, span, h1, h2, h3, h4, h5, h6, td, li';

function getEditableNodeKey(sectionId: string, index: number): string {
  return `${sectionId}::text-${index}`;
}

// ── HELPER 1 — applyHeaderCoverText ──────────────────────────────────────────
// Sets text and data-cover-field on header <p> elements. No event listeners.
function applyHeaderCoverText(headerEl: HTMLElement, coverData: CoverData): void {
  const D = DEFAULT_COVER_DATA;
  const defaultToField = new Map<string, keyof CoverData>();
  (Object.keys(D) as Array<keyof CoverData>).forEach(k => defaultToField.set(D[k], k));

  headerEl.querySelectorAll('p').forEach((p) => {
    let field = p.getAttribute('data-cover-field') as keyof CoverData | null;
    if (!field) {
      const raw = (p.textContent ?? '').trim();
      field = defaultToField.get(raw) ?? null;
    }
    if (!field) return;
    p.setAttribute('data-cover-field', field);
    const newVal = coverData[field] ?? D[field];
    if ((p.textContent ?? '').trim() !== newVal) p.textContent = newVal;
  });
}

// ── HELPER 2 — applyEditModeDOM ───────────────────────────────────────────────
// Toggles contentEditable + CSS data attribute on existing canvas DOM.
function applyEditModeDOM(canvas: HTMLElement, isEdit: boolean): void {
  if (isEdit) canvas.setAttribute('data-edit-canvas', 'true');
  else         canvas.removeAttribute('data-edit-canvas');

  canvas.querySelectorAll<HTMLElement>('[data-cover-field]').forEach((el) => {
    el.contentEditable = isEdit ? 'true' : 'false';
    el.style.cursor    = isEdit ? 'text' : '';
    if (isEdit) {
      el.setAttribute('role', 'textbox');
      el.setAttribute('aria-label', el.getAttribute('data-cover-field') ?? 'Cover field');
    } else {
      el.removeAttribute('role');
      el.removeAttribute('aria-label');
    }
  });

  canvas.querySelectorAll<HTMLElement>('[data-editable-text]').forEach((el) => {
    el.contentEditable  = isEdit ? 'true' : 'false';
    el.style.cursor     = isEdit ? 'text' : '';
    el.style.borderRadius = isEdit ? '2px' : '';
    if (isEdit) {
      el.setAttribute('role', 'textbox');
      el.setAttribute('aria-label', el.getAttribute('data-edit-label') ?? 'Editable text');
    } else {
      el.removeAttribute('role');
      el.removeAttribute('aria-label');
    }
  });
}

// ── HELPER 3 — enforceNoWrap ──────────────────────────────────────────────────
function enforceNoWrap(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>('[class*="whitespace-nowrap"]').forEach((el) => {
    el.style.whiteSpace = 'nowrap';
    if (el.style.width && el.style.width.endsWith('px')) el.style.width = 'auto';
    el.querySelectorAll<HTMLElement>('p').forEach((p) => { p.style.whiteSpace = 'nowrap'; });
  });
  root.querySelectorAll<HTMLElement>('p[class*="whitespace-nowrap"]').forEach((p) => {
    p.style.whiteSpace = 'nowrap';
  });
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export function NewsletterCanvas({ canvasRef }: NewsletterCanvasProps) {
  const hiddenRef = useRef<HTMLDivElement>(null);

  // Mutable refs — allow stable callbacks to read current values without deps
  const editModeRef             = useRef(false);
  const selectSectionFn         = useRef<(id: string | null) => void>(() => {});
  const psSectionIdRef          = useRef<string | null>(null);
  const clientPartnersSectionIdRef = useRef<string | null>(null);
  const rfSectionIdRef          = useRef<string | null>(null);
  const snapshotSectionIdRef    = useRef<string | null>(null);
  const modSectionIdRef         = useRef<string | null>(null);
  const portfolioSectionIdRef   = useRef<string | null>(null);
  const metricsSectionIdRef     = useRef<string | null>(null);
  const biSectionIdRef          = useRef<string | null>(null);
  const outcomesSectionIdRef    = useRef<string | null>(null);
  const watchSectionIdRef       = useRef<string | null>(null);
  const thankYouSectionIdRef    = useRef<string | null>(null);
  const coverDataRef            = useRef<CoverData>(DEFAULT_COVER_DATA);
  const sectionOverridesRef     = useRef<Record<string, Record<string, string>>>({});

  const {
    sections, zoom, editMode, selectSection, selectedSectionId,
    importedData, coverData, themeColors, updateCoverField,
    sectionTextOverrides, setSectionTextOverride,
  } = useNewsletterStore();

  // Keep every mutable ref current on every render
  editModeRef.current         = editMode;
  selectSectionFn.current     = selectSection;
  coverDataRef.current        = coverData;
  sectionOverridesRef.current = sectionTextOverrides;

  const [loaded, setLoaded] = useState(false);

  const handleSectionKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const current = e.currentTarget as HTMLElement;
    e.preventDefault();
    e.stopPropagation();
    const sectionId = current.getAttribute('data-section-id');
    if (sectionId) {
      selectSectionFn.current(sectionId);
      return;
    }
    if (current === FOOTER_CONTAINER) {
      selectSectionFn.current('__footer__');
    }
  }, []);

  // ── Derived keys ──────────────────────────────────────────────────────────
  const structureKey = [...sections]
    .sort((a, b) => a.order - b.order)
    .map(s => `${s.id}:${s.type}:${s.visible}:${s.order}`)
    .join('|');

  const dataKey = importedData ? JSON.stringify(importedData) : '__none__';

  // ── Theme CSS ─────────────────────────────────────────────────────────────
  useEffect(() => { injectThemeCSS(themeColors); }, [themeColors]);

  // ── One-time click listener setup on stable portal containers ────────────
  useEffect(() => {
    function makeHandler(idRef: React.MutableRefObject<string | null>) {
      return (e: Event) => {
        if (editModeRef.current && (e.target as HTMLElement).isContentEditable) return;
        e.stopPropagation();
        if (idRef.current) selectSectionFn.current(idRef.current);
      };
    }
    PS_CONTAINER.addEventListener('click',        makeHandler(psSectionIdRef));
    CLIENT_PARTNERS_CONTAINER.addEventListener('click', makeHandler(clientPartnersSectionIdRef));
    RF_CONTAINER.addEventListener('click',        makeHandler(rfSectionIdRef));
    SNAPSHOT_CONTAINER.addEventListener('click',  makeHandler(snapshotSectionIdRef));
    MOD_CONTAINER.addEventListener('click',       makeHandler(modSectionIdRef));
    PORTFOLIO_CONTAINER.addEventListener('click', makeHandler(portfolioSectionIdRef));
    METRICS_CONTAINER.addEventListener('click',   makeHandler(metricsSectionIdRef));
    BI_CONTAINER.addEventListener('click',       makeHandler(biSectionIdRef));
    OUTCOMES_CONTAINER.addEventListener('click', makeHandler(outcomesSectionIdRef));
    WATCH_CONTAINER.addEventListener('click',    makeHandler(watchSectionIdRef));
    THANK_YOU_CONTAINER.addEventListener('click', makeHandler(thankYouSectionIdRef));

    // Footer click → select the special '__footer__' id to open footer editor
    FOOTER_CONTAINER.addEventListener('click', (e) => {
      e.stopPropagation();
      selectSectionFn.current('__footer__');
    });
  }, []);

  // ── buildCanvas ───────────────────────────────────────────────────────────
  // KEY: editMode, coverData, sectionTextOverrides are intentionally NOT in
  // deps — they are read via mutable refs so their changes do NOT trigger
  // a full canvas rebuild. Separate effects handle those updates surgically.
  const buildCanvas = useCallback(() => {
    const hidden = hiddenRef.current;
    const canvas = canvasRef.current;
    if (!hidden || !canvas) return false;

    const mainContent = hidden.querySelector('[data-name="Main"] > div');
    if (!mainContent) return false;

    const sectionEls = Array.from(mainContent.children) as HTMLElement[];
    canvas.innerHTML = '';   // detaches containers but JS refs remain valid

    const newsletterRoot = document.createElement('div');
    newsletterRoot.style.cssText =
      'display:flex;flex-direction:column;align-items:flex-start;width:100%;background:#f5f3ef;';
    newsletterRoot.setAttribute('data-newsletter-root', 'true');

    // ── Header ───────────────────────────────────────────────────────────────
    const header = hidden.querySelector('[data-name="MainHeader"]');
    if (header) {
      const headerClone = header.cloneNode(true) as HTMLElement;
      applyHeaderCoverText(headerClone, coverDataRef.current);
      enforceNoWrap(headerClone);

      headerClone.addEventListener('click', (e) => {
        if (editModeRef.current && (e.target as HTMLElement).isContentEditable) return;
        e.stopPropagation();
        selectSectionFn.current(null);
      });

      newsletterRoot.appendChild(headerClone);
    }

    // ── Main body ─────────────────────────────────────────────────────────────
    const mainDiv = document.createElement('div');
    mainDiv.setAttribute('data-name', 'Main');
    mainDiv.className = 'max-w-[1280px] relative shrink-0 w-full';

    const innerDiv = document.createElement('div');
    innerDiv.className =
      'content-stretch flex flex-col gap-[48px] items-start max-w-[inherit] px-[24px] py-[32px] relative w-full';

    const visibleSections = [...sections]
      .filter(s => s.visible)
      .sort((a, b) => a.order - b.order);

    visibleSections.forEach((section) => {
      // ── Dynamic sections (portals) ──────────────────────────────────────
      if (DYNAMIC_SECTION_TYPES.has(section.type)) {
        let container: HTMLElement;
        switch (section.type) {
          case 'production-support': container = PS_CONTAINER;        psSectionIdRef.current        = section.id; break;
          case 'client-partners':    container = CLIENT_PARTNERS_CONTAINER; clientPartnersSectionIdRef.current = section.id; break;
          case 'release-forecast':   container = RF_CONTAINER;        rfSectionIdRef.current        = section.id; break;
          case 'monthly-snapshot':   container = SNAPSHOT_CONTAINER;  snapshotSectionIdRef.current  = section.id; break;
          case 'modernisation':      container = MOD_CONTAINER;       modSectionIdRef.current       = section.id; break;
          case 'portfolio':          container = PORTFOLIO_CONTAINER; portfolioSectionIdRef.current = section.id; break;
          case 'metrics':            container = METRICS_CONTAINER;   metricsSectionIdRef.current   = section.id; break;
          case 'business-impact':    container = BI_CONTAINER;        biSectionIdRef.current        = section.id; break;
          case 'top3-outcomes':      container = OUTCOMES_CONTAINER;  outcomesSectionIdRef.current  = section.id; break;
          case 'watch-items':        container = WATCH_CONTAINER;     watchSectionIdRef.current     = section.id; break;
          case 'thank-you':          container = THANK_YOU_CONTAINER; thankYouSectionIdRef.current   = section.id; break;
          default: return;
        }

        container.setAttribute('data-section-id',        section.id);
        container.setAttribute('data-section-type',      section.type);
        container.setAttribute('data-clickable-section', 'true');
        container.setAttribute('role', 'button');
        container.setAttribute('tabindex', '0');
        container.setAttribute('aria-label', `Select ${section.label} section`);
        container.style.cursor     = 'pointer';
        container.style.transition = 'outline 0.1s';
        container.onkeydown = handleSectionKeyDown;

        innerDiv.appendChild(container);
        return;
      }

      // ── Static sections — clone from hidden Newsletter ──────────────────
      const origEl = sectionEls[section.originalIndex];
      if (!origEl) return;

      const clone = origEl.cloneNode(true) as HTMLElement;

      if (importedData) {
        const replacements = buildSectionReplacements(section.type, importedData);
        applyTextReplacements(clone, replacements);
      }

      // Apply user text overrides (from Zustand) via stable ref
      const sectionOverrides = sectionOverridesRef.current[section.id] ?? {};
      clone.querySelectorAll<HTMLElement>(TEXT_TAGS).forEach((el, index) => {
        const origText = (el.textContent ?? '').trim();
        const editKey = getEditableNodeKey(section.id, index);
        const overrideValue = sectionOverrides[editKey] ?? (origText ? sectionOverrides[origText] : undefined);
        if (overrideValue !== undefined) {
          el.textContent = overrideValue;
        }
        el.setAttribute('data-editable-text', 'true');
        el.setAttribute('data-edit-key', editKey);
        el.setAttribute('data-edit-label', `${section.label} text ${index + 1}`);
        if (origText) el.setAttribute('data-original-text', origText);
      });

      enforceNoWrap(clone);

      clone.setAttribute('data-section-id',        section.id);
      clone.setAttribute('data-section-type',       section.type);
      clone.setAttribute('data-clickable-section',  'true');
      clone.setAttribute('role', 'button');
      clone.setAttribute('tabindex', '0');
      clone.setAttribute('aria-label', `Select ${section.label} section`);
      clone.style.cursor     = 'pointer';
      clone.style.transition = 'outline 0.1s';
      clone.onkeydown = handleSectionKeyDown;

      clone.addEventListener('click', (e) => {
        if (editModeRef.current && (e.target as HTMLElement).isContentEditable) return;
        e.stopPropagation();
        selectSectionFn.current(section.id);
      });

      innerDiv.appendChild(clone);
    });

    mainDiv.appendChild(innerDiv);
    newsletterRoot.appendChild(mainDiv);

    // ── Footer (live portal — not a DOM clone) ────────────────────────────
    FOOTER_CONTAINER.style.cursor     = 'pointer';
    FOOTER_CONTAINER.style.transition = 'outline 0.1s';
    FOOTER_CONTAINER.setAttribute('role', 'button');
    FOOTER_CONTAINER.setAttribute('tabindex', '0');
    FOOTER_CONTAINER.setAttribute('aria-label', 'Select footer');
    FOOTER_CONTAINER.onkeydown = handleSectionKeyDown;
    newsletterRoot.appendChild(FOOTER_CONTAINER);

    canvas.appendChild(newsletterRoot);

    // Apply current edit mode state to the freshly built DOM
    applyEditModeDOM(canvas, editModeRef.current);

    return true;
  // editMode, coverData, sectionTextOverrides intentionally omitted — using refs
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections, selectSection, canvasRef, importedData, handleSectionKeyDown]);

  // ── Effect A: Initial load ────────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 350);
    return () => clearTimeout(timer);
  }, []);

  // ── Effect B: Full rebuild (structure + import data only) ─────────────────
  useEffect(() => {
    if (!loaded) return;
    let cancelled = false;

    const attempt = (retries = 0) => {
      if (cancelled) return;
      const mainContent = hiddenRef.current?.querySelector('[data-name="Main"] > div');
      if (!mainContent) {
        if (retries < 15) setTimeout(() => attempt(retries + 1), 80);
        return;
      }
      if (!cancelled) buildCanvas();
    };

    attempt();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, structureKey, dataKey, buildCanvas]);

  // ── Effect C: Cover-only patch (no full rebuild) ──────────────────────────
  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const headerEl = canvas.querySelector<HTMLElement>('[data-name="MainHeader"]');
    if (!headerEl) return;
    applyHeaderCoverText(headerEl, coverData);
  }, [coverData, loaded, canvasRef]);

  // ── Effect D: Edit-mode toggle (no rebuild) ───────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    applyEditModeDOM(canvas, editMode);
  }, [editMode, loaded, canvasRef]);

  // ── Effect E: Delegated blur listeners ────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleCoverBlur = (e: FocusEvent) => {
      if (!editModeRef.current) return;
      const target = e.target as HTMLElement;
      const field  = target.getAttribute('data-cover-field') as keyof CoverData | null;
      if (!field) return;
      const val = (target.textContent ?? '').trim();
      updateCoverField(field, val);
    };

    const handleSectionBlur = (e: FocusEvent) => {
      if (!editModeRef.current) return;
      const target = e.target as HTMLElement;
      if (!target.hasAttribute('data-editable-text')) return;
      const editKey = target.getAttribute('data-edit-key') ?? '';
      if (!editKey) return;
      const origText = target.getAttribute('data-original-text') ?? '';
      const newText = (target.textContent ?? '').trim();
      if (newText === origText) return;
      const sectionEl = target.closest<HTMLElement>('[data-section-id]');
      const sectionId = sectionEl?.getAttribute('data-section-id') ?? '';
      if (!sectionId) return;
      setSectionTextOverride(sectionId, editKey, newText);
      target.setAttribute('data-original-text', newText);
    };

    canvas.addEventListener('blur', handleCoverBlur,   true);
    canvas.addEventListener('blur', handleSectionBlur, true);
    return () => {
      canvas.removeEventListener('blur', handleCoverBlur,   true);
      canvas.removeEventListener('blur', handleSectionBlur, true);
    };
  }, [loaded, canvasRef, updateCoverField, setSectionTextOverride]);

  // ── Effect F: Footer click highlight ─────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    const isFooterSelected = selectedSectionId === '__footer__';
    FOOTER_CONTAINER.style.outline       = isFooterSelected ? '2px solid #3b82f6' : '';
    FOOTER_CONTAINER.style.outlineOffset = isFooterSelected ? '4px' : '';
  }, [selectedSectionId, loaded]);

  // ── Effect G: Selection highlight ─────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.querySelectorAll<HTMLElement>('[data-clickable-section="true"]').forEach((el) => {
      el.style.outline       = '';
      el.style.outlineOffset = '';
      el.style.borderRadius  = '';
    });

    if (selectedSectionId && selectedSectionId !== '__footer__') {
      const el = canvas.querySelector<HTMLElement>(`[data-section-id="${selectedSectionId}"]`);
      if (el) {
        el.style.outline       = '2px solid #3b82f6';
        el.style.outlineOffset = '4px';
        el.style.borderRadius  = '2px';
      }
    }
  }, [selectedSectionId, canvasRef]);

  const handleBackgroundClick = useCallback(() => {
    selectSection(null);
  }, [selectSection]);

  return (
    <div
      className="flex-1 overflow-auto"
      style={{ backgroundColor: '#c8cdd4' }}
      onClick={handleBackgroundClick}
    >
      {/* Hidden Newsletter source for DOM extraction */}
      <div
        ref={hiddenRef}
        style={{
          position: 'fixed', left: '-9999px', top: 0,
          width: 1280, height: 'auto',
          visibility: 'hidden', pointerEvents: 'none', zIndex: -1,
        }}
        aria-hidden="true"
      >
        <Newsletter />
      </div>

      {/* Loading spinner */}
      {!loaded && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div style={{ textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
            <div style={{
              width: 36, height: 36,
              border: '3px solid #3b82f6', borderTopColor: 'transparent',
              borderRadius: '50%', animation: 'spin 0.7s linear infinite',
              margin: '0 auto 12px',
            }} />
            <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>Rendering newsletter…</p>
          </div>
        </div>
      )}

      {/* Visible scaled canvas */}
      {loaded && (
        <div style={{
          minHeight: '100%', display: 'flex', justifyContent: 'center',
          padding: '32px 24px',
          paddingBottom: `${Math.max(48, (1 - zoom / 100) * 500 + 48)}px`,
        }}>
          <div style={{ transformOrigin: 'top center', transform: `scale(${zoom / 100})`, width: 1280, flexShrink: 0 }}>
            <div
              ref={canvasRef}
              className="newsletter-canvas"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: 1280, backgroundColor: '#f5f3ef', minHeight: 200,
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 25px 50px -12px rgba(0,0,0,0.25)',
              }}
            />
          </div>
        </div>
      )}

      {/* React portals — rendered into stable module-level DOM containers */}
      {loaded && createPortal(<ProductionSupportSection />, PS_CONTAINER)}
      {loaded && createPortal(<ClientPartnersSection />,    CLIENT_PARTNERS_CONTAINER)}
      {loaded && createPortal(<ReleaseForecastSection />,   RF_CONTAINER)}
      {loaded && createPortal(<MonthlySnapshotSection />,   SNAPSHOT_CONTAINER)}
      {loaded && createPortal(<ModernisationSection />,     MOD_CONTAINER)}
      {loaded && createPortal(<PortfolioSection />,         PORTFOLIO_CONTAINER)}
      {loaded && createPortal(<MetricsSection />,           METRICS_CONTAINER)}
      {loaded && createPortal(<BusinessImpactSection />,    BI_CONTAINER)}
      {loaded && createPortal(<Top3OutcomesSection />,      OUTCOMES_CONTAINER)}
      {loaded && createPortal(<WatchItemsSection />,        WATCH_CONTAINER)}
      {loaded && createPortal(<ThankYouSection />,          THANK_YOU_CONTAINER)}
      {loaded && createPortal(<FooterSection />,            FOOTER_CONTAINER)}
    </div>
  );
}
