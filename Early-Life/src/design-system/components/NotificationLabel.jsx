/**
 * NotificationLabel — web port of acorn-2026/src/components/NotificationLabel/NotificationLabel.tsx
 */
import { tokens } from '../tokens';

export default function NotificationLabel({ label }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '24px',
      paddingLeft: `${tokens.spacing.sm}px`,
      paddingRight: `${tokens.spacing.sm}px`,
      borderRadius: `${tokens.borderRadius.pill}px`,
      backgroundColor: tokens.color.brand.teal,
    }}>
      <span style={{
        fontFamily: tokens.typography.fontFamily,
        fontSize: `${tokens.typography.fontSize.sm}px`,
        fontWeight: tokens.typography.fontWeight.semibold,
        lineHeight: `${tokens.typography.lineHeight.sm}px`,
        color: tokens.color.background.white,
      }}>{label}</span>
    </div>
  );
}
