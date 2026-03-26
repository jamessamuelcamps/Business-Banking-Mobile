import { motion } from 'framer-motion';
import { tokens, proto } from '../../design-system/tokens';

export default function BalanceSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.2 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: `${tokens.spacing.xxxs}px`,
        paddingTop: `${tokens.spacing.xs}px`,
        flexShrink: 0,
        fontFamily: tokens.typography.fontFamily,
        textAlign: 'center',
      }}
    >
      <p style={{
        fontSize: `${tokens.typography.fontSize.default}px`,
        fontWeight: tokens.typography.fontWeight.regular,
        lineHeight: `${tokens.typography.lineHeight.default}px`,
        color: proto.color.textSecondary,
      }}>
        Total balance
      </p>
      <p style={{
        fontSize: '32px',
        fontWeight: tokens.typography.fontWeight.semibold,
        lineHeight: '42px',
        letterSpacing: '0.37px',
        color: tokens.color.text.primary,
      }}>
        £0.00
      </p>
    </motion.div>
  );
}
