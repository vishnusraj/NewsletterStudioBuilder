import React from 'react';
import { useNewsletterStore, type ModernisationItem } from '../../store/useNewsletterStore';

const S: React.CSSProperties = { fontFamily: 'Inter, sans-serif' };

// ── Status badge presets ──────────────────────────────────────────────────────
// Preserved exactly from the Figma design tokens.

function StatusBadge({ item }: { item: ModernisationItem }) {
  const hasBorder = item.statusBorder && item.statusBorder.length > 0;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center',
      background: item.statusBg,
      borderRadius: 2,
      padding: '3px 8px',
      border: hasBorder ? `1px solid ${item.statusBorder}` : 'none',
      flexShrink: 0,
    }}>
      <span style={{
        ...S, fontWeight: 900, fontSize: 9, color: item.statusColor,
        textTransform: 'uppercase', letterSpacing: '0.9px', lineHeight: '13.5px',
      }}>
        {item.statusLabel}
      </span>
    </div>
  );
}

function InitiativeCard({ item }: { item: ModernisationItem }) {
  return (
    <div style={{
      background: 'white',
      flex: '1 0 0',
      minWidth: 0,
      position: 'relative',
    }}>
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 10.9,
        alignItems: 'flex-start',
        padding: '10px 24px',
        position: 'relative', width: '100%', boxSizing: 'border-box',
      }}>
        {/* Title with bullet icon */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%' }}>
          {/* Bullet icon replacing the SVG from Figma */}
          <div style={{
            width: 16, height: 16, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="2.5" stroke="#9CA3AF" strokeWidth="1.33"/>
              <path d="M8 2v2M8 12v2M2 8h2M12 8h2" stroke="#9CA3AF" strokeWidth="1.33" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{
            ...S, fontWeight: 900, fontSize: 14, color: '#1a1a1a',
            lineHeight: '20px', flex: 1, minWidth: 0,
          }}>
            {item.title}
          </span>
        </div>

        {/* Description */}
        <div style={{ width: '100%' }}>
          <span style={{
            ...S, fontWeight: 400, fontSize: 11, color: '#4b5563',
            lineHeight: '17.88px', display: 'block',
          }}>
            {item.description}
          </span>
        </div>

        {/* Status badge */}
        <StatusBadge item={item} />
      </div>
    </div>
  );
}

export function ModernisationSection() {
  const { modernisationItems } = useNewsletterStore();
  const items = modernisationItems;

  // Pair items into rows of 2 (matching Figma Frame3 + Frame4 layout)
  const rows: ModernisationItem[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }

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
            MODERNISATION &amp; INNOVATION
          </span>
        </div>
        <span style={{ ...S, fontWeight: 700, fontSize: 9, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.9px' }}>
          STRATEGIC INVESTMENTS
        </span>
      </div>

      {/* ── Items grid — rows of 2 ─────────────────────────────────────────── */}
      {items.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
          {rows.map((row, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 24, alignItems: 'stretch', width: '100%' }}>
              {row.map(item => (
                <InitiativeCard key={item.id} item={item} />
              ))}
              {/* Fill empty slot when odd number of items */}
              {row.length === 1 && <div style={{ flex: '1 0 0' }} />}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '32px', textAlign: 'center', color: '#9ca3af', ...S, fontSize: 12 }}>
          No initiatives. Use the Data tab to add items.
        </div>
      )}
    </div>
  );
}
