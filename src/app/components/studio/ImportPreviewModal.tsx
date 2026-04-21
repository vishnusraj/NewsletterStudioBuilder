import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import type { ImportedData } from '../../utils/dataMapper';

// ── Section field definitions ────────────────────────────────────────────────

const SECTION_DEFS: Array<{
  key:    keyof ImportedData;
  label:  string;
  icon:   string;
  getRowCount: (data: ImportedData) => number;
  getPreview:  (data: ImportedData) => string[];
}> = [
  {
    key: 'client_partners', label: 'Client & Partners', icon: '🤝',
    getRowCount: (d) => d.client_partners ? 1 : 0,
    getPreview: (d) => d.client_partners
      ? [
          `Client: ${d.client_partners.client_name ?? '—'}`,
          `Partner: ${d.client_partners.partner_name ?? '—'}`,
        ]
      : [],
  },
  {
    key: 'monthly_snapshot', label: 'Monthly Snapshot', icon: '📋',
    getRowCount: (d) => d.monthly_snapshot ? 1 : 0,
    getPreview: (d) => d.monthly_snapshot
      ? [
          `Period: ${d.monthly_snapshot.period_label ?? '—'}`,
          `Headline: ${(d.monthly_snapshot.headline ?? '').slice(0, 50)}${(d.monthly_snapshot.headline?.length ?? 0) > 50 ? '…' : ''}`,
        ]
      : [],
  },
  {
    key: 'business_impact', label: 'Business Impact', icon: '💼',
    getRowCount: (d) => d.business_impact?.length ?? 0,
    getPreview: (d) => (d.business_impact ?? []).slice(0, 3)
      .map(r => `${r.programme_name ?? '—'} · ${r.health ?? '—'}`),
  },
  {
    key: 'top3_outcomes', label: 'Top 3 Outcomes', icon: '🏆',
    getRowCount: (d) => d.top3_outcomes?.length ?? 0,
    getPreview: (d) => (d.top3_outcomes ?? []).slice(0, 3)
      .map(r => r.title ?? '—'),
  },
  {
    key: 'production_support', label: 'Production Support', icon: '🛠️',
    getRowCount: (d) => {
      const ps = d.production_support;
      if (!ps) return 0;
      return (ps.chart_data?.length ?? 0) + (ps.stats ? 1 : 0);
    },
    getPreview: (d) => {
      const ps = d.production_support;
      if (!ps) return [];
      const lines: string[] = [];
      if (ps.chart_data?.length) lines.push(`Chart: ${ps.chart_data.length} system(s)`);
      if (ps.stats) lines.push(`Resolution rate: ${ps.stats.resolution_rate ?? '—'}`);
      return lines;
    },
  },
  {
    key: 'watch_items', label: 'Watch Items', icon: '👁️',
    getRowCount: (d) => d.watch_items?.length ?? 0,
    getPreview: (d) => (d.watch_items ?? []).slice(0, 3)
      .map(r => r.title ?? '—'),
  },
  {
    key: 'release_forecast', label: 'Release Forecast', icon: '🚀',
    getRowCount: (d) => {
      const rf = d.release_forecast;
      if (!rf) return 0;
      return (rf.upcoming_cards?.length ?? 0) + (rf.table?.length ?? 0);
    },
    getPreview: (d) => {
      const rf = d.release_forecast;
      if (!rf) return [];
      const lines: string[] = [];
      if (rf.upcoming_cards?.length) lines.push(`Cards: ${rf.upcoming_cards.length}`);
      if (rf.table?.length) lines.push(`Table rows: ${rf.table.length}`);
      return lines;
    },
  },
];

// ── Section Row ───────────────────────────────────────────────────────────────

function SectionRow({ def, data }: { def: typeof SECTION_DEFS[0]; data: ImportedData }) {
  const [expanded, setExpanded] = useState(false);
  const count    = def.getRowCount(data);
  const preview  = def.getPreview(data);
  const hasData  = count > 0;

  return (
    <div style={{
      borderRadius: 6, marginBottom: 6,
      border: `1px solid ${hasData ? '#d1fae5' : '#f3f4f6'}`,
      backgroundColor: hasData ? '#f0fdf4' : '#fafafa',
      overflow: 'hidden',
    }}>
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
          cursor: hasData ? 'pointer' : 'default',
        }}
        onClick={() => hasData && setExpanded(!expanded)}
      >
        <span style={{ fontSize: 14 }}>{def.icon}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: hasData ? '#166534' : '#9ca3af', flex: 1 }}>
          {def.label}
        </span>
        {hasData ? (
          <>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: '1px 7px', borderRadius: 99,
              backgroundColor: '#bbf7d0', color: '#14532d',
            }}>
              {count} field{count !== 1 ? 's' : ''}
            </span>
            <CheckCircle size={13} color="#16a34a" />
            {expanded ? <ChevronUp size={12} color="#6b7280" /> : <ChevronDown size={12} color="#6b7280" />}
          </>
        ) : (
          <span style={{
            fontSize: 10, fontWeight: 500, color: '#9ca3af',
            padding: '1px 7px', borderRadius: 99, backgroundColor: '#f3f4f6',
          }}>
            No data
          </span>
        )}
      </div>

      {hasData && expanded && preview.length > 0 && (
        <div style={{ padding: '0 12px 10px 34px', borderTop: '1px solid #d1fae5' }}>
          {preview.map((line, i) => (
            <p key={i} style={{ margin: '4px 0 0', fontSize: 10, color: '#374151', lineHeight: 1.5 }}>
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export interface ImportPreviewModalProps {
  filename:  string;
  data:      ImportedData;
  onConfirm: () => void;
  onCancel:  () => void;
}

export function ImportPreviewModal({ filename, data, onConfirm, onCancel }: ImportPreviewModalProps) {
  const foundSections  = SECTION_DEFS.filter(d => d.getRowCount(data) > 0);
  const emptySections  = SECTION_DEFS.filter(d => d.getRowCount(data) === 0);
  const totalFound     = foundSections.length;
  const totalPossible  = SECTION_DEFS.length;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      backgroundColor: 'rgba(0,0,0,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        width: '100%', maxWidth: 520,
        backgroundColor: '#ffffff', borderRadius: 12,
        boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        maxHeight: '85vh',
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 20px', borderBottom: '1px solid #f3f4f6',
          display: 'flex', alignItems: 'flex-start', gap: 12,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8, flexShrink: 0,
            backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FileText size={18} color="#16a34a" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#111827' }}>
              Import Preview
            </p>
            <p style={{ margin: '2px 0 0', fontSize: 11, color: '#6b7280' }}>
              <strong>{filename}</strong> — {totalFound} of {totalPossible} sections detected
            </p>
          </div>
          <button
            onClick={onCancel}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#9ca3af', padding: 4, display: 'flex',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Summary bar */}
        <div style={{ padding: '12px 20px', backgroundColor: totalFound > 0 ? '#f0fdf4' : '#fef2f2', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: 8 }}>
          {totalFound > 0 ? (
            <CheckCircle size={14} color="#16a34a" />
          ) : (
            <AlertCircle size={14} color="#dc2626" />
          )}
          <p style={{ margin: 0, fontSize: 11, color: totalFound > 0 ? '#166534' : '#991b1b' }}>
            {totalFound > 0
              ? `Ready to apply — ${totalFound} section${totalFound !== 1 ? 's' : ''} will be updated`
              : 'No recognisable data found — check your file format'}
          </p>
        </div>

        {/* Section list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          <p style={{ margin: '0 0 10px', fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Detected Data
          </p>

          {SECTION_DEFS.map(def => (
            <SectionRow key={String(def.key)} def={def} data={data} />
          ))}

          {emptySections.length > 0 && (
            <p style={{ margin: '12px 0 4px', fontSize: 10, color: '#9ca3af', lineHeight: 1.5 }}>
              ℹ️ {emptySections.length} section{emptySections.length !== 1 ? 's' : ''} had no matching data ({emptySections.map(s => s.label).join(', ')}). Existing content will be unchanged.
            </p>
          )}
        </div>

        {/* Footer actions */}
        <div style={{
          padding: '14px 20px', borderTop: '1px solid #f3f4f6',
          display: 'flex', justifyContent: 'flex-end', gap: 8,
          backgroundColor: '#fafafa',
        }}>
          <button
            onClick={onCancel}
            style={{
              padding: '8px 16px', borderRadius: 6, fontSize: 12, fontWeight: 600,
              border: '1px solid #e5e7eb', backgroundColor: '#ffffff', color: '#374151',
              cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f9fafb')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#ffffff')}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={totalFound === 0}
            style={{
              padding: '8px 20px', borderRadius: 6, fontSize: 12, fontWeight: 700,
              border: 'none',
              background: totalFound > 0 ? 'linear-gradient(135deg, #16a34a, #059669)' : '#e5e7eb',
              color: totalFound > 0 ? '#ffffff' : '#9ca3af',
              cursor: totalFound > 0 ? 'pointer' : 'not-allowed',
              boxShadow: totalFound > 0 ? '0 2px 8px rgba(22,163,74,0.3)' : 'none',
            }}
          >
            Apply Import
          </button>
        </div>
      </div>
    </div>
  );
}
