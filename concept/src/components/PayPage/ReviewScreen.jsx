import { useState, useEffect } from 'react';
import { colors } from '../../styles/colors';

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

const ENDS_LABELS = {
  cancelled: 'Until cancelled',
  '3months': 'After 3 months',
  '6months': 'After 6 months',
  '1year': 'After 1 year',
};

function formatHumanDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function arrivalTitle(scheduleOptions) {
  if (scheduleOptions.deferDate) return `Arrives ${formatHumanDate(scheduleOptions.deferDate)}`;
  return 'Arrives today';
}

function repeatSubtitle(scheduleOptions) {
  if (!scheduleOptions.repeat) return "Doesn't repeat";
  const repeatLabel = `Repeats ${scheduleOptions.repeat}`;
  const endsLabel = scheduleOptions.ends ? ENDS_LABELS[scheduleOptions.ends] : 'Until cancelled';
  return `${repeatLabel} · ${endsLabel}`;
}

export default function ReviewScreen({
  recipient,
  amount,
  reference,
  scheduleOptions,
  onBack,
  onSend,
  onEditSchedule,
}) {
  const hasSchedule = scheduleOptions.repeat || scheduleOptions.deferDate;
  const [fading, setFading] = useState(false);
  const [toCardVisible, setToCardVisible] = useState(false);
  const [arrowVisible, setArrowVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setToCardVisible(true), 150);
    const t2 = setTimeout(() => setArrowVisible(true), 550);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleSend = () => {
    setFading(true);
    setTimeout(onSend, 400);
  };

  // Split amount into integer and decimal parts for display
  const numericAmount = parseFloat(amount) || 0;
  const [intPart, decPart] = numericAmount.toLocaleString('en-GB', { minimumFractionDigits: 2 }).split('.');
  const formattedFull = `£${numericAmount.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: colors.white,
      opacity: fading ? 0 : 1,
      transition: 'opacity 350ms ease',
    }}>

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '16px', flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{
            width: '40px', height: '40px', borderRadius: '50%', backgroundColor: colors.grey100,
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.black} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
      </div>

      {/* Title */}
      <div style={{ paddingLeft: '16px', paddingRight: '16px', paddingBottom: '24px', flexShrink: 0 }}>
        <h1 style={{ fontSize: '28px', fontWeight: 600, color: colors.black, margin: 0 }}>Review</h1>
      </div>

      {/* Scrollable content */}
      <div className="scrollbar-hide" style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: '16px' }}>

        {/* Amount */}
        <div style={{ paddingLeft: '16px', paddingRight: '16px', marginBottom: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textSecondary, marginBottom: '4px' }}>
            Amount
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
              <span style={{ fontSize: '28px', fontWeight: 700, color: colors.black, letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                {intPart}
              </span>
              <span style={{ fontSize: '20px', fontWeight: 600, color: colors.black }}>
                .{decPart}
              </span>
            </div>
            <div style={{
              border: `1.5px solid ${colors.grey300}`, borderRadius: '50px',
              padding: '6px 14px', fontSize: '14px', fontWeight: 600, color: colors.black, flexShrink: 0,
            }}>
              GBP
            </div>
          </div>
        </div>

        {/* From / To cards */}
        <div style={{ paddingLeft: '16px', paddingRight: '16px', marginBottom: '24px' }}>
          {/* Clip container so to card slides out from behind from card */}
          <div style={{ position: 'relative' }}>
            {/* From card */}
            <div style={{ border: `1px solid ${colors.grey200}`, borderRadius: '16px', padding: '14px 16px', position: 'relative', zIndex: 2, backgroundColor: colors.white }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#0C3637',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5BFF9A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1"/>
                    <rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/>
                    <rect x="14" y="14" width="7" height="7" rx="1"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: colors.black }}>Spend Account</div>
                  <div style={{ fontSize: '13px', color: colors.textSecondary, marginTop: '2px' }}>00-00-00 • 12345678</div>
                </div>
              </div>
            </div>

            {/* Arrow — fades in after to card settles */}
            <div style={{
              display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 3, margin: '-12px 0',
              opacity: arrowVisible ? 1 : 0,
              transition: 'opacity 250ms ease',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', backgroundColor: colors.white,
                border: `1px solid ${colors.grey200}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.clearblue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <polyline points="19 12 12 19 5 12"/>
                </svg>
              </div>
            </div>

            {/* To card — slides down from behind from card */}
            <div style={{
              border: `1px solid ${colors.grey200}`, borderRadius: '16px', padding: '14px 16px',
              position: 'relative', zIndex: 1, backgroundColor: colors.white,
              transform: toCardVisible ? 'translateY(0)' : 'translateY(-100%)',
              opacity: toCardVisible ? 1 : 0,
              transition: 'transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 200ms ease',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  backgroundColor: colors.springgreen, color: colors.black,
                  width: '44px', height: '44px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 600, flexShrink: 0,
                }}>
                  {recipient?.initials}
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: colors.black }}>{recipient?.name}</div>
                  <div style={{ fontSize: '13px', color: colors.textSecondary, marginTop: '2px' }}>
                    {recipient?.currency === 'GBP'
                      ? `${recipient?.sortCode || '12-48-86'} • ${recipient?.lastFour ? '••••' + recipient.lastFour : '48889156'}`
                      : `${recipient?.currency} account •••• ${recipient?.lastFour}`
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule section — only if set */}
        {hasSchedule && (
          <div style={{ paddingLeft: '16px', paddingRight: '16px', marginBottom: '24px' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: colors.black, marginBottom: '12px' }}>
              Scheduled
            </div>
            <div style={{
              border: `1px solid ${colors.grey200}`, borderRadius: '16px', padding: '14px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <div style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.black} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: colors.black }}>
                    {arrivalTitle(scheduleOptions)}
                  </div>
                  <div style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: 400, marginTop: '2px' }}>
                    {repeatSubtitle(scheduleOptions)}
                  </div>
                </div>
              </div>
              <button
                onClick={onBack}
                style={{
                  border: 'none', backgroundColor: colors.grey100, borderRadius: '50px',
                  padding: '6px 16px', fontSize: '15px', fontWeight: 600,
                  color: colors.clearblue, cursor: 'pointer', fontFamily: "'Manrope', sans-serif", flexShrink: 0,
                }}
              >
                Edit
              </button>
            </div>
          </div>
        )}

        {/* Reference — only if set */}
        {!!reference && (
          <div style={{ paddingLeft: '16px', paddingRight: '16px', marginBottom: '24px' }}>
            <div style={{
              border: `1px solid ${colors.grey200}`, borderRadius: '16px', padding: '14px 16px',
            }}>
              <div style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: 400, marginBottom: '4px' }}>
                Reference
              </div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: colors.black }}>
                {reference}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Make payment button */}
      <div style={{ padding: '16px', paddingBottom: '32px', flexShrink: 0 }}>
        <button
          onClick={handleSend}
          style={{
            width: '100%', height: '52px', backgroundColor: colors.springgreen,
            color: colors.black, border: 'none', borderRadius: '16px',
            fontSize: '16px', fontWeight: 600, cursor: 'pointer',
            fontFamily: "'Manrope', sans-serif",
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}
        >
          Make payment
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.black} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </div>
  );
}