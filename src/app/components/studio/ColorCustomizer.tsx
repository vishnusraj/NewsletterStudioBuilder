import React, { useState, useRef, useCallback } from 'react';
import { RotateCcw, AlertTriangle, Check, Palette } from 'lucide-react';
import { useNewsletterStore } from '../../store/useNewsletterStore';
import {
  COLOR_SLOT_META,
  DEFAULT_THEME_COLORS,
  type ThemeColors,
  isValidHex,
  normaliseHex,
  getContrastColor,
  hasGoodContrast,
} from '../../utils/colorSystem';

// ── Per-slot editor ────────────────────────────────────────────────────────────

interface ColorSlotProps {
  slotKey:    keyof ThemeColors;
  label:      string;
  description:string;
  examples:   string[];
  value:      string;
  onChange:   (key: keyof ThemeColors, hex: string) => void;
}

function ColorSlot({ slotKey, label, description, examples, value, onChange }: ColorSlotProps) {
  const [hexInput,    setHexInput]    = useState(value);
  const [inputError,  setInputError]  = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const nativePickerRef = useRef<HTMLInputElement>(null);
  const isDefault = value === DEFAULT_THEME_COLORS[slotKey];
  const contrastOk = hasGoodContrast(value);

  // Sync hexInput when value changes externally (e.g. reset)
  React.useEffect(() => {
    setHexInput(value);
  }, [value]);

  const applyHex = useCallback((raw: string) => {
    const norm = normaliseHex(raw);
    if (isValidHex(norm)) {
      setInputError(false);
      onChange(slotKey, norm);
    } else {
      setInputError(true);
    }
  }, [slotKey, onChange]);

  const handleHexBlur = () => {
    applyHex(hexInput);
  };

  const handleHexKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  const handleNativePicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value.toUpperCase();
    setHexInput(hex);
    setInputError(false);
    onChange(slotKey, hex);
  };

  const textColor = getContrastColor(value);

  return (
    <div style={{
      borderRadius: 8,
      border: `1px solid ${isDefault ? '#f3f4f6' : '#dbeafe'}`,
      backgroundColor: isDefault ? '#fafafa' : '#f0f7ff',
      marginBottom: 10,
      overflow: 'hidden',
    }}>
      {/* Color preview bar + swatch */}
      <div
        style={{
          backgroundColor: value,
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
        onClick={() => nativePickerRef.current?.click()}
        title="Click to open color picker"
      >
        <div>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: textColor, letterSpacing: '0.04em' }}>
            {label}
          </p>
          <p style={{ margin: 0, fontSize: 10, color: textColor, opacity: 0.75 }}>
            {value}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {!isDefault && (
            <span style={{
              fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 99,
              backgroundColor: 'rgba(255,255,255,0.25)', color: textColor,
            }}>
              modified
            </span>
          )}
          {/* Native color picker trigger (hidden) */}
          <input
            ref={nativePickerRef}
            type="color"
            value={value}
            onChange={handleNativePicker}
            style={{ opacity: 0, width: 0, height: 0, position: 'absolute', pointerEvents: 'none' }}
            tabIndex={-1}
          />
          <div style={{
            width: 28, height: 28, borderRadius: 6,
            backgroundColor: 'rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Palette size={13} color={textColor} />
          </div>
        </div>
      </div>

      {/* HEX input + controls */}
      <div style={{ padding: '10px 14px' }}>
        <p style={{ margin: '0 0 6px', fontSize: 10, color: '#6b7280', lineHeight: 1.4 }}>
          {description}
        </p>

        {/* HEX input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <div style={{
            display: 'flex', alignItems: 'center', flex: 1,
            border: `1px solid ${inputError ? '#dc2626' : '#e5e7eb'}`,
            borderRadius: 4, overflow: 'hidden',
            backgroundColor: inputError ? '#fff1f2' : '#ffffff',
          }}>
            <div style={{
              width: 24, height: 24, flexShrink: 0,
              backgroundColor: isValidHex(normaliseHex(hexInput)) ? normaliseHex(hexInput) : '#cccccc',
              borderRight: '1px solid #e5e7eb',
            }} />
            <input
              type="text"
              value={hexInput}
              onChange={(e) => {
                setHexInput(e.target.value);
                setInputError(false);
              }}
              onBlur={handleHexBlur}
              onKeyDown={handleHexKeyDown}
              maxLength={7}
              placeholder="#000000"
              style={{
                flex: 1, border: 'none', outline: 'none',
                padding: '4px 8px', fontSize: 11,
                fontFamily: 'monospace', color: '#1f2937',
                backgroundColor: 'transparent',
              }}
            />
            {!inputError && isValidHex(normaliseHex(hexInput)) && (
              <div style={{ paddingRight: 6 }}>
                <Check size={11} color="#16a34a" />
              </div>
            )}
          </div>
        </div>

        {/* Validation error */}
        {inputError && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
            <AlertTriangle size={10} color="#dc2626" />
            <span style={{ fontSize: 10, color: '#dc2626' }}>Invalid hex — use format #RRGGBB</span>
          </div>
        )}

        {/* Contrast warning */}
        {!contrastOk && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6,
            padding: '4px 8px', borderRadius: 4,
            backgroundColor: '#fffbeb', border: '1px solid #fde68a',
          }}>
            <AlertTriangle size={10} color="#d97706" />
            <span style={{ fontSize: 10, color: '#92400e', lineHeight: 1.4 }}>
              Low contrast — may reduce readability on light backgrounds
            </span>
          </div>
        )}

        {/* Usage examples (collapsible) */}
        <button
          onClick={() => setShowExamples(!showExamples)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 10, color: '#9ca3af', padding: 0, display: 'flex', alignItems: 'center', gap: 3,
          }}
        >
          <span>{showExamples ? '▾' : '▸'}</span>
          <span>Where it's used ({examples.length})</span>
        </button>

        {showExamples && (
          <ul style={{ margin: '6px 0 0 12px', padding: 0, listStyle: 'disc' }}>
            {examples.map((ex, i) => (
              <li key={i} style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>{ex}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ── Preset palettes ────────────────────────────────────────────────────────────

const PRESETS: Array<{ name: string; colors: Partial<ThemeColors> }> = [
  {
    name: 'Default (Navy + Orange)',
    colors: { primary: '#041627', accent: '#f05a29', success: '#006b5f', danger: '#dc2626', warning: '#ea580c' },
  },
  {
    name: 'Midnight Blue',
    colors: { primary: '#0f172a', accent: '#6366f1', success: '#059669', danger: '#e11d48', warning: '#d97706' },
  },
  {
    name: 'Forest Green',
    colors: { primary: '#14532d', accent: '#16a34a', success: '#0284c7', danger: '#dc2626', warning: '#ea580c' },
  },
  {
    name: 'Executive Grey',
    colors: { primary: '#1f2937', accent: '#4b5563', success: '#0f766e', danger: '#b91c1c', warning: '#b45309' },
  },
  {
    name: 'Royal Purple',
    colors: { primary: '#2e1065', accent: '#7c3aed', success: '#0d9488', danger: '#dc2626', warning: '#d97706' },
  },
];

// ── Main component ────────────────────────────────────────────────────────────

export function ColorCustomizer() {
  const { themeColors, updateThemeColor, resetThemeColors } = useNewsletterStore();
  const [showPresets, setShowPresets] = useState(false);

  const setCoverColors = useCallback((preset: Partial<ThemeColors>) => {
    (Object.entries(preset) as Array<[keyof ThemeColors, string]>).forEach(([k, v]) => {
      updateThemeColor(k, v);
    });
    setShowPresets(false);
  }, [updateThemeColor]);

  const modifiedCount = (Object.keys(DEFAULT_THEME_COLORS) as Array<keyof ThemeColors>)
    .filter(k => themeColors[k] !== DEFAULT_THEME_COLORS[k]).length;

  return (
    <div style={{ padding: '16px', overflowY: 'auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Palette size={13} color="#374151" />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#111827' }}>Color Tokens</span>
          {modifiedCount > 0 && (
            <span style={{
              fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 99,
              backgroundColor: '#dbeafe', color: '#1e40af',
            }}>
              {modifiedCount} modified
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button
            onClick={() => setShowPresets(!showPresets)}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '4px 8px', borderRadius: 4,
              border: '1px solid #e5e7eb', backgroundColor: '#f9fafb',
              color: '#374151', cursor: 'pointer', fontSize: 10, fontWeight: 600,
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f9fafb')}
          >
            🎨 Presets
          </button>
          {modifiedCount > 0 && (
            <button
              onClick={resetThemeColors}
              title="Reset all colors to defaults"
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '4px 8px', borderRadius: 4,
                border: '1px solid #fee2e2', backgroundColor: '#fff1f2',
                color: '#dc2626', cursor: 'pointer', fontSize: 10, fontWeight: 600,
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fee2e2')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#fff1f2')}
            >
              <RotateCcw size={10} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Preset palette picker */}
      {showPresets && (
        <div style={{
          marginBottom: 14, borderRadius: 8, border: '1px solid #e5e7eb',
          backgroundColor: '#ffffff', overflow: 'hidden',
        }}>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6', fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Preset Palettes
          </div>
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setCoverColors(preset.colors)}
              style={{
                width: '100%', textAlign: 'left', padding: '8px 12px',
                border: 'none', background: 'transparent', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #f9fafb',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f9fafb')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {/* Swatch strip */}
              <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                {(Object.values(preset.colors) as string[]).map((c, i) => (
                  <div key={i} style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: c }} />
                ))}
              </div>
              <span style={{ fontSize: 11, color: '#374151', fontWeight: 500 }}>{preset.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Info banner */}
      <div style={{
        backgroundColor: '#eff6ff', border: '1px solid #bfdbfe',
        borderRadius: 6, padding: '8px 10px', marginBottom: 14, fontSize: 10, color: '#1e40af', lineHeight: 1.5,
      }}>
        <strong>Live preview</strong> — changes apply instantly. Click the color bar or enter a HEX code. Export will reflect all custom colors.
      </div>

      {/* Color slots */}
      {COLOR_SLOT_META.map((meta) => (
        <ColorSlot
          key={meta.key}
          slotKey={meta.key}
          label={meta.label}
          description={meta.description}
          examples={meta.examples}
          value={themeColors[meta.key]}
          onChange={updateThemeColor}
        />
      ))}

      {/* Typography lock note */}
      <div style={{
        backgroundColor: '#fafafa', border: '1px solid #f3f4f6',
        borderRadius: 6, padding: '8px 10px', fontSize: 10, color: '#6b7280', lineHeight: 1.5,
      }}>
        🔒 <strong>Typography & spacing are locked</strong> — font families, sizes, and layout cannot be changed to preserve design integrity. Only the 5 color tokens above are adjustable.
      </div>
    </div>
  );
}
