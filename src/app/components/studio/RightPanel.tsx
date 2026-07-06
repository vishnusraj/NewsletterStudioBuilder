import React, { useState } from 'react';
import {
  Settings, Palette, Type, AlignLeft, Info,
  Layout, BarChart2, RotateCcw, CheckCircle2, FileText,
} from 'lucide-react';
import { useNewsletterStore } from '../../store/useNewsletterStore';
import { CoverEditor } from './CoverEditor';
import { ColorCustomizer } from './ColorCustomizer';
import { ChartDataEditor } from './ChartDataEditor';
import { FooterEditor } from './FooterEditor';

// ── Typography tokens (read-only) ─────────────────────────────────────────────

const TYPOGRAPHY_TOKENS = [
  { name: 'Display', family: 'Impact', weight: 'Regular', usage: 'Section headings (BUSINESS IMPACT…)' },
  { name: 'Black',   family: 'Inter',  weight: '900',     usage: 'Metric values, key numbers' },
  { name: 'Bold',    family: 'Inter',  weight: '700',     usage: 'Sub-headings, labels' },
  { name: 'SemiBold',family: 'Inter',  weight: '600',     usage: 'Emphasized text' },
  { name: 'Medium',  family: 'Inter',  weight: '500',     usage: 'Navigation, taglines' },
  { name: 'Regular', family: 'Inter',  weight: '400',     usage: 'Body text, descriptions' },
];

// ── Section info (Inspect tab) ────────────────────────────────────────────────

const SECTION_INFO: Record<string, { description: string; elements: string[] }> = {
  'client-partners':   { description: 'Showcases the two main stakeholders: client and delivery partner.',      elements: ['Company name', 'Organisation type badge', 'Company description'] },
  'monthly-snapshot':  { description: 'Dark background executive summary with the month\'s key narrative.',     elements: ['Month label', 'Headline statement', 'Supporting body text'] },
  'metrics':           { description: 'Four KPI cards showing the critical programme metrics for the month.',   elements: ['Metric label', 'Primary value', 'Sub-label', 'Trend indicator'] },
  'business-impact':   { description: 'Table mapping each programme to its health status and business impact.', elements: ['Programme name', 'Health status', 'What was delivered', 'Why it matters'] },
  'top3-outcomes':     { description: 'Three outcome cards highlighting the most significant achievements.',    elements: ['Outcome number', 'Title', 'Description', 'Impact tags'] },
  'production-support':{ description: 'Dynamic bar chart of support tickets per system with auto-calculated resolution KPIs.', elements: ['Bar chart (reported vs resolved)', 'Resolution rate %', 'Carried forward count', 'System labels'] },
  'watch-items':       { description: 'Strategic watch items requiring attention or monitoring.',               elements: ['Watch item title', 'Description', 'Status badge'] },
  'release-forecast':  { description: 'Dynamic release schedule with live progress bars and status per project.',elements: ['Project name', 'Release item', 'Progress %', 'Progress bar', 'Schedule', 'Status'] },
  'modernisation':     { description: 'Fully dynamic innovation initiatives — add, edit, remove cards.',        elements: ['Initiative title', 'Description', 'Status badge (8 presets)'] },
  'portfolio':         { description: 'Fully dynamic platform portfolio — add, edit, highlight cards.',         elements: ['Platform category', 'Platform name', 'Tagline', 'Description', 'Tech stack', 'Highlighted flag'] },
  'thank-you':         { description: 'Minimal closing strip above the footer with contact details and a short sign-off.', elements: ['Heading', 'Message', 'Email address', 'Website'] },
};

// ── Tab definitions ───────────────────────────────────────────────────────────

type Tab = 'inspect' | 'cover' | 'colors' | 'footer' | 'data';

interface TabDef {
  id:    Tab;
  label: string;
  icon:  React.ReactNode;
}

const TABS: TabDef[] = [
  { id: 'inspect', label: 'Inspect', icon: <Settings  size={11} /> },
  { id: 'cover',   label: 'Cover',   icon: <Layout    size={11} /> },
  { id: 'colors',  label: 'Colors',  icon: <Palette   size={11} /> },
  { id: 'footer',  label: 'Footer',  icon: <FileText  size={11} /> },
  { id: 'data',    label: 'Data',    icon: <BarChart2 size={11} /> },
];

// ── Inspect tab ───────────────────────────────────────────────────────────────

function InspectTab() {
  const {
    sections, selectedSectionId, editMode, themeColors,
    sectionTextOverrides, clearSectionTextOverrides,
  } = useNewsletterStore();

  const selectedSection = sections.find(s => s.id === selectedSectionId);
  const isFooterSelected = selectedSectionId === '__footer__';

  const isDataSection = [
    'client-partners', 'monthly-snapshot', 'production-support', 'release-forecast', 'modernisation', 'portfolio',
    'metrics', 'business-impact', 'top3-outcomes', 'watch-items', 'thank-you',
  ].includes(selectedSection?.type ?? '');

  const hasOverrides = selectedSection
    ? Object.keys(sectionTextOverrides[selectedSection.id] ?? {}).length > 0
    : false;

  const [clearConfirm, setClearConfirm] = useState(false);

  const handleClearOverrides = () => {
    if (!selectedSection) return;
    if (!clearConfirm) {
      setClearConfirm(true);
      setTimeout(() => setClearConfirm(false), 3000);
    } else {
      clearSectionTextOverrides(selectedSection.id);
      setClearConfirm(false);
    }
  };

  // ── Footer selected ───────────────────────────────────────────────────────
  if (isFooterSelected) {
    return (
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 20 }}>🔻</span>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#111827', margin: 0 }}>Footer</p>
              <p style={{ fontSize: 10, color: '#9ca3af', margin: '2px 0 0 0' }}>
                Global footer bar · Always visible
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 99, backgroundColor: '#d1fae5', color: '#065f46' }}>
              ● Always On
            </span>
            <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 99, backgroundColor: '#f3f4f6', color: '#374151' }}>
              bg: #041627
            </span>
          </div>
        </div>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <Info size={13} color="#9ca3af" />
            <span style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Footer Structure
            </span>
          </div>
          <ul style={{ margin: 0, padding: '0 0 0 16px' }}>
            <li style={{ fontSize: 11, color: '#6b7280', marginBottom: 3 }}>Left: Copyright / publisher line</li>
            <li style={{ fontSize: 11, color: '#6b7280', marginBottom: 3 }}>Center: Services (white, uppercase)</li>
            <li style={{ fontSize: 11, color: '#6b7280', marginBottom: 3 }}>Right: Date · Confidential marker</li>
          </ul>
          <div style={{ marginTop: 10, padding: '8px 10px', background: '#eff6ff', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
            <FileText size={12} color="#3b82f6" />
            <span style={{ fontSize: 10, color: '#1d4ed8', fontWeight: 600 }}>
              Edit footer content in the <strong>Footer</strong> tab →
            </span>
          </div>
        </div>
        {/* Theme strip */}
        <ThemeStrip themeColors={themeColors} />
      </div>
    );
  }

  // ── Section selected ──────────────────────────────────────────────────────
  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      {selectedSection ? (
        <div>
          <div style={{ padding: '16px', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>{selectedSection.icon}</span>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#111827', margin: 0 }}>
                  {selectedSection.label}
                </p>
                <p style={{ fontSize: 10, color: '#9ca3af', margin: '2px 0 0 0' }}>
                  Type: {selectedSection.type} · Order: {selectedSection.order + 1}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span style={{
                fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 99,
                backgroundColor: selectedSection.visible ? '#d1fae5' : '#fee2e2',
                color: selectedSection.visible ? '#065f46' : '#991b1b',
              }}>
                {selectedSection.visible ? '● Visible' : '● Hidden'}
              </span>
              {editMode && (
                <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 99, backgroundColor: '#dbeafe', color: '#1e40af' }}>
                  ✏️ Editable
                </span>
              )}
              {isDataSection && (
                <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 99, backgroundColor: '#f0fdf4', color: '#15803d' }}>
                  📊 Live Data
                </span>
              )}
              {hasOverrides && (
                <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 99, backgroundColor: '#fef3c7', color: '#92400e' }}>
                  ✎ Edited
                </span>
              )}
            </div>
          </div>

          {/* Section info */}
          {SECTION_INFO[selectedSection.type] && (
            <div style={{ padding: '16px', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <Info size={13} color="#9ca3af" />
                <span style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Section Info
                </span>
              </div>
              <p style={{ fontSize: 11, color: '#4b5563', lineHeight: 1.6, margin: '0 0 12px 0' }}>
                {SECTION_INFO[selectedSection.type].description}
              </p>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                Content Elements
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 16px' }}>
                {SECTION_INFO[selectedSection.type].elements.map((el, i) => (
                  <li key={i} style={{ fontSize: 11, color: '#6b7280', marginBottom: 3 }}>{el}</li>
                ))}
              </ul>

              {isDataSection && (
                <div style={{ marginTop: 12, padding: '8px 10px', background: '#eff6ff', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <BarChart2 size={12} color="#3b82f6" />
                  <span style={{ fontSize: 10, color: '#1d4ed8', fontWeight: 600 }}>
                    Edit section data in the <strong>Data</strong> tab →
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Edit mode hint */}
          {editMode && !isDataSection && (
            <div style={{ padding: '16px', borderBottom: '1px solid #f3f4f6', backgroundColor: '#eff6ff' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <AlignLeft size={13} color="#3b82f6" style={{ marginTop: 1, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#1d4ed8', margin: '0 0 4px 0' }}>
                    Edit Mode Active
                  </p>
                  <p style={{ fontSize: 11, color: '#3b82f6', margin: 0, lineHeight: 1.5 }}>
                    Click any text in the canvas to edit it inline. Changes are saved to the store automatically on blur.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Text overrides control */}
          {!isDataSection && (
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: hasOverrides ? 8 : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={12} color={hasOverrides ? '#f59e0b' : '#9ca3af'} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: hasOverrides ? '#92400e' : '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Text Persistence
                  </span>
                </div>
              </div>
              {hasOverrides ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <p style={{ fontSize: 10, color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
                    {Object.keys(sectionTextOverrides[selectedSection.id] ?? {}).length} text edit(s) saved. Persist across mode switches and reloads.
                  </p>
                  <button
                    onClick={handleClearOverrides}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      padding: '4px 8px', fontSize: 10, borderRadius: 4, cursor: 'pointer',
                      border: `1px solid ${clearConfirm ? '#ef4444' : '#e5e7eb'}`,
                      background: clearConfirm ? '#fef2f2' : '#f9fafb',
                      color: clearConfirm ? '#dc2626' : '#6b7280',
                      fontFamily: 'Inter, sans-serif', fontWeight: 600,
                      transition: 'all 0.15s',
                    }}
                  >
                    <RotateCcw size={10} />
                    {clearConfirm ? '⚠️ Confirm — revert section text' : 'Clear text edits for this section'}
                  </button>
                </div>
              ) : (
                <p style={{ fontSize: 10, color: '#9ca3af', margin: 0, lineHeight: 1.5 }}>
                  No text edits saved. Enter Edit Mode and click any text to begin editing.
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div style={{ padding: '24px 16px', textAlign: 'center', color: '#9ca3af' }}>
          <div style={{ marginBottom: 12 }}>
            <Settings size={32} color="#e5e7eb" style={{ margin: '0 auto' }} />
          </div>
          <p style={{ fontSize: 12, margin: '0 0 6px 0', color: '#6b7280' }}>No section selected</p>
          <p style={{ fontSize: 11, margin: 0, lineHeight: 1.5 }}>
            Click a section in the canvas or list to view its properties.
          </p>
        </div>
      )}

      <ThemeStrip themeColors={themeColors} />
      <TypographyStrip />
    </div>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function ThemeStrip({ themeColors }: { themeColors: Record<string, string> }) {
  return (
    <div style={{ padding: '12px 16px', borderTop: '1px solid #f3f4f6' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <Palette size={12} color="#9ca3af" />
        <span style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Active Theme
        </span>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {(Object.values(themeColors) as string[]).map((c, i) => (
          <div key={i} title={c} style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: c, border: '1px solid rgba(0,0,0,0.1)' }} />
        ))}
      </div>
    </div>
  );
}

function TypographyStrip() {
  return (
    <div style={{ padding: '0 16px 16px', borderTop: '1px solid #f3f4f6' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, marginTop: 12 }}>
        <Type size={13} color="#9ca3af" />
        <span style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Typography (Locked)
        </span>
      </div>
      {TYPOGRAPHY_TOKENS.map(font => (
        <div key={font.name} style={{ padding: '5px 8px', marginBottom: 3, borderRadius: 4, backgroundColor: '#f9fafb', border: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#374151' }}>{font.name}</span>
            <span style={{ fontSize: 9, color: '#9ca3af', fontFamily: 'monospace' }}>w{font.weight}</span>
          </div>
          <p style={{ fontSize: 9, color: '#6b7280', margin: 0, lineHeight: 1.4 }}>{font.usage}</p>
        </div>
      ))}
    </div>
  );
}

// ── Main RightPanel ───────────────────────────────────────────────────────────

export function RightPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('inspect');
  const { sections, selectedSectionId } = useNewsletterStore();
  const selectedType = sections.find(s => s.id === selectedSectionId)?.type ?? '';
  const isFooterSelected = selectedSectionId === '__footer__';

  // Auto-switch tab based on selected section type
  const prevSelected = React.useRef(selectedSectionId);
  React.useEffect(() => {
    if (selectedSectionId !== prevSelected.current) {
      prevSelected.current = selectedSectionId;
      if (isFooterSelected) {
        setActiveTab('footer');
      } else if (
        selectedType === 'client-partners'    ||
        selectedType === 'monthly-snapshot'   ||
        selectedType === 'production-support' ||
        selectedType === 'release-forecast'   ||
        selectedType === 'modernisation'       ||
        selectedType === 'portfolio'           ||
        selectedType === 'top3-outcomes'       ||
        selectedType === 'watch-items'         ||
        selectedType === 'thank-you'           ||
        selectedType === 'metrics'             ||
        selectedType === 'business-impact'
      ) {
        setActiveTab('data');
      }
    }
  }, [selectedSectionId, selectedType, isFooterSelected]);

  return (
    <div style={{
      width: 288, flexShrink: 0,
      display: 'flex', flexDirection: 'column',
      backgroundColor: '#ffffff',
      borderLeft: '1px solid #e5e7eb',
      fontFamily: 'Inter, sans-serif',
      overflow: 'hidden',
    }}>
      {/* Tab bar */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb',
        flexShrink: 0,
        overflowX: 'auto',
      }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;

          // Highlight cues based on selected context
          const isDataHighlighted =
            tab.id === 'data' && (
              selectedType === 'client-partners'    ||
              selectedType === 'monthly-snapshot'   ||
              selectedType === 'production-support' ||
              selectedType === 'release-forecast'   ||
              selectedType === 'modernisation'       ||
              selectedType === 'portfolio'           ||
              selectedType === 'top3-outcomes'       ||
              selectedType === 'watch-items'         ||
              selectedType === 'thank-you'           ||
              selectedType === 'metrics'             ||
              selectedType === 'business-impact'
            );
          const isFooterHighlighted = tab.id === 'footer' && isFooterSelected;
          const isHighlighted = isDataHighlighted || isFooterHighlighted;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 3, padding: '10px 2px',
                border: 'none',
                borderBottom: isActive
                  ? '2px solid #3b82f6'
                  : isHighlighted
                    ? '2px solid #10b981'
                    : '2px solid transparent',
                backgroundColor: isActive ? '#ffffff' : 'transparent',
                color: isActive ? '#1d4ed8' : isHighlighted ? '#047857' : '#6b7280',
                cursor: 'pointer', fontSize: 9,
                fontWeight: isActive ? 700 : 500,
                transition: 'all 0.12s',
                marginBottom: isActive ? -1 : 0,
                position: 'relative',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {isHighlighted && !isActive && (
                <span style={{
                  position: 'absolute', top: 5, right: 3,
                  width: 4, height: 4, borderRadius: '50%',
                  background: '#10b981',
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {activeTab === 'inspect' && <InspectTab />}
        {activeTab === 'cover'   && (
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <CoverEditor />
          </div>
        )}
        {activeTab === 'colors'  && (
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <ColorCustomizer />
          </div>
        )}
        {activeTab === 'footer'  && <FooterEditor />}
        {activeTab === 'data'    && <ChartDataEditor />}
      </div>
    </div>
  );
}
