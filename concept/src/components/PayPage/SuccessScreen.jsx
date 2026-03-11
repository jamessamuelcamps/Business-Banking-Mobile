import { useEffect, useState } from 'react';
import { colors } from '../../styles/colors';

function ScheduleSummary({ scheduleOptions }) {
  if (!scheduleOptions.repeat && !scheduleOptions.deferDate) return null;
  const parts = [];
  if (scheduleOptions.repeat) parts.push(`Repeats ${scheduleOptions.repeat}`);
  if (scheduleOptions.deferDate) parts.push(`Starting ${scheduleOptions.deferDate}`);
  return parts.join(' · ');
}

export default function SuccessScreen({ recipient, amount, scheduleOptions, onDone }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in
    setTimeout(() => setVisible(true), 50);
  }, []);

  const formattedAmount = `£${parseFloat(amount).toLocaleString('en-GB', { minimumFractionDigits: 2 })}`;
  const scheduleSummary = scheduleOptions.repeat || scheduleOptions.deferDate
    ? <ScheduleSummary scheduleOptions={scheduleOptions} />
    : null;

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.white,
      padding: '32px 24px',
      gap: '24px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 400ms ease, transform 400ms ease',
    }}>
      {/* Success icon */}
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: colors.springgreen,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: visible ? 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none',
      }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12L10 17L19 7"
            stroke={colors.black}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Success text */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 700, color: colors.black, marginBottom: '8px' }}>
          Payment sent!
        </div>
        <div style={{ fontSize: '36px', fontWeight: 700, color: colors.black, letterSpacing: '-1px', marginBottom: '12px' }}>
          {formattedAmount}
        </div>
        <div style={{ fontSize: '16px', color: colors.textSecondary, marginBottom: '4px' }}>
          sent to <span style={{ fontWeight: 600, color: colors.black }}>{recipient?.name}</span>
        </div>
        {scheduleSummary && (
          <div style={{
            marginTop: '12px',
            padding: '6px 14px',
            backgroundColor: colors.grey100,
            borderRadius: '50px',
            fontSize: '13px',
            fontWeight: 600,
            color: colors.black,
            display: 'inline-block',
          }}>
            {scheduleSummary}
          </div>
        )}
      </div>

      {/* Details card */}
      <div style={{
        width: '100%',
        backgroundColor: colors.grey100,
        borderRadius: '16px',
        padding: '16px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '12px',
          paddingBottom: '12px',
          borderBottom: `1px solid ${colors.grey200}`,
        }}>
          <span style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 500 }}>To</span>
          <span style={{ fontSize: '14px', color: colors.black, fontWeight: 600 }}>{recipient?.name}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '12px',
          paddingBottom: '12px',
          borderBottom: `1px solid ${colors.grey200}`,
        }}>
          <span style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 500 }}>Account</span>
          <span style={{ fontSize: '14px', color: colors.black, fontWeight: 600 }}>
            {recipient?.sortCode} · {recipient?.accountNumber}
          </span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 500 }}>Payment type</span>
          <span style={{ fontSize: '14px', color: colors.black, fontWeight: 600 }}>Faster Payment</span>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          onClick={onDone}
          style={{
            width: '100%',
            height: '52px',
            backgroundColor: colors.springgreen,
            color: colors.black,
            border: 'none',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          Done
        </button>
        <button
          style={{
            width: '100%',
            height: '52px',
            backgroundColor: 'transparent',
            color: colors.black,
            border: `1px solid ${colors.grey300}`,
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          Download receipt
        </button>
      </div>

      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
