import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoUrl from '../../assets/acorn-logo.svg';
import faceIdUrl from '../../assets/face-id-symbol.svg';
import faceIdCircleUrl from '../../assets/face-id-success-circle.svg';
import { Check, ScanFace, Mail, Eye } from 'lucide-react';
import { tokens } from '../../design-system/tokens';

const LOGO_CENTER_Y = 372; // (844px shell - 100px logo) / 2
const LOGO_LOGIN_Y  = 220; // Figma: 26.07% × 844px

export default function SplashScreen({ onLogin }) {
  const [phase, setPhase] = useState('splash');
  // 'splash' | 'login' | 'faceId' | 'faceIdSuccess' | 'invite' | 'loading'

  const [loginContentVisible, setLoginContentVisible] = useState(false);
  const [showInviteSheet, setShowInviteSheet] = useState(false);

  // splash → login
  useEffect(() => {
    const t = setTimeout(() => setPhase('login'), 1800);
    return () => clearTimeout(t);
  }, []);

  // show login buttons after logo settles
  useEffect(() => {
    if (phase !== 'login') return;
    const t = setTimeout(() => setLoginContentVisible(true), 500);
    return () => clearTimeout(t);
  }, [phase]);

  // faceId → faceIdSuccess
  useEffect(() => {
    if (phase !== 'faceId') return;
    const t = setTimeout(() => setPhase('faceIdSuccess'), 1500);
    return () => clearTimeout(t);
  }, [phase]);

  // faceIdSuccess → invite (hide login buttons, fade out overlay)
  useEffect(() => {
    if (phase !== 'faceIdSuccess') return;
    const t = setTimeout(() => {
      setLoginContentVisible(false);
      setPhase('invite');
    }, 800);
    return () => clearTimeout(t);
  }, [phase]);

  // loading → advance: 0.35s fade-in + 0.5s pre-delay + 4s fill + 0.5s post-pause
  useEffect(() => {
    if (phase !== 'loading') return;
    const t = setTimeout(onLogin, 5350);
    return () => clearTimeout(t);
  }, [phase, onLogin]);

  const showFaceId = phase === 'faceId' || phase === 'faceIdSuccess';

  const handleInviteSheetCta = () => {
    setShowInviteSheet(false);
    setPhase('loading');
  };

  return (
    <div style={{ flex: 1, position: 'relative', backgroundColor: '#ffffff' }}>

      {/* Logo — always mounted, animates position */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, top: LOGO_CENTER_Y }}
        animate={{
          opacity: 1,
          scale: 1,
          top: phase === 'splash' ? LOGO_CENTER_Y : LOGO_LOGIN_Y,
        }}
        transition={
          phase === 'splash'
            ? { type: 'spring', stiffness: 200, damping: 22, delay: 0.15 }
            : { type: 'tween', ease: 'easeInOut', duration: 0.45 }
        }
        style={{
          position: 'absolute',
          left: '146.5px',
          width: '100px',
          height: '100px',
          zIndex: 1,
        }}
      >
        <img src={logoUrl} alt="OakNorth" style={{ width: '100%', height: '100%' }} />
      </motion.div>

      {/* Login buttons */}
      <AnimatePresence>
        {loginContentVisible && (
          <motion.div
            key="login-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              left: '16px',
              right: '16px',
              bottom: '48px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '32px',
              zIndex: 1,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
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

              <button
                onClick={() => setPhase('faceId')}
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
            </div>

            <button style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: tokens.typography.fontFamily,
              fontSize: `${tokens.typography.fontSize.sm}px`,
              fontWeight: tokens.typography.fontWeight.semibold,
              color: tokens.color.brand.cta,
              lineHeight: '20px',
              padding: 0,
            }}>
              Join an existing account
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Face ID overlay */}
      <AnimatePresence>
        {showFaceId && (
          <>
            <motion.div
              key="face-id-dim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.4)',
                zIndex: 2,
              }}
            />
            <div style={{
              position: 'absolute',
              top: '327px',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              zIndex: 3,
            }}>
              <motion.div
                key="face-id-widget"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.1 }}
              >
                <div style={{
                  width: '151px',
                  height: '151px',
                  borderRadius: '40px',
                  backgroundColor: '#000000',
                  boxShadow: '0px 12px 74px 0px rgba(0,0,0,0.22)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <AnimatePresence mode="wait">
                    {phase === 'faceId' ? (
                      <motion.img
                        key="scanning"
                        src={faceIdUrl}
                        alt="Face ID"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          width: '70px',
                          height: '70px',
                          animation: 'faceidPulse 0.9s ease-in-out infinite',
                        }}
                      />
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        style={{ position: 'relative', width: '70px', height: '70px' }}
                      >
                        <img src={faceIdCircleUrl} alt="" style={{ width: '70px', height: '70px' }} />
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <Check size={32} color="#87FA89" strokeWidth={2.5} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Invite screen — full white overlay covers logo */}
      <AnimatePresence>
        {phase === 'invite' && (
          <motion.div
            key="invite-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: tokens.color.background.white,
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              padding: '72px 16px 0',
            }}
          >
            {/* Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Company label */}
              <p style={{
                margin: 0,
                fontFamily: tokens.typography.fontFamily,
                fontSize: `${tokens.typography.fontSize.xs}px`,
                fontWeight: tokens.typography.fontWeight.semibold,
                lineHeight: `${tokens.typography.lineHeight.xs}px`,
                color: tokens.color.text.primary,
                letterSpacing: tokens.typography.letterSpacing.sectionLabel,
                textTransform: 'uppercase',
              }}>
                Company Name Ltd
              </p>

              {/* Heading */}
              <p style={{
                margin: 0,
                fontFamily: tokens.typography.fontFamily,
                fontSize: '28px',
                fontWeight: tokens.typography.fontWeight.bold,
                lineHeight: '36px',
                letterSpacing: '-0.25px',
                color: tokens.color.text.primary,
              }}>
                Who will manage the account day to day?
              </p>

              {/* Body */}
              <p style={{
                margin: 0,
                fontFamily: tokens.typography.fontFamily,
                fontSize: `${tokens.typography.fontSize.default}px`,
                fontWeight: tokens.typography.fontWeight.regular,
                lineHeight: '24px',
                color: tokens.color.text.primary,
              }}>
                This person will be the <strong>main admin</strong> for your account. They'll usually handle tasks such as:
              </p>

              {/* Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  'Monitor accounts and balances',
                  'Pay salaries, invoices and bills',
                  'Reconcile transactions',
                  'Manage team access',
                  'Assign debit cards and set spend limits',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Check size={18} strokeWidth={2.5} color={tokens.color.brand.cta} />
                    <p style={{
                      margin: 0,
                      fontFamily: tokens.typography.fontFamily,
                      fontSize: `${tokens.typography.fontSize.default}px`,
                      fontWeight: tokens.typography.fontWeight.regular,
                      lineHeight: '24px',
                      color: tokens.color.text.primary,
                    }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div style={{ padding: '24px 0 48px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                onClick={() => setShowInviteSheet(true)}
                style={{
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
                }}
              >
                Someone else in the business
              </button>
              <button
                onClick={() => setPhase('loading')}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: `${tokens.borderRadius.pill}px`,
                  backgroundColor: tokens.color.background.white,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: `${tokens.typography.fontSize.default}px`,
                  fontWeight: tokens.typography.fontWeight.semibold,
                  color: tokens.color.text.primary,
                  lineHeight: '24px',
                }}
              >
                It'll be me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invite bottom sheet */}
      <AnimatePresence>
        {showInviteSheet && (
          <>
            <motion.div
              key="invite-sheet-dim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 4 }}
            />
            <motion.div
              key="invite-sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 36, mass: 0.9 }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: tokens.color.background.white,
                borderRadius: '20px 20px 0 0',
                padding: '24px 16px 48px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                zIndex: 5,
              }}
            >
              {/* Heading + body */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{
                  margin: 0,
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: '22px',
                  fontWeight: tokens.typography.fontWeight.bold,
                  lineHeight: '30px',
                  color: tokens.color.text.primary,
                }}>
                  Invite them now?
                </p>
                <p style={{
                  margin: 0,
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: `${tokens.typography.fontSize.default}px`,
                  fontWeight: tokens.typography.fontWeight.regular,
                  lineHeight: '24px',
                  color: tokens.color.text.primary,
                }}>
                  We'll guide them through setting up the account.
                </p>
              </div>

              {/* Bullet rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: ScanFace, label: "They'll get their own login details" },
                  { icon: Mail,     label: 'They can be the main point of contact' },
                  { icon: Eye,      label: "You'll stay in the loop for important stuff" },
                ].map(({ icon: Icon, label }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Icon size={20} strokeWidth={1.75} color={tokens.color.text.primary} />
                    <p style={{
                      margin: 0,
                      fontFamily: tokens.typography.fontFamily,
                      fontSize: `${tokens.typography.fontSize.default}px`,
                      fontWeight: tokens.typography.fontWeight.regular,
                      lineHeight: '24px',
                      color: tokens.color.text.primary,
                    }}>{label}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <button
                  onClick={handleInviteSheetCta}
                  style={{
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
                  }}
                >
                  Invite them
                </button>
                <button
                  onClick={handleInviteSheetCta}
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
                  }}
                >
                  Maybe later
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Loading content */}
      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div
            key="loading-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            style={{
              position: 'absolute',
              top: '344px', // LOGO_LOGIN_Y(220) + logo(100) + gap(24)
              left: '16px',
              right: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '40px',
              zIndex: 1,
            }}
          >
            {/* Title */}
            <p style={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: '16px',
              fontWeight: tokens.typography.fontWeight.semibold,
              lineHeight: '22px',
              color: tokens.color.text.primary,
              textAlign: 'center',
              margin: 0,
            }}>
              Welcome to OakNorth
            </p>

            {/* Progress bar + label */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
            }}>
              {/* Track */}
              <div style={{
                position: 'relative',
                width: '329px',
                height: '8px',
                borderRadius: '16px',
                backgroundColor: tokens.color.background.surface,
                overflow: 'hidden',
              }}>
                {/* Fill */}
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 4, ease: 'easeInOut', delay: 0.5 }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    borderRadius: '16px',
                    backgroundColor: '#0C3637',
                  }}
                />
              </div>

              <p style={{
                fontFamily: tokens.typography.fontFamily,
                fontSize: `${tokens.typography.fontSize.sm}px`,
                fontWeight: tokens.typography.fontWeight.regular,
                lineHeight: '20px',
                color: tokens.color.text.primary,
                textAlign: 'center',
                margin: 0,
              }}>
                Finalising account setup...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
