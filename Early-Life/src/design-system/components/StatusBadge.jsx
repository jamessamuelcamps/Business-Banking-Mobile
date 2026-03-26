/**
 * StatusBadge — web port of acorn-2026/src/components/StatusBadge/StatusBadge.tsx
 * Variants: paid | approved | draft | cancelled
 */
import { tokens } from '../tokens';

const CONFIG = {
  paid: {
    bg:   tokens.color.background.accountGreen,
    dot:  tokens.color.brand.positive,
    text: tokens.color.brand.positive,
    defaultLabel: 'Paid',
  },
  draft: {
    bg:   tokens.color.background.surface,
    dot:  tokens.color.text.primary,
    text: tokens.color.text.primary,
    defaultLabel: 'Draft',
  },
  approved: {
    bg:   tokens.color.background.infoBg,
    dot:  tokens.color.semantic.info,
    text: tokens.color.semantic.info,
    defaultLabel: 'Approved',
  },
  cancelled: {
    bg:   tokens.color.semantic.errorBg,
    dot:  tokens.color.semantic.error,
    text: tokens.color.semantic.error,
    defaultLabel: 'Cancelled',
  },
};

export default function StatusBadge({ variant, label }) {
  const cfg = CONFIG[variant];
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      height: '24px',
      paddingLeft: `${tokens.spacing.xs}px`,
      paddingRight: '10px',
      borderRadius: `${tokens.borderRadius.sm}px`,
      backgroundColor: cfg.bg,
    }}>
      <div style={{
        width: `${tokens.size.statusDot}px`,
        height: `${tokens.size.statusDot}px`,
        borderRadius: `${tokens.borderRadius.circle}px`,
        backgroundColor: cfg.dot,
        flexShrink: 0,
      }} />
      <span style={{
        fontFamily: tokens.typography.fontFamily,
        fontSize: `${tokens.typography.fontSize.sm}px`,
        fontWeight: tokens.typography.fontWeight.semibold,
        lineHeight: `${tokens.typography.lineHeight.sm}px`,
        color: cfg.text,
      }}>
        {label ?? cfg.defaultLabel}
      </span>
    </div>
  );
}
