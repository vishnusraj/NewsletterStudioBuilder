/**
 * dataMapper.ts
 *
 * Bridges imported Excel / JSON data → Newsletter canvas.
 *
 * SHEET PARSING CONTRACT (matches templateGenerator.ts):
 *  • Row 1 = column headers (field names) — always.
 *  • Row 2 = guide/description row — skipped by dataRows().
 *  • Row 3+ = real data rows.
 *  • Never place section-divider comment rows before the header row.
 *
 * How it works:
 * 1. parseExcelWorkbook / parseJsonData  →  ImportedData
 * 2. ImportedData is consumed in two ways:
 *    a. buildSectionReplacements() → DOM text swaps for static Figma clones
 *    b. applyImportToStore() in TopBar → direct Zustand state updates
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ImportedData {
  // ── NEW: top-level sections ───────────────────────────────────────────────
  cover?: {
    title_main?:   string; title_accent?: string; subtitle?:    string;
    date?:         string; edition?:      string; volume_label?:string;
    brand_left?:   string; brand_right?:  string;
    nav1?: string; nav2?: string; nav3?: string;
  };
  footer?: {
    copyright?: string; services?: string; date_line?: string;
  };
  key_metrics?: Array<{
    label?: string; value?: string; subtext?: string; trend?: string;
    accent_color?: string; trend_color?: string;
  }>;

  // ── Existing sections ─────────────────────────────────────────────────────
  client_partners?: {
    client_name?: string; client_badge?: string; client_description?: string;
    partner_name?: string; partner_badge?: string; partner_description?: string;
  };
  monthly_snapshot?: {
    period_label?: string; headline?: string; body_text?: string;
    metrics?: Array<{ label?: string; value?: string; sublabel?: string; trend?: string }>;
    metric1_label?: string; metric1_value?: string; metric1_sublabel?: string; metric1_trend?: string;
    metric2_label?: string; metric2_value?: string; metric2_sublabel?: string; metric2_trend?: string;
    metric3_label?: string; metric3_value?: string; metric3_sublabel?: string; metric3_trend?: string;
    metric4_label?: string; metric4_value?: string; metric4_sublabel?: string; metric4_trend?: string;
  };
  business_impact?: Array<{
    category?: string; programme_name?: string; health?: string;
    what_delivered?: string; why_it_matters?: string;
  }>;
  top3_outcomes?: Array<{
    outcome_number?: string; title?: string; description?: string; tag1?: string; tag2?: string;
  }>;
  production_support?: {
    chart_data?: Array<{ system_name?: string; tickets_reported?: number | string; tickets_resolved?: number | string }>;
    stats?: { resolution_note?: string; carried_note?: string; resolution_rate?: string; resolved_of_total?: string; carried_forward?: number | string };
    // flat variants (legacy JSON format)
    resolution_rate?: string; resolved_of_total?: string;
    resolution_note?: string; carried_forward?: number | string; carried_note?: string;
  };
  watch_items?: Array<{ watch_number?: number | string; title?: string; description?: string; badge_label?: string; badge_type?: string }>;
  release_forecast?: {
    upcoming_cards?: Array<{ card_title?: string; card_date?: string; card_description?: string }>;
    table?: Array<{ project?: string; release_item?: string; progress_pct?: number | string; schedule?: string; status?: string }>;
  };
  modernisation?: Array<{ initiative_name?: string; status?: string; description?: string; impact_tag?: string; target_quarter?: string }>;
  portfolio?: Array<{
    programme_name?: string; category?: string; tagline?: string;
    description?: string; tech_stack?: string; highlighted?: boolean | string;
    // legacy fields
    health?: string; phase?: string; team_size?: number | string; budget_status?: string; key_milestone?: string; risk_flag?: string;
  }>;
}

// ── Original text constants (Newsletter.tsx hard-coded values) ────────────────
// Used by buildSectionReplacements() for DOM text swaps in static Figma clones.

const O = {
  cp: {
    client_name:  ['NTH DEGREE'],
    client_badge: ['CLIENT ORGANISATION'],
    client_desc:  [
      'A leading global trade show management, event marketing, and experiential services company',
      'with nearly 50 years of history. Headquartered in Duluth, Georgia — with offices across North',
      'America, Europe, and Asia — Nth Degree specialises in exhibit installation, corporate events, and',
      'brand activations at flagship shows including CES and major global events.',
    ],
    partner_name:  ['SAKSOFT'],
    partner_badge: ['DELIVERY PARTNER'],
    partner_desc:  [
      'A global AI-led digital transformation partner delivering cloud-native engineering, data-driven',
      'platforms, and modernisation strategies. Saksoft serves as the strategic delivery partner across',
      'product development, platform transformation, and operations.',
    ],
  },
  ms: {
    period_label: ['MONTHLY SNAPSHOT — FEBRUARY 2026'],
    headline:     ['Three Programmes Delivered Material Outcomes. Two Strategic Bets Gaining Momentum.'],
  },
  t3: [
    {
      title:       ['Infrastructure Hardened — Zero Downtime', 'Migration'],
      description: ['On-Sight & Show-Sight migrated from legacy VM SQL to High', 'Availability SQL. Zero service disruption during active show', 'season.'],
      tag1:        ['RESILIENCE ↑'],
      tag2:        ['ON-SIGHT · SHOW-SIGHT'],
    },
    {
      title:       ['Payment Accuracy Up — Finance Rework Down'],
      description: ['OneView delivers improved order accuracy and refund visibility.', 'Finance teams reclaim hours; exhibitors experience a smoother', 'checkout.'],
      tag1:        ['REVENUE QUALITY ↑'],
      tag2:        ['ONEVIEW'],
    },
    {
      title:       ['Mobile Expense Workflow — Field Teams', 'Empowered'],
      description: ['Lead expense submissions via On-Sight mobile. Faster', 'reimbursements and reduced back-office burden for every field', 'lead.'],
      tag1:        ['OPS EFFICIENCY ↑'],
      tag2:        ['ON-SIGHT MOBILE'],
    },
  ],
  wi: [
    { title: ['OneView — Post-Migration Monitoring', 'Active'],             description: ['HA SQL confirmed stable. Any regression in payment pipeline must be', 'escalated immediately.'],              badge: ['WATCH'] },
    { title: ['FX-Exchange — OASIS Integration Scoping', 'Needed'],         description: ['Architecture decisions this month determine Q3 delivery confidence.', 'Product owner input required.'],        badge: ['INPUT NEEDED'] },
    { title: ['Onboarding — Positive Signal Worth', 'Scaling'],             description: ['Improvements reducing setup errors and back-office effort. Recommend', 'monthly velocity tracking.'],            badge: ['POSITIVE SIGNAL'] },
  ],
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function addField(map: Map<string, string>, originalLines: string[], newValue: string | undefined | null) {
  if (newValue === undefined || newValue === null || newValue === '') return;
  const joined = originalLines.join(' ');
  if (newValue === joined || newValue === originalLines[0]) return;
  map.set(originalLines[0], newValue);
  for (let i = 1; i < originalLines.length; i++) map.set(originalLines[i], '');
}

function s(v: any): string | undefined {
  if (v === null || v === undefined) return undefined;
  const t = String(v).trim();
  return t === '' ? undefined : t;
}

// ── Section replacement map builder (DOM text swaps) ─────────────────────────

export function buildSectionReplacements(sectionType: string, data: ImportedData): Map<string, string> {
  const map = new Map<string, string>();

  switch (sectionType) {
    case 'client-partners': {
      const cp = data.client_partners; if (!cp) break;
      addField(map, O.cp.client_name,  cp.client_name);
      addField(map, O.cp.client_badge, cp.client_badge);
      addField(map, O.cp.client_desc,  cp.client_description);
      addField(map, O.cp.partner_name,  cp.partner_name);
      addField(map, O.cp.partner_badge, cp.partner_badge);
      addField(map, O.cp.partner_desc,  cp.partner_description);
      break;
    }
    case 'monthly-snapshot': {
      const ms = data.monthly_snapshot; if (!ms) break;
      addField(map, O.ms.period_label, ms.period_label);
      addField(map, O.ms.headline,     ms.headline);
      break;
    }
    case 'top3-outcomes': {
      const outcomes = data.top3_outcomes; if (!outcomes?.length) break;
      outcomes.forEach((o, i) => {
        const orig = O.t3[i]; if (!orig) return;
        addField(map, orig.title,       o.title);
        addField(map, orig.description, o.description);
        addField(map, orig.tag1,        o.tag1);
        addField(map, orig.tag2,        o.tag2);
      });
      break;
    }
    case 'watch-items': {
      const items = data.watch_items; if (!items?.length) break;
      items.forEach((item, i) => {
        const orig = O.wi[i]; if (!orig) return;
        addField(map, orig.title,       item.title);
        addField(map, orig.description, item.description);
        addField(map, orig.badge,       item.badge_label);
      });
      break;
    }
    default: break;
  }

  return map;
}

// ── DOM applier ───────────────────────────────────────────────────────────────

export function applyTextReplacements(el: HTMLElement, replacements: Map<string, string>): void {
  if (!replacements.size) return;
  el.querySelectorAll('p').forEach((p) => {
    const text = (p.textContent ?? '').trim();
    if (replacements.has(text)) p.textContent = replacements.get(text)!;
  });
}

// ── Excel parser ──────────────────────────────────────────────────────────────

export function parseExcelWorkbook(wb: any, utils: any): ImportedData {
  const { sheet_to_json } = utils;

  /** Get all rows from a sheet as objects (keyed by row-1 headers). */
  const getSheet = (name: string): Record<string, any>[] =>
    wb.SheetNames.includes(name)
      ? (sheet_to_json(wb.Sheets[name], { defval: '' }) as Record<string, any>[])
      : [];

  /**
   * Skip row index 0 (guide row, immediately after the header row).
   * Filter out completely empty rows.
   */
  const dataRows = (rows: Record<string, any>[]): Record<string, any>[] =>
    rows.slice(1).filter(r => Object.values(r).some(v => String(v).trim() !== ''));

  const result: ImportedData = {};

  // ── Cover ─────────────────────────────────────────────────────────────────
  const coverRows = dataRows(getSheet('Cover'));
  if (coverRows.length) {
    const r = coverRows[0];
    result.cover = {
      title_main:   s(r.title_main),
      title_accent: s(r.title_accent),
      subtitle:     s(r.subtitle),
      date:         s(r.date),
      edition:      s(r.edition),
      volume_label: s(r.volume_label),
      brand_left:   s(r.brand_left),
      brand_right:  s(r.brand_right),
      nav1:         s(r.nav1),
      nav2:         s(r.nav2),
      nav3:         s(r.nav3),
    };
  }

  // ── Footer ────────────────────────────────────────────────────────────────
  const footerRows = dataRows(getSheet('Footer'));
  if (footerRows.length) {
    const r = footerRows[0];
    result.footer = {
      copyright: s(r.copyright),
      services:  s(r.services),
      date_line: s(r.date_line),
    };
  }

  // ── Key Metrics ───────────────────────────────────────────────────────────
  const kmRows = dataRows(getSheet('Key_Metrics'));
  if (kmRows.length) {
    result.key_metrics = kmRows.map(r => ({
      label:       s(r.label),
      value:       s(r.value),
      subtext:     s(r.subtext),
      trend:       s(r.trend),
      accent_color: s(r.accent_color),
      trend_color:  s(r.trend_color),
    }));
  }

  // ── Client Partners ───────────────────────────────────────────────────────
  const cpRows = dataRows(getSheet('Client_Partners'));
  if (cpRows.length) {
    const r = cpRows[0];
    result.client_partners = {
      client_name:         s(r.client_name),
      client_badge:        s(r.client_badge),
      client_description:  s(r.client_description),
      partner_name:        s(r.partner_name),
      partner_badge:       s(r.partner_badge),
      partner_description: s(r.partner_description),
    };
  }

  // ── Monthly Snapshot ──────────────────────────────────────────────────────
  const msRows = dataRows(getSheet('Monthly_Snapshot'));
  if (msRows.length) {
    const r = msRows[0];
    result.monthly_snapshot = {
      period_label:     s(r.period_label),
      headline:         s(r.headline),
      body_text:        s(r.body_text),
      // flat metric fields (legacy support)
      metric1_label:    s(r.metric1_label),   metric1_value:    s(r.metric1_value),
      metric1_sublabel: s(r.metric1_sublabel), metric1_trend:   s(r.metric1_trend),
      metric2_label:    s(r.metric2_label),   metric2_value:    s(r.metric2_value),
      metric2_sublabel: s(r.metric2_sublabel), metric2_trend:   s(r.metric2_trend),
      metric3_label:    s(r.metric3_label),   metric3_value:    s(r.metric3_value),
      metric3_sublabel: s(r.metric3_sublabel), metric3_trend:   s(r.metric3_trend),
      metric4_label:    s(r.metric4_label),   metric4_value:    s(r.metric4_value),
      metric4_sublabel: s(r.metric4_sublabel), metric4_trend:   s(r.metric4_trend),
    };
  }

  // ── Business Impact ───────────────────────────────────────────────────────
  const biRows = dataRows(getSheet('Business_Impact'));
  if (biRows.length) {
    result.business_impact = biRows.map(r => ({
      category:       s(r.category),
      programme_name: s(r.programme_name),
      health:         s(r.health),
      what_delivered: s(r.what_delivered),
      why_it_matters: s(r.why_it_matters),
    }));
  }

  // ── Top 3 Outcomes ────────────────────────────────────────────────────────
  const t3Rows = dataRows(getSheet('Top3_Outcomes'));
  if (t3Rows.length) {
    result.top3_outcomes = t3Rows.map(r => ({
      outcome_number: s(r.outcome_number),
      title:          s(r.title),
      description:    s(r.description),
      tag1:           s(r.tag1),
      tag2:           s(r.tag2),
    }));
  }

  // ── Production Support ────────────────────────────────────────────────────
  //
  // NEW format (row 1 = headers, row 2 = guide, rows 3+ = data):
  //   columns: system_name | tickets_reported | tickets_resolved | resolution_note | carried_note
  //
  // Chart rows: system_name is non-empty
  // Stats row:  system_name is empty, resolution_note or carried_note is non-empty
  //
  const psAllRows = dataRows(getSheet('Production_Support'));
  if (psAllRows.length) {
    const psChartRows = psAllRows.filter(r => s(r.system_name) != null);
    const psStatRow   = psAllRows.find(r =>
      !s(r.system_name) && (s(r.resolution_note) != null || s(r.carried_note) != null)
    );

    if (psChartRows.length || psStatRow) {
      result.production_support = {};
      if (psChartRows.length) {
        result.production_support.chart_data = psChartRows.map(r => ({
          system_name:      s(r.system_name),
          tickets_reported: s(r.tickets_reported),
          tickets_resolved: s(r.tickets_resolved),
        }));
      }
      if (psStatRow) {
        result.production_support.stats = {
          resolution_note:   s(psStatRow.resolution_note),
          carried_note:      s(psStatRow.carried_note),
          resolution_rate:   s(psStatRow.resolution_rate),
          resolved_of_total: s(psStatRow.resolved_of_total),
          carried_forward:   s(psStatRow.carried_forward),
        };
      }
    }
  }

  // ── Watch Items ───────────────────────────────────────────────────────────
  const wiRows = dataRows(getSheet('Watch_Items'));
  if (wiRows.length) {
    result.watch_items = wiRows.map(r => ({
      watch_number: s(r.watch_number),
      title:        s(r.title),
      description:  s(r.description),
      badge_label:  s(r.badge_label),
      badge_type:   s(r.badge_type),
    }));
  }

  // ── Release Forecast ──────────────────────────────────────────────────────
  //
  // NEW COMBINED format (row 1 = headers, row 2 = guide, rows 3+ = data):
  //   All 8 columns present in every row.
  //   Card rows:  card_title is non-empty  (project / release_item etc. are blank)
  //   Table rows: project is non-empty     (card_title / card_date etc. are blank)
  //
  const rfAllRows = dataRows(getSheet('Release_Forecast'));
  if (rfAllRows.length) {
    const rfCardRows  = rfAllRows.filter(r => s(r.card_title) != null);
    const rfTableRows = rfAllRows.filter(r => s(r.project)    != null);

    if (rfCardRows.length || rfTableRows.length) {
      result.release_forecast = {};
      if (rfCardRows.length) {
        result.release_forecast.upcoming_cards = rfCardRows.map(r => ({
          card_title:       s(r.card_title),
          card_date:        s(r.card_date),
          card_description: s(r.card_description),
        }));
      }
      if (rfTableRows.length) {
        result.release_forecast.table = rfTableRows.map(r => ({
          project:      s(r.project),
          release_item: s(r.release_item),
          progress_pct: s(r.progress_pct),
          schedule:     s(r.schedule),
          status:       s(r.status),
        }));
      }
    }
  }

  // ── Modernisation ─────────────────────────────────────────────────────────
  const modRows = dataRows(getSheet('Modernisation'));
  if (modRows.length) {
    result.modernisation = modRows.map(r => ({
      initiative_name: s(r.initiative_name),
      status:          s(r.status),
      description:     s(r.description),
      impact_tag:      s(r.impact_tag),
      target_quarter:  s(r.target_quarter),
    }));
  }

  // ── Portfolio ─────────────────────────────────────────────────────────────
  const portRows = dataRows(getSheet('Portfolio'));
  if (portRows.length) {
    result.portfolio = portRows.map(r => ({
      programme_name: s(r.programme_name),
      category:       s(r.category),
      tagline:        s(r.tagline),
      description:    s(r.description),
      tech_stack:     s(r.tech_stack),
      highlighted:    s(r.highlighted) != null
        ? String(r.highlighted).trim().toUpperCase() === 'TRUE'
        : undefined as any,
      health:         s(r.health),
      phase:          s(r.phase),
      budget_status:  s(r.budget_status),
      key_milestone:  s(r.key_milestone),
      risk_flag:      s(r.risk_flag),
    }));
  }

  return result;
}

// ── JSON parser ───────────────────────────────────────────────────────────────

export function parseJsonData(json: any): ImportedData {
  if (!json || typeof json !== 'object') return {};

  const knownKeys = [
    'cover', 'footer', 'key_metrics',
    'client_partners', 'monthly_snapshot', 'business_impact',
    'top3_outcomes', 'production_support', 'watch_items',
    'release_forecast', 'modernisation', 'portfolio',
  ];

  // Full or partial template format
  if (knownKeys.some(k => k in json)) return json as ImportedData;

  // Flat array — auto-detect section from field names
  if (Array.isArray(json) && json.length > 0) {
    const first = json[0];
    if (first?.programme_name !== undefined && first?.health !== undefined) return { business_impact: json };
    if (first?.outcome_number !== undefined)                                  return { top3_outcomes: json };
    if (first?.watch_number !== undefined || first?.badge_label !== undefined) return { watch_items: json };
    if (first?.card_title !== undefined)                                       return { release_forecast: { upcoming_cards: json } };
    if (first?.label !== undefined && first?.value !== undefined)              return { key_metrics: json };
    if (first?.initiative_name !== undefined)                                  return { modernisation: json };
    if (first?.programme_name !== undefined)                                   return { portfolio: json };
  }

  return {};
}
