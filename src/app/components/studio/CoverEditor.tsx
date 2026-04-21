import React from 'react';
import { RotateCcw, Layout } from 'lucide-react';
import { useNewsletterStore, DEFAULT_COVER_DATA, type CoverData } from '../../store/useNewsletterStore';

interface FieldGroupProps {
  title: string;
  children: React.ReactNode;
}

function FieldGroup({ title, children }: FieldGroupProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        fontSize: 9, fontWeight: 700, color: '#9ca3af',
        letterSpacing: '0.1em', textTransform: 'uppercase',
        marginBottom: 8, paddingBottom: 4,
        borderBottom: '1px solid #f3f4f6',
      }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {children}
      </div>
    </div>
  );
}

interface FieldRowProps {
  label:       string;
  fieldKey:    keyof CoverData;
  value:       string;
  placeholder: string;
  onChange:    (key: keyof CoverData, val: string) => void;
  multiline?:  boolean;
}

function FieldRow({ label, fieldKey, value, placeholder, onChange, multiline }: FieldRowProps) {
  const isDefault = value === (DEFAULT_COVER_DATA[fieldKey] ?? '');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <label style={{ fontSize: 10, fontWeight: 600, color: '#374151' }}>{label}</label>
        {!isDefault && (
          <span style={{ fontSize: 9, color: '#f05a29', fontWeight: 600 }}>modified</span>
        )}
      </div>
      {multiline ? (
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          rows={2}
          style={{
            width: '100%', fontSize: 11, color: '#1f2937',
            border: `1px solid ${isDefault ? '#e5e7eb' : '#bfdbfe'}`,
            borderRadius: 4, padding: '5px 7px', resize: 'vertical',
            fontFamily: 'Inter, sans-serif', lineHeight: 1.5,
            backgroundColor: isDefault ? '#ffffff' : '#eff6ff',
            outline: 'none', boxSizing: 'border-box',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59,130,246,0.15)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = isDefault ? '#e5e7eb' : '#bfdbfe'; e.currentTarget.style.boxShadow = 'none'; }}
        />
      ) : (
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          style={{
            width: '100%', fontSize: 11, color: '#1f2937',
            border: `1px solid ${isDefault ? '#e5e7eb' : '#bfdbfe'}`,
            borderRadius: 4, padding: '5px 7px',
            fontFamily: 'Inter, sans-serif',
            backgroundColor: isDefault ? '#ffffff' : '#eff6ff',
            outline: 'none', boxSizing: 'border-box',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59,130,246,0.15)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = isDefault ? '#e5e7eb' : '#bfdbfe'; e.currentTarget.style.boxShadow = 'none'; }}
        />
      )}
    </div>
  );
}

export function CoverEditor() {
  const { coverData, updateCoverField, resetCoverData } = useNewsletterStore();

  const modifiedCount = (Object.keys(DEFAULT_COVER_DATA) as Array<keyof CoverData>)
    .filter(k => coverData[k] !== DEFAULT_COVER_DATA[k]).length;

  return (
    <div style={{ padding: '16px', overflowY: 'auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Layout size={13} color="#374151" />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#111827' }}>Cover Section</span>
          {modifiedCount > 0 && (
            <span style={{
              fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 99,
              backgroundColor: '#dbeafe', color: '#1e40af',
            }}>
              {modifiedCount} edited
            </span>
          )}
        </div>
        {modifiedCount > 0 && (
          <button
            onClick={resetCoverData}
            title="Reset cover to defaults"
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '4px 8px', borderRadius: 4,
              border: '1px solid #fee2e2', backgroundColor: '#fff1f2',
              color: '#dc2626', cursor: 'pointer', fontSize: 10, fontWeight: 600,
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fee2e2')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#fff1f2')}
          >
            <RotateCcw size={10} />
            Reset
          </button>
        )}
      </div>

      {/* Tip */}
      <div style={{
        backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0',
        borderRadius: 6, padding: '8px 10px', marginBottom: 16, fontSize: 10, color: '#166534',
        lineHeight: 1.5,
      }}>
        <strong>Tip:</strong> Changes update the canvas live. You can also click any cover text in <strong>Edit Mode</strong> to edit inline.
      </div>

      {/* ── Hero Title ── */}
      <FieldGroup title="Hero Title">
        <FieldRow
          label="Main Title (large text)"
          fieldKey="titleMain"
          value={coverData.titleMain}
          placeholder="FEBRUARY"
          onChange={updateCoverField}
        />
        <FieldRow
          label="Accent / Year (orange)"
          fieldKey="titleAccent"
          value={coverData.titleAccent}
          placeholder="2026"
          onChange={updateCoverField}
        />
        <FieldRow
          label="Subtitle / Tagline"
          fieldKey="subtitle"
          value={coverData.subtitle}
          placeholder="Technology · Product · Transformation — Edition 01"
          onChange={updateCoverField}
          multiline
        />
      </FieldGroup>

      {/* ── Branding ── */}
      <FieldGroup title="Branding">
        <FieldRow
          label="Brand Left (client)"
          fieldKey="brandLeft"
          value={coverData.brandLeft}
          placeholder="NTH DEGREE"
          onChange={updateCoverField}
        />
        <FieldRow
          label="Brand Right (partner)"
          fieldKey="brandRight"
          value={coverData.brandRight}
          placeholder="SAKSOFT"
          onChange={updateCoverField}
        />
        <FieldRow
          label="Volume / Edition Label"
          fieldKey="volumeLabel"
          value={coverData.volumeLabel}
          placeholder="DEVELOPMENT NEWSLETTER . VOL 01 . EDITION 01"
          onChange={updateCoverField}
          multiline
        />
      </FieldGroup>

      {/* ── Date & ID ── */}
      <FieldGroup title="Date & Identification">
        <FieldRow
          label="Date (top right)"
          fieldKey="date"
          value={coverData.date}
          placeholder="07 Feb 2026"
          onChange={updateCoverField}
        />
        <FieldRow
          label="Edition Label"
          fieldKey="edition"
          value={coverData.edition}
          placeholder="VOL 01 . EDITION 01"
          onChange={updateCoverField}
        />
        <FieldRow
          label="Classification Badge"
          fieldKey="confidential"
          value={coverData.confidential}
          placeholder="CONFIDENTIAL"
          onChange={updateCoverField}
        />
      </FieldGroup>

      {/* ── Navigation ── */}
      <FieldGroup title="Navigation Labels">
        <FieldRow
          label="Nav Tab 1 (active)"
          fieldKey="nav1"
          value={coverData.nav1}
          placeholder="CONSULTING"
          onChange={updateCoverField}
        />
        <FieldRow
          label="Nav Tab 2"
          fieldKey="nav2"
          value={coverData.nav2}
          placeholder="DEVELOPMENT"
          onChange={updateCoverField}
        />
        <FieldRow
          label="Nav Tab 3"
          fieldKey="nav3"
          value={coverData.nav3}
          placeholder="TRANSFORMATION"
          onChange={updateCoverField}
        />
      </FieldGroup>

      {/* Locked note */}
      <div style={{
        backgroundColor: '#fafafa', border: '1px solid #f3f4f6',
        borderRadius: 6, padding: '8px 10px', fontSize: 10, color: '#6b7280', lineHeight: 1.5,
      }}>
        🔒 <strong>Layout locked</strong> — font sizes, spacing, and structure cannot be changed to preserve design integrity.
      </div>
    </div>
  );
}
