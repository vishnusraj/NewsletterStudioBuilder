import React from 'react';
import { useNewsletterStore, type PortfolioItem } from '../../store/useNewsletterStore';

const S: React.CSSProperties = { fontFamily: 'Inter, sans-serif' };

// ── Platform card — two visual modes ─────────────────────────────────────────
// highlighted=true  → dark navy background (Middleware/integration style)
// highlighted=false → white card with light border

function PlatformCard({ item }: { item: PortfolioItem }) {
  const isDark = item.highlighted;

  return (
    <div style={{
      position: 'relative',
      background: isDark ? '#041627' : 'white',
      // Subtle shadow for the highlighted card like in Figma
      ...(isDark ? {
        boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)',
      } : {}),
    }}>
      {/* Border for non-highlighted cards */}
      {!isDark && (
        <div style={{ position: 'absolute', inset: 0, border: '1px solid #f3f4f6', pointerEvents: 'none' }} />
      )}

      <div style={{
        display: 'flex', flexDirection: 'column', gap: 4,
        alignItems: 'flex-start',
        padding: '24px 24px 26px',
        position: 'relative', width: '100%', boxSizing: 'border-box',
      }}>
        {/* Category label */}
        <span style={{
          ...S, fontWeight: 900, fontSize: 9, letterSpacing: '0.9px',
          textTransform: 'uppercase', lineHeight: '13.5px',
          color: '#9ca3af',
          display: 'block', width: '100%',
        }}>
          {item.category}
        </span>

        {/* Platform name */}
        <span style={{
          ...S, fontWeight: 900, fontSize: 18, textTransform: 'uppercase',
          lineHeight: '28px', display: 'block', width: '100%',
          color: isDark ? 'white' : '#1a1a1a',
        }}>
          {item.name}
        </span>

        {/* Tagline */}
        <span style={{
          ...S, fontWeight: 700, fontSize: 10, lineHeight: '15px',
          display: 'block', width: '100%',
          color: isDark ? 'white' : '#ef4444',
        }}>
          {item.tagline}
        </span>

        {/* Description */}
        <span style={{
          ...S, fontWeight: 400, fontSize: 10, lineHeight: '16.25px',
          display: 'block', width: '100%',
          color: isDark ? '#d1d5db' : '#6b7280',
          paddingTop: 8,
        }}>
          {item.description}
        </span>

        {/* Tech stack */}
        <span style={{
          ...S, fontWeight: 700, fontSize: 8, textTransform: 'uppercase',
          lineHeight: '12px', display: 'block', width: '100%',
          color: '#6b7280',
          paddingTop: 20,
        }}>
          {item.techStack}
        </span>
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const { portfolioItems } = useNewsletterStore();
  const items = portfolioItems;

  // Build a 3-column grid — exactly matches the Figma layout
  const cols = Math.min(3, Math.max(1, items.length));
  const gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', paddingBottom: 32, boxSizing: 'border-box', ...S }}>

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
            PORTFOLIO AT A GLANCE
          </span>
        </div>
        <span style={{ ...S, fontWeight: 700, fontSize: 9, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.9px' }}>
          {items.length} PLATFORM{items.length !== 1 ? 'S' : ''} · PRODUCT ECOSYSTEM
        </span>
      </div>

      {/* ── Platform grid ─────────────────────────────────────────────────── */}
      {items.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns,
          gap: '16px',
          width: '100%',
        }}>
          {items.map(item => (
            <PlatformCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div style={{ padding: '32px', textAlign: 'center', color: '#9ca3af', ...S, fontSize: 12 }}>
          No platforms. Use the Data tab to add items.
        </div>
      )}
    </div>
  );
}
