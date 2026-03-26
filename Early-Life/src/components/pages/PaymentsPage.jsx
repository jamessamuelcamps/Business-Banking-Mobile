import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import { tokens, proto } from '../../design-system/tokens';

export default function PaymentsPage() {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      backgroundColor: tokens.color.background.white,
      fontFamily: tokens.typography.fontFamily,
    }}>
      <div style={{ padding: `${tokens.spacing.md + 4}px ${tokens.spacing.md + 4}px ${tokens.spacing.md}px` }}>
        <h1 style={{
          fontSize: '26px',
          fontWeight: tokens.typography.fontWeight.bold,
          color: tokens.color.text.primary,
          letterSpacing: '-0.5px',
        }}>
          Payments
        </h1>
      </div>

      <div
        className="scrollbar-hide"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: `0 ${tokens.spacing.md}px`,
          display: 'flex',
          flexDirection: 'column',
          gap: `${tokens.spacing.sm}px`,
          paddingBottom: `${tokens.spacing.lg}px`,
        }}
      >
        <div style={{ display: 'flex', gap: `${tokens.spacing.xs + 2}px` }}>
          {[
            { label: 'Send money', Icon: ArrowUpRight, bg: proto.color.darkSurface, color: tokens.color.text.white },
            { label: 'Request', Icon: ArrowDownLeft, bg: tokens.color.background.surface, color: tokens.color.text.primary },
          ].map(({ label, Icon, bg, color }) => (
            <motion.button
              key={label}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: `${tokens.spacing.xs}px`,
                padding: `14px ${tokens.spacing.md}px`,
                borderRadius: `${tokens.borderRadius.sm * 2}px`,
                backgroundColor: bg,
                border: 'none',
                cursor: 'pointer',
                fontFamily: tokens.typography.fontFamily,
              }}
            >
              <Icon size={tokens.size.icon.md} color={color} />
              <span style={{
                fontSize: `${tokens.typography.fontSize.sm}px`,
                fontWeight: tokens.typography.fontWeight.bold,
                color,
              }}>{label}</span>
            </motion.button>
          ))}
        </div>

        {/* Empty state */}
        <div style={{
          marginTop: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: `${tokens.spacing.sm}px`,
          padding: `40px ${tokens.spacing.lg}px`,
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: `${tokens.borderRadius.circle}px`,
            backgroundColor: tokens.color.background.surface,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Clock size={tokens.size.icon.default} color={tokens.color.text.muted} />
          </div>
          <p style={{
            fontSize: `${tokens.typography.fontSize.default}px`,
            fontWeight: tokens.typography.fontWeight.semibold,
            color: tokens.color.text.primary,
          }}>No payments yet</p>
          <p style={{
            fontSize: `${tokens.typography.fontSize.xs + 1}px`,
            color: tokens.color.text.secondary,
            textAlign: 'center',
            lineHeight: `${tokens.typography.lineHeight.sm}px`,
          }}>
            Make your first payment to get started
          </p>
        </div>
      </div>
    </div>
  );
}
