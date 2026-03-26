/**
 * Alert — web port of acorn-2026/src/components/Alert/Alert.tsx
 * Variants: info | success | warning | announcement | error
 */
import { tokens } from '../tokens';

const BG = {
  info:         tokens.color.background.surface,
  success:      tokens.color.background.accountGreen,
  warning:      tokens.color.semantic.warningBg,
  announcement: tokens.color.background.infoBg,
  error:        tokens.color.semantic.errorBg,
};

export default function Alert({ variant = 'info', message, icon }) {
  return (
    <div style={{
      backgroundColor: BG[variant],
      borderRadius: `${tokens.borderRadius.sm}px`,
      paddingLeft: `${tokens.spacing.md}px`,
      paddingRight: `${tokens.spacing.md}px`,
      paddingTop: `${tokens.spacing.sm}px`,
      paddingBottom: `${tokens.spacing.sm}px`,
      display: 'flex',
      alignItems: 'center',
      gap: `${tokens.spacing.md}px`,
      fontFamily: tokens.typography.fontFamily,
    }}>
      {icon && (
        <div style={{
          width: `${tokens.size.icon.default}px`,
          height: `${tokens.size.icon.default}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>{icon}</div>
      )}
      <span style={{
        flex: 1,
        fontSize: `${tokens.typography.fontSize.sm}px`,
        fontWeight: tokens.typography.fontWeight.semibold,
        lineHeight: `${tokens.typography.lineHeight.sm}px`,
        color: tokens.color.text.primary,
      }}>{message}</span>
    </div>
  );
}
