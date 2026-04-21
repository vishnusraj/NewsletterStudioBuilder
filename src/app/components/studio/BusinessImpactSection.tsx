import React from 'react';
import {
  useNewsletterStore,
  type BIRow,
  BI_HEALTH_COLORS,
} from '../../store/useNewsletterStore';

const S: React.CSSProperties = { fontFamily: 'Inter, sans-serif' };

// ── Column width proportions (sum ~100%) — mirrors Figma exactly ──────────────
// Programme: ~15%, Health: ~9.5%, What Delivered: ~25%, Why It Matters: remaining
const COL = {
  programme: '15%',
  health:    '10%',
  delivered: '25%',
  matters:   '49%', // flex: 1 would also work
};

// ── Header row ────────────────────────────────────────────────────────────────

function HeaderRow() {
  const headerCell: React.CSSProperties = {
    ...S, fontWeight: 900, fontSize: 10, color: 'white',
    textTransform: 'uppercase', letterSpacing: '1px', lineHeight: 'normal',
    padding: '16px 10px', boxSizing: 'border-box',
  };
  return (
    <div style={{
      background: '#041627',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', inset: 0, borderBottom: '1px solid #e5e7eb', pointerEvents: 'none' }} />
      <div style={{ ...headerCell, width: COL.programme, flexShrink: 0 }}>PROGRAMME</div>
      <div style={{ ...headerCell, width: COL.health,    flexShrink: 0 }}>HEALTH</div>
      <div style={{ ...headerCell, width: COL.delivered, flexShrink: 0 }}>WHAT WE DELIVERED</div>
      <div style={{ ...headerCell, flex: 1 }}>WHY IT MATTERS</div>
    </div>
  );
}

// ── Data row ──────────────────────────────────────────────────────────────────

function DataRow({ row, striped }: { row: BIRow; striped: boolean }) {
  const healthToken = BI_HEALTH_COLORS[row.health] ?? BI_HEALTH_COLORS['In Progress'];

  const cellBase: React.CSSProperties = {
    padding: '16px 10px',
    boxSizing: 'border-box',
    verticalAlign: 'top',
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      width: '100%',
      background: striped ? '#f5f3ef' : 'white',
      position: 'relative',
    }}>
      {/* Top divider */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, borderTop: '1px solid #dce3f2', pointerEvents: 'none' }} />

      {/* Programme col: category (bold) + programme name (gray) */}
      <div style={{ ...cellBase, width: COL.programme, flexShrink: 0 }}>
        <span style={{ ...S, fontWeight: 900, fontSize: 14, color: '#1a1a1a', lineHeight: '20px', display: 'block' }}>
          {row.category}
        </span>
        <span style={{ ...S, fontWeight: 400, fontSize: 12, color: '#6b7280', lineHeight: '16px', display: 'block', marginTop: 2 }}>
          {row.programmeName}
        </span>
      </div>

      {/* Health col: colored dot + label */}
      <div style={{ ...cellBase, width: COL.health, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: healthToken.dot, flexShrink: 0,
          }} />
          <span style={{
            ...S, fontWeight: 700, fontSize: 12, color: healthToken.text,
            lineHeight: '16px', whiteSpace: 'nowrap',
          }}>
            {row.health}
          </span>
        </div>
      </div>

      {/* What Delivered col */}
      <div style={{ ...cellBase, width: COL.delivered, flexShrink: 0 }}>
        <span style={{ ...S, fontWeight: 400, fontSize: 12, color: '#4b5563', lineHeight: '16px', display: 'block' }}>
          {row.whatDelivered}
        </span>
      </div>

      {/* Why It Matters col */}
      <div style={{ ...cellBase, flex: 1 }}>
        <span style={{ ...S, fontWeight: 700, fontSize: 12, color: '#1f2937', lineHeight: '16px', display: 'block' }}>
          {row.whyItMatters}
        </span>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export function BusinessImpactSection() {
  const { businessImpactRows } = useNewsletterStore();
  const rows = businessImpactRows;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', ...S }}>

      {/* ── Section heading bar ───────────────────────────────────────────── */}
      <div style={{
        position: 'relative', paddingBottom: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', flexShrink: 0,
      }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderBottom: '2px solid #041627', pointerEvents: 'none' }} />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ background: '#041627', width: 8, height: 8, flexShrink: 0 }} />
          <span style={{ fontFamily: 'Impact, sans-serif', fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1a1a1a', lineHeight: '16px' }}>
            BUSINESS IMPACT
          </span>
        </div>
        <span style={{ ...S, fontWeight: 700, fontSize: 9, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.9px' }}>
          LAST 30 DAYS
        </span>
      </div>

      {/* ── Table ─────────────────────────────────────────────────────────── */}
      {rows.length > 0 ? (
        <div style={{ width: '100%', overflow: 'clip', position: 'relative' }}>
          <HeaderRow />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {rows.map((row, i) => (
              <DataRow key={row.id} row={row} striped={i % 2 === 0} />
            ))}
          </div>
        </div>
      ) : (
        <div style={{
          padding: '32px', textAlign: 'center', color: '#9ca3af',
          background: 'white', border: '2px dashed #e5e7eb', ...S, fontSize: 12,
        }}>
          No impact rows. Use the Data tab to add programmes.
        </div>
      )}
    </div>
  );
}
