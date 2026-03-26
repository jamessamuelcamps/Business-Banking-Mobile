import { motion } from 'framer-motion';
import { tokens, proto } from '../../design-system/tokens';

const SIZE = 56;
const STROKE = 5;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CircularProgress({ percent }) {
  const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

  return (
    <div style={{ position: 'relative', width: SIZE, height: SIZE, flexShrink: 0 }}>
      <svg width={SIZE} height={SIZE} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={proto.color.appBackground}
          strokeWidth={STROKE}
        />
        {/* Progress */}
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={proto.color.darkSurface}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          animate={{ strokeDashoffset: offset }}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        />
      </svg>
      {/* Label */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontSize: '12.25px',
          fontWeight: tokens.typography.fontWeight.semibold,
          color: tokens.color.text.primary,
          fontFamily: tokens.typography.fontFamily,
        }}>
          {percent}%
        </span>
      </div>
    </div>
  );
}
