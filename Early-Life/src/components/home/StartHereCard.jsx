import { motion } from 'framer-motion';
import CircularProgress from './CircularProgress';
import ActionChip from './ActionChip';
import { tokens } from '../../design-system/tokens';

export default function StartHereCard({ tasks, onCompleteTask }) {
  const completedCount = tasks.filter(t => t.complete).length;
  const percent = Math.round((completedCount / tasks.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.1 }}
      style={{
        marginLeft: `${tokens.spacing.md}px`,
        marginRight: `${tokens.spacing.md}px`,
        borderRadius: `${tokens.borderRadius.sm}px`,
        backgroundColor: tokens.color.background.white,
        padding: `${tokens.spacing.md}px`,
        display: 'flex',
        flexDirection: 'column',
        gap: `${tokens.spacing.md + 4}px`,
        flexShrink: 0,
        fontFamily: tokens.typography.fontFamily,
      }}
    >
      {/* Header row: title + donut */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: `${tokens.spacing.lg}px`,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: `${tokens.typography.fontSize.default}px`,
            fontWeight: tokens.typography.fontWeight.semibold,
            lineHeight: `${tokens.typography.lineHeight.default}px`,
            color: tokens.color.text.primary,
            marginBottom: `${tokens.spacing.xxxs}px`,
          }}>
            Start here, Emmanuelle
          </p>
          <p style={{
            fontSize: `${tokens.typography.fontSize.sm}px`,
            fontWeight: tokens.typography.fontWeight.regular,
            lineHeight: `${tokens.typography.lineHeight.sm}px`,
            color: tokens.color.text.primary,
          }}>
            Complete these steps to get your account up and running.
          </p>
        </div>
        <CircularProgress percent={percent} />
      </div>

      {/* Task cards row — horizontal scroll */}
      <div
        className="scrollbar-hide"
        style={{
          display: 'flex',
          gap: `${tokens.spacing.xs}px`,
          overflowX: 'auto',
        }}
      >
        {tasks.map(task => (
          <ActionChip key={task.id} task={task} onComplete={onCompleteTask} />
        ))}
      </div>
    </motion.div>
  );
}
