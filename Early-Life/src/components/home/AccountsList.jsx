import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { tokens, proto } from '../../design-system/tokens';

const ACCOUNTS = [
  { id: 'spend',     name: 'Spend',     sortCode: '34-11-78', accountNumber: '12345678', balance: '£500,000.00' },
  { id: 'utilities', name: 'Utilities', sortCode: '34-11-78', accountNumber: '12345111', balance: '£0.00' },
];

export default function AccountsList() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.35 }}
      style={{
        marginLeft: `${tokens.spacing.md}px`,
        marginRight: `${tokens.spacing.md}px`,
        borderRadius: `${tokens.borderRadius.sm}px`,
        backgroundColor: tokens.color.background.white,
        overflow: 'hidden',
        flexShrink: 0,
        fontFamily: tokens.typography.fontFamily,
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${tokens.spacing.sm}px`,
        borderBottom: `1px solid #eff0ee`,
      }}>
        <span style={{
          fontSize: `${tokens.typography.fontSize.default}px`,
          fontWeight: tokens.typography.fontWeight.semibold,
          lineHeight: '21px',
          color: tokens.color.text.primary,
        }}>
          Current accounts
        </span>
        <ChevronRight size={tokens.size.icon.default} color={tokens.color.text.primary} />
      </div>

      {/* Account rows */}
      {ACCOUNTS.map((account) => (
        <motion.div
          key={account.id}
          whileTap={{ backgroundColor: tokens.color.background.surface }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: `${tokens.spacing.sm}px`,
            borderBottom: `1px solid #eff0ee`,
            cursor: 'pointer',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: `${tokens.typography.fontSize.default}px`,
              fontWeight: tokens.typography.fontWeight.regular,
              lineHeight: `${tokens.typography.lineHeight.default}px`,
              color: tokens.color.text.primary,
            }}>
              {account.name}
            </p>
            <p style={{
              fontSize: '15px',
              fontWeight: tokens.typography.fontWeight.regular,
              lineHeight: '20px',
              color: proto.color.textSecondary,
            }}>
              {account.sortCode} • {account.accountNumber}
            </p>
          </div>
          <p style={{
            fontSize: '17px',
            fontWeight: tokens.typography.fontWeight.semibold,
            lineHeight: '20px',
            color: tokens.color.text.primary,
            textAlign: 'right',
            flex: 1,
          }}>
            {account.balance}
          </p>
          <ChevronRight size={tokens.size.icon.default} color={tokens.color.text.primary} />
        </motion.div>
      ))}
    </motion.div>
  );
}
