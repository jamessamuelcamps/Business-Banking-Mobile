import { useState, useEffect } from 'react';
import { colors } from '../../styles/colors';

const MIDNIGHTGREEN = '#0C3637';

// Phase timeline:
// 0 = spinner running (grey track + midnightgreen arc spinning)
// 1 = circle moves up, fills solid midnightgreen
// 2 = white tick appears inside
// 3 = "Payment successful" + subtitle fade in
// 4 = Done button + "Make another payment" fade in

export default function PaymentResultScreen({ recipient, amount, onDone, onMakeAnother }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const steps = [
      [1, 1400],
      [2, 1900],
      [3, 2300],
      [4, 2700],
    ];
    const timers = steps.map(([p, t]) => setTimeout(() => setPhase(p), t));
    return () => timers.forEach(clearTimeout);
  }, []);

  const numericAmount = parseFloat(amount) || 0;
  const formattedAmount = `£${numericAmount.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`;

  const CIRCLE = 72;
  const STROKE = 3;
  const R = (CIRCLE - STROKE) / 2;
  const CIRC = 2 * Math.PI * R;
  // Arc is ~75% of circle, gap ~25%
  const DASH = CIRC * 0.75;
  const GAP = CIRC * 0.25;

  // Circle moves from vertical centre to slightly above centre when phase >= 1
  const circleTop = phase >= 1 ? 'calc(50% - 110px)' : 'calc(50% - 36px)';

  return (
    <div style={{
      flex: 1,
      position: 'relative',
      backgroundColor: colors.white,
      overflow: 'hidden',
    }}>

      {/* Spinner / success circle */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: circleTop,
        transform: 'translateX(-50%)',
        width: `${CIRCLE}px`,
        height: `${CIRCLE}px`,
        transition: 'top 500ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {phase < 1 ? (
          /* Spinning SVG */
          <svg
            width={CIRCLE} height={CIRCLE}
            viewBox={`0 0 ${CIRCLE} ${CIRCLE}`}
            style={{ animation: 'spin 1s linear infinite' }}
          >
            {/* Grey track */}
            <circle
              cx={CIRCLE / 2} cy={CIRCLE / 2} r={R}
              fill="none"
              stroke={colors.grey200}
              strokeWidth={STROKE}
            />
            {/* Midnightgreen spinning arc */}
            <circle
              cx={CIRCLE / 2} cy={CIRCLE / 2} r={R}
              fill="none"
              stroke={MIDNIGHTGREEN}
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={`${DASH} ${GAP}`}
              style={{ transformOrigin: `${CIRCLE / 2}px ${CIRCLE / 2}px` }}
            />
          </svg>
        ) : (
          /* Filled circle with tick */
          <div style={{
            width: `${CIRCLE}px`,
            height: `${CIRCLE}px`,
            borderRadius: '50%',
            backgroundColor: MIDNIGHTGREEN,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'popIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          }}>
            {phase >= 2 && (
              <svg
                width="44" height="44"
                viewBox="0 0 32 32"
                fill="none"
                style={{ animation: 'drawTick 300ms ease forwards' }}
              >
                <path
                  d="M7 16L13 22L25 10"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="30"
                  strokeDashoffset="0"
                />
              </svg>
            )}
          </div>
        )}
      </div>

      {/* Text content */}
      <div style={{
        position: 'absolute',
        left: 0, right: 0,
        top: 'calc(50% - 110px + 88px)',
        textAlign: 'center',
        padding: '0 32px',
        opacity: phase >= 3 ? 1 : 0,
        transform: phase >= 3 ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 400ms ease, transform 400ms ease',
      }}>
        <div style={{
          fontSize: '28px', fontWeight: 700, color: colors.black, marginBottom: '12px',
        }}>
          Payment successful
        </div>
        <div style={{
          fontSize: '16px', color: colors.textSecondary, fontWeight: 400, lineHeight: 1.5,
        }}>
          You sent {formattedAmount} to {recipient?.name}.
        </div>
      </div>

      {/* Buttons */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        padding: '16px 16px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        opacity: phase >= 4 ? 1 : 0,
        transform: phase >= 4 ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 400ms ease, transform 400ms ease',
      }}>
        <button onClick={onDone} style={{
          width: '100%', height: '52px', backgroundColor: colors.springgreen,
          color: colors.black, border: 'none', borderRadius: '16px',
          fontSize: '16px', fontWeight: 600, cursor: 'pointer',
          fontFamily: "'Manrope', sans-serif",
          marginBottom: '12px',
        }}>
          Done
        </button>
        <button
          onClick={onMakeAnother || onDone}
          style={{
            width: '100%', height: '44px', backgroundColor: 'transparent',
            border: 'none', fontSize: '16px', fontWeight: 500,
            color: colors.grey600, cursor: 'pointer',
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          Make another payment
        </button>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes popIn {
          from { transform: scale(0.6); opacity: 0.5; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes drawTick {
          from { stroke-dashoffset: 30; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}