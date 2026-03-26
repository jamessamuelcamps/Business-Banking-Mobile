/**
 * TextLink — web port of acorn-2026/src/components/TextLink/TextLink.tsx
 * Variants: underline | icon
 */
import { motion } from 'framer-motion';
import { tokens } from '../tokens';

export default function TextLink({ label, variant = 'underline', icon, onPress }) {
  return (
    <motion.button
      onClick={onPress}
      whileTap={{ opacity: 0.7 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        fontFamily: tokens.typography.fontFamily,
      }}
    >
      <span style={{
        fontSize: `${tokens.typography.fontSize.xs}px`,
        fontWeight: tokens.typography.fontWeight.semibold,
        lineHeight: `${tokens.typography.lineHeight.xs}px`,
        color: tokens.color.brand.cta,
        textDecoration: variant === 'underline' ? 'underline' : 'none',
      }}>{label}</span>
      {variant === 'icon' && icon && (
        <div style={{
          width: `${tokens.size.icon.xs}px`,
          height: `${tokens.size.icon.xs}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>{icon}</div>
      )}
    </motion.button>
  );
}
