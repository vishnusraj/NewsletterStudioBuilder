import React from 'react';
import { useNewsletterStore } from '../../store/useNewsletterStore';

export function ThankYouSection() {
  const { thankYouData } = useNewsletterStore();
  const emailHref = thankYouData.email.startsWith('mailto:')
    ? thankYouData.email
    : `mailto:${thankYouData.email}`;
  const websiteHref = /^https?:\/\//i.test(thankYouData.website)
    ? thankYouData.website
    : `https://${thankYouData.website}`;

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
            {thankYouData.heading}
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
            {thankYouData.message}
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
            href={emailHref}
            onClick={(e) => e.preventDefault()}
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
            {thankYouData.email}
          </a>
          <a
            href={websiteHref}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.preventDefault()}
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
            {thankYouData.website}
          </a>
        </div>
      </div>
    </div>
  );
}
