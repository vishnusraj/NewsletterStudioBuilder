import React from 'react';
import { useNewsletterStore, type MetricItem } from '../../store/useNewsletterStore';

const S: React.CSSProperties = { fontFamily: 'Inter, sans-serif' };

// ── Single metric card — pixel-faithful to the Figma design ──────────────────
// Figma layout uses absolute positioning inside a fixed-height container.
// We replicate that exactly so existing cards look identical.

function MetricCard({ item }: { item: MetricItem }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: 2,
      height: 131.5,
      position: 'relative',
      flex: '1 1 0',
      minWidth: 0,
    }}>
      {/* Top accent border — the only color that varies per card */}
      <div style={{
        position: 'absolute', inset: 0,
        border: '1px solid transparent',
        borderTop: `2px solid ${item.accentColor}`,
        borderRadius: 2,
        pointerEvents: 'none',
      }} />

      {/* Label — top-left, uppercase gray */}
      <div style={{
        position: 'absolute', top: 16, left: 16, right: 16,
      }}>
        <span style={{
          ...S, fontWeight: 900, fontSize: 9, color: '#6b7280',
          textTransform: 'uppercase', letterSpacing: '0.9px',
          lineHeight: '13.5px', display: 'block', whiteSpace: 'nowrap',
          overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {item.label}
        </span>
      </div>

      {/* Value — large number */}
      <div style={{
        position: 'absolute', top: 37.5, left: 16, right: 16,
      }}>
        <span style={{
          ...S, fontWeight: 900, fontSize: 30, color: '#041627',
          lineHeight: '36px', display: 'block', whiteSpace: 'nowrap',
        }}>
          {item.value}
        </span>
      </div>

      {/* Subtext — secondary label */}
      <div style={{
        position: 'absolute', top: 77.5, left: 16, right: 16,
      }}>
        <span style={{
          ...S, fontWeight: 700, fontSize: 10, color: '#9ca3af',
          lineHeight: '15px', display: 'block', whiteSpace: 'nowrap',
          overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {item.subtext}
        </span>
      </div>

      {/* Trend — colored indicator at bottom */}
      <div style={{
        position: 'absolute', top: 100.5, left: 16, right: 16,
      }}>
        <span style={{
          ...S, fontWeight: 900, fontSize: 10, color: item.trendColor,
          textTransform: 'uppercase', lineHeight: '15px',
          display: 'block', whiteSpace: 'nowrap',
          overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {item.trend}
        </span>
      </div>
    </div>
  );
}

// ── Section component ─────────────────────────────────────────────────────────

export function MetricsSection() {
  const { keyMetrics } = useNewsletterStore();
  const items = keyMetrics;

  // Auto-adjust columns: 1→1col, 2→2col, 3→3col, 4+→4col (matches Figma default of 4)
  const cols = Math.min(4, Math.max(1, items.length));

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap: '16px',
        width: '100%',
        position: 'relative',
      }}
    >
      {items.map(item => (
        <MetricCard key={item.id} item={item} />
      ))}

      {items.length === 0 && (
        <div style={{
          gridColumn: '1 / -1', padding: '32px', textAlign: 'center',
          color: '#9ca3af', background: 'white', borderRadius: 2,
          border: '2px dashed #e5e7eb', ...S, fontSize: 12,
        }}>
          No metrics. Use the Data tab to add cards.
        </div>
      )}
    </div>
  );
}
