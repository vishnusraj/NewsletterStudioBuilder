/**
 * Newsletter Studio — Data Template Generator
 *
 * Generates a multi-sheet XLSX workbook (and a matching JSON object)
 * covering every editable field in all newsletter sections.
 *
 * ⚠️ PARSING CONTRACT — read before changing sheet structure:
 *  • Row 1 of every sheet MUST be the column-header row (field names).
 *  • Row 2 is a human-readable guide row; the parser skips it with dataRows().
 *  • Row 3+ are data rows.
 *  • Do NOT put section-divider comment rows before the header row —
 *    SheetJS treats the first row as column names, which would break parsing.
 */

// ── helpers ────────────────────────────────────────────────────────────────────

type XlsxModule = typeof import('xlsx');
type WorkSheet = import('xlsx').WorkSheet;

interface ColDef {
  field:   string;   // Column header (= field name used by the parser)
  sample:  string;   // Prefilled sample value
  guide?:  string;   // Row 2 = human-readable description
}

function makeSheet(xlsx: XlsxModule, cols: ColDef[]): WorkSheet {
  const headers = cols.map(c => c.field);
  const guide   = cols.map(c => c.guide ?? '');
  const sample  = cols.map(c => c.sample);

  const ws = xlsx.utils.aoa_to_sheet([headers, guide, sample]);
  ws['!cols'] = cols.map(c =>
    ({ wch: Math.max(c.field.length, c.sample.length, (c.guide ?? '').length, 18) + 2 })
  );
  return ws;
}

/** Build a sheet with a header row, guide row, and multiple pre-filled data rows. */
function makeMultiRowSheet(xlsx: XlsxModule, cols: ColDef[], dataRows: string[][]): WorkSheet {
  const headers = cols.map(c => c.field);
  const guide   = cols.map(c => c.guide ?? '');
  const ws = xlsx.utils.aoa_to_sheet([headers, guide, ...dataRows]);
  ws['!cols'] = cols.map((c, i) => ({
    wch: Math.max(c.field.length, (c.guide ?? '').length, ...dataRows.map(r => (r[i] ?? '').length), 18) + 2,
  }));
  return ws;
}

// ── HOW TO USE sheet ──────────────────────────────────────────────────────────

function sheetHowToUse(xlsx: XlsxModule): WorkSheet {
  const rows = [
    ['Newsletter Studio — Data Import Template'],
    [''],
    ['HOW TO USE THIS FILE'],
    ['1. Fill in each sheet — each sheet maps to one newsletter section.'],
    ['2. Do NOT rename the sheets or column headers (row 1).'],
    ['3. Row 2 is a guide/description row — you can leave or delete it.'],
    ['4. Row 3+ are data rows — replace sample content with your real data.'],
    ['5. Save as .xlsx and use "Import Data" in Newsletter Studio.'],
    [''],
    ['SHEET INDEX'],
    ['Sheet',              'Newsletter Section'],
    ['Cover',              'Cover page — title, date, brand labels'],
    ['Footer',             'Footer — copyright, services, date line'],
    ['Key_Metrics',        'Key Metric cards (one row per card)'],
    ['Client_Partners',    'Client & Partners cards'],
    ['Monthly_Snapshot',   'Monthly Snapshot — headline'],
    ['Business_Impact',    'Business Impact table rows'],
    ['Top3_Outcomes',      'Top 3 Outcomes cards'],
    ['Production_Support', 'Production Support bar chart + stats'],
    ['Watch_Items',        'Strategic Watch Items'],
    ['Release_Forecast',   'Release Forecast cards + table (combined)'],
    ['Modernisation',      'Modernisation & Innovation cards'],
    ['Portfolio',          'Portfolio At A Glance cards'],
  ];
  const ws = xlsx.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{ wch: 22 }, { wch: 70 }];
  return ws;
}

// ── NEW: Cover sheet ──────────────────────────────────────────────────────────

function sheetCover(xlsx: XlsxModule): WorkSheet {
  return makeSheet(xlsx, [
    { field: 'title_main',    sample: 'FEBRUARY',                                        guide: 'Large title — first word/line (e.g. FEBRUARY)' },
    { field: 'title_accent',  sample: '2026',                                            guide: 'Accent part of the title — shown in orange (e.g. 2026)' },
    { field: 'subtitle',      sample: 'Technology · Product · Transformation — Edition 01', guide: 'Subtitle line below the main title' },
    { field: 'date',          sample: '07 Feb 2026',                                     guide: 'Date shown top-right (e.g. 07 Feb 2026)' },
    { field: 'edition',       sample: 'VOL 01 . EDITION 01',                             guide: 'Edition label (e.g. VOL 01 . EDITION 01)' },
    { field: 'volume_label',  sample: 'DEVELOPMENT NEWSLETTER . VOL 01 . EDITION 01',   guide: 'Full volume label in the header band' },
    { field: 'brand_left',    sample: 'NTH DEGREE',                                     guide: 'Left brand name in the top header' },
    { field: 'brand_right',   sample: 'SAKSOFT',                                        guide: 'Right brand name in the top header' },
    { field: 'nav1',          sample: 'CONSULTING',                                     guide: 'First nav pill label' },
    { field: 'nav2',          sample: 'DEVELOPMENT',                                    guide: 'Second nav pill label' },
    { field: 'nav3',          sample: 'TRANSFORMATION',                                 guide: 'Third nav pill label' },
  ]);
}

// ── NEW: Footer sheet ─────────────────────────────────────────────────────────

function sheetFooter(xlsx: XlsxModule): WorkSheet {
  return makeSheet(xlsx, [
    { field: 'copyright',  sample: '© 2026 Nth Degree × Saksoft · Development Newsletter · VOL 01 · EDITION 01', guide: 'Copyright line (left side of footer)' },
    { field: 'services',   sample: 'Consulting · Development · Transformation',                                   guide: 'Services line (centre of footer)' },
    { field: 'date_line',  sample: '07 Feb 2026 · Confidential',                                                  guide: 'Date/confidentiality line (right side of footer)' },
  ]);
}

// ── NEW: Key Metrics sheet ────────────────────────────────────────────────────

function sheetKeyMetrics(xlsx: XlsxModule): WorkSheet {
  return makeMultiRowSheet(
    xlsx,
    [
      { field: 'label',       guide: 'Small uppercase label at top of card (e.g. PROGRAMMES ON TRACK)' },
      { field: 'value',       guide: 'Large bold value in the centre (e.g. 7 / 9 or 42%)' },
      { field: 'subtext',     guide: 'Smaller secondary line (e.g. Active this month)' },
      { field: 'trend',       guide: 'Trend indicator at bottom — use ↑ ↓ → prefix (e.g. ↑ 78% delivery confidence)' },
      { field: 'accent_color',guide: 'Top border colour as HEX (e.g. #006b5f). Leave blank to keep existing.' },
      { field: 'trend_color', guide: 'Trend text colour as HEX (e.g. #006b5f). Leave blank to keep existing.' },
    ],
    [
      ['PROGRAMMES ON TRACK',   '7 / 9',   'Active this month',       '↑ 78% delivery confidence', '#006b5f', '#006b5f'],
      ['PROD TICKETS RESOLVED', '20 / 26', '77% fix rate',            '↑ All P1 issues closed',    '#f05a29', '#006b5f'],
      ['TECH FOUNDATION WINS',  '2',       'Major upgrades complete',  '↑ .NET Core + Flutter done','#1a2b3c', '#006b5f'],
      ['STRATEGIC WATCH ITEMS', '3',       'Require attention',        '→ See Section 3',           '#c83030', '#ea580c'],
    ]
  );
}

// ── Client Partners ───────────────────────────────────────────────────────────

function sheetClientPartners(xlsx: XlsxModule): WorkSheet {
  return makeSheet(xlsx, [
    { field: 'client_name',         sample: 'NTH DEGREE',           guide: 'Heading on the left card (client organisation)' },
    { field: 'client_badge',        sample: 'CLIENT ORGANISATION',  guide: 'Small badge label below the name' },
    { field: 'client_description',  sample: 'A leading global trade show management, event marketing, and experiential services company with nearly 50 years of history.', guide: 'Body paragraph — 2–4 sentences' },
    { field: 'partner_name',        sample: 'SAKSOFT',              guide: 'Heading on the right card (delivery partner)' },
    { field: 'partner_badge',       sample: 'DELIVERY PARTNER',     guide: 'Small badge label below the name' },
    { field: 'partner_description', sample: 'A global AI-led digital transformation partner delivering cloud-native engineering, data-driven platforms, and modernisation strategies.', guide: 'Body paragraph — 2–4 sentences' },
  ]);
}

// ── Monthly Snapshot ──────────────────────────────────────────────────────────

function sheetMonthlySnapshot(xlsx: XlsxModule): WorkSheet {
  return makeSheet(xlsx, [
    { field: 'period_label', sample: 'MONTHLY SNAPSHOT — FEBRUARY 2026',  guide: 'Small eyebrow text (e.g. MONTHLY SNAPSHOT — MARCH 2026)' },
    { field: 'headline',     sample: 'Three Programmes Delivered Material Outcomes. Two Strategic Bets Gaining Momentum.', guide: 'Bold headline sentence(s)' },
    { field: 'body_text',    sample: 'Platform reliability was hardened with zero operational disruption, payment accuracy improved reducing finance rework, and field-lead mobile workflows simplified.', guide: 'Narrative summary — 2–3 sentences' },
  ]);
}

// ── Business Impact ───────────────────────────────────────────────────────────

function sheetBusinessImpact(xlsx: XlsxModule): WorkSheet {
  return makeMultiRowSheet(
    xlsx,
    [
      { field: 'category',       guide: 'Programme category grouping (e.g. Revenue Programmes / Operational Programmes / Product Modernisation)' },
      { field: 'programme_name', guide: 'Name of the specific programme or application' },
      { field: 'health',         guide: 'Status: On Track | In Progress | At Risk | Completed | Delayed | On Hold' },
      { field: 'what_delivered', guide: 'Short delivery summary — 1–2 sentences' },
      { field: 'why_it_matters', guide: 'Business impact statement — 1–2 sentences' },
    ],
    [
      ['Revenue Programmes',     'OneView Application', 'On Track',    'Redesigned shopping UI; streamlined end-to-end payment workflow',       'Fewer abandoned transactions. Finance teams reclaim hours from corrections.'],
      ['Operational Programmes', 'On-Sight Platform',   'On Track',    'Introduced Microsoft SSO; eliminated AD authentication failures',        'Zero-friction field access at live shows. Login disruptions eliminated.'],
      ['Product Modernisation',  'FX-Exchange 3.0',     'In Progress', 'Redesigning UI/UX; aligning to cloud-native architecture',               'Positions FX-Exchange for deeper OASIS integration and future volume scaling.'],
    ]
  );
}

// ── Top 3 Outcomes ────────────────────────────────────────────────────────────

function sheetTop3Outcomes(xlsx: XlsxModule): WorkSheet {
  return makeMultiRowSheet(
    xlsx,
    [
      { field: 'outcome_number', guide: 'Card number — 01 / 02 / 03' },
      { field: 'title',          guide: 'Bold headline on the outcome card' },
      { field: 'description',    guide: 'Body text — 2–3 sentences' },
      { field: 'tag1',           guide: 'First badge tag (short, uppercase)' },
      { field: 'tag2',           guide: 'Second badge tag (system name or domain)' },
    ],
    [
      ['01', 'Infrastructure Hardened — Zero Downtime Migration',  'On-Sight & Show-Sight migrated from legacy VM SQL to High Availability SQL. Zero service disruption during active show season.',    'RESILIENCE ↑',      'ON-SIGHT · SHOW-SIGHT'],
      ['02', 'Payment Accuracy Up — Finance Rework Down',          'OneView delivers improved order accuracy and refund visibility. Finance teams reclaim hours; exhibitors experience a smoother checkout.', 'REVENUE QUALITY ↑', 'ONEVIEW'],
      ['03', 'Mobile Expense Workflow — Field Teams Empowered',    'Lead expense submissions via On-Sight mobile. Faster reimbursements and reduced back-office burden for every field lead.',            'OPS EFFICIENCY ↑',  'ON-SIGHT MOBILE'],
    ]
  );
}

// ── Production Support ────────────────────────────────────────────────────────
//
// PARSING CONTRACT:
//   Row 1 = headers (system_name | tickets_reported | tickets_resolved | resolution_note | carried_note)
//   Row 2 = guide row (skipped)
//   Rows 3-N = chart data rows  (fill first 3 cols; leave resolution_note & carried_note blank)
//   Last row  = stats summary   (leave system_name blank; fill resolution_note & carried_note)
//
// Parser identifies chart rows by: system_name is non-empty
// Parser identifies stats row by:  resolution_note or carried_note is non-empty (system_name blank)

function sheetProductionSupport(xlsx: XlsxModule): WorkSheet {
  return makeMultiRowSheet(
    xlsx,
    [
      { field: 'system_name',      guide: 'System / application name shown under each bar (e.g. On-Sight). Leave blank in the stats row.' },
      { field: 'tickets_reported', guide: 'Tickets reported this month (number). Leave blank in the stats row.' },
      { field: 'tickets_resolved', guide: 'Tickets resolved this month (number). Leave blank in the stats row.' },
      { field: 'resolution_note',  guide: 'Short note for the resolution card (e.g. All P1/P2 Issues Closed). Fill ONLY in the stats row (last row).' },
      { field: 'carried_note',     guide: 'Short note for carried-forward card (e.g. No critical items outstanding). Fill ONLY in the stats row.' },
    ],
    [
      // Chart data rows — leave stat columns blank
      ['On-Sight',   '8', '7', '', ''],
      ['Show-Sight', '4', '4', '', ''],
      ['OneView',    '5', '3', '', ''],
      ['Middleware',  '3', '2', '', ''],
      // Stats row — leave system_name and ticket columns blank
      ['', '', '', 'All P1/P2 Issues Closed', 'No critical items outstanding'],
    ]
  );
}

// ── Watch Items ───────────────────────────────────────────────────────────────

function sheetWatchItems(xlsx: XlsxModule): WorkSheet {
  return makeMultiRowSheet(
    xlsx,
    [
      { field: 'watch_number', guide: '1 / 2 / 3' },
      { field: 'title',        guide: 'Bold heading on the card' },
      { field: 'description',  guide: 'Body text — 1–2 sentences' },
      { field: 'badge_label',  guide: 'Badge text: WATCH | INPUT NEEDED | POSITIVE SIGNAL (or custom)' },
      { field: 'badge_type',   guide: 'Badge colour: red | orange | green' },
    ],
    [
      ['1', 'OneView — Post-Migration Monitoring Active',       'HA SQL confirmed stable. Any regression in payment pipeline must be escalated immediately.',             'WATCH',           'red'],
      ['2', 'FX-Exchange — OASIS Integration Scoping Needed',  'Architecture decisions this month determine Q3 delivery confidence. Product owner input required.',       'INPUT NEEDED',    'orange'],
      ['3', 'Onboarding — Positive Signal Worth Scaling',       'Improvements reducing setup errors and back-office effort. Recommend monthly velocity tracking.',         'POSITIVE SIGNAL', 'green'],
    ]
  );
}

// ── Release Forecast ──────────────────────────────────────────────────────────
//
// PARSING CONTRACT — COMBINED SHEET:
//   Row 1 = headers (all columns for BOTH cards and table rows)
//   Row 2 = guide row (skipped)
//   A row is a CARD row if card_title is non-empty.
//   A row is a TABLE row if project is non-empty.
//   Fill only the relevant columns for each row type; leave others blank.

function sheetReleaseForecast(xlsx: XlsxModule): WorkSheet {
  return makeMultiRowSheet(
    xlsx,
    [
      // Card columns
      { field: 'card_title',       guide: 'Upcoming release card title (e.g. Show-Sight Mobile V2.0.0). Fill for card rows; leave blank for table rows.' },
      { field: 'card_date',        guide: 'Month/quarter (e.g. MAR 2026). Card rows only.' },
      { field: 'card_description', guide: 'Short description of the release. Card rows only.' },
      // Table columns
      { field: 'project',          guide: 'Project / system name (e.g. On-Sight). Fill for table rows; leave blank for card rows.' },
      { field: 'release_item',     guide: 'Feature or release item name. Table rows only.' },
      { field: 'progress_pct',     guide: 'Completion % (0–100). Table rows only.' },
      { field: 'schedule',         guide: 'Release label (e.g. Releasing Mar 2026). Table rows only.' },
      { field: 'status',           guide: 'ON TRACK | AT RISK | DELAYED | NEW | CLOSED. Table rows only.' },
    ],
    [
      // Card rows — leave project, release_item, progress_pct, schedule, status blank
      ['Show-Sight Mobile V2.0.0',         'MAR 2026', 'Upgraded Job Search, show-specific photo categories, Evaluation submissions, and Safety Meeting Topics.', '', '', '', '', ''],
      ['Fern Onboarding Self-Registration', 'MAR 2026', 'Eliminates manual onboarding bottlenecks. Self-registration with optimised approval flow.',               '', '', '', '', ''],
      // Table rows — leave card_title, card_date, card_description blank
      ['', '', '', 'On-Sight',   'Lead Travel Expense App',            '100', 'Releasing Mar 2026', 'ON TRACK'],
      ['', '', '', 'On-Sight',   'Fern Onboarding Phase 2',            '75',  'Mar — Apr 2026',     'ON TRACK'],
      ['', '', '', 'Show-Sight', 'Job Photos, Eval & Safety Meeting',   '90',  'Releasing Mar 2026', 'ON TRACK'],
      ['', '', '', 'Show-Sight', 'Incident Reports Module',             '0',   'Starts Mar 2026',    'NEW'],
      ['', '', '', 'OneView',    'Product Discount Flow',               '90',  'Releasing Mar 2026', 'ON TRACK'],
      ['', '', '', 'FXExchange', 'FX-Exchange 3.0 Modernisation',       '75',  'Mar — May 2026',     'AT RISK'],
    ]
  );
}

// ── Modernisation ─────────────────────────────────────────────────────────────

function sheetModernisation(xlsx: XlsxModule): WorkSheet {
  return makeMultiRowSheet(
    xlsx,
    [
      { field: 'initiative_name', guide: 'Name of the modernisation initiative' },
      { field: 'status',          guide: 'Status label: IN PROGRESS | STRATEGIC EVAL | APPROVAL PENDING | IN DESIGN | COMPLETE | ON HOLD | PLANNED' },
      { field: 'description',     guide: 'Short description — 1–2 sentences' },
    ],
    [
      ['Infrastructure Audit — Predictive Operations',     'IN PROGRESS',      'Comprehensive review of all production applications underway. Short and long-term optimisation plans publishing next month.'],
      ['Cloud Consolidation — Strategic Decision Pending', 'STRATEGIC EVAL',   'Evaluating full consolidation onto Azure. Outcome: standardised DevOps, unified governance, reduced operational complexity.'],
      ['Test Automation "UNITE" — POC Complete',           'APPROVAL PENDING', 'Proactive POC demonstrates consistent regression coverage. Formal approval to commence full rollout currently awaited.'],
      ['Cloud-Native Transformation — In Design',          'IN DESIGN',        'Shaping a resilient cloud-native platform integrating DevSecOps and FinOps for greater uptime and faster delivery.'],
    ]
  );
}

// ── Portfolio ─────────────────────────────────────────────────────────────────

function sheetPortfolio(xlsx: XlsxModule): WorkSheet {
  return makeMultiRowSheet(
    xlsx,
    [
      { field: 'programme_name', guide: 'Platform / product name (UPPERCASE, e.g. ON-SIGHT)' },
      { field: 'category',       guide: 'Category label in uppercase (e.g. FIELD VISIBILITY)' },
      { field: 'tagline',        guide: 'Short tagline shown on the card (e.g. Live view from the show floor)' },
      { field: 'description',    guide: 'Card body text — 1–2 sentences' },
      { field: 'tech_stack',     guide: 'Technology stack (e.g. Angular · .NET/MS SQL · Flutter)' },
      { field: 'highlighted',    guide: 'Dark/highlighted card: TRUE or FALSE (only one card should be TRUE)' },
    ],
    [
      ['ON-SIGHT',   'FIELD VISIBILITY',  'Live view from the show floor',       'Enables clients to track project progress in real time — photos, progress reports, and field feedback from the floor.',           'Angular · .NET/MS SQL · Flutter · Azure Blob',  'FALSE'],
      ['MIDDLEWARE',  'INTEGRATION LAYER', 'Seamless data across the ecosystem',  'Exchanges data between all platforms — the connective tissue ensuring interoperability and real-time synchronisation.',         '.NET C# · SQL Server · Kafka · API Integration', 'TRUE'],
      ['SHOW-SIGHT', 'OPERATIONS HUB',    'Real-time show floor coordination',   'Real-time transparency, streamlined workflows, and improved team coordination across exhibitor and organiser portals.',        'Angular · .NET/MS SQL · Flutter · Azure Blob',  'FALSE'],
      ['FX-EXCHANGE', 'EVENT MANAGEMENT', 'End-to-end event request platform',   'Handles all aspects of event requests — proof submissions, graphics, work orders, and full event lifecycle.',                   'React JS(v2) · Node.js → Angular (v3)',          'FALSE'],
      ['ONE-VIEW',   'EXHIBITOR PORTAL',  'Complete expo preparation & control', 'Full visibility over ordering, task management, and event coordination in one unified suite.',                                'Ruby on Rails · React JS · Kafka',               'FALSE'],
    ]
  );
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function downloadXLSXTemplate(): Promise<void> {
  const xlsx = await import('xlsx');
  const wb = xlsx.utils.book_new();

  xlsx.utils.book_append_sheet(wb, sheetHowToUse(xlsx),          '⭐ HOW TO USE');
  xlsx.utils.book_append_sheet(wb, sheetCover(xlsx),             'Cover');
  xlsx.utils.book_append_sheet(wb, sheetFooter(xlsx),            'Footer');
  xlsx.utils.book_append_sheet(wb, sheetKeyMetrics(xlsx),        'Key_Metrics');
  xlsx.utils.book_append_sheet(wb, sheetClientPartners(xlsx),    'Client_Partners');
  xlsx.utils.book_append_sheet(wb, sheetMonthlySnapshot(xlsx),   'Monthly_Snapshot');
  xlsx.utils.book_append_sheet(wb, sheetBusinessImpact(xlsx),    'Business_Impact');
  xlsx.utils.book_append_sheet(wb, sheetTop3Outcomes(xlsx),      'Top3_Outcomes');
  xlsx.utils.book_append_sheet(wb, sheetProductionSupport(xlsx), 'Production_Support');
  xlsx.utils.book_append_sheet(wb, sheetWatchItems(xlsx),        'Watch_Items');
  xlsx.utils.book_append_sheet(wb, sheetReleaseForecast(xlsx),   'Release_Forecast');
  xlsx.utils.book_append_sheet(wb, sheetModernisation(xlsx),     'Modernisation');
  xlsx.utils.book_append_sheet(wb, sheetPortfolio(xlsx),         'Portfolio');

  xlsx.writeFile(wb, 'newsletter-studio-template.xlsx');
}

export function downloadJSONTemplate(): void {
  const template = {
    _readme: 'Newsletter Studio data template. Fill each section with your content.',
    cover: {
      title_main:   'FEBRUARY',
      title_accent: '2026',
      subtitle:     'Technology · Product · Transformation — Edition 01',
      date:         '07 Feb 2026',
      edition:      'VOL 01 . EDITION 01',
      volume_label: 'DEVELOPMENT NEWSLETTER . VOL 01 . EDITION 01',
      brand_left:   'NTH DEGREE',
      brand_right:  'SAKSOFT',
      nav1: 'CONSULTING', nav2: 'DEVELOPMENT', nav3: 'TRANSFORMATION',
    },
    footer: {
      copyright: '© 2026 Nth Degree × Saksoft · Development Newsletter · VOL 01 · EDITION 01',
      services:  'Consulting · Development · Transformation',
      date_line: '07 Feb 2026 · Confidential',
    },
    key_metrics: [
      { label: 'PROGRAMMES ON TRACK',   value: '7 / 9',   subtext: 'Active this month',       trend: '↑ 78% delivery confidence', accent_color: '#006b5f', trend_color: '#006b5f' },
      { label: 'PROD TICKETS RESOLVED', value: '20 / 26', subtext: '77% fix rate',            trend: '↑ All P1 issues closed',    accent_color: '#f05a29', trend_color: '#006b5f' },
      { label: 'TECH FOUNDATION WINS',  value: '2',       subtext: 'Major upgrades complete', trend: '↑ .NET Core + Flutter done', accent_color: '#1a2b3c', trend_color: '#006b5f' },
      { label: 'STRATEGIC WATCH ITEMS', value: '3',       subtext: 'Require attention',       trend: '→ See Section 3',            accent_color: '#c83030', trend_color: '#ea580c' },
    ],
    client_partners: {
      client_name:         'NTH DEGREE',
      client_badge:        'CLIENT ORGANISATION',
      client_description:  'A leading global trade show management, event marketing, and experiential services company with nearly 50 years of history.',
      partner_name:        'SAKSOFT',
      partner_badge:       'DELIVERY PARTNER',
      partner_description: 'A global AI-led digital transformation partner delivering cloud-native engineering, data-driven platforms, and modernisation strategies.',
    },
    monthly_snapshot: {
      period_label: 'MONTHLY SNAPSHOT — FEBRUARY 2026',
      headline:     'Three Programmes Delivered Material Outcomes. Two Strategic Bets Gaining Momentum.',
      body_text:    'Platform reliability was hardened with zero operational disruption.',
    },
    business_impact: [
      { category: 'Revenue Programmes',     programme_name: 'OneView Application', health: 'On Track',    what_delivered: 'Redesigned shopping UI; streamlined end-to-end payment workflow',       why_it_matters: 'Fewer abandoned transactions. Finance teams reclaim hours from corrections.' },
      { category: 'Operational Programmes', programme_name: 'On-Sight Platform',   health: 'On Track',    what_delivered: 'Introduced Microsoft SSO; eliminated AD authentication failures',        why_it_matters: 'Zero-friction field access at live shows. Login disruptions eliminated.' },
      { category: 'Product Modernisation',  programme_name: 'FX-Exchange 3.0',     health: 'In Progress', what_delivered: 'Redesigning UI/UX; aligning to cloud-native architecture',               why_it_matters: 'Positions FX-Exchange for deeper OASIS integration and future volume scaling.' },
    ],
    top3_outcomes: [
      { outcome_number: '01', title: 'Infrastructure Hardened — Zero Downtime Migration', description: 'On-Sight & Show-Sight migrated from legacy VM SQL to HA SQL.',    tag1: 'RESILIENCE ↑',      tag2: 'ON-SIGHT · SHOW-SIGHT' },
      { outcome_number: '02', title: 'Payment Accuracy Up — Finance Rework Down',         description: 'OneView delivers improved order accuracy and refund visibility.', tag1: 'REVENUE QUALITY ↑', tag2: 'ONEVIEW' },
      { outcome_number: '03', title: 'Mobile Expense Workflow — Field Teams Empowered',   description: 'Lead expense submissions via On-Sight mobile. Faster reimbursements.', tag1: 'OPS EFFICIENCY ↑', tag2: 'ON-SIGHT MOBILE' },
    ],
    production_support: {
      chart_data: [
        { system_name: 'On-Sight',   tickets_reported: 8, tickets_resolved: 7 },
        { system_name: 'Show-Sight', tickets_reported: 4, tickets_resolved: 4 },
        { system_name: 'OneView',    tickets_reported: 5, tickets_resolved: 3 },
        { system_name: 'Middleware', tickets_reported: 3, tickets_resolved: 2 },
      ],
      stats: {
        resolution_note: 'All P1/P2 Issues Closed',
        carried_note:    'No critical items outstanding',
      },
    },
    watch_items: [
      { watch_number: 1, title: 'OneView — Post-Migration Monitoring Active',      description: 'HA SQL confirmed stable.',              badge_label: 'WATCH',           badge_type: 'red' },
      { watch_number: 2, title: 'FX-Exchange — OASIS Integration Scoping Needed', description: 'Architecture decisions this month.',    badge_label: 'INPUT NEEDED',    badge_type: 'orange' },
      { watch_number: 3, title: 'Onboarding — Positive Signal Worth Scaling',      description: 'Improvements reducing setup errors.', badge_label: 'POSITIVE SIGNAL', badge_type: 'green' },
    ],
    release_forecast: {
      upcoming_cards: [
        { card_title: 'Show-Sight Mobile V2.0.0',         card_date: 'MAR 2026', card_description: 'Upgraded Job Search, show-specific photo categories, Evaluation submissions, and Safety Meeting Topics.' },
        { card_title: 'Fern Onboarding Self-Registration', card_date: 'MAR 2026', card_description: 'Eliminates manual onboarding bottlenecks. Self-registration with optimised approval flow.' },
      ],
      table: [
        { project: 'On-Sight',   release_item: 'Lead Travel Expense App',           progress_pct: 100, schedule: 'Releasing Mar 2026', status: 'ON TRACK' },
        { project: 'On-Sight',   release_item: 'Fern Onboarding Phase 2',           progress_pct: 75,  schedule: 'Mar — Apr 2026',     status: 'ON TRACK' },
        { project: 'Show-Sight', release_item: 'Job Photos, Eval & Safety Meeting', progress_pct: 90,  schedule: 'Releasing Mar 2026', status: 'ON TRACK' },
        { project: 'Show-Sight', release_item: 'Incident Reports Module',           progress_pct: 0,   schedule: 'Starts Mar 2026',    status: 'NEW' },
        { project: 'OneView',    release_item: 'Product Discount Flow',             progress_pct: 90,  schedule: 'Releasing Mar 2026', status: 'ON TRACK' },
        { project: 'FXExchange', release_item: 'FX-Exchange 3.0 Modernisation',    progress_pct: 75,  schedule: 'Mar — May 2026',     status: 'AT RISK' },
      ],
    },
    modernisation: [
      { initiative_name: 'Infrastructure Audit — Predictive Operations',     status: 'IN PROGRESS',      description: 'Comprehensive review of all production applications underway.' },
      { initiative_name: 'Cloud Consolidation — Strategic Decision Pending', status: 'STRATEGIC EVAL',   description: 'Evaluating full consolidation onto Azure.' },
      { initiative_name: 'Test Automation "UNITE" — POC Complete',           status: 'APPROVAL PENDING', description: 'POC demonstrates consistent regression coverage.' },
      { initiative_name: 'Cloud-Native Transformation — In Design',          status: 'IN DESIGN',        description: 'Shaping a resilient cloud-native platform.' },
    ],
    portfolio: [
      { programme_name: 'ON-SIGHT',   category: 'FIELD VISIBILITY',  tagline: 'Live view from the show floor',       description: 'Enables clients to track project progress in real time.', tech_stack: 'Angular · .NET/MS SQL · Flutter · Azure Blob',  highlighted: false },
      { programme_name: 'MIDDLEWARE', category: 'INTEGRATION LAYER', tagline: 'Seamless data across the ecosystem',  description: 'Exchanges data between all platforms.',                    tech_stack: '.NET C# · SQL Server · Kafka · API Integration', highlighted: true  },
      { programme_name: 'SHOW-SIGHT', category: 'OPERATIONS HUB',   tagline: 'Real-time show floor coordination',   description: 'Real-time transparency, streamlined workflows.',            tech_stack: 'Angular · .NET/MS SQL · Flutter · Azure Blob',  highlighted: false },
      { programme_name: 'FX-EXCHANGE',category: 'EVENT MANAGEMENT', tagline: 'End-to-end event request platform',   description: 'Handles all aspects of event requests.',                   tech_stack: 'React JS(v2) · Node.js → Angular (v3)',          highlighted: false },
      { programme_name: 'ONE-VIEW',   category: 'EXHIBITOR PORTAL', tagline: 'Complete expo preparation & control', description: 'Full visibility over ordering and task management.',         tech_stack: 'Ruby on Rails · React JS · Kafka',               highlighted: false },
    ],
  };

  const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'newsletter-studio-template.json';
  a.click();
  URL.revokeObjectURL(url);
}
