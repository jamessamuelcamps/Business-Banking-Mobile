import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoUrl from '../../assets/acorn-logo.svg';
import faceIdUrl from '../../assets/face-id-symbol.svg';
import faceIdCircleUrl from '../../assets/face-id-success-circle.svg';
import { Check, ArrowLeft, CircleCheck, ScanFace, Mail, Eye, X } from 'lucide-react';
import { tokens } from '../../design-system/tokens';

const LOGO_CENTER_Y = 372; // (844px shell - 100px logo) / 2
const LOGO_LOGIN_Y  = 220; // Figma: 26.07% × 844px

const PRIMARY_OPTIONS = [
  { id: 'savings',   label: 'Business savings account' },
  { id: 'payments',  label: 'Receiving and making payments' },
  { id: 'expenses',  label: 'Expense management' },
  { id: 'invoicing', label: 'Invoicing and bill-paying automation' },
  { id: 'other',     label: 'Something else' },
  { id: 'other2',    label: 'Another something else' },
];

function Toggle({ isOn, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        width: '30px',
        height: '16px',
        borderRadius: '50px',
        backgroundColor: isOn ? tokens.color.brand.mint : '#949494',
        position: 'relative',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'background-color 0.2s',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '2px',
        left: isOn ? '16px' : '2px',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: '#ffffff',
        transition: 'left 0.2s',
      }} />
    </div>
  );
}

export default function SplashScreen({ onLogin }) {
  const [phase, setPhase] = useState('splash');
  // 'splash' | 'login' | 'faceId' | 'faceIdSuccess' | 'welcome' | 'primaryPurpose' | 'secondaryPurpose' | 'whoManages' | 'selectSavings' | 'loading'

  const [loginContentVisible, setLoginContentVisible] = useState(false);
  const [primaryChoice, setPrimaryChoice] = useState(null);
  const [secondaryChoices, setSecondaryChoices] = useState(new Set());
  const [showInviteSheet, setShowInviteSheet] = useState(false);
  const savingsChoiceRef = useRef(null);

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

  // faceIdSuccess → welcome
  useEffect(() => {
    if (phase !== 'faceIdSuccess') return;
    const t = setTimeout(() => {
      setLoginContentVisible(false);
      setPhase('welcome');
    }, 800);
    return () => clearTimeout(t);
  }, [phase]);

  // loading → advance: 0.35s fade-in + 0.5s pre-delay + 4s fill + 0.5s post-pause
  useEffect(() => {
    if (phase !== 'loading') return;
    const t = setTimeout(() => onLogin(savingsChoiceRef.current), 5350);
    return () => clearTimeout(t);
  }, [phase, onLogin]);

  const showFaceId = phase === 'faceId' || phase === 'faceIdSuccess';

  const toggleSecondary = (id) => {
    setSecondaryChoices(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const advancePastWhoManages = () =>
    setPhase(primaryChoice === 'savings' ? 'selectSavings' : 'loading');

  const primaryLabel = PRIMARY_OPTIONS.find(o => o.id === primaryChoice)?.label ?? '';
  const secondaryOptions = PRIMARY_OPTIONS.filter(o => o.id !== primaryChoice);

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

      {/* Welcome screen — full overlay with organic background */}
      <AnimatePresence>
        {phase === 'welcome' && (
          <motion.div
            key="welcome-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(140deg, #f5e8d4 0%, #deb882 40%, #b8813a 70%, #8c5a22 100%)',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '8px',
            }}
          >
            <div style={{
              backgroundColor: tokens.color.background.white,
              borderRadius: '20px',
              padding: '24px 16px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}>
              <div style={{ width: '40px', height: '40px' }}>
                <img src={logoUrl} alt="OakNorth" style={{ width: '100%', height: '100%' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p style={{
                    margin: 0,
                    fontFamily: tokens.typography.fontFamily,
                    fontSize: '24px',
                    fontWeight: tokens.typography.fontWeight.semibold,
                    lineHeight: '30px',
                    letterSpacing: '-0.2px',
                    color: '#1A1A33',
                  }}>
                    Welcome to OakNorth, Alex
                  </p>
                  <p style={{
                    margin: 0,
                    fontFamily: tokens.typography.fontFamily,
                    fontSize: `${tokens.typography.fontSize.default}px`,
                    fontWeight: tokens.typography.fontWeight.regular,
                    lineHeight: '24px',
                    color: tokens.color.text.primary,
                  }}>
                    Now that you're with us, we'd like to learn a bit more about your business and your needs.
                  </p>
                </div>
                <p style={{
                  margin: 0,
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: `${tokens.typography.fontSize.default}px`,
                  fontWeight: tokens.typography.fontWeight.regular,
                  lineHeight: '24px',
                  color: tokens.color.text.primary,
                }}>
                  Should only take a couple of minutes.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => setPhase('primaryPurpose')}
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
                  OK, let's do it
                </button>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
                  <div style={{
                    width: '134px',
                    height: '5px',
                    borderRadius: '100px',
                    backgroundColor: '#000000',
                    opacity: 0.18,
                  }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary purpose screen */}
      <AnimatePresence>
        {phase === 'primaryPurpose' && (
          <motion.div
            key="primary-purpose"
            initial={{ x: 393, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -393, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 35, mass: 0.8 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: tokens.color.background.white,
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ height: '47px', flexShrink: 0 }} />

            <div style={{ flex: 1, padding: '68px 16px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{
                  margin: 0,
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: '24px',
                  fontWeight: tokens.typography.fontWeight.semibold,
                  lineHeight: '30px',
                  letterSpacing: '-0.2px',
                  color: tokens.color.text.primary,
                }}>
                  What service are you most interested in?
                </p>
                <p style={{
                  margin: 0,
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: `${tokens.typography.fontSize.default}px`,
                  fontWeight: tokens.typography.fontWeight.regular,
                  lineHeight: '24px',
                  color: tokens.color.text.primary,
                }}>
                  This will help us personalise your experience.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {PRIMARY_OPTIONS.map(option => {
                  const isSelected = primaryChoice === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setPrimaryChoice(option.id)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: `${tokens.borderRadius.sm}px`,
                        border: `1.5px solid ${isSelected ? tokens.color.brand.mint : '#949494'}`,
                        backgroundColor: tokens.color.background.white,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        border: `1.5px solid ${isSelected ? tokens.color.brand.mint : '#949494'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        backgroundColor: isSelected ? tokens.color.brand.mint : 'transparent',
                      }}>
                        {isSelected && (
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ffffff' }} />
                        )}
                      </div>
                      <p style={{
                        margin: 0,
                        fontFamily: tokens.typography.fontFamily,
                        fontSize: `${tokens.typography.fontSize.sm}px`,
                        fontWeight: tokens.typography.fontWeight.semibold,
                        lineHeight: '20px',
                        color: tokens.color.text.primary,
                      }}>
                        {option.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ padding: '16px 16px 48px', flexShrink: 0 }}>
              <button
                onClick={() => setPhase('secondaryPurpose')}
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
                Continue
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secondary purpose screen */}
      <AnimatePresence>
        {phase === 'secondaryPurpose' && (
          <motion.div
            key="secondary-purpose"
            initial={{ x: 393, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -393, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 35, mass: 0.8 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: tokens.color.background.white,
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Status bar spacer */}
            <div style={{ height: '47px', flexShrink: 0 }} />

            {/* Nav bar with back button */}
            <div style={{ height: '48px', padding: '8px 16px', flexShrink: 0 }}>
              <button
                onClick={() => setPhase('primaryPurpose')}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '36px',
                  backgroundColor: tokens.color.background.surface,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ArrowLeft size={20} color={tokens.color.text.primary} strokeWidth={2} />
              </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: '20px 16px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Title + subtitle */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{
                  margin: 0,
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: '24px',
                  fontWeight: tokens.typography.fontWeight.semibold,
                  lineHeight: '30px',
                  letterSpacing: '-0.2px',
                  color: tokens.color.text.primary,
                }}>
                  Are you interested in anything else?
                </p>
                <p style={{
                  margin: 0,
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: `${tokens.typography.fontSize.default}px`,
                  fontWeight: tokens.typography.fontWeight.regular,
                  lineHeight: '24px',
                  color: tokens.color.text.primary,
                }}>
                  If you have other priorities, select all that apply.
                </p>
              </div>

              {/* Alert banner */}
              {primaryLabel && (
                <div style={{
                  backgroundColor: tokens.color.background.accountGreen,
                  borderRadius: `${tokens.borderRadius.sm}px`,
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}>
                  <CircleCheck size={24} color={tokens.color.brand.positive} strokeWidth={1.75} />
                  <p style={{
                    margin: 0,
                    fontFamily: tokens.typography.fontFamily,
                    fontSize: `${tokens.typography.fontSize.sm}px`,
                    fontWeight: tokens.typography.fontWeight.semibold,
                    lineHeight: '20px',
                    color: tokens.color.text.primary,
                  }}>
                    Main interest: {primaryLabel}
                  </p>
                </div>
              )}

              {/* Toggle rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {secondaryOptions.map(option => {
                  const isOn = secondaryChoices.has(option.id);
                  return (
                    <div
                      key={option.id}
                      style={{
                        border: `1px solid ${isOn ? tokens.color.brand.mint : tokens.color.border.default}`,
                        borderRadius: `${tokens.borderRadius.sm}px`,
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                      }}
                      onClick={() => toggleSecondary(option.id)}
                    >
                      <p style={{
                        margin: 0,
                        flex: 1,
                        fontFamily: tokens.typography.fontFamily,
                        fontSize: `${tokens.typography.fontSize.sm}px`,
                        fontWeight: tokens.typography.fontWeight.semibold,
                        lineHeight: '20px',
                        color: tokens.color.text.primary,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {option.label}
                      </p>
                      <Toggle isOn={isOn} onToggle={() => toggleSecondary(option.id)} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Continue CTA */}
            <div style={{ padding: '16px 16px 48px', flexShrink: 0 }}>
              <button
                onClick={() => setPhase('whoManages')}
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
                Continue
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Who manages the account screen */}
      <AnimatePresence>
        {phase === 'whoManages' && (
          <motion.div
            key="who-manages"
            initial={{ x: 393, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -393, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 35, mass: 0.8 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: tokens.color.background.white,
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Status bar spacer */}
            <div style={{ height: '47px', flexShrink: 0 }} />

            {/* Nav bar with back button */}
            <div style={{ height: '48px', padding: '8px 16px', flexShrink: 0 }}>
              <button
                onClick={() => setPhase('secondaryPurpose')}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '36px',
                  backgroundColor: tokens.color.background.surface,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ArrowLeft size={20} color={tokens.color.text.primary} strokeWidth={2} />
              </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: '20px 16px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Title + subtitle */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{
                  margin: 0,
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: '24px',
                  fontWeight: tokens.typography.fontWeight.semibold,
                  lineHeight: '30px',
                  letterSpacing: '-0.2px',
                  color: tokens.color.text.primary,
                }}>
                  Who will manage the account day to day?
                </p>
                <p style={{
                  margin: 0,
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: `${tokens.typography.fontSize.default}px`,
                  fontWeight: tokens.typography.fontWeight.regular,
                  lineHeight: '24px',
                  color: tokens.color.text.primary,
                }}>
                  This person will be the main admin for your account. They'll usually handle tasks such as:
                </p>
              </div>

              {/* Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  'Monitor accounts and balances',
                  'Pay salaries, invoices and bills',
                  'Reconcile transactions',
                  'Manage team access',
                  'Assign debit cards and set spend limits',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CircleCheck size={20} color={tokens.color.brand.positive} strokeWidth={1.75} style={{ flexShrink: 0 }} />
                    <p style={{
                      margin: 0,
                      fontFamily: tokens.typography.fontFamily,
                      fontSize: `${tokens.typography.fontSize.sm}px`,
                      fontWeight: tokens.typography.fontWeight.semibold,
                      lineHeight: '20px',
                      color: tokens.color.text.primary,
                    }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div style={{ padding: '16px 16px 48px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                onClick={advancePastWhoManages}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: `${tokens.borderRadius.pill}px`,
                  backgroundColor: tokens.color.background.white,
                  border: `1px solid ${tokens.color.border.default}`,
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

      {/* Invite bottom sheet — overlays the who-manages screen */}
      <AnimatePresence>
        {phase === 'whoManages' && showInviteSheet && (
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
                bottom: '8px',
                left: '8px',
                right: '8px',
                backgroundColor: tokens.color.background.white,
                borderRadius: '20px',
                padding: '16px 16px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                zIndex: 5,
              }}
            >
              {/* Close button + title + body */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <button
                  onClick={() => setShowInviteSheet(false)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '20px',
                    backgroundColor: '#eff0ee',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <X size={20} color={tokens.color.text.primary} strokeWidth={2} />
                </button>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p style={{
                    margin: 0,
                    fontFamily: tokens.typography.fontFamily,
                    fontSize: '24px',
                    fontWeight: tokens.typography.fontWeight.semibold,
                    lineHeight: '30px',
                    letterSpacing: '-0.2px',
                    color: '#1A1A33',
                  }}>
                    Invite them now?
                  </p>
                  <p style={{
                    margin: 0,
                    fontFamily: tokens.typography.fontFamily,
                    fontSize: `${tokens.typography.fontSize.default}px`,
                    fontWeight: tokens.typography.fontWeight.regular,
                    lineHeight: '24px',
                    color: '#1A1A33',
                  }}>
                    We'll guide them through setting up the account.
                  </p>
                </div>
              </div>

              {/* Bullet rows */}
              {[
                { icon: ScanFace, label: "They'll get their own login details" },
                { icon: Mail,     label: 'They can be the main point of contact' },
                { icon: Eye,      label: "You'll stay in the loop for important stuff" },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Icon size={20} strokeWidth={1.75} color={tokens.color.text.primary} style={{ flexShrink: 0 }} />
                  <p style={{
                    margin: 0,
                    fontFamily: tokens.typography.fontFamily,
                    fontSize: `${tokens.typography.fontSize.sm}px`,
                    fontWeight: tokens.typography.fontWeight.semibold,
                    lineHeight: '20px',
                    color: tokens.color.text.primary,
                  }}>
                    {label}
                  </p>
                </div>
              ))}

              {/* CTAs + home indicator */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => { setShowInviteSheet(false); advancePastWhoManages(); }}
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
                  onClick={() => { setShowInviteSheet(false); advancePastWhoManages(); }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: `${tokens.borderRadius.pill}px`,
                    backgroundColor: tokens.color.background.white,
                    border: `1px solid ${tokens.color.border.default}`,
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
                <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
                  <div style={{
                    width: '134px',
                    height: '5px',
                    borderRadius: '100px',
                    backgroundColor: '#000000',
                    opacity: 0.18,
                  }} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Select savings account screen */}
      <AnimatePresence>
        {phase === 'selectSavings' && (
          <motion.div
            key="select-savings"
            initial={{ x: 393, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -393, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 35, mass: 0.8 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: tokens.color.background.white,
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Status bar spacer */}
            <div style={{ height: '47px', flexShrink: 0 }} />

            {/* Nav bar with back button */}
            <div style={{ height: '48px', padding: '8px 16px', flexShrink: 0 }}>
              <button
                onClick={() => setPhase('whoManages')}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '36px',
                  backgroundColor: tokens.color.background.surface,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ArrowLeft size={20} color={tokens.color.text.primary} strokeWidth={2} />
              </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: '20px 16px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Title + subtitle */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{
                  margin: 0,
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: '24px',
                  fontWeight: tokens.typography.fontWeight.semibold,
                  lineHeight: '30px',
                  letterSpacing: '-0.2px',
                  color: tokens.color.text.primary,
                }}>
                  Select your savings account
                </p>
                <p style={{
                  margin: 0,
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: `${tokens.typography.fontSize.default}px`,
                  fontWeight: tokens.typography.fontWeight.regular,
                  lineHeight: '24px',
                  color: tokens.color.text.primary,
                }}>
                  Once you're all set up, you can fund this account and start earning interest right away.
                </p>
              </div>

              {/* Account cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  {
                    id: 'notice',
                    name: 'Notice',
                    rate: 'Up to 4.25% AER',
                    description: 'Earn more by planning ahead – just give 35, 90 or 120 days’ notice to withdraw.',
                  },
                  {
                    id: 'tracker',
                    name: 'Notice base rate tracker',
                    rate: '4.12% AER',
                    description: 'Our top rate – linked to the Bank of England base rate – with access after 95 days’ notice.',
                  },
                  {
                    id: 'fixed',
                    name: 'Fixed term',
                    rate: '4.05% AER',
                    description: 'Lock in a fixed rate and know exactly what you’ll earn – from 6 to 60 months.',
                  },
                ].map(account => (
                  <button
                    key={account.id}
                    onClick={() => { savingsChoiceRef.current = account; setPhase('loading'); }}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: `${tokens.borderRadius.sm}px`,
                      border: `1px solid ${tokens.color.border.default}`,
                      backgroundColor: tokens.color.background.white,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      textAlign: 'left',
                    }}
                  >
                    {/* Name + rate badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <p style={{
                        margin: 0,
                        fontFamily: tokens.typography.fontFamily,
                        fontSize: `${tokens.typography.fontSize.default}px`,
                        fontWeight: tokens.typography.fontWeight.semibold,
                        lineHeight: '24px',
                        color: tokens.color.text.primary,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {account.name}
                      </p>
                      <div style={{
                        backgroundColor: '#0C3637',
                        borderRadius: `${tokens.borderRadius.pill}px`,
                        padding: '2px 12px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        flexShrink: 0,
                      }}>
                        <p style={{
                          margin: 0,
                          fontFamily: tokens.typography.fontFamily,
                          fontSize: `${tokens.typography.fontSize.sm}px`,
                          fontWeight: tokens.typography.fontWeight.semibold,
                          lineHeight: '20px',
                          color: '#ffffff',
                          whiteSpace: 'nowrap',
                        }}>
                          {account.rate}
                        </p>
                      </div>
                    </div>
                    {/* Description */}
                    <p style={{
                      margin: 0,
                      fontFamily: tokens.typography.fontFamily,
                      fontSize: `${tokens.typography.fontSize.sm}px`,
                      fontWeight: tokens.typography.fontWeight.regular,
                      lineHeight: '20px',
                      color: tokens.color.text.primary,
                    }}>
                      {account.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Skip for now */}
            <div style={{ padding: '16px 16px 48px', flexShrink: 0 }}>
              <button
                onClick={() => setPhase('loading')}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: `${tokens.borderRadius.pill}px`,
                  backgroundColor: tokens.color.background.white,
                  border: `1px solid ${tokens.color.border.default}`,
                  cursor: 'pointer',
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: `${tokens.typography.fontSize.default}px`,
                  fontWeight: tokens.typography.fontWeight.semibold,
                  color: tokens.color.text.primary,
                  lineHeight: '24px',
                }}
              >
                Skip for now
              </button>
            </div>
          </motion.div>
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
              top: '344px',
              left: '16px',
              right: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '40px',
              zIndex: 1,
            }}
          >
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

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%' }}>
              <div style={{
                position: 'relative',
                width: '329px',
                height: '8px',
                borderRadius: '16px',
                backgroundColor: tokens.color.background.surface,
                overflow: 'hidden',
              }}>
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
