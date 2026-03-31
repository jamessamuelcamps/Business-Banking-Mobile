import { useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';
import iconChevronDown from '../../assets/icon-chevron-down.svg';
import iconQuestion from '../../assets/icon-question.svg';
import iconUserCog from '../../assets/icon-user-cog.svg';
import iconPlus from '../../assets/icon-plus.svg';
import iconInfo from '../../assets/icon-info.svg';
import iconTaskInvite from '../../assets/icon-task-invite.svg';
import iconTaskMoney from '../../assets/icon-task-money.svg';
import iconTaskImport from '../../assets/icon-task-import.svg';
import iconTaskLink from '../../assets/icon-task-link.svg';
import iconTaskCard from '../../assets/icon-task-card.svg';
import accountSpend from '../../assets/account-spend.png';
import accountSavings from '../../assets/account-savings.png';
import { tokens } from '../../design-system/tokens';

const TASK_CARDS = [
  { bg: '#C4F7D7', circleBg: '#0C3637', icon: null, label: 'Invite your team to the account', labelColor: '#1a1a33' },
  { bg: '#0C3637', circleBg: '#C4FFD5', icon: iconTaskMoney,  invertIcon: false, label: 'Add money to your account',   labelColor: '#F9FAFA' },
  { bg: '#0C3637', circleBg: '#C4FFD5', icon: iconTaskImport, invertIcon: false, label: 'Import your recipients',      labelColor: '#F9FAFA' },
  { bg: '#0C3637', circleBg: '#C4FFD5', icon: iconTaskLink,   invertIcon: false, label: 'Link accountancy tools',      labelColor: '#F9FAFA' },
  { bg: '#0C3637', circleBg: '#C4FFD5', icon: iconTaskCard,   invertIcon: false, label: 'Order your debit card',       labelColor: '#F9FAFA' },
];

const ACCOUNTS = [
  { circleBg: '#E8F1FE', icon: accountSpend,   name: 'Main Account', account: '12335299 • 10-30-30',    balance: '£0.00' },
  { circleBg: '#E3F8EB', icon: accountSavings, name: 'Easy Access',  account: 'Easy access • ••••1179', balance: '£0.00' },
];

function DonutProgress({ percent = 20 }) {
  const size = 64;
  const r = 30;
  const cx = 32;
  const circumference = 2 * Math.PI * r;
  const targetDash = (percent / 100) * circumference;

  const spring = useSpring(0, { stiffness: 55, damping: 16 });
  const displayPercent = useTransform(spring, v => `${Math.round(v)}%`);
  const strokeDasharray = useTransform(spring, v => `${(v / 100) * circumference} ${circumference}`);

  useEffect(() => {
    spring.set(percent);
  }, [percent, spring]);

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <circle cx={cx} cy={cx} r={r} stroke="#DEDFDF" strokeWidth="4" />
        <motion.circle
          cx={cx} cy={cx} r={r}
          stroke="#0C3637"
          strokeWidth="4"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cx})`}
        />
      </svg>
      <motion.p style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        margin: 0,
        fontSize: 14,
        fontWeight: 600,
        color: tokens.color.text.primary,
        fontFamily: tokens.typography.fontFamily,
        lineHeight: '20px',
        whiteSpace: 'nowrap',
      }}>{displayPercent}</motion.p>
    </div>
  );
}

const iconButton = (icon, alt = '', iconSize = 24) => (
  <div style={{
    width: 40, height: 40,
    borderRadius: 36,
    backgroundColor: tokens.color.background.surface,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  }}>
    <img src={icon} alt={alt} style={{ width: iconSize, height: iconSize }} />
  </div>
);

export default function HomePage({ firstCardComplete, setFirstCardComplete, cardOrder, setCardOrder }) {
  useEffect(() => {
    if (firstCardComplete) return; // already animated — don't re-run
    const t1 = setTimeout(() => setFirstCardComplete(true), 500);
    const t2 = setTimeout(() => setCardOrder([1, 2, 3, 4, 0]), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      backgroundColor: '#ffffff',
    }}>

      {/* Top menu */}
      <div style={{
        padding: '48px 16px 16px',
        display: 'flex',
        gap: '18px',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <div style={{
          flex: 1,
          border: `1px solid ${tokens.color.border.default}`,
          borderRadius: tokens.borderRadius.sm,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: 8,
          overflow: 'hidden',
        }}>
          <span style={{
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: tokens.typography.fontSize.sm,
            fontWeight: tokens.typography.fontWeight.regular,
            color: tokens.color.text.primary,
            fontFamily: tokens.typography.fontFamily,
          }}>NOBLE ESTATES DEVELOP...</span>
          <img src={iconChevronDown} alt="" style={{ width: 16, height: 16, flexShrink: 0 }} />
        </div>
        {iconButton(iconQuestion)}
        {iconButton(iconUserCog)}
      </div>

      {/* Scrollable content */}
      <div
        className="scrollbar-hide"
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >

        {/* Setup guide — grey background ends 24px before content */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 48, backgroundColor: tokens.color.background.surface, zIndex: 0 }} />
          <div style={{ position: 'relative', zIndex: 1, padding: '24px 16px' }}>
          {/* Hero: title + donut */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 24 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 600, lineHeight: '22px', color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>
                Start here, Alex
              </p>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 400, lineHeight: '20px', color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>
                Complete these steps to get your account up and running.
              </p>
            </div>
            <DonutProgress percent={20} />
          </div>

          {/* Task cards — bleed to section edges */}
          <div className="scrollbar-hide" style={{ display: 'flex', gap: 16, overflowX: 'auto', marginLeft: -16, marginRight: -16, paddingLeft: 16, paddingRight: 16 }}>
            {cardOrder.map((cardIndex) => {
              const card = TASK_CARDS[cardIndex];
              const layoutTransition = { type: 'tween', duration: 2.5, ease: 'easeInOut' };
              const isMoved = cardOrder[0] !== 0; // true once reorder has fired
              if (cardIndex === 0) {
                const bg = firstCardComplete ? '#C4F7D7' : '#0C3637';
                const circleBg = firstCardComplete ? '#0C3637' : '#C4FFD5';
                const labelColor = firstCardComplete ? '#1a1a33' : '#F9FAFA';
                const transition = { duration: 0.4, ease: 'easeInOut' };
                return (
                  <motion.div
                    key={0}
                    layout
                    animate={{ backgroundColor: bg }}
                    transition={{ layout: layoutTransition, ...transition }}
                    style={{
                      borderRadius: 8,
                      padding: 16,
                      width: 200,
                      height: 136,
                      flexShrink: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      zIndex: isMoved ? 0 : 1,
                    }}
                  >
                    <motion.div
                      animate={{ backgroundColor: circleBg }}
                      transition={transition}
                      style={{
                        width: 40, height: 40,
                        borderRadius: 36,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {firstCardComplete ? (
                          <motion.div
                            key="check"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <Check size={20} color="#ffffff" strokeWidth={2.5} />
                          </motion.div>
                        ) : (
                          <motion.img
                            key="mail"
                            src={iconTaskInvite}
                            alt=""
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ width: 24, height: 24 }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                    <motion.p
                      animate={{ color: labelColor }}
                      transition={transition}
                      style={{
                        margin: 0,
                        fontSize: 14,
                        fontWeight: 600,
                        lineHeight: '20px',
                        fontFamily: tokens.typography.fontFamily,
                      }}
                    >{card.label}</motion.p>
                  </motion.div>
                );
              }
              return (
              <motion.div
                key={cardIndex}
                layout
                transition={{ layout: layoutTransition }}
                style={{
                  backgroundColor: card.bg,
                  borderRadius: 8,
                  padding: 16,
                  width: 200,
                  height: 136,
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div style={{
                  width: 40, height: 40,
                  borderRadius: 36,
                  backgroundColor: card.circleBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img src={card.icon} alt="" style={{ width: 24, height: 24, filter: card.invertIcon ? 'invert(1)' : undefined }} />
                </div>
                <p style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: '20px',
                  color: card.labelColor,
                  fontFamily: tokens.typography.fontFamily,
                }}>{card.label}</p>
              </motion.div>
              );
            })}
          </div>
        </div>
        </div>

        {/* Balance box + Accounts — white background */}
        <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Balance + quick actions — bordered box */}
          <div style={{
            border: `1px solid ${tokens.color.border.default}`,
            borderRadius: 16,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 400, lineHeight: '20px', color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>
                Available cash from all accounts
              </p>
              <p style={{ margin: 0, fontSize: 28, fontWeight: 600, lineHeight: '36px', letterSpacing: '-0.25px', color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>
                £0.00
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button style={{
                backgroundColor: tokens.color.brand.base,
                border: 'none',
                borderRadius: tokens.borderRadius.pill,
                padding: '12px 16px',
                fontSize: tokens.typography.fontSize.default,
                fontWeight: tokens.typography.fontWeight.semibold,
                color: tokens.color.text.primary,
                cursor: 'pointer',
                fontFamily: tokens.typography.fontFamily,
                lineHeight: '24px',
                whiteSpace: 'nowrap',
              }}>Add money</button>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                {iconButton(iconPlus, '', 20)}
                {iconButton(iconInfo)}
              </div>
            </div>
          </div>

          {/* Accounts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 600, lineHeight: '22px', color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>
              Accounts
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ACCOUNTS.map((account, i) => (
                <div
                  key={i}
                  style={{
                    border: `1px solid ${tokens.color.border.default}`,
                    borderRadius: 8,
                    padding: 12,
                    height: 70,
                    display: 'flex',
                    gap: 16,
                    alignItems: 'center',
                  }}
                >
                  <div style={{
                    width: 40, height: 40,
                    borderRadius: 20,
                    backgroundColor: account.circleBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    overflow: 'hidden',
                  }}>
                    <img src={account.icon} alt="" style={{ maxWidth: 28, maxHeight: 28, objectFit: 'contain' }} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 16, fontWeight: 600, lineHeight: '24px', color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>{account.name}</p>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 400, lineHeight: '20px', color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{account.account}</p>
                  </div>
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 600, lineHeight: '24px', color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily, whiteSpace: 'nowrap' }}>{account.balance}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
