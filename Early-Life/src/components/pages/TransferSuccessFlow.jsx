import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { tokens } from '../../design-system/tokens';

function formatAmount(raw) {
  const n = parseInt(raw || '0', 10);
  return `£${n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function TransferSuccessFlow({ onDone, savingsChoice, amount }) {
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    const t = setTimeout(() => setPhase('success'), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      <AnimatePresence>

        {phase === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 40, height: 40, borderRadius: '50%',
                border: `2.5px solid ${tokens.color.border.default}`,
                borderTopColor: '#0C3637',
              }}
            />
          </motion.div>
        )}

        {phase === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute', inset: 0,
              backgroundColor: '#ffffff',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Centered content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', gap: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 28,
                backgroundColor: '#0C3637',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Check size={24} color="#ffffff" strokeWidth={2.5} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <p style={{
                  margin: 0,
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: '22px',
                  fontWeight: tokens.typography.fontWeight.semibold,
                  lineHeight: '28px',
                  letterSpacing: '-0.2px',
                  color: tokens.color.text.primary,
                  textAlign: 'center',
                }}>
                  Payment successful
                </p>
                <p style={{
                  margin: 0,
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: `${tokens.typography.fontSize.sm}px`,
                  fontWeight: tokens.typography.fontWeight.regular,
                  lineHeight: '20px',
                  color: tokens.color.text.secondary,
                  textAlign: 'center',
                }}>
                  You sent {formatAmount(amount)} to {savingsChoice?.name ?? 'your savings account'}.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ padding: '0 16px 48px', display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
              <button
                onClick={onDone}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: `${tokens.borderRadius.pill}px`,
                  backgroundColor: tokens.color.brand.base,
                  border: 'none', cursor: 'pointer',
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: `${tokens.typography.fontSize.default}px`,
                  fontWeight: tokens.typography.fontWeight.semibold,
                  color: tokens.color.text.primary,
                  lineHeight: '24px',
                }}
              >
                Done
              </button>
              <button
                onClick={onDone}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: `${tokens.borderRadius.pill}px`,
                  backgroundColor: 'transparent',
                  border: 'none', cursor: 'pointer',
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: `${tokens.typography.fontSize.sm}px`,
                  fontWeight: tokens.typography.fontWeight.semibold,
                  color: tokens.color.text.primary,
                  lineHeight: '20px',
                }}
              >
                Make another payment
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
