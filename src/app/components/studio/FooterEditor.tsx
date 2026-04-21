import React from 'react';
import { RotateCcw, FileText } from 'lucide-react';
import { useNewsletterStore, type FooterData } from '../../store/useNewsletterStore';

const S: React.CSSProperties = { fontFamily: 'Inter, sans-serif' };

const inputStyle: React.CSSProperties = {
  border: '1px solid #e5e7eb',
  borderRadius: 4,
  padding: '5px 8px',
  fontSize: 10,
  fontFamily: 'Inter, sans-serif',
  color: '#374151',
  background: 'white',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  lineHeight: 1.5,
};

const labelStyle: React.CSSProperties = {
  fontSize: 9,
  fontWeight: 700,
  color: '#9ca3af',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  fontFamily: 'Inter, sans-serif',
  marginBottom: 3,
};

interface FieldRowProps {
  label: string;
  fieldKey: keyof FooterData;
  value: string;
  hint?: string;
  onChange: (key: keyof FooterData, val: string) => void;
  multiline?: boolean;
}

function FieldRow({ label, fieldKey, value, hint, onChange, multiline }: FieldRowProps) {
  return (
    <div style={{ marginBottom: 10 }}>
      <p style={labelStyle}>{label}</p>
      {multiline ? (
        <textarea
          style={{ ...inputStyle, minHeight: 48, resize: 'vertical' }}
          value={value}
          onChange={e => onChange(fieldKey, e.target.value)}
          rows={2}
        />
      ) : (
        <input
          style={inputStyle}
          value={value}
          onChange={e => onChange(fieldKey, e.target.value)}
        />
      )}
      {hint && (
        <p style={{ ...S, fontSize: 9, color: '#9ca3af', margin: '3px 0 0', lineHeight: 1.4 }}>
          {hint}
        </p>
      )}
    </div>
  );
}

export function FooterEditor() {
  const { footerData, updateFooterField, resetFooterData } = useNewsletterStore();
  const [resetConfirm, setResetConfirm] = React.useState(false);

  const handleReset = () => {
    if (!resetConfirm) {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 3000);
    } else {
      resetFooterData();
      setResetConfirm(false);
    }
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      {/* Banner */}
      <div style={{
        padding: '10px 14px',
        background: '#f9fafb',
        borderBottom: '1px solid #f3f4f6',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <FileText size={14} color="#374151" />
        <span style={{ fontSize: 11, fontWeight: 700, color: '#1a1a1a', ...S }}>Footer</span>
        <span style={{
          marginLeft: 'auto', fontSize: 9, fontWeight: 600, padding: '2px 7px',
          borderRadius: 99, background: '#f3f4f6', color: '#6b7280',
          textTransform: 'uppercase', letterSpacing: '0.05em', ...S,
        }}>
          3 fields
        </span>
      </div>

      {/* Preview strip */}
      <div style={{
        background: '#041627', padding: '10px 14px',
        borderBottom: '1px solid #f3f4f6',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
        flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: 7, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.9px', ...S, flexShrink: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {footerData.copyright}
        </span>
        <span style={{ fontSize: 7, color: 'white', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.9px', ...S, flexShrink: 0 }}>
          {footerData.services}
        </span>
        <span style={{ fontSize: 7, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.9px', ...S, flexShrink: 0 }}>
          {footerData.dateLine}
        </span>
      </div>

      {/* Fields */}
      <div style={{ padding: '14px 14px 8px' }}>
        <FieldRow
          label="Copyright / Left text"
          fieldKey="copyright"
          value={footerData.copyright}
          onChange={updateFooterField}
          hint="Displayed on the left side of the footer bar"
          multiline
        />
        <FieldRow
          label="Services / Center text"
          fieldKey="services"
          value={footerData.services}
          onChange={updateFooterField}
          hint="Centered white text — usually the service lines"
        />
        <FieldRow
          label="Date · Confidential / Right text"
          fieldKey="dateLine"
          value={footerData.dateLine}
          onChange={updateFooterField}
          hint="Displayed on the right side (e.g. date and classification)"
        />
      </div>

      {/* Design note */}
      <div style={{
        margin: '0 14px 14px',
        padding: '8px 10px',
        background: '#eff6ff',
        borderRadius: 4,
        fontSize: 10,
        color: '#1d4ed8',
        ...S,
        lineHeight: 1.5,
      }}>
        <strong>Design locked:</strong> The footer always uses the dark navy background (#041627) and uppercase typography. Only the text content is editable.
      </div>

      {/* Reset */}
      <div style={{ padding: '0 14px 14px' }}>
        <button
          onClick={handleReset}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '5px 10px', fontSize: 10,
            border: `1px solid ${resetConfirm ? '#ef4444' : '#e5e7eb'}`,
            background: resetConfirm ? '#fef2f2' : 'none',
            color: resetConfirm ? '#dc2626' : '#6b7280',
            borderRadius: 4, cursor: 'pointer', ...S,
            transition: 'all 0.15s',
          }}
        >
          <RotateCcw size={11} />
          {resetConfirm ? '⚠️ Confirm reset footer' : 'Reset to defaults'}
        </button>
      </div>
    </div>
  );
}
