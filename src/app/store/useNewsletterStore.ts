import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ImportedData } from '../utils/dataMapper';
import { type ThemeColors, DEFAULT_THEME_COLORS } from '../utils/colorSystem';

// ── Cover ─────────────────────────────────────────────────────────────────────

export interface CoverData {
  brandLeft: string; brandRight: string; volumeLabel: string;
  date: string; edition: string; confidential: string;
  titleMain: string; titleAccent: string; subtitle: string;
  nav1: string; nav2: string; nav3: string;
}

export const DEFAULT_COVER_DATA: CoverData = {
  brandLeft: 'NTH DEGREE', brandRight: 'SAKSOFT',
  volumeLabel: 'DEVELOPMENT NEWSLETTER . VOL 01 . EDITION 01',
  date: '07 Feb 2026', edition: 'VOL 01 . EDITION 01', confidential: 'CONFIDENTIAL',
  titleMain: 'FEBRUARY', titleAccent: '2026',
  subtitle: 'Technology · Product · Transformation — Edition 01',
  nav1: 'CONSULTING', nav2: 'DEVELOPMENT', nav3: 'TRANSFORMATION',
};

// ── Footer ────────────────────────────────────────────────────────────────────

export interface FooterData { copyright: string; services: string; dateLine: string; }

export const DEFAULT_FOOTER_DATA: FooterData = {
  copyright: '© 2026 Nth Degree × Saksoft · Development Newsletter · VOL 01 · EDITION 01',
  services:  'Consulting · Development · Transformation',
  dateLine:  '07 Feb 2026 · Confidential',
};

// ── Client & Partners ──────────────────────────────────────────────────────────

export interface ClientPartnerCard {
  id: string;
  name: string;
  badgeLabel: string;
  badgeBg: string;
  badgeColor: string;
  description: string;
}

export interface ClientPartnersData {
  client: ClientPartnerCard;
  partner: ClientPartnerCard;
}

export const DEFAULT_CLIENT_PARTNERS_DATA: ClientPartnersData = {
  client: {
    id: 'cp-client',
    name: 'NTH DEGREE',
    badgeLabel: 'CLIENT ORGANISATION',
    badgeBg: '#e8e9eb',
    badgeColor: '#000000',
    description: 'A leading global trade show management, event marketing, and experiential services company with nearly 50 years of history. Headquartered in Duluth, Georgia — with offices across North America, Europe, and Asia — Nth Degree specialises in exhibit installation, corporate events, and brand activations at flagship shows including CES and major global events.',
  },
  partner: {
    id: 'cp-partner',
    name: 'SAKSOFT',
    badgeLabel: 'DELIVERY PARTNER',
    badgeBg: '#dbeafe',
    badgeColor: '#1e40af',
    description: 'A global AI-led digital transformation partner delivering cloud-native engineering, data-driven platforms, and modernisation strategies. Saksoft serves as the strategic delivery partner across product development, platform transformation, and operations.',
  },
};

// ── Monthly Snapshot ───────────────────────────────────────────────────────────

export interface MonthlySnapshotData {
  periodLabel: string;
  headline: string;
  bodyText: string;
}

export const DEFAULT_MONTHLY_SNAPSHOT_DATA: MonthlySnapshotData = {
  periodLabel: 'MONTHLY SNAPSHOT — FEBRUARY 2026',
  headline: 'Three Programmes Delivered Material Outcomes. Two Strategic Bets Gaining Momentum.',
  bodyText: 'Platform reliability was hardened with zero operational disruption, payment accuracy improved reducing finance rework, and field-lead mobile workflows simplified. Cloud consolidation evaluation and FX-Exchange 3.0 are positioning the portfolio for scalable Q2 growth. Production support closed at 77% resolution rate with no critical issues outstanding.',
};

// ── Key Metrics ───────────────────────────────────────────────────────────────

export interface MetricItem {
  id: string; label: string; value: string;
  subtext: string; trend: string; accentColor: string; trendColor: string;
}

export const DEFAULT_METRICS: MetricItem[] = [
  { id: 'met-1', label: 'PROGRAMMES ON TRACK',   value: '7 / 9',   subtext: 'Active this month',      trend: '↑ 78% delivery confidence', accentColor: '#006b5f', trendColor: '#006b5f' },
  { id: 'met-2', label: 'PROD TICKETS RESOLVED',  value: '20 / 26', subtext: '77% fix rate',            trend: '↑ All P1 issues closed',    accentColor: '#f05a29', trendColor: '#006b5f' },
  { id: 'met-3', label: 'TECH FOUNDATION WINS',   value: '2',       subtext: 'Major upgrades complete', trend: '↑ .NET Core + Flutter done', accentColor: '#1a2b3c', trendColor: '#006b5f' },
  { id: 'met-4', label: 'STRATEGIC WATCH ITEMS',  value: '3',       subtext: 'Require attention',       trend: '→ See Section 3',            accentColor: '#c83030', trendColor: '#ea580c' },
];

// ── Business Impact ───────────────────────────────────────────────────────────

export type BIHealth = 'On Track' | 'In Progress' | 'At Risk' | 'Completed' | 'Delayed' | 'On Hold';

export const BI_HEALTH_COLORS: Record<BIHealth, { dot: string; text: string }> = {
  'On Track':    { dot: '#006b5f', text: '#006b5f' },
  'In Progress': { dot: '#f59e0b', text: '#f59e0b' },
  'At Risk':     { dot: '#ef4444', text: '#ef4444' },
  'Completed':   { dot: '#3b82f6', text: '#3b82f6' },
  'Delayed':     { dot: '#dc2626', text: '#dc2626' },
  'On Hold':     { dot: '#9ca3af', text: '#9ca3af' },
};

export const BI_HEALTH_OPTIONS: BIHealth[] = ['On Track', 'In Progress', 'At Risk', 'Completed', 'Delayed', 'On Hold'];

export interface BIRow {
  id: string; category: string; programmeName: string;
  health: BIHealth; whatDelivered: string; whyItMatters: string;
}

export const DEFAULT_BI_ROWS: BIRow[] = [
  { id: 'bi-1', category: 'Revenue Programmes',   programmeName: 'OneView Application', health: 'On Track',   whatDelivered: 'Redesigned shopping UI; streamlined end-to-end payment workflow.',   whyItMatters: 'Fewer abandoned transactions. Finance teams reclaim hours from corrections. Exhibitors experience faster checkout.' },
  { id: 'bi-2', category: 'Operational Programmes',programmeName: 'On-Sight Platform',   health: 'On Track',   whatDelivered: 'Introduced Microsoft SSO; eliminated AD authentication failures.',   whyItMatters: 'Zero-friction field access at live shows. Login disruptions eliminated.' },
  { id: 'bi-3', category: 'Product Modernisation', programmeName: 'FX-Exchange 3.0',    health: 'In Progress', whatDelivered: 'Redesigning UI/UX; aligning to cloud-native architecture.',             whyItMatters: 'Positions FX-Exchange for deeper OASIS integration and future volume scaling without costly re-platforming.' },
];

// ── Top 3 Outcomes ─────────────────────────────────────────────────────────────

export interface OutcomeItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tag1: string;
  tag2: string;
}

export const DEFAULT_OUTCOME_ITEMS: OutcomeItem[] = [
  {
    id: 'outcome-1',
    number: '01',
    title: 'Infrastructure Hardened — Zero Downtime Migration',
    description: 'On-Sight & Show-Sight migrated from legacy VM SQL to High Availability SQL. Zero service disruption during active show season.',
    tag1: 'RESILIENCE ↑',
    tag2: 'ON-SIGHT · SHOW-SIGHT',
  },
  {
    id: 'outcome-2',
    number: '02',
    title: 'Payment Accuracy Up — Finance Rework Down',
    description: 'OneView delivers improved order accuracy and refund visibility. Finance teams reclaim hours; exhibitors experience a smoother checkout.',
    tag1: 'REVENUE QUALITY ↑',
    tag2: 'ONEVIEW',
  },
  {
    id: 'outcome-3',
    number: '03',
    title: 'Mobile Expense Workflow — Field Teams Empowered',
    description: 'Lead expense submissions via On-Sight mobile. Faster reimbursements and reduced back-office burden for every field lead.',
    tag1: 'OPS EFFICIENCY ↑',
    tag2: 'ON-SIGHT MOBILE',
  },
];

// ── Watch Items ──────────────────────────────────────────────────────────────

export interface WatchItem {
  id: string;
  title: string;
  description: string;
  badgeLabel: string;
  badgeBg: string;
  badgeColor: string;
}

export const WATCH_BADGE_PRESETS = {
  watch: { badgeLabel: 'WATCH', badgeBg: '#fef2f2', badgeColor: '#dc2626' },
  inputNeeded: { badgeLabel: 'INPUT NEEDED', badgeBg: '#fff7ed', badgeColor: '#ea580c' },
  positiveSignal: { badgeLabel: 'POSITIVE SIGNAL', badgeBg: '#ecfdf5', badgeColor: '#059669' },
} as const;

export const DEFAULT_WATCH_ITEMS: WatchItem[] = [
  {
    id: 'watch-1',
    title: 'OneView — Post-Migration Monitoring Active',
    description: 'HA SQL confirmed stable. Any regression in payment pipeline must be escalated immediately.',
    ...WATCH_BADGE_PRESETS.watch,
  },
  {
    id: 'watch-2',
    title: 'FX-Exchange — OASIS Integration Scoping Needed',
    description: 'Architecture decisions this month determine Q3 delivery confidence. Product owner input required.',
    ...WATCH_BADGE_PRESETS.inputNeeded,
  },
  {
    id: 'watch-3',
    title: 'Onboarding — Positive Signal Worth Scaling',
    description: 'Improvements reducing setup errors and back-office effort. Recommend monthly velocity tracking.',
    ...WATCH_BADGE_PRESETS.positiveSignal,
  },
];

// ── Modernisation ─────────────────────────────────────────────────────────────

export interface ModernisationItem {
  id: string; title: string; description: string;
  statusLabel: string; statusBg: string; statusColor: string; statusBorder: string;
}

export const DEFAULT_MODERNISATION_ITEMS: ModernisationItem[] = [
  { id: 'mod-1', title: 'Infrastructure Audit — Predictive Operations',     description: 'Comprehensive review of all production applications underway. Short and long-term optimisation plans publishing next month.',           statusLabel: 'IN PROGRESS',      statusBg: '#ffedd5', statusColor: '#9a3412', statusBorder: '' },
  { id: 'mod-2', title: 'Cloud Consolidation — Strategic Decision Pending', description: 'Evaluating full consolidation onto Azure. Outcome: standardised DevOps, unified governance, reduced operational complexity.',          statusLabel: 'STRATEGIC EVAL',   statusBg: '#e0e7ff', statusColor: '#3730a3', statusBorder: '' },
  { id: 'mod-3', title: 'Test Automation "UNITE" — POC Complete',           description: 'Proactive POC demonstrates consistent regression coverage. Formal approval to commence full rollout currently awaited.',               statusLabel: 'APPROVAL PENDING', statusBg: '#fffbeb', statusColor: '#b45309', statusBorder: '#fde68a' },
  { id: 'mod-4', title: 'Cloud-Native Transformation — In Design',          description: 'Shaping a resilient cloud-native platform integrating DevSecOps and FinOps for greater uptime and faster delivery.',                   statusLabel: 'IN DESIGN',        statusBg: '#ffedd5', statusColor: '#9a3412', statusBorder: '' },
];

// ── Portfolio ─────────────────────────────────────────────────────────────────

export interface PortfolioItem {
  id: string; category: string; name: string; tagline: string;
  description: string; techStack: string; highlighted: boolean;
}

export const DEFAULT_PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 'port-1', category: 'FIELD VISIBILITY',  name: 'ON-SIGHT',   tagline: 'Live view from the show floor',       description: 'Enables clients to track project progress in real time — photos, progress reports, and field feedback from the floor.',           techStack: 'Angular · .NET/MS SQL · Flutter · Azure Blob',  highlighted: false },
  { id: 'port-2', category: 'INTEGRATION LAYER', name: 'MIDDLEWARE',  tagline: 'Seamless data across the ecosystem',  description: 'Exchanges data between all platforms — the connective tissue ensuring interoperability and real-time synchronisation.',         techStack: '.NET C# · SQL Server · Kafka · API Integration', highlighted: true  },
  { id: 'port-3', category: 'OPERATIONS HUB',    name: 'SHOW-SIGHT', tagline: 'Real-time show floor coordination',   description: 'Real-time transparency, streamlined workflows, and improved team coordination across exhibitor and organiser portals.',        techStack: 'Angular · .NET/MS SQL · Flutter · Azure Blob',  highlighted: false },
  { id: 'port-4', category: 'EVENT MANAGEMENT',  name: 'FX-EXCHANGE', tagline: 'End-to-end event request platform',  description: 'Handles all aspects of event requests — proof submissions, graphics, work orders, and full event lifecycle.',                   techStack: 'React JS(v2) · Node.js → Angular (v3)',          highlighted: false },
  { id: 'port-5', category: 'EXHIBITOR PORTAL',  name: 'ONE-VIEW',   tagline: 'Complete expo preparation & control', description: 'Full visibility over ordering, task management, and event coordination in one unified suite.',                                techStack: 'Ruby on Rails · React JS · Kafka',               highlighted: false },
];

// ── Sections ──────────────────────────────────────────────────────────────────

export interface NewsletterSection {
  id: string; type: string; label: string; icon: string;
  originalIndex: number; visible: boolean; order: number;
}

export type SectionTextOverrides = Record<string, Record<string, string>>;

// ── Production Support ────────────────────────────────────────────────────────

export interface PSChartRow { id: string; systemName: string; reported: number; resolved: number; }

export interface PSData {
  rows: PSChartRow[]; reportedColor: string; resolvedColor: string;
  resolutionNote: string; carriedNote: string;
}

export const DEFAULT_PS_DATA: PSData = {
  rows: [
    { id: 'ps-1', systemName: 'On-Sight',   reported: 8, resolved: 7 },
    { id: 'ps-2', systemName: 'Show-Sight', reported: 4, resolved: 4 },
    { id: 'ps-3', systemName: 'OneView',    reported: 5, resolved: 3 },
    { id: 'ps-4', systemName: 'Middleware', reported: 3, resolved: 2 },
  ],
  reportedColor: '#041627', resolvedColor: '#f87171',
  resolutionNote: 'All P1/P2 Issues Closed', carriedNote: 'No critical items outstanding',
};

// ── Release Forecast ──────────────────────────────────────────────────────────

export type RFStatus = 'ON TRACK' | 'AT RISK' | 'DELAYED' | 'NEW' | 'CLOSED';

export interface RFCard { id: string; title: string; date: string; description: string; }

export interface RFRow {
  id: string; project: string; releaseItem: string;
  progress: number; schedule: string; status: RFStatus;
  colorOverride?: string;   // ← NEW: user-defined bar color (overrides status color)
}

export interface RFData { cards: RFCard[]; rows: RFRow[]; }

export const DEFAULT_RF_DATA: RFData = {
  cards: [
    { id: 'rf-c1', title: 'Show-Sight Mobile V2.0.0',         date: 'MAR 2026', description: 'Upgraded Job Search, show-specific photo categories, Evaluation submissions, and Safety Meeting Topics.' },
    { id: 'rf-c2', title: 'Fern Onboarding Self-Registration', date: 'MAR 2026', description: 'Eliminates manual onboarding bottlenecks. Self-registration with optimised approval flow.' },
  ],
  rows: [
    { id: 'rf-1', project: 'On-Sight',   releaseItem: 'Lead Travel Expense App',           progress: 100, schedule: 'Releasing Mar 2026', status: 'ON TRACK' },
    { id: 'rf-2', project: 'On-Sight',   releaseItem: 'Fern Onboarding Phase 2',           progress: 75,  schedule: 'Mar — Apr 2026',      status: 'ON TRACK' },
    { id: 'rf-3', project: 'Show-Sight', releaseItem: 'Job Photos, Eval & Safety Meeting', progress: 90,  schedule: 'Releasing Mar 2026',  status: 'ON TRACK' },
    { id: 'rf-4', project: 'Show-Sight', releaseItem: 'Incident Reports Module',           progress: 0,   schedule: 'Starts Mar 2026',     status: 'NEW'      },
    { id: 'rf-5', project: 'OneView',    releaseItem: 'Product Discount Flow',             progress: 90,  schedule: 'Releasing Mar 2026',  status: 'ON TRACK' },
    { id: 'rf-6', project: 'FXExchange', releaseItem: 'FX-Exchange 3.0 Modernisation',    progress: 75,  schedule: 'Mar — May 2026',      status: 'AT RISK'  },
  ],
};

// ── Versions ──────────────────────────────────────────────────────────────────

export interface VersionSnapshot {
  coverData:            CoverData;
  footerData:           FooterData;
  clientPartnersData:   ClientPartnersData;
  monthlySnapshotData:  MonthlySnapshotData;
  keyMetrics:           MetricItem[];
  businessImpactRows:   BIRow[];
  outcomeItems:         OutcomeItem[];
  watchItems:           WatchItem[];
  psData:               PSData;
  rfData:               RFData;
  modernisationItems:   ModernisationItem[];
  portfolioItems:       PortfolioItem[];
  sectionTextOverrides: SectionTextOverrides;
  sections:             NewsletterSection[];
  themeColors:          ThemeColors;
  zoom:                 number;
}

export interface Version {
  id:        string;
  name:      string;
  timestamp: number;
  data:      VersionSnapshot;
}

const MAX_VERSIONS = 15;

// ── Store Interface ───────────────────────────────────────────────────────────

interface NewsletterStore {
  sections: NewsletterSection[]; selectedSectionId: string | null;
  zoom: number; editMode: boolean; importedData: ImportedData | null;
  coverData: CoverData; footerData: FooterData;
  clientPartnersData: ClientPartnersData;
  monthlySnapshotData: MonthlySnapshotData;
  keyMetrics: MetricItem[]; businessImpactRows: BIRow[];
  outcomeItems: OutcomeItem[];
  watchItems: WatchItem[];
  themeColors: ThemeColors; psData: PSData; rfData: RFData;
  modernisationItems: ModernisationItem[]; portfolioItems: PortfolioItem[];
  sectionTextOverrides: SectionTextOverrides; lastSavedAt: number | null;

  // ── VERSION HISTORY ────────────────────────────────────────────────────────
  versions:         Version[];
  activeVersionId:  string | null;

  // sections
  toggleVisibility: (id: string) => void; setOrder: (s: NewsletterSection[]) => void;
  selectSection: (id: string | null) => void; deleteSection: (id: string) => void;
  duplicateSection: (id: string) => void; setZoom: (z: number) => void;
  toggleEditMode: () => void; resetSections: () => void;
  // import
  setImportedData: (d: ImportedData) => void; clearImportedData: () => void;
  // cover
  setCoverData: (d: Partial<CoverData>) => void; updateCoverField: (k: keyof CoverData, v: string) => void; resetCoverData: () => void;
  // footer
  updateFooterField: (k: keyof FooterData, v: string) => void; resetFooterData: () => void;
  // client & partners
  updateClientPartnerCard: (card: keyof ClientPartnersData, f: Partial<ClientPartnerCard>) => void;
  resetClientPartnersData: () => void;
  // monthly snapshot
  setMonthlySnapshotData: (d: Partial<MonthlySnapshotData>) => void;
  updateMonthlySnapshotField: (k: keyof MonthlySnapshotData, v: string) => void;
  resetMonthlySnapshotData: () => void;
  // key metrics
  addMetric: () => void; updateMetric: (id: string, f: Partial<MetricItem>) => void;
  deleteMetric: (id: string) => void; duplicateMetric: (id: string) => void;
  reorderMetrics: (items: MetricItem[]) => void; resetMetrics: () => void;
  // business impact
  addBIRow: () => void; updateBIRow: (id: string, f: Partial<BIRow>) => void;
  deleteBIRow: (id: string) => void; duplicateBIRow: (id: string) => void;
  reorderBIRows: (rows: BIRow[]) => void; resetBIRows: () => void;
  // outcomes
  setOutcomeItems: (items: OutcomeItem[]) => void;
  addOutcomeItem: () => void; updateOutcomeItem: (id: string, f: Partial<OutcomeItem>) => void;
  deleteOutcomeItem: (id: string) => void; duplicateOutcomeItem: (id: string) => void;
  resetOutcomeItems: () => void;
  // watch items
  setWatchItems: (items: WatchItem[]) => void;
  addWatchItem: () => void; updateWatchItem: (id: string, f: Partial<WatchItem>) => void;
  deleteWatchItem: (id: string) => void; duplicateWatchItem: (id: string) => void;
  resetWatchItems: () => void;
  // theme
  updateThemeColor: (k: keyof ThemeColors, v: string) => void; resetThemeColors: () => void;
  // ps
  setPSData: (d: PSData) => void; updatePSRow: (id: string, f: Partial<PSChartRow>) => void;
  addPSRow: () => void; deletePSRow: (id: string) => void;
  setPSColor: (k: 'reportedColor' | 'resolvedColor', c: string) => void;
  setPSNote: (k: 'resolutionNote' | 'carriedNote', v: string) => void; resetPSData: () => void;
  // rf
  setRFData: (d: RFData) => void; updateRFRow: (id: string, f: Partial<RFRow>) => void;
  addRFRow: () => void; deleteRFRow: (id: string) => void;
  updateRFCard: (id: string, f: Partial<RFCard>) => void; addRFCard: () => void;
  deleteRFCard: (id: string) => void; resetRFData: () => void;
  // modernisation
  addModernisationItem: () => void; updateModernisationItem: (id: string, f: Partial<ModernisationItem>) => void;
  deleteModernisationItem: (id: string) => void; duplicateModernisationItem: (id: string) => void; resetModernisationItems: () => void;
  // portfolio
  addPortfolioItem: () => void; updatePortfolioItem: (id: string, f: Partial<PortfolioItem>) => void;
  deletePortfolioItem: (id: string) => void; duplicatePortfolioItem: (id: string) => void; resetPortfolioItems: () => void;
  // text overrides
  setSectionTextOverride: (sid: string, orig: string, nw: string) => void;
  clearSectionTextOverrides: (sid?: string) => void;
  // persistence
  saveManually: () => void; resetAll: () => void;
  // versions
  createVersion:  (name?: string) => void;
  restoreVersion: (id: string) => void;
  deleteVersion:  (id: string) => void;
  renameVersion:  (id: string, name: string) => void;
  clearVersions:  () => void;
}

// ── Defaults ──────────────────────────────────────────────────────────────────

const DEFAULT_SECTIONS: NewsletterSection[] = [
  { id: 'client-partners-1',    type: 'client-partners',    label: 'Client & Partners',         icon: '🤝', originalIndex: 0, visible: true, order: 0 },
  { id: 'monthly-snapshot-1',   type: 'monthly-snapshot',   label: 'Monthly Snapshot',           icon: '📋', originalIndex: 1, visible: true, order: 1 },
  { id: 'metrics-1',            type: 'metrics',            label: 'Key Metrics',                icon: '📊', originalIndex: 2, visible: true, order: 2 },
  { id: 'business-impact-1',    type: 'business-impact',    label: 'Business Impact',            icon: '💼', originalIndex: 3, visible: true, order: 3 },
  { id: 'top3-outcomes-1',      type: 'top3-outcomes',      label: 'Top 3 Outcomes',             icon: '🏆', originalIndex: 4, visible: true, order: 4 },
  { id: 'production-support-1', type: 'production-support', label: 'Production Support',         icon: '🛠️', originalIndex: 5, visible: true, order: 5 },
  { id: 'watch-items-1',        type: 'watch-items',        label: 'Watch Items',                icon: '👁️', originalIndex: 6, visible: true, order: 6 },
  { id: 'release-forecast-1',   type: 'release-forecast',   label: 'Release Forecast',           icon: '🚀', originalIndex: 7, visible: true, order: 7 },
  { id: 'modernisation-1',      type: 'modernisation',      label: 'Modernisation & Innovation', icon: '⚡', originalIndex: 8, visible: true, order: 8 },
  { id: 'portfolio-1',          type: 'portfolio',          label: 'Portfolio at a Glance',      icon: '📁', originalIndex: 9, visible: true, order: 9 },
];

const SECTION_ORIGINAL_INDICES: Record<string, number> = {
  'client-partners': 0, 'monthly-snapshot': 1, 'metrics': 2,
  'business-impact': 3, 'top3-outcomes': 4,    'production-support': 5,
  'watch-items': 6,     'release-forecast': 7, 'modernisation': 8, 'portfolio': 9,
};

function makeDefaultState() {
  return {
    sections:             DEFAULT_SECTIONS,
    zoom:                 65,
    coverData:            { ...DEFAULT_COVER_DATA },
    footerData:           { ...DEFAULT_FOOTER_DATA },
    clientPartnersData:   { client: { ...DEFAULT_CLIENT_PARTNERS_DATA.client }, partner: { ...DEFAULT_CLIENT_PARTNERS_DATA.partner } },
    monthlySnapshotData:  { ...DEFAULT_MONTHLY_SNAPSHOT_DATA },
    keyMetrics:           DEFAULT_METRICS.map(m => ({ ...m })),
    businessImpactRows:   DEFAULT_BI_ROWS.map(r => ({ ...r })),
    outcomeItems:         DEFAULT_OUTCOME_ITEMS.map(i => ({ ...i })),
    watchItems:           DEFAULT_WATCH_ITEMS.map(i => ({ ...i })),
    themeColors:          { ...DEFAULT_THEME_COLORS },
    psData:               { ...DEFAULT_PS_DATA, rows: DEFAULT_PS_DATA.rows.map(r => ({ ...r })) },
    rfData:               { cards: DEFAULT_RF_DATA.cards.map(c => ({ ...c })), rows: DEFAULT_RF_DATA.rows.map(r => ({ ...r })) },
    modernisationItems:   DEFAULT_MODERNISATION_ITEMS.map(i => ({ ...i })),
    portfolioItems:       DEFAULT_PORTFOLIO_ITEMS.map(i => ({ ...i })),
    sectionTextOverrides: {} as SectionTextOverrides,
    lastSavedAt:          null as number | null,
    versions:             [] as Version[],
    activeVersionId:      null as string | null,
  };
}

function makeSafeStorage() {
  try {
    localStorage.setItem('__ns_test__', '1');
    localStorage.removeItem('__ns_test__');
    return localStorage;
  } catch {
    const mem: Record<string, string> = {};
    return { getItem: (k: string) => mem[k] ?? null, setItem: (k: string, v: string) => { mem[k] = v; }, removeItem: (k: string) => { delete mem[k]; } };
  }
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useNewsletterStore = create<NewsletterStore>()(
  persist(
    (set, get) => ({
      ...makeDefaultState(),
      selectedSectionId: null, editMode: false, importedData: null,

      // sections
      toggleVisibility: (id) => set((s) => ({ sections: s.sections.map(sec => sec.id === id ? { ...sec, visible: !sec.visible } : sec) })),
      setOrder: (sections) => set({ sections }),
      selectSection: (id) => set({ selectedSectionId: id }),
      deleteSection: (id) => set((s) => {
        const norm = [...s.sections.filter(sec => sec.id !== id)].sort((a,b)=>a.order-b.order).map((sec,i)=>({...sec,order:i}));
        const { [id]: _r, ...rest } = s.sectionTextOverrides;
        return { sections: norm, selectedSectionId: s.selectedSectionId===id?null:s.selectedSectionId, sectionTextOverrides: rest };
      }),
      duplicateSection: (id) => set((s) => {
        const orig = s.sections.find(sec => sec.id === id); if (!orig) return s;
        const newId = `${orig.type}-${Date.now()}`;
        const all = [...s.sections, { ...orig, id: newId, order: orig.order + 0.5 }].sort((a,b)=>a.order-b.order).map((sec,i)=>({...sec,order:i}));
        const ovr = { ...s.sectionTextOverrides }; if (s.sectionTextOverrides[id]) ovr[newId] = { ...s.sectionTextOverrides[id] };
        return { sections: all, sectionTextOverrides: ovr };
      }),
      setZoom: (zoom) => set({ zoom }),
      toggleEditMode: () => set((s) => ({ editMode: !s.editMode })),
      resetSections: () => set({ sections: DEFAULT_SECTIONS, selectedSectionId: null }),

      // import
      setImportedData: (data) => set({ importedData: data }),
      clearImportedData: () => set({ importedData: null }),

      // cover
      setCoverData: (data) => set((s) => ({ coverData: { ...s.coverData, ...data } })),
      updateCoverField: (key, value) => set((s) => ({ coverData: { ...s.coverData, [key]: value } })),
      resetCoverData: () => set({ coverData: { ...DEFAULT_COVER_DATA } }),

      // footer
      updateFooterField: (key, value) => set((s) => ({ footerData: { ...s.footerData, [key]: value } })),
      resetFooterData: () => set({ footerData: { ...DEFAULT_FOOTER_DATA } }),

      // client & partners
      updateClientPartnerCard: (card, fields) => set((s) => ({
        clientPartnersData: {
          ...s.clientPartnersData,
          [card]: { ...s.clientPartnersData[card], ...fields },
        },
      })),
      resetClientPartnersData: () => set({
        clientPartnersData: {
          client: { ...DEFAULT_CLIENT_PARTNERS_DATA.client },
          partner: { ...DEFAULT_CLIENT_PARTNERS_DATA.partner },
        },
      }),

      // monthly snapshot
      setMonthlySnapshotData: (data) => set((s) => ({ monthlySnapshotData: { ...s.monthlySnapshotData, ...data } })),
      updateMonthlySnapshotField: (key, value) => set((s) => ({ monthlySnapshotData: { ...s.monthlySnapshotData, [key]: value } })),
      resetMonthlySnapshotData: () => set({ monthlySnapshotData: { ...DEFAULT_MONTHLY_SNAPSHOT_DATA } }),

      // key metrics
      addMetric: () => set((s) => ({ keyMetrics: [...s.keyMetrics, { id: `met-${Date.now()}`, label: 'NEW METRIC', value: '0', subtext: 'Description here', trend: '→ No change', accentColor: '#3b82f6', trendColor: '#3b82f6' }] })),
      updateMetric: (id, fields) => set((s) => ({ keyMetrics: s.keyMetrics.map(m => m.id===id ? {...m,...fields} : m) })),
      deleteMetric: (id) => set((s) => ({ keyMetrics: s.keyMetrics.filter(m => m.id!==id) })),
      duplicateMetric: (id) => set((s) => {
        const src = s.keyMetrics.find(m => m.id===id); if (!src) return s;
        const idx = s.keyMetrics.indexOf(src); const copy = { ...src, id: `met-${Date.now()}` };
        const next = [...s.keyMetrics]; next.splice(idx+1,0,copy); return { keyMetrics: next };
      }),
      reorderMetrics: (items) => set({ keyMetrics: items }),
      resetMetrics: () => set({ keyMetrics: DEFAULT_METRICS.map(m => ({...m})) }),

      // business impact
      addBIRow: () => set((s) => ({ businessImpactRows: [...s.businessImpactRows, { id: `bi-${Date.now()}`, category: 'New Programme', programmeName: 'Programme Name', health: 'In Progress' as BIHealth, whatDelivered: 'Describe what was delivered.', whyItMatters: 'Explain the business impact.' }] })),
      updateBIRow: (id, fields) => set((s) => ({ businessImpactRows: s.businessImpactRows.map(r => r.id===id ? {...r,...fields} : r) })),
      deleteBIRow: (id) => set((s) => ({ businessImpactRows: s.businessImpactRows.filter(r => r.id!==id) })),
      duplicateBIRow: (id) => set((s) => {
        const src = s.businessImpactRows.find(r => r.id===id); if (!src) return s;
        const idx = s.businessImpactRows.indexOf(src); const copy = { ...src, id: `bi-${Date.now()}` };
        const next = [...s.businessImpactRows]; next.splice(idx+1,0,copy); return { businessImpactRows: next };
      }),
      reorderBIRows: (rows) => set({ businessImpactRows: rows }),
      resetBIRows: () => set({ businessImpactRows: DEFAULT_BI_ROWS.map(r => ({...r})) }),

      // outcomes
      setOutcomeItems: (items) => set({ outcomeItems: items }),
      addOutcomeItem: () => set((s) => ({
        outcomeItems: [
          ...s.outcomeItems,
          {
            id: `outcome-${Date.now()}`,
            number: String(s.outcomeItems.length + 1).padStart(2, '0'),
            title: 'New Outcome',
            description: 'Describe the outcome and the business value created.',
            tag1: 'VALUE CREATED',
            tag2: 'PLATFORM / PROGRAMME',
          },
        ],
      })),
      updateOutcomeItem: (id, fields) => set((s) => ({ outcomeItems: s.outcomeItems.map(i => i.id===id ? { ...i, ...fields } : i) })),
      deleteOutcomeItem: (id) => set((s) => ({ outcomeItems: s.outcomeItems.filter(i => i.id!==id) })),
      duplicateOutcomeItem: (id) => set((s) => {
        const src = s.outcomeItems.find(i => i.id===id); if (!src) return s;
        const idx = s.outcomeItems.indexOf(src); const copy = { ...src, id: `outcome-${Date.now()}` };
        const next = [...s.outcomeItems]; next.splice(idx + 1, 0, copy); return { outcomeItems: next };
      }),
      resetOutcomeItems: () => set({ outcomeItems: DEFAULT_OUTCOME_ITEMS.map(i => ({ ...i })) }),

      // watch items
      setWatchItems: (items) => set({ watchItems: items }),
      addWatchItem: () => set((s) => ({
        watchItems: [
          ...s.watchItems,
          {
            id: `watch-${Date.now()}`,
            title: 'New Watch Item',
            description: 'Describe the strategic watch item here.',
            ...WATCH_BADGE_PRESETS.watch,
          },
        ],
      })),
      updateWatchItem: (id, fields) => set((s) => ({ watchItems: s.watchItems.map(i => i.id===id ? { ...i, ...fields } : i) })),
      deleteWatchItem: (id) => set((s) => ({ watchItems: s.watchItems.filter(i => i.id!==id) })),
      duplicateWatchItem: (id) => set((s) => {
        const src = s.watchItems.find(i => i.id===id); if (!src) return s;
        const idx = s.watchItems.indexOf(src); const copy = { ...src, id: `watch-${Date.now()}` };
        const next = [...s.watchItems]; next.splice(idx + 1, 0, copy); return { watchItems: next };
      }),
      resetWatchItems: () => set({ watchItems: DEFAULT_WATCH_ITEMS.map(i => ({ ...i })) }),

      // theme
      updateThemeColor: (key, value) => set((s) => ({ themeColors: { ...s.themeColors, [key]: value } })),
      resetThemeColors: () => set({ themeColors: { ...DEFAULT_THEME_COLORS } }),

      // ps
      setPSData: (data) => set({ psData: data }),
      updatePSRow: (id, fields) => set((s) => ({ psData: { ...s.psData, rows: s.psData.rows.map(r => r.id===id ? {...r,...fields} : r) } })),
      addPSRow: () => set((s) => ({ psData: { ...s.psData, rows: [...s.psData.rows, { id: `ps-${Date.now()}`, systemName: 'New System', reported: 0, resolved: 0 }] } })),
      deletePSRow: (id) => set((s) => ({ psData: { ...s.psData, rows: s.psData.rows.filter(r => r.id!==id) } })),
      setPSColor: (key, color) => set((s) => ({ psData: { ...s.psData, [key]: color } })),
      setPSNote: (key, value) => set((s) => ({ psData: { ...s.psData, [key]: value } })),
      resetPSData: () => set({ psData: { ...DEFAULT_PS_DATA, rows: DEFAULT_PS_DATA.rows.map(r => ({...r})) } }),

      // rf
      setRFData: (data) => set({ rfData: data }),
      updateRFRow: (id, fields) => set((s) => ({ rfData: { ...s.rfData, rows: s.rfData.rows.map(r => r.id===id ? {...r,...fields} : r) } })),
      addRFRow: () => set((s) => ({ rfData: { ...s.rfData, rows: [...s.rfData.rows, { id: `rf-${Date.now()}`, project: 'Project', releaseItem: 'New Item', progress: 0, schedule: 'TBD', status: 'NEW' as RFStatus }] } })),
      deleteRFRow: (id) => set((s) => ({ rfData: { ...s.rfData, rows: s.rfData.rows.filter(r => r.id!==id) } })),
      updateRFCard: (id, fields) => set((s) => ({ rfData: { ...s.rfData, cards: s.rfData.cards.map(c => c.id===id ? {...c,...fields} : c) } })),
      addRFCard: () => set((s) => ({ rfData: { ...s.rfData, cards: [...s.rfData.cards, { id: `rf-card-${Date.now()}`, title: 'New Release', date: 'TBD', description: 'Description here.' }] } })),
      deleteRFCard: (id) => set((s) => ({ rfData: { ...s.rfData, cards: s.rfData.cards.filter(c => c.id!==id) } })),
      resetRFData: () => set({ rfData: { cards: DEFAULT_RF_DATA.cards.map(c => ({...c})), rows: DEFAULT_RF_DATA.rows.map(r => ({...r})) } }),

      // modernisation
      addModernisationItem: () => set((s) => ({ modernisationItems: [...s.modernisationItems, { id: `mod-${Date.now()}`, title: 'New Initiative', description: 'Describe the modernisation initiative here.', statusLabel: 'IN PROGRESS', statusBg: '#ffedd5', statusColor: '#9a3412', statusBorder: '' }] })),
      updateModernisationItem: (id, fields) => set((s) => ({ modernisationItems: s.modernisationItems.map(i => i.id===id ? {...i,...fields} : i) })),
      deleteModernisationItem: (id) => set((s) => ({ modernisationItems: s.modernisationItems.filter(i => i.id!==id) })),
      duplicateModernisationItem: (id) => set((s) => {
        const src = s.modernisationItems.find(i => i.id===id); if (!src) return s;
        const idx = s.modernisationItems.indexOf(src); const copy = { ...src, id: `mod-${Date.now()}` };
        const next = [...s.modernisationItems]; next.splice(idx+1,0,copy); return { modernisationItems: next };
      }),
      resetModernisationItems: () => set({ modernisationItems: DEFAULT_MODERNISATION_ITEMS.map(i => ({...i})) }),

      // portfolio
      addPortfolioItem: () => set((s) => ({ portfolioItems: [...s.portfolioItems, { id: `port-${Date.now()}`, category: 'NEW CATEGORY', name: 'PLATFORM', tagline: 'Platform tagline here', description: 'Brief description of this platform and its role in the ecosystem.', techStack: 'Tech Stack · Framework', highlighted: false }] })),
      updatePortfolioItem: (id, fields) => set((s) => ({ portfolioItems: s.portfolioItems.map(i => i.id===id ? {...i,...fields} : i) })),
      deletePortfolioItem: (id) => set((s) => ({ portfolioItems: s.portfolioItems.filter(i => i.id!==id) })),
      duplicatePortfolioItem: (id) => set((s) => {
        const src = s.portfolioItems.find(i => i.id===id); if (!src) return s;
        const idx = s.portfolioItems.indexOf(src); const copy = { ...src, id: `port-${Date.now()}` };
        const next = [...s.portfolioItems]; next.splice(idx+1,0,copy); return { portfolioItems: next };
      }),
      resetPortfolioItems: () => set({ portfolioItems: DEFAULT_PORTFOLIO_ITEMS.map(i => ({...i})) }),

      // text overrides
      setSectionTextOverride: (sectionId, origText, newText) => set((s) => ({
        sectionTextOverrides: { ...s.sectionTextOverrides, [sectionId]: { ...(s.sectionTextOverrides[sectionId]??{}), [origText]: newText } },
      })),
      clearSectionTextOverrides: (sectionId) => set((s) => {
        if (sectionId) { const { [sectionId]: _r, ...rest } = s.sectionTextOverrides; return { sectionTextOverrides: rest }; }
        return { sectionTextOverrides: {} };
      }),

      // persistence
      saveManually: () => set({ lastSavedAt: Date.now() }),
      resetAll: () => set({ ...makeDefaultState(), selectedSectionId: null, editMode: false, importedData: null }),

      // ── Versions ──────────────────────────────────────────────────────────

      createVersion: (name) => set((s) => {
        const snapshot: VersionSnapshot = {
          coverData:            { ...s.coverData },
          footerData:           { ...s.footerData },
          clientPartnersData:   { client: { ...s.clientPartnersData.client }, partner: { ...s.clientPartnersData.partner } },
          monthlySnapshotData:  { ...s.monthlySnapshotData },
          keyMetrics:           s.keyMetrics.map(m => ({ ...m })),
          businessImpactRows:   s.businessImpactRows.map(r => ({ ...r })),
          outcomeItems:         s.outcomeItems.map(i => ({ ...i })),
          watchItems:           s.watchItems.map(i => ({ ...i })),
          psData:               { ...s.psData, rows: s.psData.rows.map(r => ({ ...r })) },
          rfData:               { cards: s.rfData.cards.map(c => ({ ...c })), rows: s.rfData.rows.map(r => ({ ...r })) },
          modernisationItems:   s.modernisationItems.map(i => ({ ...i })),
          portfolioItems:       s.portfolioItems.map(i => ({ ...i })),
          sectionTextOverrides: JSON.parse(JSON.stringify(s.sectionTextOverrides)),
          sections:             s.sections.map(sec => ({ ...sec })),
          themeColors:          { ...s.themeColors },
          zoom:                 s.zoom,
        };
        const versionId = `v-${Date.now()}`;
        const versionName = name ?? `Version ${s.versions.length + 1} — ${new Date().toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`;
        const newVersion: Version = { id: versionId, name: versionName, timestamp: Date.now(), data: snapshot };
        // Enforce max 15 — drop oldest first
        const existing = [...s.versions];
        if (existing.length >= MAX_VERSIONS) existing.splice(0, existing.length - MAX_VERSIONS + 1);
        return {
          versions: [...existing, newVersion],
          activeVersionId: versionId,
          lastSavedAt: Date.now(),
        };
      }),

      restoreVersion: (id) => set((s) => {
        const v = s.versions.find(ver => ver.id === id);
        if (!v) return s;
        const d = v.data;
        return {
          coverData:            { ...d.coverData },
          footerData:           { ...d.footerData },
          clientPartnersData:   d.clientPartnersData ? { client: { ...d.clientPartnersData.client }, partner: { ...d.clientPartnersData.partner } } : { client: { ...DEFAULT_CLIENT_PARTNERS_DATA.client }, partner: { ...DEFAULT_CLIENT_PARTNERS_DATA.partner } },
          monthlySnapshotData:  d.monthlySnapshotData ? { ...d.monthlySnapshotData } : { ...DEFAULT_MONTHLY_SNAPSHOT_DATA },
          keyMetrics:           d.keyMetrics.map(m => ({ ...m })),
          businessImpactRows:   d.businessImpactRows.map(r => ({ ...r })),
          outcomeItems:         Array.isArray(d.outcomeItems) && d.outcomeItems.length ? d.outcomeItems.map(i => ({ ...i })) : DEFAULT_OUTCOME_ITEMS.map(i => ({ ...i })),
          watchItems:           d.watchItems.map(i => ({ ...i })),
          psData:               { ...d.psData, rows: d.psData.rows.map(r => ({ ...r })) },
          rfData:               { cards: d.rfData.cards.map(c => ({ ...c })), rows: d.rfData.rows.map(r => ({ ...r })) },
          modernisationItems:   d.modernisationItems.map(i => ({ ...i })),
          portfolioItems:       d.portfolioItems.map(i => ({ ...i })),
          sectionTextOverrides: JSON.parse(JSON.stringify(d.sectionTextOverrides)),
          sections:             d.sections.map(sec => ({ ...sec })),
          themeColors:          { ...d.themeColors },
          zoom:                 d.zoom,
          activeVersionId:      id,
        };
      }),

      deleteVersion: (id) => set((s) => ({
        versions: s.versions.filter(v => v.id !== id),
        activeVersionId: s.activeVersionId === id ? null : s.activeVersionId,
      })),

      renameVersion: (id, name) => set((s) => ({
        versions: s.versions.map(v => v.id === id ? { ...v, name } : v),
      })),

      clearVersions: () => set({ versions: [], activeVersionId: null }),
    }),

    {
      name:    'newsletterStudio_state_v1',
      storage: createJSONStorage(makeSafeStorage),
      version: 8,
      partialize: (s) => ({
        sections: s.sections, zoom: s.zoom, coverData: s.coverData, footerData: s.footerData, clientPartnersData: s.clientPartnersData, monthlySnapshotData: s.monthlySnapshotData,
        keyMetrics: s.keyMetrics, businessImpactRows: s.businessImpactRows, outcomeItems: s.outcomeItems, watchItems: s.watchItems,
        themeColors: s.themeColors, psData: s.psData, rfData: s.rfData,
        modernisationItems: s.modernisationItems, portfolioItems: s.portfolioItems,
        sectionTextOverrides: s.sectionTextOverrides, lastSavedAt: s.lastSavedAt,
        versions: s.versions, activeVersionId: s.activeVersionId,
      }),
      migrate: (raw: unknown, _fromVersion: number) => {
        const p = (raw ?? {}) as Record<string, unknown>;
        const d = makeDefaultState();
        try {
          return {
            sections:             Array.isArray(p.sections)&&p.sections.length ? p.sections : d.sections,
            zoom:                 typeof p.zoom==='number' ? p.zoom : d.zoom,
            coverData:            p.coverData ? {...d.coverData,...(p.coverData as object)} : d.coverData,
            footerData:           p.footerData ? {...d.footerData,...(p.footerData as object)} : d.footerData,
            clientPartnersData:   p.clientPartnersData ? {
              client: { ...d.clientPartnersData.client, ...((p.clientPartnersData as any).client ?? {}) },
              partner: { ...d.clientPartnersData.partner, ...((p.clientPartnersData as any).partner ?? {}) },
            } : d.clientPartnersData,
            monthlySnapshotData:  p.monthlySnapshotData ? {...d.monthlySnapshotData,...(p.monthlySnapshotData as object)} : d.monthlySnapshotData,
            keyMetrics:           Array.isArray(p.keyMetrics)&&p.keyMetrics.length ? p.keyMetrics as MetricItem[] : d.keyMetrics,
            businessImpactRows:   Array.isArray(p.businessImpactRows)&&p.businessImpactRows.length ? p.businessImpactRows as BIRow[] : d.businessImpactRows,
            outcomeItems:         Array.isArray(p.outcomeItems)&&p.outcomeItems.length ? p.outcomeItems as OutcomeItem[] : d.outcomeItems,
            watchItems:           Array.isArray(p.watchItems)&&p.watchItems.length ? p.watchItems as WatchItem[] : d.watchItems,
            themeColors:          p.themeColors ? {...d.themeColors,...(p.themeColors as object)} : d.themeColors,
            psData:               p.psData ? {...d.psData,...(p.psData as object)} : d.psData,
            rfData:               p.rfData ? {...d.rfData,...(p.rfData as object)} : d.rfData,
            modernisationItems:   Array.isArray(p.modernisationItems)&&p.modernisationItems.length ? p.modernisationItems as ModernisationItem[] : d.modernisationItems,
            portfolioItems:       Array.isArray(p.portfolioItems)&&p.portfolioItems.length ? p.portfolioItems as PortfolioItem[] : d.portfolioItems,
            sectionTextOverrides: (p.sectionTextOverrides&&typeof p.sectionTextOverrides==='object'&&!Array.isArray(p.sectionTextOverrides)) ? p.sectionTextOverrides as SectionTextOverrides : d.sectionTextOverrides,
            lastSavedAt:          typeof p.lastSavedAt==='number' ? p.lastSavedAt : null,
            versions:             Array.isArray(p.versions) ? p.versions as Version[] : [],
            activeVersionId:      typeof p.activeVersionId==='string' ? p.activeVersionId : null,
          };
        } catch { console.warn('[NewsletterStore] Corrupted state — using defaults.'); return d; }
      },
      onRehydrateStorage: () => (_s, err) => { if (err) console.error('[NewsletterStore] Hydration error:', err); },
    }
  )
);

export { SECTION_ORIGINAL_INDICES };
export type { ThemeColors };
