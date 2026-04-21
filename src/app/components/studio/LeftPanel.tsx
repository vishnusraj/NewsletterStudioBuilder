import React, { useState, useRef, useEffect } from 'react';
import {
  Eye, EyeOff, Trash2, Copy, GripVertical, ChevronUp, ChevronDown,
  Plus, RotateCcw, Layers, FileText,
} from 'lucide-react';
import { useNewsletterStore, NewsletterSection } from '../../store/useNewsletterStore';

interface DragState {
  draggingId: string | null;
  overIndex: number | null;
}

const SECTION_TYPES = [
  { type: 'client-partners', label: 'Client & Partners', icon: '🤝' },
  { type: 'monthly-snapshot', label: 'Monthly Snapshot', icon: '📋' },
  { type: 'metrics', label: 'Key Metrics', icon: '📊' },
  { type: 'business-impact', label: 'Business Impact', icon: '💼' },
  { type: 'top3-outcomes', label: 'Top 3 Outcomes', icon: '🏆' },
  { type: 'production-support', label: 'Production Support', icon: '🛠️' },
  { type: 'watch-items', label: 'Watch Items', icon: '👁️' },
  { type: 'release-forecast', label: 'Release Forecast', icon: '🚀' },
  { type: 'modernisation', label: 'Modernisation & Innovation', icon: '⚡' },
  { type: 'portfolio', label: 'Portfolio at a Glance', icon: '📁' },
];

// Map section types to their original DOM indices
const TYPE_TO_INDEX: Record<string, number> = {
  'client-partners': 0, 'monthly-snapshot': 1, 'metrics': 2,
  'business-impact': 3, 'top3-outcomes': 4, 'production-support': 5,
  'watch-items': 6, 'release-forecast': 7, 'modernisation': 8, 'portfolio': 9,
};

export function LeftPanel() {
  const {
    sections, selectedSectionId, toggleVisibility, setOrder,
    selectSection, deleteSection, duplicateSection, resetSections,
  } = useNewsletterStore();

  const [dragState, setDragState] = useState<DragState>({ draggingId: null, overIndex: null });
  const [showAddMenu, setShowAddMenu] = useState(false);
  const dragSrcIndex = useRef<number | null>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const firstAddItemRef = useRef<HTMLButtonElement>(null);
  const wasAddMenuOpenRef = useRef(false);

  useEffect(() => {
    if (showAddMenu) {
      firstAddItemRef.current?.focus();
    } else if (wasAddMenuOpenRef.current) {
      addButtonRef.current?.focus();
    }
    wasAddMenuOpenRef.current = showAddMenu;
  }, [showAddMenu]);

  useEffect(() => {
    if (!showAddMenu) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowAddMenu(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showAddMenu]);

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  // --- Drag and Drop ---
  const handleDragStart = (e: React.DragEvent, id: string, index: number) => {
    dragSrcIndex.current = index;
    setDragState({ draggingId: id, overIndex: index });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragState(prev => ({ ...prev, overIndex: index }));
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const srcIndex = dragSrcIndex.current;
    if (srcIndex === null || srcIndex === targetIndex) {
      setDragState({ draggingId: null, overIndex: null });
      return;
    }

    const reordered = sortedSections.map(s => ({ ...s })); // deep-copy to avoid mutations
    const [moved] = reordered.splice(srcIndex, 1);
    reordered.splice(targetIndex, 0, moved);
    const normalized = reordered.map((s, i) => ({ ...s, order: i }));
    setOrder(normalized);
    setDragState({ draggingId: null, overIndex: null });
    dragSrcIndex.current = null;
  };

  const handleDragEnd = () => {
    setDragState({ draggingId: null, overIndex: null });
    dragSrcIndex.current = null;
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const arr = sortedSections.map(s => ({ ...s })); // deep-copy
    const idx = arr.findIndex(s => s.id === id);
    if (direction === 'up' && idx > 0) {
      [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    } else if (direction === 'down' && idx < arr.length - 1) {
      [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    }
    const normalized = arr.map((s, i) => ({ ...s, order: i }));
    setOrder(normalized);
  };

  const addSection = (type: string) => {
    const def = SECTION_TYPES.find(s => s.type === type);
    if (!def) return;
    const newSection: NewsletterSection = {
      id: `${type}-${Date.now()}`,
      type,
      label: def.label,
      icon: def.icon,
      originalIndex: TYPE_TO_INDEX[type] ?? 0,
      visible: true,
      order: sections.length,
    };
    const updated = [...sections, newSection].map((s, i) => ({ ...s, order: i }));
    setOrder(updated);
    setShowAddMenu(false);
  };

  const handleSelectableKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    onSelect: () => void
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      style={{
        width: 272,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e5e7eb',
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Layers size={16} color="#374151" />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#111827', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Sections
            </span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button
              onClick={resetSections}
              title="Reset to default"
              style={{
                padding: '4px', borderRadius: 4, border: 'none',
                background: 'transparent', cursor: 'pointer', color: '#9ca3af',
                display: 'flex', alignItems: 'center',
              }}
            >
              <RotateCcw size={13} />
            </button>
            <div style={{ position: 'relative' }}>
              <button
                ref={addButtonRef}
                onClick={() => setShowAddMenu(!showAddMenu)}
                title="Add section"
                aria-haspopup="menu"
                aria-expanded={showAddMenu}
                aria-controls="sections-add-menu"
                style={{
                  padding: '4px 8px', borderRadius: 4, border: '1px solid #e5e7eb',
                  background: '#f9fafb', cursor: 'pointer', color: '#374151',
                  display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600,
                }}
              >
                <Plus size={12} /> Add
              </button>
              {showAddMenu && (
                <>
                  <div
                    style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                    onClick={() => setShowAddMenu(false)}
                  />
                  <div
                    id="sections-add-menu"
                    role="menu"
                    aria-label="Add section"
                    style={{
                      position: 'absolute', top: '100%', right: 0, zIndex: 50,
                      backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: 8,
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', minWidth: 220, marginTop: 4,
                    }}
                  >
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6', fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Add Section
                  </div>
                  {SECTION_TYPES.map((st, index) => (
                    <button
                      ref={index === 0 ? firstAddItemRef : undefined}
                      key={st.type}
                      role="menuitem"
                      onClick={() => addSection(st.type)}
                      style={{
                        width: '100%', textAlign: 'left', padding: '8px 12px',
                        border: 'none', background: 'transparent', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#374151',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f9fafb')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <span>{st.icon}</span>
                      <span>{st.label}</span>
                    </button>
                  ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <p style={{ fontSize: 10, color: '#9ca3af', marginTop: 6, marginBottom: 0 }}>
          {sortedSections.filter(s => s.visible).length} of {sortedSections.length} visible
        </p>
      </div>

      {/* Section list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
        {sortedSections.map((section, index) => {
          const isSelected = section.id === selectedSectionId;
          const isDragging = dragState.draggingId === section.id;
          const isOver = dragState.overIndex === index && dragState.draggingId !== section.id;

          return (
            <div
              key={section.id}
              draggable
              onDragStart={e => handleDragStart(e, section.id, index)}
              onDragOver={e => handleDragOver(e, index)}
              onDrop={e => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              onClick={() => selectSection(section.id)}
              onKeyDown={e => handleSelectableKeyDown(e, () => selectSection(section.id))}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-label={`Select ${section.label} section`}
              style={{
                marginBottom: 2,
                borderRadius: 6,
                border: `1px solid ${isSelected ? '#3b82f6' : isOver ? '#93c5fd' : '#f3f4f6'}`,
                backgroundColor: isSelected ? '#eff6ff' : isDragging ? '#f9fafb' : '#ffffff',
                opacity: isDragging ? 0.5 : 1,
                cursor: 'pointer',
                transition: 'all 0.1s',
                outline: isOver ? '2px dashed #93c5fd' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', padding: '8px 6px', gap: 6 }}>
                {/* Drag handle */}
                <div
                  style={{ color: '#d1d5db', cursor: 'grab', flexShrink: 0 }}
                >
                  <GripVertical size={14} />
                </div>

                {/* Icon */}
                <span style={{ fontSize: 14, flexShrink: 0 }}>{section.icon}</span>

                {/* Label */}
                <span style={{
                  fontSize: 11, fontWeight: isSelected ? 600 : 500,
                  color: isSelected ? '#1d4ed8' : section.visible ? '#374151' : '#9ca3af',
                  flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {section.label}
                </span>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 1, flexShrink: 0 }}>
                  <button
                    title={section.visible ? 'Hide section' : 'Show section'}
                    onClick={e => { e.stopPropagation(); toggleVisibility(section.id); }}
                    style={{
                      padding: 3, borderRadius: 3, border: 'none',
                      background: 'transparent', cursor: 'pointer',
                      color: section.visible ? '#6b7280' : '#d1d5db',
                      display: 'flex', alignItems: 'center',
                    }}
                  >
                    {section.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                  </button>
                  <button
                    title="Move up"
                    onClick={e => { e.stopPropagation(); moveSection(section.id, 'up'); }}
                    disabled={index === 0}
                    style={{
                      padding: 3, borderRadius: 3, border: 'none',
                      background: 'transparent', cursor: index === 0 ? 'default' : 'pointer',
                      color: index === 0 ? '#e5e7eb' : '#9ca3af',
                      display: 'flex', alignItems: 'center',
                    }}
                  >
                    <ChevronUp size={12} />
                  </button>
                  <button
                    title="Move down"
                    onClick={e => { e.stopPropagation(); moveSection(section.id, 'down'); }}
                    disabled={index === sortedSections.length - 1}
                    style={{
                      padding: 3, borderRadius: 3, border: 'none',
                      background: 'transparent', cursor: index === sortedSections.length - 1 ? 'default' : 'pointer',
                      color: index === sortedSections.length - 1 ? '#e5e7eb' : '#9ca3af',
                      display: 'flex', alignItems: 'center',
                    }}
                  >
                    <ChevronDown size={12} />
                  </button>
                  <button
                    title="Duplicate section"
                    onClick={e => { e.stopPropagation(); duplicateSection(section.id); }}
                    style={{
                      padding: 3, borderRadius: 3, border: 'none',
                      background: 'transparent', cursor: 'pointer',
                      color: '#9ca3af',
                      display: 'flex', alignItems: 'center',
                    }}
                  >
                    <Copy size={12} />
                  </button>
                  <button
                    title="Delete section"
                    onClick={e => { e.stopPropagation(); deleteSection(section.id); }}
                    style={{
                      padding: 3, borderRadius: 3, border: 'none',
                      background: 'transparent', cursor: 'pointer',
                      color: '#fca5a5',
                      display: 'flex', alignItems: 'center',
                    }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {sortedSections.length === 0 && (
          <div style={{ textAlign: 'center', padding: '32px 16px', color: '#9ca3af', fontSize: 12 }}>
            <Layers size={32} color="#d1d5db" style={{ margin: '0 auto 8px' }} />
            <p>No sections. Click "Add" to start.</p>
          </div>
        )}

        {/* ── Footer entry (always pinned at the bottom of the list) ────── */}
        <div
          onClick={() => selectSection('__footer__')}
          onKeyDown={e => handleSelectableKeyDown(e, () => selectSection('__footer__'))}
          role="button"
          tabIndex={0}
          aria-pressed={selectedSectionId === '__footer__'}
          aria-label="Select footer"
          style={{
            marginTop: 8,
            marginBottom: 2,
            borderRadius: 6,
            border: `1px solid ${selectedSectionId === '__footer__' ? '#3b82f6' : '#e5e7eb'}`,
            backgroundColor: selectedSectionId === '__footer__' ? '#eff6ff' : '#f8fafc',
            cursor: 'pointer',
            transition: 'all 0.1s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 6px', gap: 6 }}>
            <FileText size={14} color={selectedSectionId === '__footer__' ? '#3b82f6' : '#9ca3af'} style={{ flexShrink: 0, marginLeft: 2 }} />
            <span style={{
              fontSize: 11, fontWeight: selectedSectionId === '__footer__' ? 600 : 500,
              color: selectedSectionId === '__footer__' ? '#1d4ed8' : '#6b7280',
              flex: 1,
            }}>
              Footer
            </span>
            <span style={{
              fontSize: 9, color: '#9ca3af', padding: '1px 5px', borderRadius: 99,
              background: '#f3f4f6', fontFamily: 'Inter, sans-serif',
            }}>
              Always on
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
        <p style={{ fontSize: 10, color: '#9ca3af', margin: 0, textAlign: 'center' }}>
          Drag to reorder • Click to select
        </p>
      </div>
    </div>
  );
}
