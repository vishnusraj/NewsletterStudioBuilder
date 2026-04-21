import React from 'react';
import { useNewsletterStore } from '../../store/useNewsletterStore';

// ── Footer — pixel-faithful port of the Figma MainFooter ─────────────────────
// Exactly matches: bg-[#041627], p-[16px], three columns (left/center/right)
// All three text fields are driven by footerData from global state.

export function FooterSection() {
  const { footerData } = useNewsletterStore();

  return (
    <div
      style={{
        background: '#041627',
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        flexShrink: 0,
      }}
      data-name="DynamicMainFooter"
    >
      <div style={{
        maxWidth: 1280,
        width: '100%',
        padding: 16,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}>
        {/* Left: copyright */}
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: 9,
          color: '#9ca3af',
          letterSpacing: '0.9px',
          textTransform: 'uppercase',
          lineHeight: '13.5px',
          flexShrink: 1,
          minWidth: 0,
        }}>
          {footerData.copyright}
        </span>

        {/* Center: services */}
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: 9,
          color: 'white',
          letterSpacing: '0.9px',
          textTransform: 'uppercase',
          lineHeight: '13.5px',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}>
          {footerData.services}
        </span>

        {/* Right: date · confidential */}
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: 9,
          color: '#9ca3af',
          letterSpacing: '0.9px',
          textTransform: 'uppercase',
          lineHeight: '13.5px',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}>
          {footerData.dateLine}
        </span>
      </div>
    </div>
  );
}
