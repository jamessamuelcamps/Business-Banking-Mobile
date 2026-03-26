import { motion } from 'framer-motion';
import logoUrl from '../../assets/acorn-logo.svg';
import fscsUrl from '../../assets/fscs-logo.svg';
import { tokens } from '../../design-system/tokens';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring', stiffness: 220, damping: 24, delay },
});

export default function LoginScreen({ onLogin }) {
  return (
    <div style={{
      flex: 1,
      position: 'relative',
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Logo — slides up from splash via layoutId */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '170px',
      }}>
        <motion.img
          layoutId="acorn-logo"
          src={logoUrl}
          alt="OakNorth"
          style={{ width: '100px', height: '100px' }}
          transition={{ type: 'tween', ease: 'easeInOut', duration: 0.45 }}
        />
      </div>

      {/* Bottom section */}
      <div style={{
        position: 'absolute',
        left: '16px',
        right: '16px',
        top: '483px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
      }}>
        {/* FSCS Protected */}
        <motion.div
          {...fadeUp(0.35)}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
        >
          <img src={fscsUrl} alt="FSCS" style={{ width: '55px', height: '61px' }} />
          <span style={{
            fontFamily: tokens.typography.fontFamily,
            fontSize: `${tokens.typography.fontSize.sm}px`,
            fontWeight: tokens.typography.fontWeight.regular,
            color: tokens.color.text.primary,
          }}>
            Protected
          </span>
        </motion.div>

        {/* Buttons */}
        <motion.div
          {...fadeUp(0.45)}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}
        >
          {/* Open a new account */}
          <button style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: `${tokens.borderRadius.pill}px`,
            backgroundColor: tokens.color.brand.base,
            border: 'none',
            cursor: 'pointer',
            fontFamily: tokens.typography.fontFamily,
            fontSize: `${tokens.typography.fontSize.default}px`,
            fontWeight: tokens.typography.fontWeight.semibold,
            color: tokens.color.text.primary,
            lineHeight: '24px',
          }}>
            Open a new account
          </button>

          {/* Log in */}
          <button
            onClick={onLogin}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: `${tokens.borderRadius.pill}px`,
              backgroundColor: tokens.color.background.surface,
              border: 'none',
              cursor: 'pointer',
              fontFamily: tokens.typography.fontFamily,
              fontSize: `${tokens.typography.fontSize.default}px`,
              fontWeight: tokens.typography.fontWeight.semibold,
              color: tokens.color.text.primary,
              lineHeight: '24px',
            }}>
            Log in
          </button>
        </motion.div>

        {/* Join an existing account */}
        <motion.button
          {...fadeUp(0.52)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: tokens.typography.fontFamily,
            fontSize: `${tokens.typography.fontSize.sm}px`,
            fontWeight: tokens.typography.fontWeight.semibold,
            color: tokens.color.brand.cta,
            lineHeight: '20px',
            padding: 0,
          }}
        >
          Join an existing account
        </motion.button>
      </div>
    </div>
  );
}
