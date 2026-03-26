/**
 * Tag — web port of acorn-2026/src/components/Tag/Tag.tsx
 * Variants: default (bordered) | selected (surface fill)
 */
import { motion } from 'framer-motion';
import { tokens } from '../tokens';

export default function Tag({ label, variant = 'default', removable = false, removeIcon, onRemove, onPress }) {
  const isSelected = variant === 'selected';

  return (
    <motion.button
      onClick={onPress}
      whileTap={{ opacity: 0.75 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        height: '24px',
        paddingLeft: `${tokens.spacing.sm}px`,
        paddingRight: `${tokens.spacing.sm}px`,
        borderRadius: `${tokens.borderRadius.pill}px`,
        border: isSelected ? 'none' : `1px solid ${tokens.color.border.default}`,
        backgroundColor: isSelected ? tokens.color.background.surface : 'transparent',
        cursor: onPress ? 'pointer' : 'default',
        fontFamily: tokens.typography.fontFamily,
      }}
    >
      <span style={{
        fontSize: `${tokens.typography.fontSize.sm}px`,
        fontWeight: tokens.typography.fontWeight.semibold,
        lineHeight: `${tokens.typography.lineHeight.sm}px`,
        color: tokens.color.text.primary,
      }}>{label}</span>
      {isSelected && removable && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove?.(); }}
          style={{
            width: `${tokens.size.icon.xs}px`,
            height: `${tokens.size.icon.xs}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            flexShrink: 0,
          }}
        >
          {removeIcon}
        </button>
      )}
    </motion.button>
  );
}
