import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowDownToLine, UserPlus, SendHorizonal, CreditCard, Bell } from 'lucide-react';
import { tokens, proto } from '../../design-system/tokens';

const ICON_MAP = {
  ArrowDownToLine,
  UserPlus,
  SendHorizonal,
  CreditCard,
  Bell,
};

export default function ActionChip({ task, onComplete }) {
  const IconComponent = ICON_MAP[task.icon];
  const isComplete = task.complete;

  return (
    <motion.button
      layout
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={() => !isComplete && onComplete(task.id)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: `${tokens.spacing.sm}px`,
        padding: `${tokens.spacing.sm}px ${tokens.spacing.xs}px`,
        borderRadius: `${tokens.borderRadius.sm}px`,
        border: 'none',
        cursor: isComplete ? 'default' : 'pointer',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        width: '160px',
        fontFamily: tokens.typography.fontFamily,
        backgroundColor: isComplete ? proto.color.chipComplete : proto.color.darkSurface,
        transition: 'background-color 0.25s ease',
      }}
    >
      {/* Icon circle */}
      <div style={{
        width: '20px',
        height: '20px',
        borderRadius: `${tokens.borderRadius.circle}px`,
        backgroundColor: isComplete ? proto.color.darkSurface : tokens.color.brand.baseMuted,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <AnimatePresence mode="wait" initial={false}>
          {isComplete ? (
            <motion.div
              key="check"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            >
              <Check size={10} color={tokens.color.brand.base} strokeWidth={3} />
            </motion.div>
          ) : (
            <motion.div
              key="icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {IconComponent && <IconComponent size={10} color={proto.color.darkSurface} strokeWidth={2.5} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Label */}
      <span style={{
        fontSize: `${tokens.typography.fontSize.xs}px`,
        fontWeight: tokens.typography.fontWeight.semibold,
        lineHeight: `${tokens.typography.lineHeight.xs}px`,
        color: isComplete ? proto.color.darkSurface : tokens.color.text.white,
        textAlign: 'left',
        whiteSpace: 'normal',
      }}>
        {task.label}
      </span>
    </motion.button>
  );
}
