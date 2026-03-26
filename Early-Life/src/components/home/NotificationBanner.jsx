import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { tokens } from '../../design-system/tokens';

export default function NotificationBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.3 }}
      style={{
        marginLeft: `${tokens.spacing.md}px`,
        marginRight: `${tokens.spacing.md}px`,
        borderRadius: `${tokens.borderRadius.sm}px`,
        backgroundColor: tokens.color.background.white,
        padding: `${tokens.spacing.sm}px`,
        display: 'flex',
        alignItems: 'flex-start',
        gap: `${tokens.spacing.sm}px`,
        flexShrink: 0,
        fontFamily: tokens.typography.fontFamily,
      }}
    >
      {/* Blue icon square */}
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: `${tokens.borderRadius.sm}px`,
        backgroundColor: tokens.color.semantic.info,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <ArrowUpRight size={tokens.size.icon.default} color={tokens.color.background.white} strokeWidth={2} />
      </div>

      {/* Copy */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.xxxs + 2}px` }}>
        <p style={{
          fontSize: `${tokens.typography.fontSize.sm}px`,
          fontWeight: tokens.typography.fontWeight.regular,
          lineHeight: `${tokens.typography.lineHeight.sm}px`,
          color: tokens.color.text.primary,
        }}>
          FSCS limit has increased to £120K
        </p>
        <p style={{
          fontSize: `${tokens.typography.fontSize.xs}px`,
          fontWeight: tokens.typography.fontWeight.regular,
          lineHeight: `${tokens.typography.lineHeight.xs}px`,
          color: tokens.color.text.primary,
        }}>
          Your eligible deposits are now covered under the new £120K limit.
        </p>
      </div>
    </motion.div>
  );
}
