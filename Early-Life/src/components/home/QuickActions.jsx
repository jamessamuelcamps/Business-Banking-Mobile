import { motion } from 'framer-motion';
import { Plus, UserPlus, Landmark, Building2 } from 'lucide-react';
import { tokens, proto } from '../../design-system/tokens';

const ACTIONS = [
  { id: 'add-money',    label: 'Add\nmoney',   Icon: Plus },
  { id: 'invite',       label: 'Invite\nmember', Icon: UserPlus },
  { id: 'add-account',  label: 'Add\naccount',  Icon: Landmark },
  { id: 'add-company',  label: 'Add\ncompany',  Icon: Building2 },
];

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.25 }}
      style={{
        paddingLeft: `${tokens.spacing.md + 4}px`,
        paddingRight: `${tokens.spacing.md + 4}px`,
        flexShrink: 0,
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {ACTIONS.map(({ id, label, Icon }) => (
          <motion.button
            key={id}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              width: '53px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: tokens.typography.fontFamily,
              padding: 0,
            }}
          >
            {/* Icon — 3 rounded corners, flat top-right */}
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px 0 8px 8px',
              backgroundColor: proto.color.darkSurface,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon size={tokens.size.icon.default} color={tokens.color.brand.base} strokeWidth={2} />
            </div>
            <span style={{
              fontSize: `${tokens.typography.fontSize.xs}px`,
              fontWeight: tokens.typography.fontWeight.semibold,
              lineHeight: `${tokens.typography.lineHeight.xs}px`,
              color: tokens.color.text.primary,
              textAlign: 'center',
              whiteSpace: 'pre-line',
            }}>
              {label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
