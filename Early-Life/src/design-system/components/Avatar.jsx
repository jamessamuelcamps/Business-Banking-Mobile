/**
 * Avatar — web port of acorn-2026/src/components/Avatar/Avatar.tsx
 * Sizes:    sm | default
 * Variants: green (brand.base fill) | account (accountGreen fill)
 */
import { tokens } from '../tokens';

export default function Avatar({ initials, size = 'default', variant = 'green' }) {
  const dim = size === 'sm' ? tokens.size.avatar.sm : tokens.size.avatar.default;
  const bg  = variant === 'account'
    ? tokens.color.background.accountGreen
    : tokens.color.brand.base;

  return (
    <div style={{
      width: `${dim}px`,
      height: `${dim}px`,
      borderRadius: `${tokens.borderRadius.circle}px`,
      backgroundColor: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: tokens.typography.fontFamily,
        fontSize: size === 'sm' ? `${tokens.typography.fontSize.sm}px` : '17px',
        fontWeight: tokens.typography.fontWeight.semibold,
        lineHeight: size === 'sm' ? `${tokens.typography.lineHeight.sm}px` : '20px',
        color: tokens.color.text.primary,
      }}>
        {initials}
      </span>
    </div>
  );
}
