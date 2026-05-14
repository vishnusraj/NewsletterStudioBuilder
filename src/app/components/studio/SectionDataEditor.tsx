import React, { useState } from 'react';
import { Plus, Trash2, Copy, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import {
  useNewsletterStore,
  type ClientPartnerCard,
  type ModernisationItem,
  type PortfolioItem,
  type WatchItem,
  type OutcomeItem,
  type MetricItem,
  type BIRow,
  type BIHealth,
  BI_HEALTH_COLORS,
  BI_HEALTH_OPTIONS,
  WATCH_BADGE_PRESETS,
  DEFAULT_BUSINESS_IMPACT_HEADER_LABEL,
  DEFAULT_OUTCOMES_HEADER_LABEL,
  DEFAULT_MODERNISATION_HEADER_LABEL,
} from '../../store/useNewsletterStore';

// ── Shared micro-styles ───────────────────────────────────────────────────────

const cell: React.CSSProperties = {
  border: '1px solid #e5e7eb', borderRadius: 3, padding: '4px 6px',
  fontSize: 10, fontFamily: 'Inter, sans-serif', color: '#374151',
  background: 'white', outline: 'none', width: '100%', boxSizing: 'border-box',
};

const lbl: React.CSSProperties = {
  fontSize: 9, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase',
  letterSpacing: '0.06em', fontFamily: 'Inter, sans-serif', marginBottom: 3,
};

const sectionTitle: React.CSSProperties = {
  fontSize: 10, fontWeight: 700, color: '#374151', fontFamily: 'Inter, sans-serif',
  textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, marginTop: 4,
};

function Divider() {
  return <div style={{ height: 1, background: '#f3f4f6', margin: '10px 0' }} />;
}

function ColorInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: '100%', height: 26, border: '1px solid #e5e7eb', borderRadius: 3, cursor: 'pointer', padding: 1 }}
    />
  );
}

function ResetButton({ label: txt, onReset }: { label: string; onReset: () => void }) {
  const [confirm, setConfirm] = useState(false);
  const handle = () => {
    if (!confirm) { setConfirm(true); setTimeout(() => setConfirm(false), 3000); }
    else { onReset(); setConfirm(false); }
  };
  return (
    <button onClick={handle} style={{
      display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px',
      fontSize: 10, color: confirm ? '#dc2626' : '#6b7280',
      background: confirm ? '#fef2f2' : 'none',
      border: `1px solid ${confirm ? '#ef4444' : '#e5e7eb'}`,
      borderRadius: 3, cursor: 'pointer',
      fontFamily: 'Inter, sans-serif', marginTop: 2, transition: 'all 0.15s',
    }}>
      <RotateCcw size={11} />
      {confirm ? '⚠️ Confirm reset' : txt}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. KEY METRICS EDITOR
// ═══════════════════════════════════════════════════════════════════════════════

function MetricEditor({
  item,
  onUpdate,
  onDelete,
  onDuplicate,
}: {
  item: MetricItem;
  onUpdate: (id: string, f: Partial<MetricItem>) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 4, background: '#fafafa', overflow: 'hidden', borderTop: `3px solid ${item.accentColor}` }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px',
        background: '#f9fafb', borderBottom: open ? '1px solid #e5e7eb' : 'none', cursor: 'pointer',
      }} onClick={() => setOpen(o => !o)}>
        <div style={{ width: 8, height: 8, borderRadius: 2, background: item.accentColor, flexShrink: 0 }} />
        <span style={{ fontSize: 9, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif', flex: '0 0 auto' }}>
          {item.label || '(no label)'}
        </span>
        <span style={{ fontSize: 13, fontWeight: 900, color: '#1a1a1a', fontFamily: 'Inter, sans-serif', flex: 1, minWidth: 0 }}>
          {item.value}
        </span>
        <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
          <button onClick={e => { e.stopPropagation(); onDuplicate(item.id); }} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2, color: '#9ca3af', display: 'flex' }} title="Duplicate">
            <Copy size={10} />
          </button>
          <button onClick={e => { e.stopPropagation(); onDelete(item.id); }} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2, color: '#dc2626', display: 'flex' }} title="Delete">
            <Trash2 size={10} />
          </button>
          {open ? <ChevronUp size={12} color="#9ca3af" /> : <ChevronDown size={12} color="#9ca3af" />}
        </div>
      </div>

      {open && (
        <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {/* Label */}
          <div>
            <p style={lbl}>Label (uppercase heading)</p>
            <input style={{ ...cell, textTransform: 'uppercase', fontWeight: 700, fontSize: 9 }} value={item.label} onChange={e => onUpdate(item.id, { label: e.target.value })} />
          </div>
          {/* Value */}
          <div>
            <p style={lbl}>Value (large number)</p>
            <input style={{ ...cell, fontSize: 14, fontWeight: 900 }} value={item.value} onChange={e => onUpdate(item.id, { value: e.target.value })} />
          </div>
          {/* Subtext */}
          <div>
            <p style={lbl}>Subtext</p>
            <input style={cell} value={item.subtext} onChange={e => onUpdate(item.id, { subtext: e.target.value })} />
          </div>
          {/* Trend */}
          <div>
            <p style={lbl}>Trend indicator</p>
            <input style={cell} value={item.trend} onChange={e => onUpdate(item.id, { trend: e.target.value })} />
          </div>
          {/* Colors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            <div>
              <p style={lbl}>Accent (top border)</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <input type="color" value={item.accentColor} onChange={e => onUpdate(item.id, { accentColor: e.target.value })}
                  style={{ width: 28, height: 24, border: '1px solid #e5e7eb', borderRadius: 3, cursor: 'pointer', padding: 1, flexShrink: 0 }} />
                <span style={{ fontSize: 9, color: '#6b7280', fontFamily: 'monospace' }}>{item.accentColor}</span>
              </div>
            </div>
            <div>
              <p style={lbl}>Trend color</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <input type="color" value={item.trendColor} onChange={e => onUpdate(item.id, { trendColor: e.target.value })}
                  style={{ width: 28, height: 24, border: '1px solid #e5e7eb', borderRadius: 3, cursor: 'pointer', padding: 1, flexShrink: 0 }} />
                <span style={{ fontSize: 9, color: '#6b7280', fontFamily: 'monospace' }}>{item.trendColor}</span>
              </div>
            </div>
          </div>
          {/* Live preview */}
          <div style={{
            marginTop: 4, borderRadius: 3, border: `2px solid transparent`,
            borderTop: `3px solid ${item.accentColor}`,
            background: 'white', padding: '8px 10px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
          }}>
            <div style={{ fontSize: 7, color: '#6b7280', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.9px', fontWeight: 700, marginBottom: 2 }}>{item.label}</div>
            <div style={{ fontSize: 18, color: '#041627', fontFamily: 'Inter, sans-serif', fontWeight: 900, lineHeight: 1 }}>{item.value}</div>
            <div style={{ fontSize: 8, color: '#9ca3af', fontFamily: 'Inter, sans-serif', fontWeight: 700, marginTop: 3 }}>{item.subtext}</div>
            <div style={{ fontSize: 8, color: item.trendColor, fontFamily: 'Inter, sans-serif', fontWeight: 900, textTransform: 'uppercase', marginTop: 2 }}>{item.trend}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export function MetricsEditor() {
  const { keyMetrics, addMetric, updateMetric, deleteMetric, duplicateMetric, resetMetrics } = useNewsletterStore();
  const cols = Math.min(4, Math.max(1, keyMetrics.length));

  return (
    <div style={{ padding: '12px 14px', fontFamily: 'Inter, sans-serif' }}>
      {/* KPIs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        <div style={{ flex: 1, background: '#f9fafb', borderRadius: 4, padding: '5px 6px', border: '1px solid #f3f4f6', textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cards</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#1a1a1a', marginTop: 1 }}>{keyMetrics.length}</div>
        </div>
        <div style={{ flex: 1, background: '#f9fafb', borderRadius: 4, padding: '5px 6px', border: '1px solid #f3f4f6', textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Columns</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#1a1a1a', marginTop: 1 }}>{cols}</div>
        </div>
        <div style={{ flex: 2, background: '#eff6ff', borderRadius: 4, padding: '5px 8px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: '#1d4ed8', fontWeight: 600 }}>Auto-adjusts 1–4 columns</span>
        </div>
      </div>

      <Divider />
      <p style={sectionTitle}>Metric Cards</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {keyMetrics.map(item => (
          <MetricEditor key={item.id} item={item} onUpdate={updateMetric} onDelete={deleteMetric} onDuplicate={duplicateMetric} />
        ))}

        <button onClick={addMetric} style={{
          display: 'flex', alignItems: 'center', gap: 4, padding: '5px 8px',
          fontSize: 10, color: '#3b82f6', background: 'none',
          border: '1px dashed #bfdbfe', borderRadius: 3, cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', marginTop: 2,
        }}>
          <Plus size={11} /> Add metric card
        </button>
      </div>

      <Divider />
      <ResetButton label="Reset metrics to defaults" onReset={resetMetrics} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. BUSINESS IMPACT EDITOR
// ═══════════════════════════════════════════════════════════════════════════════

function BIRowEditor({
  row,
  onUpdate,
  onDelete,
  onDuplicate,
}: {
  row: BIRow;
  onUpdate: (id: string, f: Partial<BIRow>) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const healthToken = BI_HEALTH_COLORS[row.health] ?? BI_HEALTH_COLORS['In Progress'];

  return (
    <div style={{
      border: '1px solid #e5e7eb', borderRadius: 4, background: '#fafafa', overflow: 'hidden',
      borderLeft: `3px solid ${healthToken.dot}`,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px',
        background: '#f9fafb', borderBottom: open ? '1px solid #e5e7eb' : 'none', cursor: 'pointer',
      }} onClick={() => setOpen(o => !o)}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: healthToken.dot, flexShrink: 0 }} />
        <span style={{ fontSize: 10, fontWeight: 700, color: '#374151', fontFamily: 'Inter, sans-serif', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {row.category || '(unnamed)'} — {row.programmeName}
        </span>
        <span style={{ fontSize: 9, color: healthToken.text, fontFamily: 'Inter, sans-serif', fontWeight: 700, flexShrink: 0 }}>
          {row.health}
        </span>
        <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
          <button onClick={e => { e.stopPropagation(); onDuplicate(row.id); }} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2, color: '#9ca3af', display: 'flex' }} title="Duplicate">
            <Copy size={10} />
          </button>
          <button onClick={e => { e.stopPropagation(); onDelete(row.id); }} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2, color: '#dc2626', display: 'flex' }} title="Delete">
            <Trash2 size={10} />
          </button>
          {open ? <ChevronUp size={12} color="#9ca3af" /> : <ChevronDown size={12} color="#9ca3af" />}
        </div>
      </div>

      {open && (
        <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {/* Category + Programme */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            <div>
              <p style={lbl}>Category</p>
              <input style={cell} value={row.category} onChange={e => onUpdate(row.id, { category: e.target.value })} placeholder="e.g. Revenue Programmes" />
            </div>
            <div>
              <p style={lbl}>Programme Name</p>
              <input style={cell} value={row.programmeName} onChange={e => onUpdate(row.id, { programmeName: e.target.value })} placeholder="e.g. OneView Application" />
            </div>
          </div>

          {/* Health status */}
          <div>
            <p style={lbl}>Health Status</p>
            {/* Visual preset buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 5 }}>
              {BI_HEALTH_OPTIONS.map(h => {
                const tok = BI_HEALTH_COLORS[h];
                const isActive = row.health === h;
                return (
                  <button key={h} onClick={() => onUpdate(row.id, { health: h })} style={{
                    display: 'flex', alignItems: 'center', gap: 4, padding: '3px 7px',
                    border: `1px solid ${isActive ? tok.dot : '#e5e7eb'}`,
                    borderRadius: 99, background: isActive ? `${tok.dot}18` : 'white',
                    cursor: 'pointer', fontSize: 9, fontFamily: 'Inter, sans-serif',
                    fontWeight: isActive ? 700 : 500, color: isActive ? tok.text : '#6b7280',
                    outline: isActive ? `2px solid ${tok.dot}` : 'none', outlineOffset: 1,
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: tok.dot, flexShrink: 0 }} />
                    {h}
                  </button>
                );
              })}
            </div>
          </div>

          {/* What Delivered */}
          <div>
            <p style={lbl}>What We Delivered</p>
            <textarea style={{ ...cell, minHeight: 48, resize: 'vertical' }}
              value={row.whatDelivered}
              onChange={e => onUpdate(row.id, { whatDelivered: e.target.value })}
              placeholder="Describe what was delivered this period..."
            />
          </div>

          {/* Why It Matters */}
          <div>
            <p style={lbl}>Why It Matters</p>
            <textarea style={{ ...cell, minHeight: 52, resize: 'vertical' }}
              value={row.whyItMatters}
              onChange={e => onUpdate(row.id, { whyItMatters: e.target.value })}
              placeholder="Explain the business impact..."
            />
          </div>

          {/* Preview strip */}
          <div style={{ background: 'white', border: '1px solid #f3f4f6', borderLeft: `3px solid ${healthToken.dot}`, borderRadius: 2, padding: '6px 8px', marginTop: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: healthToken.dot, flexShrink: 0 }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: healthToken.text, fontFamily: 'Inter, sans-serif' }}>{row.health}</span>
              <span style={{ fontSize: 10, fontWeight: 900, color: '#1a1a1a', fontFamily: 'Inter, sans-serif' }}>{row.category}</span>
              <span style={{ fontSize: 9, color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>{row.programmeName}</span>
            </div>
            <div style={{ fontSize: 9, color: '#4b5563', fontFamily: 'Inter, sans-serif', lineHeight: 1.4 }}>
              <strong>Delivered:</strong> {row.whatDelivered.slice(0, 80)}{row.whatDelivered.length > 80 ? '…' : ''}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function BusinessImpactEditor() {
  const { businessImpactRows, businessImpactHeaderLabel, setBusinessImpactHeaderLabel, addBIRow, updateBIRow, deleteBIRow, duplicateBIRow, resetBIRows } = useNewsletterStore();

  const healthCounts = BI_HEALTH_OPTIONS.reduce((acc, h) => {
    acc[h] = businessImpactRows.filter(r => r.health === h).length;
    return acc;
  }, {} as Record<BIHealth, number>);

  return (
    <div style={{ padding: '12px 14px', fontFamily: 'Inter, sans-serif' }}>
      {/* KPIs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        <div style={{ flex: 1, background: '#f9fafb', borderRadius: 4, padding: '5px 6px', border: '1px solid #f3f4f6', textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rows</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#1a1a1a', marginTop: 1 }}>{businessImpactRows.length}</div>
        </div>
        <div style={{ flex: 1, background: '#d1fae5', borderRadius: 4, padding: '5px 6px', border: '1px solid #a7f3d0', textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: '#065f46', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>On Track</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#006b5f', marginTop: 1 }}>{healthCounts['On Track']}</div>
        </div>
        <div style={{ flex: 1, background: '#fef9c3', borderRadius: 4, padding: '5px 6px', border: '1px solid #fde68a', textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: '#92400e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>In Prog.</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#f59e0b', marginTop: 1 }}>{healthCounts['In Progress']}</div>
        </div>
        <div style={{ flex: 1, background: '#fee2e2', borderRadius: 4, padding: '5px 6px', border: '1px solid #fca5a5', textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: '#991b1b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>At Risk</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#ef4444', marginTop: 1 }}>{healthCounts['At Risk']}</div>
        </div>
      </div>

      {/* Design hint */}
      <div style={{ padding: '6px 8px', background: '#eff6ff', borderRadius: 4, fontSize: 9, color: '#1d4ed8', marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>
        Table columns: <strong>Programme</strong> · <strong>Health</strong> · <strong>What We Delivered</strong> · <strong>Why It Matters</strong>
      </div>

      <Divider />
      <p style={sectionTitle}>Section Header</p>
      <div style={{ marginBottom: 10 }}>
        <p style={lbl}>Right-side Label</p>
        <input style={{ ...cell, textTransform: 'uppercase', fontWeight: 700 }} value={businessImpactHeaderLabel} onChange={e => setBusinessImpactHeaderLabel(e.target.value)} />
      </div>

      <Divider />
      <p style={sectionTitle}>Programme Rows</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {businessImpactRows.map(row => (
          <BIRowEditor key={row.id} row={row} onUpdate={updateBIRow} onDelete={deleteBIRow} onDuplicate={duplicateBIRow} />
        ))}

        <button onClick={addBIRow} style={{
          display: 'flex', alignItems: 'center', gap: 4, padding: '5px 8px',
          fontSize: 10, color: '#3b82f6', background: 'none',
          border: '1px dashed #bfdbfe', borderRadius: 3, cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', marginTop: 2,
        }}>
          <Plus size={11} /> Add programme row
        </button>
      </div>

      <Divider />
      <ResetButton label="Reset to defaults" onReset={() => { resetBIRows(); setBusinessImpactHeaderLabel(DEFAULT_BUSINESS_IMPACT_HEADER_LABEL); }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. STATUS PRESETS for Modernisation
// ═══════════════════════════════════════════════════════════════════════════════

const STATUS_PRESETS = [
  { label: 'In Progress',      statusLabel: 'IN PROGRESS',      statusBg: '#ffedd5', statusColor: '#9a3412', statusBorder: '' },
  { label: 'Strategic Eval',   statusLabel: 'STRATEGIC EVAL',   statusBg: '#e0e7ff', statusColor: '#3730a3', statusBorder: '' },
  { label: 'Approval Pending', statusLabel: 'APPROVAL PENDING', statusBg: '#fffbeb', statusColor: '#b45309', statusBorder: '#fde68a' },
  { label: 'In Design',        statusLabel: 'IN DESIGN',        statusBg: '#ffedd5', statusColor: '#9a3412', statusBorder: '' },
  { label: 'Complete',         statusLabel: 'COMPLETE',         statusBg: '#d1fae5', statusColor: '#065f46', statusBorder: '' },
  { label: 'On Hold',          statusLabel: 'ON HOLD',          statusBg: '#f3f4f6', statusColor: '#6b7280', statusBorder: '' },
  { label: 'POC Complete',     statusLabel: 'POC COMPLETE',     statusBg: '#ede9fe', statusColor: '#5b21b6', statusBorder: '' },
  { label: 'Planned',          statusLabel: 'PLANNED',          statusBg: '#dbeafe', statusColor: '#1e40af', statusBorder: '' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// 4. MODERNISATION EDITOR
// ═══════════════════════════════════════════════════════════════════════════════

function ModItemEditor({
  item, onUpdate, onDelete, onDuplicate,
}: {
  item: ModernisationItem;
  onUpdate: (id: string, f: Partial<ModernisationItem>) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const applyPreset = (p: typeof STATUS_PRESETS[0]) =>
    onUpdate(item.id, { statusLabel: p.statusLabel, statusBg: p.statusBg, statusColor: p.statusColor, statusBorder: p.statusBorder });

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 4, background: '#fafafa', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px', background: '#f9fafb', borderBottom: open ? '1px solid #e5e7eb' : 'none', cursor: 'pointer' }}
        onClick={() => setOpen(o => !o)}>
        <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 2, background: item.statusBg, color: item.statusColor, textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', flexShrink: 0, border: item.statusBorder ? `1px solid ${item.statusBorder}` : 'none' }}>
          {item.statusLabel}
        </span>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#374151', fontFamily: 'Inter, sans-serif', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {item.title || '(untitled)'}
        </span>
        <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
          <button onClick={e => { e.stopPropagation(); onDuplicate(item.id); }} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2, color: '#9ca3af', display: 'flex' }} title="Duplicate"><Copy size={10} /></button>
          <button onClick={e => { e.stopPropagation(); onDelete(item.id); }} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2, color: '#dc2626', display: 'flex' }} title="Delete"><Trash2 size={10} /></button>
          {open ? <ChevronUp size={12} color="#9ca3af" /> : <ChevronDown size={12} color="#9ca3af" />}
        </div>
      </div>

      {open && (
        <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div>
            <p style={lbl}>Title</p>
            <input style={cell} value={item.title} onChange={e => onUpdate(item.id, { title: e.target.value })} />
          </div>
          <div>
            <p style={lbl}>Description</p>
            <textarea style={{ ...cell, minHeight: 52, resize: 'vertical' }} value={item.description} onChange={e => onUpdate(item.id, { description: e.target.value })} />
          </div>
          <div>
            <p style={lbl}>Status Badge — Presets</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
              {STATUS_PRESETS.map(p => (
                <button key={p.statusLabel} onClick={() => applyPreset(p)} style={{
                  fontSize: 8, fontWeight: 700, padding: '2px 5px', borderRadius: 2,
                  background: p.statusBg, color: p.statusColor, textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em', cursor: 'pointer',
                  border: p.statusBorder ? `1px solid ${p.statusBorder}` : '1px solid transparent',
                  outline: item.statusLabel === p.statusLabel ? `2px solid #3b82f6` : 'none', outlineOffset: 1,
                }}>{p.statusLabel}</button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 60px', gap: 4 }}>
              <div>
                <p style={{ ...lbl, marginBottom: 2 }}>Custom label</p>
                <input style={cell} value={item.statusLabel} onChange={e => onUpdate(item.id, { statusLabel: e.target.value })} />
              </div>
              <div>
                <p style={{ ...lbl, marginBottom: 2 }}>BG</p>
                <input type="color" value={item.statusBg} onChange={e => onUpdate(item.id, { statusBg: e.target.value })} style={{ width: '100%', height: 26, border: '1px solid #e5e7eb', borderRadius: 3, cursor: 'pointer', padding: 1 }} />
              </div>
              <div>
                <p style={{ ...lbl, marginBottom: 2 }}>Text</p>
                <input type="color" value={item.statusColor} onChange={e => onUpdate(item.id, { statusColor: e.target.value })} style={{ width: '100%', height: 26, border: '1px solid #e5e7eb', borderRadius: 3, cursor: 'pointer', padding: 1 }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ModernisationEditor() {
  const { modernisationItems, modernisationHeaderLabel, setModernisationHeaderLabel, addModernisationItem, updateModernisationItem, deleteModernisationItem, duplicateModernisationItem, resetModernisationItems } = useNewsletterStore();

  return (
    <div style={{ padding: '12px 14px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        <div style={{ flex: 1, background: '#f9fafb', borderRadius: 4, padding: '5px 6px', border: '1px solid #f3f4f6', textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Items</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#1a1a1a', marginTop: 1 }}>{modernisationItems.length}</div>
        </div>
        <div style={{ flex: 1, background: '#f9fafb', borderRadius: 4, padding: '5px 6px', border: '1px solid #f3f4f6', textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rows</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#1a1a1a', marginTop: 1 }}>{Math.ceil(modernisationItems.length / 2)}</div>
        </div>
        <div style={{ flex: 2, background: '#eff6ff', borderRadius: 4, padding: '5px 8px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: '#1d4ed8', fontWeight: 600 }}>2-column · auto-reflows</span>
        </div>
      </div>
      <Divider />
      <p style={sectionTitle}>Section Header</p>
      <div style={{ marginBottom: 10 }}>
        <p style={lbl}>Right-side Label</p>
        <input style={{ ...cell, textTransform: 'uppercase', fontWeight: 700 }} value={modernisationHeaderLabel} onChange={e => setModernisationHeaderLabel(e.target.value)} />
      </div>
      <Divider />
      <p style={sectionTitle}>Initiative Items</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {modernisationItems.map(item => (
          <ModItemEditor key={item.id} item={item} onUpdate={updateModernisationItem} onDelete={deleteModernisationItem} onDuplicate={duplicateModernisationItem} />
        ))}
        <button onClick={addModernisationItem} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 8px', fontSize: 10, color: '#3b82f6', background: 'none', border: '1px dashed #bfdbfe', borderRadius: 3, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>
          <Plus size={11} /> Add initiative
        </button>
      </div>
      <Divider />
      <ResetButton label="Reset modernisation data" onReset={() => { resetModernisationItems(); setModernisationHeaderLabel(DEFAULT_MODERNISATION_HEADER_LABEL); }} />
    </div>
  );
}

// ═���═════════════════════════════════════════════════════════════════════════════
// 5. PORTFOLIO EDITOR
// ═══════════════════════════════════════════════════════════════════════════════

function PortItemEditor({
  item, onUpdate, onDelete, onDuplicate,
}: {
  item: PortfolioItem;
  onUpdate: (id: string, f: Partial<PortfolioItem>) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ border: `1px solid ${item.highlighted ? '#041627' : '#e5e7eb'}`, borderRadius: 4, background: item.highlighted ? '#f0f4f8' : '#fafafa', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px', background: item.highlighted ? '#041627' : '#f9fafb', borderBottom: open ? `1px solid ${item.highlighted ? '#1e3a5f' : '#e5e7eb'}` : 'none', cursor: 'pointer' }}
        onClick={() => setOpen(o => !o)}>
        <span style={{ fontSize: 10, fontWeight: 900, color: item.highlighted ? 'white' : '#1a1a1a', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {item.name || '(unnamed)'}
        </span>
        <span style={{ fontSize: 9, color: item.highlighted ? '#9ca3af' : '#6b7280', fontFamily: 'Inter, sans-serif', flex: 1 }}>{item.category}</span>
        {item.highlighted && <span style={{ fontSize: 8, background: '#3b82f6', color: 'white', padding: '1px 5px', borderRadius: 99, fontFamily: 'Inter, sans-serif', fontWeight: 700, flexShrink: 0 }}>HIGHLIGHTED</span>}
        <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
          <button onClick={e => { e.stopPropagation(); onDuplicate(item.id); }} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2, color: item.highlighted ? '#6b7280' : '#9ca3af', display: 'flex' }}><Copy size={10} /></button>
          <button onClick={e => { e.stopPropagation(); onDelete(item.id); }} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2, color: '#dc2626', display: 'flex' }}><Trash2 size={10} /></button>
          {open ? <ChevronUp size={12} color={item.highlighted ? '#6b7280' : '#9ca3af'} /> : <ChevronDown size={12} color={item.highlighted ? '#6b7280' : '#9ca3af'} />}
        </div>
      </div>
      {open && (
        <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            <div>
              <p style={lbl}>Platform Name</p>
              <input style={{ ...cell, textTransform: 'uppercase', fontWeight: 700 }} value={item.name} onChange={e => onUpdate(item.id, { name: e.target.value })} />
            </div>
            <div>
              <p style={lbl}>Category</p>
              <input style={{ ...cell, textTransform: 'uppercase', fontSize: 9 }} value={item.category} onChange={e => onUpdate(item.id, { category: e.target.value })} />
            </div>
          </div>
          <div><p style={lbl}>Tagline</p><input style={cell} value={item.tagline} onChange={e => onUpdate(item.id, { tagline: e.target.value })} /></div>
          <div><p style={lbl}>Description</p><textarea style={{ ...cell, minHeight: 48, resize: 'vertical' }} value={item.description} onChange={e => onUpdate(item.id, { description: e.target.value })} /></div>
          <div><p style={lbl}>Tech Stack</p><input style={cell} value={item.techStack} onChange={e => onUpdate(item.id, { techStack: e.target.value })} /></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', padding: '4px 0' }}>
            <input type="checkbox" checked={item.highlighted} onChange={e => onUpdate(item.id, { highlighted: e.target.checked })} style={{ width: 13, height: 13, cursor: 'pointer', accentColor: '#041627' }} />
            <span style={{ fontSize: 10, color: '#374151', fontFamily: 'Inter, sans-serif' }}>Dark card (highlighted — e.g. Middleware)</span>
          </label>
        </div>
      )}
    </div>
  );
}

export function PortfolioEditor() {
  const { portfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem, duplicatePortfolioItem, resetPortfolioItems } = useNewsletterStore();
  const highlightedCount = portfolioItems.filter(i => i.highlighted).length;

  return (
    <div style={{ padding: '12px 14px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        <div style={{ flex: 1, background: '#f9fafb', borderRadius: 4, padding: '5px 6px', border: '1px solid #f3f4f6', textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Platforms</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#1a1a1a', marginTop: 1 }}>{portfolioItems.length}</div>
        </div>
        <div style={{ flex: 1, background: '#f9fafb', borderRadius: 4, padding: '5px 6px', border: '1px solid #f3f4f6', textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Highlighted</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#041627', marginTop: 1 }}>{highlightedCount}</div>
        </div>
        <div style={{ flex: 2, background: '#eff6ff', borderRadius: 4, padding: '5px 8px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: '#1d4ed8', fontWeight: 600 }}>3-col responsive grid</span>
        </div>
      </div>
      {highlightedCount > 1 && (
        <div style={{ padding: '6px 8px', background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 4, fontSize: 9, color: '#92400e', fontFamily: 'Inter, sans-serif', marginBottom: 10 }}>
          ⚠️ Multiple highlighted cards — only one recommended for visual balance.
        </div>
      )}
      <Divider />
      <p style={sectionTitle}>Platform Cards</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {portfolioItems.map(item => (
          <PortItemEditor key={item.id} item={item} onUpdate={updatePortfolioItem} onDelete={deletePortfolioItem} onDuplicate={duplicatePortfolioItem} />
        ))}
        <button onClick={addPortfolioItem} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 8px', fontSize: 10, color: '#3b82f6', background: 'none', border: '1px dashed #bfdbfe', borderRadius: 3, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>
          <Plus size={11} /> Add platform
        </button>
      </div>
      <Divider />
      <ResetButton label="Reset portfolio data" onReset={resetPortfolioItems} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. CLIENT & PARTNERS EDITOR
// ═══════════════════════════════════════════════════════════════════════════════

function ClientPartnerCardEditor({
  title,
  card,
  onUpdate,
}: {
  title: string;
  card: ClientPartnerCard;
  onUpdate: (fields: Partial<ClientPartnerCard>) => void;
}) {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 4, background: '#fafafa', padding: 8 }}>
      <p style={{ ...sectionTitle, marginTop: 0 }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div>
          <p style={lbl}>Name</p>
          <input style={{ ...cell, fontWeight: 900 }} value={card.name} onChange={e => onUpdate({ name: e.target.value })} />
        </div>
        <div>
          <p style={lbl}>Badge Label</p>
          <input style={{ ...cell, textTransform: 'uppercase', fontWeight: 700 }} value={card.badgeLabel} onChange={e => onUpdate({ badgeLabel: e.target.value })} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          <div>
            <p style={lbl}>Badge Background</p>
            <ColorInput value={card.badgeBg} onChange={(badgeBg) => onUpdate({ badgeBg })} />
          </div>
          <div>
            <p style={lbl}>Badge Text Color</p>
            <ColorInput value={card.badgeColor} onChange={(badgeColor) => onUpdate({ badgeColor })} />
          </div>
        </div>
        <div>
          <p style={lbl}>Description</p>
          <textarea style={{ ...cell, minHeight: 112, resize: 'vertical' }} value={card.description} onChange={e => onUpdate({ description: e.target.value })} />
        </div>
      </div>
    </div>
  );
}

export function ClientPartnersEditor() {
  const { clientPartnersData, updateClientPartnerCard, resetClientPartnersData } = useNewsletterStore();

  return (
    <div style={{ padding: '12px 14px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        <div style={{ flex: 1, background: '#f9fafb', borderRadius: 4, padding: '5px 6px', border: '1px solid #f3f4f6', textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cards</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#1a1a1a', marginTop: 1 }}>2</div>
        </div>
        <div style={{ flex: 2, background: '#eff6ff', borderRadius: 4, padding: '5px 8px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: '#1d4ed8', fontWeight: 600 }}>Stakeholder intro cards</span>
        </div>
      </div>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <ClientPartnerCardEditor title="Client" card={clientPartnersData.client} onUpdate={(fields) => updateClientPartnerCard('client', fields)} />
        <ClientPartnerCardEditor title="Partner" card={clientPartnersData.partner} onUpdate={(fields) => updateClientPartnerCard('partner', fields)} />
      </div>
      <Divider />
      <ResetButton label="Reset client & partners" onReset={resetClientPartnersData} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6. MONTHLY SNAPSHOT EDITOR
// ═══════════════════════════════════════════════════════════════════════════════

export function MonthlySnapshotEditor() {
  const { monthlySnapshotData, updateMonthlySnapshotField, resetMonthlySnapshotData } = useNewsletterStore();

  return (
    <div style={{ padding: '12px 14px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        <div style={{ flex: 1, background: '#f9fafb', borderRadius: 4, padding: '5px 6px', border: '1px solid #f3f4f6', textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Section</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#1a1a1a', marginTop: 1 }}>1</div>
        </div>
        <div style={{ flex: 2, background: '#eff6ff', borderRadius: 4, padding: '5px 8px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: '#1d4ed8', fontWeight: 600 }}>Executive summary block</span>
        </div>
      </div>
      <Divider />
      <p style={sectionTitle}>Snapshot Content</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div>
          <p style={lbl}>Period Label</p>
          <input style={{ ...cell, textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em' }} value={monthlySnapshotData.periodLabel} onChange={e => updateMonthlySnapshotField('periodLabel', e.target.value)} />
        </div>
        <div>
          <p style={lbl}>Headline</p>
          <textarea style={{ ...cell, minHeight: 72, resize: 'vertical', fontWeight: 700, fontSize: 12 }} value={monthlySnapshotData.headline} onChange={e => updateMonthlySnapshotField('headline', e.target.value)} />
        </div>
        <div>
          <p style={lbl}>Body Text</p>
          <textarea style={{ ...cell, minHeight: 120, resize: 'vertical' }} value={monthlySnapshotData.bodyText} onChange={e => updateMonthlySnapshotField('bodyText', e.target.value)} />
        </div>
      </div>
      <Divider />
      <ResetButton label="Reset monthly snapshot" onReset={resetMonthlySnapshotData} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 7. TOP 3 OUTCOMES EDITOR
// ═══════════════════════════════════════════════════════════════════════════════

function OutcomeItemEditor({
  item,
  onUpdate,
  onDelete,
  onDuplicate,
}: {
  item: OutcomeItem;
  onUpdate: (id: string, f: Partial<OutcomeItem>) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 4, background: '#fafafa', overflow: 'hidden' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px', background: '#f9fafb', borderBottom: open ? '1px solid #e5e7eb' : 'none', cursor: 'pointer' }}
        onClick={() => setOpen(o => !o)}
      >
        <span style={{ fontSize: 9, fontWeight: 900, color: '#9ca3af', fontFamily: 'Inter, sans-serif', width: 26, flexShrink: 0 }}>
          {item.number}
        </span>
        <span style={{ fontSize: 10, fontWeight: 900, color: '#1a1a1a', fontFamily: 'Inter, sans-serif', flex: 1 }}>
          {item.title || '(untitled outcome)'}
        </span>
        <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
          <button onClick={e => { e.stopPropagation(); onDuplicate(item.id); }} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2, color: '#9ca3af', display: 'flex' }} title="Duplicate"><Copy size={10} /></button>
          <button onClick={e => { e.stopPropagation(); onDelete(item.id); }} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2, color: '#dc2626', display: 'flex' }} title="Delete"><Trash2 size={10} /></button>
          {open ? <ChevronUp size={12} color="#9ca3af" /> : <ChevronDown size={12} color="#9ca3af" />}
        </div>
      </div>

      {open && (
        <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 4 }}>
            <div>
              <p style={lbl}>Number</p>
              <input style={{ ...cell, fontWeight: 900 }} value={item.number} onChange={e => onUpdate(item.id, { number: e.target.value })} />
            </div>
            <div>
              <p style={lbl}>Title</p>
              <input style={{ ...cell, fontWeight: 700 }} value={item.title} onChange={e => onUpdate(item.id, { title: e.target.value })} />
            </div>
          </div>
          <div>
            <p style={lbl}>Description</p>
            <textarea style={{ ...cell, minHeight: 62, resize: 'vertical' }} value={item.description} onChange={e => onUpdate(item.id, { description: e.target.value })} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            <div>
              <p style={lbl}>Tag 1</p>
              <input style={{ ...cell, textTransform: 'uppercase', fontWeight: 700, fontSize: 9 }} value={item.tag1} onChange={e => onUpdate(item.id, { tag1: e.target.value })} />
            </div>
            <div>
              <p style={lbl}>Tag 2</p>
              <input style={{ ...cell, textTransform: 'uppercase', fontWeight: 700, fontSize: 9 }} value={item.tag2} onChange={e => onUpdate(item.id, { tag2: e.target.value })} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function OutcomesEditor() {
  const { outcomeItems, outcomesHeaderLabel, setOutcomesHeaderLabel, addOutcomeItem, updateOutcomeItem, deleteOutcomeItem, duplicateOutcomeItem, resetOutcomeItems } = useNewsletterStore();

  return (
    <div style={{ padding: '12px 14px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        <div style={{ flex: 1, background: '#f9fafb', borderRadius: 4, padding: '5px 6px', border: '1px solid #f3f4f6', textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cards</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#1a1a1a', marginTop: 1 }}>{outcomeItems.length}</div>
        </div>
        <div style={{ flex: 2, background: '#eff6ff', borderRadius: 4, padding: '5px 8px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: '#1d4ed8', fontWeight: 600 }}>3-card outcomes grid with tags</span>
        </div>
      </div>
      <Divider />
      <p style={sectionTitle}>Section Header</p>
      <div style={{ marginBottom: 10 }}>
        <p style={lbl}>Right-side Label</p>
        <input style={{ ...cell, textTransform: 'uppercase', fontWeight: 700 }} value={outcomesHeaderLabel} onChange={e => setOutcomesHeaderLabel(e.target.value)} />
      </div>
      <Divider />
      <p style={sectionTitle}>Outcome Cards</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {outcomeItems.map(item => (
          <OutcomeItemEditor key={item.id} item={item} onUpdate={updateOutcomeItem} onDelete={deleteOutcomeItem} onDuplicate={duplicateOutcomeItem} />
        ))}
        <button onClick={addOutcomeItem} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 8px', fontSize: 10, color: '#3b82f6', background: 'none', border: '1px dashed #bfdbfe', borderRadius: 3, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>
          <Plus size={11} /> Add outcome card
        </button>
      </div>
      <Divider />
      <ResetButton label="Reset outcomes" onReset={() => { resetOutcomeItems(); setOutcomesHeaderLabel(DEFAULT_OUTCOMES_HEADER_LABEL); }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 8. WATCH ITEMS EDITOR
// ═══════════════════════════════════════════════════════════════════════════════

const WATCH_PRESETS = [
  { label: 'Watch', ...WATCH_BADGE_PRESETS.watch },
  { label: 'Input Needed', ...WATCH_BADGE_PRESETS.inputNeeded },
  { label: 'Positive Signal', ...WATCH_BADGE_PRESETS.positiveSignal },
];

function WatchItemEditor({
  item,
  onUpdate,
  onDelete,
  onDuplicate,
}: {
  item: WatchItem;
  onUpdate: (id: string, f: Partial<WatchItem>) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);

  const applyPreset = (preset: typeof WATCH_PRESETS[number]) => {
    onUpdate(item.id, {
      badgeLabel: preset.badgeLabel,
      badgeBg: preset.badgeBg,
      badgeColor: preset.badgeColor,
    });
  };

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 4, background: '#fafafa', overflow: 'hidden' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px', background: '#f9fafb', borderBottom: open ? '1px solid #e5e7eb' : 'none', cursor: 'pointer' }}
        onClick={() => setOpen(o => !o)}
      >
        <span style={{ fontSize: 10, fontWeight: 900, color: '#1a1a1a', fontFamily: 'Inter, sans-serif', flex: 1 }}>
          {item.title || '(untitled watch item)'}
        </span>
        <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 2, background: item.badgeBg, color: item.badgeColor, textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', flexShrink: 0 }}>
          {item.badgeLabel}
        </span>
        <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
          <button onClick={e => { e.stopPropagation(); onDuplicate(item.id); }} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2, color: '#9ca3af', display: 'flex' }} title="Duplicate"><Copy size={10} /></button>
          <button onClick={e => { e.stopPropagation(); onDelete(item.id); }} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2, color: '#dc2626', display: 'flex' }} title="Delete"><Trash2 size={10} /></button>
          {open ? <ChevronUp size={12} color="#9ca3af" /> : <ChevronDown size={12} color="#9ca3af" />}
        </div>
      </div>

      {open && (
        <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div>
            <p style={lbl}>Title</p>
            <input style={{ ...cell, fontWeight: 700 }} value={item.title} onChange={e => onUpdate(item.id, { title: e.target.value })} />
          </div>
          <div>
            <p style={lbl}>Description</p>
            <textarea style={{ ...cell, minHeight: 56, resize: 'vertical' }} value={item.description} onChange={e => onUpdate(item.id, { description: e.target.value })} />
          </div>

          <div>
            <p style={lbl}>Badge Presets</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {WATCH_PRESETS.map(preset => (
                <button
                  key={preset.label}
                  onClick={() => applyPreset(preset)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 3,
                    cursor: 'pointer',
                    fontSize: 9,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    background: preset.badgeBg,
                    color: preset.badgeColor,
                    border: item.badgeLabel === preset.badgeLabel ? '2px solid #3b82f6' : '1px solid transparent',
                  }}
                >
                  {preset.badgeLabel}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            <div>
              <p style={lbl}>Badge Label</p>
              <input style={{ ...cell, textTransform: 'uppercase', fontSize: 9, fontWeight: 700 }} value={item.badgeLabel} onChange={e => onUpdate(item.id, { badgeLabel: e.target.value })} />
            </div>
            <div>
              <p style={lbl}>Badge Text Color</p>
              <input type="color" value={item.badgeColor} onChange={e => onUpdate(item.id, { badgeColor: e.target.value })} style={{ width: '100%', height: 26, border: '1px solid #e5e7eb', borderRadius: 3, cursor: 'pointer', padding: 1 }} />
            </div>
          </div>

          <div>
            <p style={lbl}>Badge Background</p>
            <input type="color" value={item.badgeBg} onChange={e => onUpdate(item.id, { badgeBg: e.target.value })} style={{ width: '100%', height: 26, border: '1px solid #e5e7eb', borderRadius: 3, cursor: 'pointer', padding: 1 }} />
          </div>
        </div>
      )}
    </div>
  );
}

export function WatchItemsEditor() {
  const { watchItems, addWatchItem, updateWatchItem, deleteWatchItem, duplicateWatchItem, resetWatchItems } = useNewsletterStore();

  return (
    <div style={{ padding: '12px 14px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        <div style={{ flex: 1, background: '#f9fafb', borderRadius: 4, padding: '5px 6px', border: '1px solid #f3f4f6', textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Items</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#1a1a1a', marginTop: 1 }}>{watchItems.length}</div>
        </div>
        <div style={{ flex: 2, background: '#eff6ff', borderRadius: 4, padding: '5px 8px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: '#1d4ed8', fontWeight: 600 }}>3-card strategic watch grid</span>
        </div>
      </div>
      <Divider />
      <p style={sectionTitle}>Watch Item Cards</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {watchItems.map(item => (
          <WatchItemEditor key={item.id} item={item} onUpdate={updateWatchItem} onDelete={deleteWatchItem} onDuplicate={duplicateWatchItem} />
        ))}
        <button onClick={addWatchItem} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 8px', fontSize: 10, color: '#3b82f6', background: 'none', border: '1px dashed #bfdbfe', borderRadius: 3, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>
          <Plus size={11} /> Add watch item
        </button>
      </div>
      <Divider />
      <ResetButton label="Reset watch items" onReset={resetWatchItems} />
    </div>
  );
}
