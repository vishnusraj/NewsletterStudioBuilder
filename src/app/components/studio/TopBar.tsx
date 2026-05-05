import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Download, Upload, ZoomIn, ZoomOut, Edit3, Eye,
  FileText, X, CheckCircle, AlertCircle, ChevronDown,
  Save, RotateCcw, Cloud, History,
} from 'lucide-react';
import { useNewsletterStore } from '../../store/useNewsletterStore';
import { downloadXLSXTemplate, downloadJSONTemplate } from '../../utils/templateGenerator';
import { parseExcelWorkbook, parseJsonData, type ImportedData } from '../../utils/dataMapper';
import { ImportPreviewModal } from './ImportPreviewModal';
import { VersionPanel } from './VersionPanel';
import { DEFAULT_THEME_COLORS } from '../../utils/colorSystem';
import type {
  MetricItem, BIRow, BIHealth,
  ModernisationItem, PortfolioItem,
} from '../../store/useNewsletterStore';
import { WATCH_BADGE_PRESETS } from '../../store/useNewsletterStore';

// ── Apply imported data directly to Zustand store (dynamic sections) ──────────

function applyImportToStore(data: ImportedData, store: ReturnType<typeof useNewsletterStore.getState>) {

  // ── Cover ──────────────────────────────────────────────────────────────────
  if (data.cover) {
    const c = data.cover;
    const MAP: Record<string, keyof ReturnType<typeof useNewsletterStore.getState>['coverData']> = {
      title_main: 'titleMain', title_accent: 'titleAccent', subtitle: 'subtitle',
      date: 'date', edition: 'edition', volume_label: 'volumeLabel',
      brand_left: 'brandLeft', brand_right: 'brandRight',
      nav1: 'nav1', nav2: 'nav2', nav3: 'nav3',
    };
    Object.entries(c).forEach(([k, v]) => {
      const field = MAP[k];
      if (field && v) store.updateCoverField(field, v);
    });
  }

  // ── Footer ─────────────────────────────────────────────────────────────────
  if (data.footer) {
    const f = data.footer;
    if (f.copyright) store.updateFooterField('copyright', f.copyright);
    if (f.services)  store.updateFooterField('services',  f.services);
    const dl = f.date_line;
    if (dl) store.updateFooterField('dateLine', dl);
  }

  // ── Client & Partners ───────────────────────────────────────────────────────
  if (data.client_partners) {
    const cp = data.client_partners;
    store.updateClientPartnerCard('client', {
      name: cp.client_name ?? undefined,
      badgeLabel: cp.client_badge ?? undefined,
      description: cp.client_description ?? undefined,
    });
    store.updateClientPartnerCard('partner', {
      name: cp.partner_name ?? undefined,
      badgeLabel: cp.partner_badge ?? undefined,
      description: cp.partner_description ?? undefined,
    });
  }

  // ── Monthly Snapshot ────────────────────────────────────────────────────────
  if (data.monthly_snapshot) {
    const ms = data.monthly_snapshot;
    store.setMonthlySnapshotData({
      periodLabel: ms.period_label ?? undefined,
      headline: ms.headline ?? undefined,
      bodyText: ms.body_text ?? undefined,
    });
  }

  // ── Key Metrics (dedicated Key_Metrics sheet takes priority) ───────────────
  if (Array.isArray(data.key_metrics) && data.key_metrics.length) {
    const newMetrics = data.key_metrics.map((m, i) => {
      const existing = store.keyMetrics[i];
      return {
        id:          existing?.id ?? `met-import-${i}-${Date.now()}`,
        label:       m.label       ?? existing?.label       ?? 'METRIC',
        value:       m.value       ?? existing?.value       ?? '0',
        subtext:     m.subtext     ?? existing?.subtext     ?? '',
        trend:       m.trend       ?? existing?.trend       ?? '',
        accentColor: m.accent_color ?? existing?.accentColor ?? '#3b82f6',
        trendColor:  m.trend_color  ?? existing?.trendColor  ?? '#3b82f6',
      };
    });
    store.reorderMetrics(newMetrics);
  } else if (data.monthly_snapshot) {
    // Fallback: update existing metrics from monthly_snapshot flat fields
    const ms = data.monthly_snapshot;
    const arr = ms.metrics ?? [
      { label: ms.metric1_label, value: ms.metric1_value, sublabel: ms.metric1_sublabel, trend: ms.metric1_trend },
      { label: ms.metric2_label, value: ms.metric2_value, sublabel: ms.metric2_sublabel, trend: ms.metric2_trend },
      { label: ms.metric3_label, value: ms.metric3_value, sublabel: ms.metric3_sublabel, trend: ms.metric3_trend },
      { label: ms.metric4_label, value: ms.metric4_value, sublabel: ms.metric4_sublabel, trend: ms.metric4_trend },
    ];
    const current = store.keyMetrics;
    arr.forEach((m, i) => {
      if (!m || !current[i]) return;
      const updates: Partial<MetricItem> = {};
      if (m.label)              updates.label   = String(m.label);
      if (m.value)              updates.value   = String(m.value);
      if ((m as any).sublabel)  updates.subtext = String((m as any).sublabel);
      if (m.trend)              updates.trend   = String(m.trend);
      if (Object.keys(updates).length) store.updateMetric(current[i].id, updates);
    });
  }

  // ── Business Impact ────────────────────────────────────────────────────────
  if (Array.isArray(data.business_impact) && data.business_impact.length) {
    const HEALTH_MAP: Record<string, BIHealth> = {
      'on track': 'On Track', 'ontrack': 'On Track',
      'in progress': 'In Progress', 'inprogress': 'In Progress',
      'at risk': 'At Risk',     'atrisk': 'At Risk',
      'completed': 'Completed', 'done': 'Completed',
      'delayed': 'Delayed',     'on hold': 'On Hold', 'onhold': 'On Hold',
    };
    const normaliseHealth = (raw: string | undefined): BIHealth =>
      HEALTH_MAP[(raw ?? '').toLowerCase().replace(/[-_]/g, ' ')] ?? 'In Progress';

    const current = store.businessImpactRows;
    data.business_impact.forEach((row, i) => {
      const updates: Partial<BIRow> = {};
      if (row.category)       updates.category      = row.category;
      if (row.programme_name) updates.programmeName = row.programme_name;
      if (row.health)         updates.health        = normaliseHealth(row.health);
      if (row.what_delivered) updates.whatDelivered = row.what_delivered;
      if (row.why_it_matters) updates.whyItMatters  = row.why_it_matters;
      if (current[i]) {
        store.updateBIRow(current[i].id, updates);
      } else {
        store.addBIRow();
        const fresh = store.businessImpactRows;
        if (fresh[fresh.length - 1]) store.updateBIRow(fresh[fresh.length - 1].id, updates);
      }
    });
  }

  // ── Top 3 Outcomes ─────────────────────────────────────────────────────────
  if (Array.isArray(data.top3_outcomes) && data.top3_outcomes.length) {
    const newItems = data.top3_outcomes.map((item, i) => ({
      id: `outcome-import-${i}-${Date.now()}`,
      number: item.outcome_number ?? String(i + 1).padStart(2, '0'),
      title: item.title ?? `Outcome ${i + 1}`,
      description: item.description ?? '',
      tag1: item.tag1 ?? 'VALUE CREATED',
      tag2: item.tag2 ?? 'PROGRAMME',
    }));
    store.setOutcomeItems(newItems);
  }

  // ── Production Support ─────────────────────────────────────────────────────
  if (data.production_support) {
    const ps = data.production_support;

    // Chart rows — upsert into store
    if (Array.isArray(ps.chart_data) && ps.chart_data.length) {
      const current = store.psData.rows;
      ps.chart_data.forEach((sys, i) => {
        const updates: any = {};
        if (sys.system_name)              updates.systemName = sys.system_name;
        if (sys.tickets_reported != null) updates.reported   = Number(sys.tickets_reported);
        if (sys.tickets_resolved != null) updates.resolved   = Number(sys.tickets_resolved);
        if (Object.keys(updates).length === 0) return;
        if (current[i]) {
          store.updatePSRow(current[i].id, updates);
        } else {
          store.addPSRow();
          const fresh = store.psData.rows;
          if (fresh[fresh.length - 1]) store.updatePSRow(fresh[fresh.length - 1].id, updates);
        }
      });
    }

    // Stats — from the nested stats object (new format) or flat fields (legacy JSON)
    const stats = ps.stats ?? ps as any;
    if (stats.resolution_note) store.setPSNote('resolutionNote', stats.resolution_note);
    if (stats.carried_note)    store.setPSNote('carriedNote',    stats.carried_note);
  }

  // ── Watch Items ────────────────────────────────────────────────────────────
  if (Array.isArray(data.watch_items) && data.watch_items.length) {
    const newItems = data.watch_items.map((item, i) => {
      const type = String(item.badge_type ?? '').toLowerCase();
      const preset =
        type === 'orange' ? WATCH_BADGE_PRESETS.inputNeeded :
        type === 'green' ? WATCH_BADGE_PRESETS.positiveSignal :
        WATCH_BADGE_PRESETS.watch;

      return {
        id: `watch-import-${i}-${Date.now()}`,
        title: item.title ?? `Watch Item ${i + 1}`,
        description: item.description ?? '',
        badgeLabel: item.badge_label ?? preset.badgeLabel,
        badgeBg: preset.badgeBg,
        badgeColor: preset.badgeColor,
      };
    });
    store.setWatchItems(newItems);
  }

  // ── Release Forecast ───────────────────────────────────────────────────────
  if (data.release_forecast) {
    const rf = data.release_forecast;
    const currentRows  = store.rfData.rows;
    const currentCards = store.rfData.cards;

    // Upcoming cards
    if (Array.isArray(rf.upcoming_cards)) {
      rf.upcoming_cards.forEach((card, i) => {
        const updates: any = {};
        if (card.card_title)       updates.title       = card.card_title;
        if (card.card_date)        updates.date        = card.card_date;
        if (card.card_description) updates.description = card.card_description;
        if (Object.keys(updates).length === 0) return;
        if (currentCards[i]) {
          store.updateRFCard(currentCards[i].id, updates);
        } else {
          store.addRFCard();
          const fresh = store.rfData.cards;
          if (fresh[fresh.length - 1]) store.updateRFCard(fresh[fresh.length - 1].id, updates);
        }
      });
    }

    // Table rows
    if (Array.isArray(rf.table)) {
      rf.table.forEach((row, i) => {
        const updates: any = {};
        if (row.project)           updates.project     = row.project;
        if (row.release_item)      updates.releaseItem = row.release_item;
        if (row.progress_pct != null) {
          updates.progress = Math.min(100, Math.max(0, Number(String(row.progress_pct).replace('%', ''))));
        }
        if (row.schedule)          updates.schedule    = row.schedule;
        if (row.status) {
          const rawStatus = String(row.status).toUpperCase()
            .replace(/^COMPLETE[D]?$/, 'CLOSED').replace(/^DONE$/, 'CLOSED')
            .replace(/^CLOSED?$/, 'CLOSED').replace(/^ON[- _]TRACK$/, 'ON TRACK')
            .replace(/^IN[- _]PROGRESS$/, 'AT RISK').replace(/^AT[- _]RISK$/, 'AT RISK');
          updates.status = rawStatus;
        }
        if (Object.keys(updates).length === 0) return;
        if (currentRows[i]) {
          store.updateRFRow(currentRows[i].id, updates);
        } else {
          store.addRFRow();
          const fresh = store.rfData.rows;
          if (fresh[fresh.length - 1]) store.updateRFRow(fresh[fresh.length - 1].id, updates);
        }
      });
    }
  }

  // ── Modernisation ──────────────────────────────────────────────────────────
  if (Array.isArray(data.modernisation) && data.modernisation.length) {
    const current = store.modernisationItems;
    data.modernisation.forEach((item, i) => {
      const updates: Partial<ModernisationItem> = {};
      if (item.initiative_name) updates.title       = item.initiative_name;
      if (item.description)     updates.description = item.description;
      if (item.status)          updates.statusLabel = String(item.status).toUpperCase();
      if (Object.keys(updates).length === 0) return;
      if (current[i]) {
        store.updateModernisationItem(current[i].id, updates);
      } else {
        store.addModernisationItem();
        const fresh = store.modernisationItems;
        if (fresh[fresh.length - 1]) store.updateModernisationItem(fresh[fresh.length - 1].id, updates);
      }
    });
  }

  // ── Portfolio ──────────────────────────────────────────────────────────────
  if (Array.isArray(data.portfolio) && data.portfolio.length) {
    const current = store.portfolioItems;
    data.portfolio.forEach((item, i) => {
      const updates: Partial<PortfolioItem> = {};
      if (item.programme_name) updates.name        = item.programme_name;
      if (item.category)       updates.category    = item.category;
      if (item.tagline)        updates.tagline     = item.tagline;
      if (item.description)    updates.description = item.description;
      if (item.tech_stack)     updates.techStack   = item.tech_stack;
      if (item.highlighted !== undefined) updates.highlighted = Boolean(item.highlighted);
      if (Object.keys(updates).length === 0) return;
      if (current[i]) {
        store.updatePortfolioItem(current[i].id, updates);
      } else {
        store.addPortfolioItem();
        const fresh = store.portfolioItems;
        if (fresh[fresh.length - 1]) store.updatePortfolioItem(fresh[fresh.length - 1].id, updates);
      }
    });
  }
}

interface TopBarProps {
  canvasRef: React.MutableRefObject<HTMLDivElement | null>;
}

type ExportFormat = 'pdf' | 'png' | 'jpg';
type AutoSaveState = 'idle' | 'saving' | 'saved';

const PIXEL_RATIO = 3;

// ── Time formatter ─────────────────────────────────────────────────────────────

function formatTimestamp(ts: number): string {
  const d = new Date(ts);
  const now = Date.now();
  const diffMs = now - ts;
  const diffMin = Math.floor(diffMs / 60_000);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ── Component ──────────────────────────────────────────────────────────────────

export function TopBar({ canvasRef }: TopBarProps) {
  const {
    zoom, setZoom, editMode, toggleEditMode, themeColors,
    saveManually, createVersion, resetAll, lastSavedAt,
    sections, coverData, psData, rfData, versions, activeVersionId,
  } = useNewsletterStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Local UI state ─────────────────────────────────────────────────────────
  const [exporting,          setExporting]          = useState(false);
  const [exportMsg,          setExportMsg]           = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showExportMenu,     setShowExportMenu]      = useState(false);
  const [showTemplateMenu,   setShowTemplateMenu]    = useState(false);
  const [pendingImport,      setPendingImport]       = useState<{ filename: string; data: ImportedData } | null>(null);
  const [showVersionPanel,   setShowVersionPanel]    = useState(false);
  const templateMenuRef = useRef<HTMLDivElement>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const templateButtonRef = useRef<HTMLButtonElement>(null);
  const exportButtonRef = useRef<HTMLButtonElement>(null);
  const firstTemplateItemRef = useRef<HTMLButtonElement>(null);
  const firstExportItemRef = useRef<HTMLButtonElement>(null);

  // ── Auto-save indicator ────────────────────────────────────────────────────
  const [autoSaveState,   setAutoSaveState]    = useState<AutoSaveState>('idle');
  const autoSaveTimers = useRef<{
    saving?:  ReturnType<typeof setTimeout>;
    done?:    ReturnType<typeof setTimeout>;
  }>({});

  useEffect(() => {
    // Subscribe to the store. We compare reference equality to avoid
    // expensive JSON.stringify on every render.
    const unsub = useNewsletterStore.subscribe((state, prev) => {
      const changed =
        state.sections    !== prev.sections    ||
        state.coverData   !== prev.coverData   ||
        state.footerData  !== prev.footerData  ||
        state.clientPartnersData !== prev.clientPartnersData ||
        state.monthlySnapshotData !== prev.monthlySnapshotData ||
        state.keyMetrics  !== prev.keyMetrics  ||
        state.businessImpactRows !== prev.businessImpactRows ||
        state.outcomeItems !== prev.outcomeItems ||
        state.watchItems !== prev.watchItems ||
        state.themeColors !== prev.themeColors ||
        state.psData      !== prev.psData      ||
        state.rfData      !== prev.rfData      ||
        state.modernisationItems !== prev.modernisationItems ||
        state.portfolioItems !== prev.portfolioItems ||
        state.sectionTextOverrides !== prev.sectionTextOverrides ||
        state.versions !== prev.versions ||
        state.activeVersionId !== prev.activeVersionId ||
        state.lastSavedAt !== prev.lastSavedAt ||
        state.zoom        !== prev.zoom;

      if (!changed) return;

      // Debounce: show "Saving…" briefly then "Saved"
      clearTimeout(autoSaveTimers.current.saving);
      clearTimeout(autoSaveTimers.current.done);

      setAutoSaveState('saving');

      autoSaveTimers.current.saving = setTimeout(() => {
        setAutoSaveState('saved');
        autoSaveTimers.current.done = setTimeout(() => {
          setAutoSaveState('idle');
        }, 2200);
      }, 700);
    });

    return () => {
      unsub();
      clearTimeout(autoSaveTimers.current.saving);
      clearTimeout(autoSaveTimers.current.done);
    };
  }, []);

  // ── Save button handler — now also creates a version checkpoint ───────────
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const saveMsgTimer = useRef<ReturnType<typeof setTimeout>>();

  const handleSave = useCallback(() => {
    const active = document.activeElement;
    if (active instanceof HTMLElement && active.isContentEditable) {
      active.blur();
      requestAnimationFrame(() => createVersion());
      return;
    }
    createVersion();   // snapshot + sets lastSavedAt internally
    // Visual feedback is triggered by the lastSavedAt useEffect below
  }, [createVersion]);

  // Show "Saved ✓" whenever lastSavedAt changes (covers both button click AND Ctrl+S)
  const prevLastSavedAtRef = useRef<number | null>(null);
  useEffect(() => {
    if (lastSavedAt && lastSavedAt !== prevLastSavedAtRef.current) {
      prevLastSavedAtRef.current = lastSavedAt;
      clearTimeout(saveMsgTimer.current);
      setSaveMsg('Saved successfully');
      saveMsgTimer.current = setTimeout(() => setSaveMsg(null), 3000);
    }
  }, [lastSavedAt]);

  // ── Reset with two-click confirmation ────────────────────────────────────
  const [resetPending, setResetPending] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>();

  const handleResetClick = useCallback(() => {
    if (!resetPending) {
      setResetPending(true);
      resetTimer.current = setTimeout(() => setResetPending(false), 3500);
    } else {
      clearTimeout(resetTimer.current);
      setResetPending(false);
      resetAll();
      showMsg('success', 'Reset to defaults — all data cleared.');
    }
  }, [resetPending, resetAll]);

  // ── Zoom ──────────────────────────────────────────────────────────────────
  const handleZoomIn  = () => setZoom(Math.min(zoom + 10, 150));
  const handleZoomOut = () => setZoom(Math.max(zoom - 10, 25));
  const ZOOM_PRESETS  = [25, 50, 65, 75, 100, 125, 150];

  // ── Message toast ─────────────────────────────────────────────────────────
  const showMsg = (type: 'success' | 'error', text: string) => {
    setExportMsg({ type, text });
    setTimeout(() => setExportMsg(null), 4500);
  };

  // ── Strip / restore selection ring before export ──────────────────────────
  const stripHighlights = (el: HTMLDivElement) => {
    const saved: Array<{ node: HTMLElement; outline: string; outlineOffset: string; borderRadius: string }> = [];
    el.querySelectorAll<HTMLElement>('[data-clickable-section="true"]').forEach((node) => {
      saved.push({ node, outline: node.style.outline, outlineOffset: node.style.outlineOffset, borderRadius: node.style.borderRadius });
      node.style.outline = 'none';
      node.style.outlineOffset = '';
      node.style.borderRadius = '';
    });
    return saved;
  };

  const restoreHighlights = (saved: ReturnType<typeof stripHighlights>) =>
    saved.forEach(({ node, outline, outlineOffset, borderRadius }) => {
      node.style.outline = outline;
      node.style.outlineOffset = outlineOffset;
      node.style.borderRadius = borderRadius;
    });

  // ── Export ────────────────────────────────────────────────────────────────
  const exportAs = async (format: ExportFormat) => {
    const el = canvasRef.current;
    if (!el) { showMsg('error', 'Canvas not ready. Please wait and try again.'); return; }

    setExporting(true);
    setShowExportMenu(false);
    const savedHighlights = stripHighlights(el);

    try {
      const { toPng, toJpeg } = await import('html-to-image');
      const naturalWidth  = el.scrollWidth;
      const naturalHeight = el.scrollHeight;

      const commonOptions = {
        pixelRatio: PIXEL_RATIO,
        width:  naturalWidth,
        height: naturalHeight,
        style: { transform: 'none', transformOrigin: 'top left', overflow: 'visible' },
        skipFonts: false,
      };

      if (format === 'png') {
        await toPng(el, commonOptions);
        const dataUrl = await toPng(el, commonOptions);
        triggerDownload(dataUrl, 'newsletter-studio.png');
        showMsg('success', 'Newsletter exported as PNG ✓');

      } else if (format === 'jpg') {
        await toJpeg(el, { ...commonOptions, quality: 0.95 });
        const dataUrl = await toJpeg(el, { ...commonOptions, quality: 0.95 });
        triggerDownload(dataUrl, 'newsletter-studio.jpg');
        showMsg('success', 'Newsletter exported as JPG ✓');

      } else if (format === 'pdf') {
        const { jsPDF } = await import('jspdf');
        await toPng(el, commonOptions);
        const dataUrl = await toPng(el, commonOptions);

        const pxToMm      = 25.4 / 96;
        const imgWidthMm  = naturalWidth  * pxToMm;
        const imgHeightMm = naturalHeight * pxToMm;
        const a4W = 210, a4H = 297;

        if (imgHeightMm <= a4H * 1.5) {
          const scaledH = (a4W * imgHeightMm) / imgWidthMm;
          const pdf     = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [a4W, scaledH] });
          pdf.addImage(dataUrl, 'PNG', 0, 0, a4W, scaledH);
          pdf.save('newsletter-studio.pdf');
        } else {
          const pdf     = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
          const scaledH = (a4W * imgHeightMm) / imgWidthMm;
          const pages   = Math.ceil(scaledH / a4H);
          for (let i = 0; i < pages; i++) {
            if (i > 0) pdf.addPage();
            pdf.addImage(dataUrl, 'PNG', 0, -(i * a4H), a4W, scaledH);
          }
          pdf.save('newsletter-studio.pdf');
        }
        showMsg('success', 'Newsletter exported as PDF ✓');
      }
    } catch (err) {
      console.error('Export error:', err);
      showMsg('error', 'Export failed — check the console for details.');
    } finally {
      restoreHighlights(savedHighlights);
      setExporting(false);
    }
  };

  const triggerDownload = (dataUrl: string, filename: string) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    a.click();
  };

  // ── File import ───────────────────────────────────────────────────────────
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (file.name.endsWith('.json')) {
        const json   = JSON.parse(await file.text());
        const parsed = parseJsonData(json);
        const count  = Object.keys(parsed).filter(k => k !== '_readme').length;
        if (!count) {
          showMsg('error', 'JSON structure not recognised — use "Download Template" to get the correct format.');
          if (fileInputRef.current) fileInputRef.current.value = '';
          return;
        }
        setPendingImport({ filename: file.name, data: parsed });

      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const { read, utils } = await import('xlsx');
        const wb     = read(await file.arrayBuffer());
        const parsed = parseExcelWorkbook(wb, utils);
        const count  = Object.keys(parsed).filter(k => k !== '_readme').length;
        if (!count) {
          showMsg('error', 'No recognised sheets found — use "Download Template" to get the correct format.');
          if (fileInputRef.current) fileInputRef.current.value = '';
          return;
        }
        setPendingImport({ filename: file.name, data: parsed });

      } else {
        showMsg('error', 'Unsupported file type. Use .json, .xlsx or .xls');
      }
    } catch (err) {
      console.error('Import error:', err);
      showMsg('error', 'Failed to parse file — check format and try again.');
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ── Confirm import — push data to ALL store fields ────────────────────────
  const confirmImport = () => {
    if (!pendingImport) return;
    const { data, filename } = pendingImport;
    const store = useNewsletterStore.getState();

    // 1. Set importedData (triggers DOM text replacement for static sections)
    store.setImportedData(data);

    // 2. Push structured data directly into Zustand for dynamic sections
    applyImportToStore(data, store);

    setPendingImport(null);
    const count = Object.keys(data).filter(k => k !== '_readme').length;
    showMsg('success', `${count} section${count !== 1 ? 's' : ''} updated from ${filename} 🎉`);
  };

  const cancelImport = () => setPendingImport(null);

  useEffect(() => {
    if (showTemplateMenu) {
      firstTemplateItemRef.current?.focus();
    }
  }, [showTemplateMenu]);

  useEffect(() => {
    if (showExportMenu) {
      firstExportItemRef.current?.focus();
    }
  }, [showExportMenu]);

  useEffect(() => {
    if (!showTemplateMenu && !showExportMenu) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (showTemplateMenu) {
        setShowTemplateMenu(false);
        templateButtonRef.current?.focus();
      }
      if (showExportMenu) {
        setShowExportMenu(false);
        exportButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showTemplateMenu, showExportMenu]);

  // ── Theme indicator ────────────────────────────────────────────────────────
  const isCustomTheme = (Object.keys(DEFAULT_THEME_COLORS) as Array<keyof typeof DEFAULT_THEME_COLORS>)
    .some(k => themeColors[k] !== DEFAULT_THEME_COLORS[k]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {pendingImport && (
        <ImportPreviewModal
          filename={pendingImport.filename}
          data={pendingImport.data}
          onConfirm={confirmImport}
          onCancel={cancelImport}
        />
      )}

      {showVersionPanel && <VersionPanel onClose={() => setShowVersionPanel(false)} />}

      <div style={{
        height: 52, backgroundColor: '#0f172a',
        display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: 8,
        borderBottom: '1px solid #1e293b',
        flexShrink: 0, fontFamily: 'Inter, sans-serif',
        position: 'relative', zIndex: 10,
      }}>
        {/* ── Logo ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 8, flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg, #f05a29, #c83030)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FileText size={14} color="white" />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#ffffff', lineHeight: 1 }}>Newsletter Studio</p>
            <p style={{ margin: 0, fontSize: 9, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Nth Degree × Saksoft</p>
          </div>
        </div>

        <div style={{ width: 1, height: 32, backgroundColor: '#1e293b', margin: '0 4px' }} />

        {/* ── Import Data ── */}
        <label
          title="Upload data (JSON or XLSX)"
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 6, border: '1px solid #334155', backgroundColor: '#1e293b', color: '#94a3b8', cursor: 'pointer', fontSize: 12, fontWeight: 500, transition: 'all 0.15s', flexShrink: 0 }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#263248'; e.currentTarget.style.color = '#e2e8f0'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#1e293b'; e.currentTarget.style.color = '#94a3b8'; }}
        >
          <Upload size={13} />
          <span>Import Data</span>
          <input ref={fileInputRef} type="file" accept=".json,.xlsx,.xls" style={{ display: 'none' }} onChange={handleFileUpload} />
        </label>

        {/* ── Download Template ── */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            ref={templateButtonRef}
            onClick={() => setShowTemplateMenu(!showTemplateMenu)}
            title="Download blank data template"
            aria-haspopup="menu"
            aria-expanded={showTemplateMenu}
            aria-controls="template-menu"
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 6, border: '1px solid #334155', backgroundColor: '#1e293b', color: '#94a3b8', cursor: 'pointer', fontSize: 12, fontWeight: 500, transition: 'all 0.15s', flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#263248'; e.currentTarget.style.color = '#e2e8f0'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#1e293b'; e.currentTarget.style.color = '#94a3b8'; }}
          >
            <FileText size={13} />
            <span>Download Template</span>
            <ChevronDown size={11} style={{ opacity: 0.7 }} />
          </button>

          {showTemplateMenu && (
            <>
              <div style={{ position: 'fixed', inset: 0, zIndex: 90 }} onClick={() => { setShowTemplateMenu(false); templateButtonRef.current?.focus(); }} />
              <div
                id="template-menu"
                ref={templateMenuRef}
                role="menu"
                aria-label="Download template format"
                style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: 8, boxShadow: '0 10px 30px rgba(0,0,0,0.5)', minWidth: 240, zIndex: 100, overflow: 'hidden' }}
              >
                <div style={{ padding: '8px 14px', borderBottom: '1px solid #334155', fontSize: 10, fontWeight: 700, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Choose Template Format
                </div>
                <button
                  ref={firstTemplateItemRef}
                  role="menuitem"
                  onClick={async () => { await downloadXLSXTemplate(); setShowTemplateMenu(false); templateButtonRef.current?.focus(); }}
                  style={{ width: '100%', textAlign: 'left', padding: '12px 14px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 12, borderBottom: '1px solid #263248' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#263248')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span style={{ fontSize: 22, lineHeight: 1, marginTop: 1 }}>📊</span>
                  <div>
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#e2e8f0' }}>Excel Template (.xlsx)</p>
                    <p style={{ margin: '2px 0 0', fontSize: 10, color: '#64748b', lineHeight: 1.4 }}>Multi-sheet workbook — one sheet per section.<br />Includes sample data + column guides.</p>
                  </div>
                </button>
                <button
                  role="menuitem"
                  onClick={() => { downloadJSONTemplate(); setShowTemplateMenu(false); templateButtonRef.current?.focus(); }}
                  style={{ width: '100%', textAlign: 'left', padding: '12px 14px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 12 }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#263248')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span style={{ fontSize: 22, lineHeight: 1, marginTop: 1 }}>🗂️</span>
                  <div>
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#e2e8f0' }}>JSON Template (.json)</p>
                    <p style={{ margin: '2px 0 0', fontSize: 10, color: '#64748b', lineHeight: 1.4 }}>Structured JSON with all fields pre-filled.<br />Best for developers or API-driven workflows.</p>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── Spacer ── */}
        <div style={{ flex: 1 }} />

        {/* ── Auto-save indicator ── */}
        {autoSaveState !== 'idle' && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '4px 8px', borderRadius: 6,
            backgroundColor: autoSaveState === 'saved' ? 'rgba(16,185,129,0.08)' : 'transparent',
            transition: 'background-color 0.3s',
            flexShrink: 0,
          }}>
            {autoSaveState === 'saving' ? (
              <>
                <div style={{
                  width: 10, height: 10,
                  border: '1.5px solid #475569', borderTopColor: '#94a3b8',
                  borderRadius: '50%', animation: 'spin 0.8s linear infinite',
                }} />
                <span style={{ fontSize: 10, color: '#64748b' }}>Saving…</span>
              </>
            ) : (
              <>
                <CheckCircle size={11} color="#10b981" />
                <span style={{ fontSize: 10, color: '#10b981' }}>Auto-saved</span>
              </>
            )}
          </div>
        )}

        {/* ── Last-saved timestamp ── */}
        {lastSavedAt && autoSaveState === 'idle' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            <Cloud size={11} color="#334155" />
            <span style={{ fontSize: 10, color: '#475569' }}>
              Saved {formatTimestamp(lastSavedAt)}
            </span>
          </div>
        )}

        {/* ── Manual Save button ── */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onClick={handleSave}
            title="Save now (Ctrl + S)"
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
              borderRadius: 6, border: '1px solid #334155',
              backgroundColor: saveMsg ? '#064e3b' : '#1e293b',
              borderColor:     saveMsg ? '#065f46' : '#334155',
              color:           saveMsg ? '#34d399' : '#94a3b8',
              cursor: 'pointer', fontSize: 12, fontWeight: 500,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              if (!saveMsg) {
                e.currentTarget.style.backgroundColor = '#263248';
                e.currentTarget.style.color = '#e2e8f0';
              }
            }}
            onMouseLeave={e => {
              if (!saveMsg) {
                e.currentTarget.style.backgroundColor = '#1e293b';
                e.currentTarget.style.color = '#94a3b8';
              }
            }}
          >
            <Save size={13} />
            <span>{saveMsg ? 'Saved ✓' : 'Save'}</span>
          </button>
        </div>

        {/* ── Reset to Default ── */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onClick={handleResetClick}
            title={resetPending ? 'Click again to confirm reset — ALL data will be cleared' : 'Reset to default template'}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
              borderRadius: 6,
              border:           `1px solid ${resetPending ? '#991b1b' : '#334155'}`,
              backgroundColor:  resetPending ? '#450a0a' : '#1e293b',
              color:            resetPending ? '#fca5a5' : '#94a3b8',
              cursor: 'pointer', fontSize: 12, fontWeight: 500,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              if (!resetPending) {
                e.currentTarget.style.backgroundColor = '#2d1515';
                e.currentTarget.style.borderColor = '#7f1d1d';
                e.currentTarget.style.color = '#f87171';
              }
            }}
            onMouseLeave={e => {
              if (!resetPending) {
                e.currentTarget.style.backgroundColor = '#1e293b';
                e.currentTarget.style.borderColor = '#334155';
                e.currentTarget.style.color = '#94a3b8';
              }
            }}
          >
            <RotateCcw size={13} />
            <span style={{ whiteSpace: 'nowrap' }}>
              {resetPending ? '⚠️ Confirm Reset' : 'Reset'}
            </span>
          </button>
        </div>

        <div style={{ width: 1, height: 32, backgroundColor: '#1e293b', margin: '0 2px' }} />

        {/* ── Version History button ── */}
        <button
          onClick={() => setShowVersionPanel(v => !v)}
          title="Version history"
          style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
            borderRadius: 6,
            border: showVersionPanel ? '1px solid #3b82f6' : '1px solid #334155',
            backgroundColor: showVersionPanel ? '#1d4ed8' : '#1e293b',
            color: showVersionPanel ? '#ffffff' : '#94a3b8',
            cursor: 'pointer', fontSize: 12, fontWeight: 500,
            transition: 'all 0.15s', flexShrink: 0, position: 'relative',
          }}
          onMouseEnter={e => { if (!showVersionPanel) { e.currentTarget.style.backgroundColor = '#263248'; e.currentTarget.style.color = '#e2e8f0'; } }}
          onMouseLeave={e => { if (!showVersionPanel) { e.currentTarget.style.backgroundColor = '#1e293b'; e.currentTarget.style.color = '#94a3b8'; } }}
        >
          <History size={13} />
          <span>History</span>
          {versions.length > 0 && (
            <span style={{
              fontSize: 9, fontWeight: 700,
              background: showVersionPanel ? 'rgba(255,255,255,0.2)' : '#334155',
              color: showVersionPanel ? 'white' : '#94a3b8',
              padding: '1px 5px', borderRadius: 99, minWidth: 16, textAlign: 'center',
            }}>
              {versions.length}
            </span>
          )}
        </button>

        <div style={{ width: 1, height: 32, backgroundColor: '#1e293b', margin: '0 2px' }} />

        {/* ── Active theme indicator ── */}
        {isCustomTheme && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '4px 10px', borderRadius: 6,
            backgroundColor: '#1e293b', border: '1px solid #334155',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 10, color: '#94a3b8' }}>Theme:</span>
            <div style={{ display: 'flex', gap: 3 }}>
              {(Object.values(themeColors) as string[]).map((c, i) => (
                <div key={i} style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: c }} />
              ))}
            </div>
          </div>
        )}

        {/* ── Export status toast ── */}
        {exportMsg && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 6,
            backgroundColor: exportMsg.type === 'success' ? '#064e3b' : '#7f1d1d',
            border: `1px solid ${exportMsg.type === 'success' ? '#065f46' : '#991b1b'}`,
            color: exportMsg.type === 'success' ? '#34d399' : '#fca5a5',
            fontSize: 11, flexShrink: 0,
          }}>
            {exportMsg.type === 'success' ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
            <span>{exportMsg.text}</span>
            <button onClick={() => setExportMsg(null)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, marginLeft: 2, display: 'flex' }}><X size={10} /></button>
          </div>
        )}

        {/* ── Edit / Preview toggle ── */}
        <button
          onClick={toggleEditMode}
          title={editMode ? 'Switch to preview mode' : 'Switch to edit mode'}
          style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 6,
            border: '1px solid', borderColor: editMode ? '#3b82f6' : '#334155',
            backgroundColor: editMode ? '#1d4ed8' : '#1e293b',
            color: editMode ? '#ffffff' : '#94a3b8',
            cursor: 'pointer', fontSize: 12, fontWeight: 500, transition: 'all 0.15s', flexShrink: 0,
          }}
        >
          {editMode ? <Edit3 size={13} /> : <Eye size={13} />}
          <span>{editMode ? 'Editing' : 'Preview'}</span>
        </button>

        {/* ── Zoom controls ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '4px 8px', borderRadius: 6, border: '1px solid #334155', backgroundColor: '#1e293b', flexShrink: 0 }}>
          <button onClick={handleZoomOut} title="Zoom out" style={{ padding: 4, borderRadius: 4, border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')} onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}>
            <ZoomOut size={14} />
          </button>
          <button
            onClick={() => { const next = ZOOM_PRESETS.find(p => p > zoom) ?? ZOOM_PRESETS[0]; setZoom(next); }}
            title="Click to cycle zoom presets"
            style={{ minWidth: 44, padding: '2px 4px', border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: 12, fontWeight: 600, textAlign: 'center' }}
          >
            {zoom}%
          </button>
          <button onClick={handleZoomIn} title="Zoom in" style={{ padding: 4, borderRadius: 4, border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')} onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}>
            <ZoomIn size={14} />
          </button>
        </div>

        {/* ── Export button + dropdown ── */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            ref={exportButtonRef}
            onClick={() => setShowExportMenu(!showExportMenu)}
            disabled={exporting}
            aria-haspopup="menu"
            aria-expanded={showExportMenu}
            aria-controls="export-menu"
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 6,
              border: 'none',
              background: exporting ? '#334155' : 'linear-gradient(135deg, #f05a29, #c83030)',
              color: '#ffffff', cursor: exporting ? 'not-allowed' : 'pointer',
              fontSize: 12, fontWeight: 700,
              boxShadow: exporting ? 'none' : '0 2px 8px rgba(240,90,41,0.35)',
              transition: 'all 0.15s',
            }}
          >
            {exporting ? (
              <>
                <div style={{ width: 13, height: 13, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                <span>Exporting…</span>
              </>
            ) : (
              <>
                <Download size={13} />
                <span>Export</span>
                <ChevronDown size={11} style={{ opacity: 0.7 }} />
              </>
            )}
          </button>

          {showExportMenu && !exporting && (
            <>
              <div style={{ position: 'fixed', inset: 0, zIndex: 90 }} onClick={() => { setShowExportMenu(false); exportButtonRef.current?.focus(); }} />
              <div
                id="export-menu"
                ref={exportMenuRef}
                role="menu"
                aria-label="Export format"
                style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: 8, boxShadow: '0 10px 30px rgba(0,0,0,0.5)', minWidth: 200, zIndex: 100, overflow: 'hidden' }}
              >
                <div style={{ padding: '8px 14px', borderBottom: '1px solid #334155', fontSize: 10, fontWeight: 700, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Export Format</div>
                {([
                  { format: 'pdf', label: 'PDF Document', icon: '📄', desc: 'A4, multi-page, print-ready' },
                  { format: 'png', label: 'PNG Image',    icon: '🖼️', desc: 'Lossless · ~300 DPI' },
                  { format: 'jpg', label: 'JPG Image',    icon: '📸', desc: 'Compressed · ~300 DPI' },
                ] as { format: ExportFormat; label: string; icon: string; desc: string }[]).map((opt, i, arr) => (
                  <button
                    key={opt.format}
                    ref={i === 0 ? firstExportItemRef : undefined}
                    role="menuitem"
                    onClick={() => exportAs(opt.format)}
                    style={{ width: '100%', textAlign: 'left', padding: '10px 14px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, borderBottom: i < arr.length - 1 ? '1px solid #263248' : 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#263248')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <span style={{ fontSize: 18, lineHeight: 1 }}>{opt.icon}</span>
                    <div>
                      <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#e2e8f0' }}>{opt.label}</p>
                      <p style={{ margin: 0, fontSize: 10, color: '#64748b' }}>{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
