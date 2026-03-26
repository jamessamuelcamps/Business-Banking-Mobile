/**
 * Button — web port of acorn-2026/src/components/Button/Button.tsx
 * Variants: primary | secondary | outline | destructive
 * States:   default | loading | disabled
 */
import { motion } from 'framer-motion';
import { tokens } from '../tokens';

const getStyles = (variant, state) => {
  const isDisabled = state === 'disabled' || state === 'loading';

  const base = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: `${tokens.spacing.xs}px`,
    width: '100%',
    paddingLeft: `${tokens.spacing.md}px`,
    paddingRight: `${tokens.spacing.md}px`,
    paddingTop: `${tokens.spacing.sm}px`,
    paddingBottom: `${tokens.spacing.sm}px`,
    borderRadius: `${tokens.borderRadius.pill}px`,
    border: 'none',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    fontFamily: tokens.typography.fontFamily,
    fontSize: `${tokens.typography.fontSize.default}px`,
    fontWeight: tokens.typography.fontWeight.semibold,
    lineHeight: `${tokens.typography.lineHeight.default}px`,
    transition: 'background-color 0.15s ease',
  };

  if (variant === 'primary') {
    return {
      ...base,
      backgroundColor: isDisabled ? tokens.color.brand.baseMuted : tokens.color.brand.base,
      color: isDisabled ? `${tokens.color.text.primary}80` : tokens.color.text.primary,
    };
  }
  if (variant === 'secondary') {
    return {
      ...base,
      backgroundColor: tokens.color.background.surface,
      color: isDisabled ? `${tokens.color.text.primary}50` : tokens.color.text.primary,
      opacity: isDisabled ? 0.5 : 1,
    };
  }
  if (variant === 'outline') {
    return {
      ...base,
      backgroundColor: 'transparent',
      border: `1px solid ${tokens.color.border.default}`,
      color: tokens.color.text.primary,
    };
  }
  if (variant === 'destructive') {
    return {
      ...base,
      backgroundColor: 'transparent',
      border: `1px solid ${tokens.color.semantic.error}`,
      color: tokens.color.semantic.error,
    };
  }
  return base;
};

export default function Button({
  variant = 'primary',
  state = 'default',
  label,
  onClick,
}) {
  const isDisabled = state === 'disabled' || state === 'loading';

  return (
    <motion.button
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      whileTap={isDisabled ? {} : { opacity: 0.85 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={getStyles(variant, state)}
    >
      {state === 'loading' && (
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ animation: 'spin 0.8s linear infinite', flexShrink: 0 }}
        >
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
          <path d="M8 2a6 6 0 016 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </svg>
      )}
      {label}
    </motion.button>
  );
}
