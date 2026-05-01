import { useState } from 'react';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import accountSpend from '../../assets/account-spend.png';
import accountSavings from '../../assets/account-savings.png';
import { tokens } from '../../design-system/tokens';

const KEYS = [
  [{ n: '1', l: '' },    { n: '2', l: 'ABC' }, { n: '3', l: 'DEF' }],
  [{ n: '4', l: 'GHI' }, { n: '5', l: 'JKL' }, { n: '6', l: 'MNO' }],
  [{ n: '7', l: 'PQRS'},{ n: '8', l: 'TUV' }, { n: '9', l: 'WXYZ'}],
  [null,                 { n: '0', l: '' },     'del'],
];

function formatDisplay(raw) {
  if (!raw || raw === '0') return '0';
  return parseInt(raw, 10).toLocaleString('en-GB');
}

export default function TransferPage({ onBack, onNext, savingsChoice }) {
  const [amount, setAmount] = useState('50000');

  const handleKey = (key) => {
    if (key === 'del') {
      setAmount(prev => prev.length <= 1 ? '0' : prev.slice(0, -1));
    } else {
      setAmount(prev => prev === '0' ? key : prev + key);
    }
  };

  const hasAmount = amount !== '0' && amount !== '';

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', overflow: 'hidden' }}>

      {/* Status bar spacer */}
      <div style={{ height: 47, flexShrink: 0 }} />

      {/* Nav bar */}
      <div style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{
            width: 40, height: 40, borderRadius: 36,
            backgroundColor: tokens.color.background.surface,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ArrowLeft size={20} color={tokens.color.text.primary} strokeWidth={2} />
        </button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 14px', borderRadius: 36,
          backgroundColor: '#ffffff',
          border: `1px solid ${tokens.color.border.default}`,
          cursor: 'pointer',
        }}>
          <CalendarDays size={16} color={tokens.color.text.primary} strokeWidth={2} />
          <span style={{
            fontFamily: tokens.typography.fontFamily,
            fontSize: `${tokens.typography.fontSize.sm}px`,
            fontWeight: tokens.typography.fontWeight.semibold,
            color: tokens.color.text.primary,
          }}>
            Schedule
          </span>
        </button>
      </div>

      {/* Amount */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{
          margin: 0,
          fontFamily: tokens.typography.fontFamily,
          fontSize: '52px',
          fontWeight: tokens.typography.fontWeight.semibold,
          lineHeight: 1,
          letterSpacing: '-1.5px',
          color: tokens.color.text.primary,
        }}>
          £{formatDisplay(amount)}
          <span style={{ opacity: 0.4 }}>|</span>
        </p>
      </div>

      {/* FROM / TO card */}
      <div style={{ margin: '0 16px', border: `1px solid ${tokens.color.border.default}`, borderRadius: 16, overflow: 'hidden', flexShrink: 0 }}>

        {/* FROM */}
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            width: 36, flexShrink: 0,
            fontFamily: tokens.typography.fontFamily,
            fontSize: '11px',
            fontWeight: tokens.typography.fontWeight.semibold,
            color: tokens.color.text.secondary,
            letterSpacing: '0.05em',
          }}>
            FROM
          </span>
          <div style={{
            width: 36, height: 36, borderRadius: 18,
            backgroundColor: '#E8F1FE',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, overflow: 'hidden',
          }}>
            <img src={accountSpend} alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              margin: 0,
              fontFamily: tokens.typography.fontFamily,
              fontSize: `${tokens.typography.fontSize.sm}px`,
              fontWeight: tokens.typography.fontWeight.semibold,
              lineHeight: '20px',
              color: tokens.color.text.primary,
            }}>
              Spend Account
            </p>
            <p style={{
              margin: 0,
              fontFamily: tokens.typography.fontFamily,
              fontSize: '12px',
              fontWeight: tokens.typography.fontWeight.regular,
              lineHeight: '16px',
              color: tokens.color.text.secondary,
            }}>
              Balance: £50,000.00
            </p>
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: tokens.color.border.default }} />

        {/* TO */}
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            width: 36, flexShrink: 0,
            fontFamily: tokens.typography.fontFamily,
            fontSize: '11px',
            fontWeight: tokens.typography.fontWeight.semibold,
            color: tokens.color.text.secondary,
            letterSpacing: '0.05em',
          }}>
            TO
          </span>
          <div style={{
            width: 36, height: 36, borderRadius: 18,
            backgroundColor: '#E3F8EB',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, overflow: 'hidden',
          }}>
            <img src={accountSavings} alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              margin: 0,
              fontFamily: tokens.typography.fontFamily,
              fontSize: `${tokens.typography.fontSize.sm}px`,
              fontWeight: tokens.typography.fontWeight.semibold,
              lineHeight: '20px',
              color: tokens.color.text.primary,
            }}>
              {savingsChoice?.name ?? 'Savings account'}
            </p>
            <p style={{
              margin: 0,
              fontFamily: tokens.typography.fontFamily,
              fontSize: '12px',
              fontWeight: tokens.typography.fontWeight.regular,
              lineHeight: '16px',
              color: tokens.color.text.secondary,
            }}>
              {savingsChoice?.rate ?? ''}
            </p>
          </div>
        </div>
      </div>

      {/* Next button */}
      <div style={{ padding: '16px 16px 12px', flexShrink: 0 }}>
        <button
          onClick={() => hasAmount && onNext(amount)}
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: `${tokens.borderRadius.pill}px`,
            backgroundColor: hasAmount ? tokens.color.brand.base : tokens.color.brand.baseMuted,
            border: 'none', cursor: hasAmount ? 'pointer' : 'default',
            fontFamily: tokens.typography.fontFamily,
            fontSize: `${tokens.typography.fontSize.default}px`,
            fontWeight: tokens.typography.fontWeight.semibold,
            color: tokens.color.text.primary,
            lineHeight: '24px',
          }}>
          Next
        </button>
      </div>

      {/* Keypad */}
      <div style={{ backgroundColor: tokens.color.background.surface, flexShrink: 0, paddingBottom: 8 }}>
        {KEYS.map((row, ri) => (
          <div key={ri} style={{ display: 'flex' }}>
            {row.map((key, ki) => {
              if (key === null) {
                return <div key={ki} style={{ flex: 1 }} />;
              }
              if (key === 'del') {
                return (
                  <button
                    key={ki}
                    onClick={() => handleKey('del')}
                    style={{
                      flex: 1, height: 56, border: 'none', background: 'none',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                      <path d="M9 1H22C22.5523 1 23 1.44772 23 2V16C23 16.5523 22.5523 17 22 17H9L1 9L9 1Z" stroke={tokens.color.text.primary} strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M15 6L11 12M11 6L15 12" stroke={tokens.color.text.primary} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                );
              }
              return (
                <button
                  key={ki}
                  onClick={() => handleKey(key.n)}
                  style={{
                    flex: 1, height: 56, border: 'none', background: 'none',
                    cursor: 'pointer', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 0,
                  }}
                >
                  <span style={{
                    fontFamily: tokens.typography.fontFamily,
                    fontSize: '22px',
                    fontWeight: tokens.typography.fontWeight.regular,
                    color: tokens.color.text.primary,
                    lineHeight: 1.1,
                  }}>
                    {key.n}
                  </span>
                  {key.l && (
                    <span style={{
                      fontFamily: tokens.typography.fontFamily,
                      fontSize: '8px',
                      fontWeight: tokens.typography.fontWeight.semibold,
                      color: tokens.color.text.primary,
                      letterSpacing: '0.08em',
                      lineHeight: 1.2,
                    }}>
                      {key.l}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
