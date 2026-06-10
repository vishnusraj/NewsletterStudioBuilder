import React from 'react';

export function ThankYouSection() {
  return (
    <div
      style={{
        width: '100%',
        boxSizing: 'border-box',
        background: '#f1ede7',
        borderTop: '1px solid #d6d3d1',
        marginTop: '-16px',
      }}
      data-name="ThankYouSection"
    >
      <div
        style={{
          maxWidth: 1280,
          width: '100%',
          margin: '0 auto',
          padding: '18px 40px 20px',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 11,
              lineHeight: '16px',
              letterSpacing: '2.2px',
              textTransform: 'uppercase',
              color: '#f05a29',
            }}
          >
            Thank You
          </span>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: 13,
              lineHeight: '20px',
              color: '#4b5563',
              maxWidth: 620,
            }}
          >
            Stay connected for updates, ideas, and opportunities to build what&apos;s next.
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 6,
            textAlign: 'right',
          }}
        >
          <a
            href="mailto:info@saksoft.com"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: 12,
              lineHeight: '18px',
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              color: '#041627',
              textDecoration: 'none',
            }}
          >
            info@saksoft.com
          </a>
          <a
            href="https://www.saksoft.com"
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: 12,
              lineHeight: '18px',
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              color: '#041627',
              textDecoration: 'none',
            }}
          >
            www.saksoft.com
          </a>
        </div>
      </div>
    </div>
  );
}
