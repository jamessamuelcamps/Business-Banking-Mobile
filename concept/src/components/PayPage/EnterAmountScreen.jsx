import { useState, useEffect } from 'react';
import { colors } from '../../styles/colors';

const FROM_ACCOUNTS = [
  { id: 1, name: 'Spend Account',   sortCode: '00-00-00', number: '12345678', balance: '£500,000.00' },
  { id: 2, name: 'Tax Pot',         sortCode: '00-00-00', number: '65841269', balance: '£100,000.00' },
  { id: 3, name: 'Notice Account',  sortCode: '00-00-00', number: '68392952', balance: '£46,000.00'  },
];

// Small bottom sheet for account selection
function AccountPickerSheet({ isOpen, onClose, selected, onSelect }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (isOpen) setTimeout(() => setVisible(true), 10);
    else setVisible(false);
  }, [isOpen]);
  if (!isOpen && !visible) return null;

  return (
    <>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 300,
        opacity: visible ? 1 : 0, transition: 'opacity 250ms ease',
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        backgroundColor: colors.white, borderRadius: '24px 24px 0 0', zIndex: 301,
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        paddingBottom: '32px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 8px' }}>
          <div style={{ width: '36px', height: '4px', borderRadius: '2px', backgroundColor: colors.grey300 }} />
        </div>
        <div style={{ fontSize: '14px', fontWeight: 600, color: colors.black, padding: '4px 16px 8px' }}>
          Pay from
        </div>
        {FROM_ACCOUNTS.map(account => (
          <div
            key={account.id}
            onClick={() => { onSelect(account); onClose(); }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 16px', cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#0C3637',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5BFF9A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 500, color: colors.black }}>{account.name}</div>
                <div style={{ fontSize: '13px', color: colors.textSecondary, marginTop: '2px' }}>{account.sortCode} • {account.number}</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: colors.black, marginTop: '2px' }}>{account.balance}</div>
              </div>
            </div>
            {selected?.id === account.id && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12L10 17L19 7" stroke={colors.clearblue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default function EnterAmountScreen({
  recipient,
  amount,
  setAmount,
  reference,
  setReference,
  scheduleOptions,
  onOpenSchedule,
  onBack,
  onContinue,
}) {
  const hasSchedule = scheduleOptions.repeat || scheduleOptions.deferDate;
  const [scheduleVisible, setScheduleVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(FROM_ACCOUNTS[0]);
  const [showAccountPicker, setShowAccountPicker] = useState(false);

  // Animate schedule card in when a schedule is set
  useEffect(() => {
    if (hasSchedule) {
      setTimeout(() => setScheduleVisible(true), 10);
    } else {
      setScheduleVisible(false);
    }
  }, [hasSchedule]);

  const scheduleLabel = () => {
    if (scheduleOptions.repeat && scheduleOptions.deferDate) return `${scheduleOptions.repeat} · ${scheduleOptions.deferDate}`;
    if (scheduleOptions.repeat) return scheduleOptions.repeat;
    if (scheduleOptions.deferDate) return scheduleOptions.deferDate;
    return 'Schedule';
  };

  const formatHumanDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const arrivalTitle = () => {
    if (scheduleOptions.deferDate) return `Arrives ${formatHumanDate(scheduleOptions.deferDate)}`;
    return 'Arrives today';
  };

  const ENDS_LABELS = {
    cancelled: 'Until cancelled',
    '3months': 'Ends after 3 months',
    '6months': 'Ends after 6 months',
    '1year': 'Ends after 1 year',
  };

  const repeatSubtitle = () => {
    if (!scheduleOptions.repeat) return "Doesn't repeat";
    const repeatLabel = `Repeats ${scheduleOptions.repeat}`;
    const endsLabel = scheduleOptions.ends ? ENDS_LABELS[scheduleOptions.ends] : 'Until cancelled';
    return `${repeatLabel} · ${endsLabel}`;
  };

  const formatDisplay = (val) => {
    if (!val) return '';
    const parts = val.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  const isValidAmount = parseFloat(amount) > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: colors.white }}>

      {/* Top nav */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        flexShrink: 0,
      }}>
        <button
          onClick={onBack}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: colors.grey100,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.black} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>

        {!hasSchedule && (
        <button
          onClick={onOpenSchedule}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            height: '40px',
            paddingLeft: '16px',
            paddingRight: '16px',
            backgroundColor: colors.grey100,
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: 600,
            color: colors.black,
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={colors.clearblue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
            <circle cx="16" cy="16" r="3" fill={colors.clearblue} stroke="none"/>
          </svg>
          Schedule
        </button>
        )}
      </div>

      {/* Amount row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '12px',
        paddingBottom: '24px',
        flexShrink: 0,
      }}>
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
          {/* Invisible input captures typing */}
          <input
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={e => {
              const val = e.target.value;
              if (val === '' || /^\d+(\.\d{0,2})?$/.test(val)) {
                setAmount(val);
              }
            }}
            placeholder="0.00"
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
              width: '100%',
              height: '100%',
              cursor: 'text',
              fontSize: '44px',
              border: 'none',
              outline: 'none',
              MozAppearance: 'textfield',
            }}
          />
          {/* Visible formatted display */}
          <span style={{
            fontSize: '44px',
            fontWeight: 700,
            color: amount ? colors.black : colors.grey300,
            letterSpacing: '-1px',
            lineHeight: 1.1,
            fontFamily: "'Manrope', sans-serif",
            pointerEvents: 'none',
          }}>
            {amount ? formatDisplay(amount) : '0.00'}
          </span>
        </div>
        <div style={{
          border: `1.5px solid ${colors.grey300}`,
          borderRadius: '50px',
          padding: '6px 14px',
          fontSize: '14px',
          fontWeight: 600,
          color: colors.black,
          flexShrink: 0,
        }}>
          GBP
        </div>
      </div>

      {/* Reference field */}
      <div style={{ paddingLeft: '16px', paddingRight: '16px', paddingBottom: '20px', flexShrink: 0 }}>
        <div style={{ fontSize: '14px', fontWeight: 600, color: colors.black, marginBottom: '8px' }}>
          Reference
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: colors.grey100,
          borderRadius: '12px',
          padding: '14px 16px',
        }}>
          <input
            value={reference}
            onChange={e => setReference(e.target.value)}
            placeholder="e.g. Invoice 456"
            maxLength={18}
            style={{
              flex: 1,
              border: 'none',
              background: 'none',
              fontSize: '16px',
              color: colors.black,
              outline: 'none',
              fontFamily: "'Manrope', sans-serif",
            }}
          />
          {reference.length > 0 && (
            <button
              onClick={() => setReference('')}
              style={{
                border: 'none',
                background: colors.black,
                borderRadius: '50%',
                width: '22px',
                height: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0,
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={colors.white} strokeWidth="2" strokeLinecap="round">
                <line x1="1" y1="1" x2="9" y2="9"/>
                <line x1="9" y1="1" x2="1" y2="9"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* From / To card */}
      <div style={{
        margin: `0 16px ${hasSchedule ? '16px' : '0'} 16px`,
        border: `1px solid ${colors.grey200}`,
        borderRadius: '16px',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {/* Source account row */}
        <div
          onClick={() => setShowAccountPicker(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 16px',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
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
              <div style={{ fontSize: '16px', fontWeight: 600, color: colors.black }}>{selectedAccount.name}</div>
              <div style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: 400 }}>{selectedAccount.sortCode} • {selectedAccount.number}</div>
            </div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.grey500} strokeWidth="2" strokeLinecap="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>

        {/* Arrival time — always visible */}
        <div style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '16px',
            paddingRight: '16px',
            gap: '12px',
          }}>
            <div style={{ width: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.clearblue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <polyline points="19 12 12 19 5 12"/>
              </svg>
            </div>
            <span style={{ fontSize: '13px', color: colors.clearblue, fontWeight: 500 }}>
              Typically arrives in seconds
            </span>
          </div>

        {/* Recipient row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px' }}>
          <div style={{
            backgroundColor: colors.springgreen,
            color: colors.black,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 600,
            flexShrink: 0,
          }}>
            {recipient?.initials}
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: colors.black }}>{recipient?.name}</div>
            <div style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: 400 }}>
              {recipient?.currency === 'GBP'
                ? `${recipient?.sortCode || '12-48-86'} • ${recipient?.lastFour ? '••••' + recipient.lastFour : '48889156'}`
                : `${recipient?.currency} account •••• ${recipient?.lastFour}`
              }
            </div>
          </div>
        </div>
      </div>

      {/* Schedule card — animates in from below, pushing from/to card up */}
      <div style={{
        marginLeft: '16px',
        marginRight: '16px',
        marginBottom: '16px',
        overflow: 'hidden',
        maxHeight: scheduleVisible ? '120px' : '0px',
        opacity: scheduleVisible ? 1 : 0,
        transform: scheduleVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'max-height 350ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease, transform 350ms cubic-bezier(0.4, 0, 0.2, 1)',
        flexShrink: 0,
      }}>
        <div style={{
          border: `1px solid ${colors.grey200}`,
          borderRadius: '16px',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
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
              <div style={{ fontSize: '16px', fontWeight: 600, color: colors.black }}>{arrivalTitle()}</div>
              <div style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: 400 }}>{repeatSubtitle()}</div>
            </div>
          </div>
          <button
            onClick={onOpenSchedule}
            style={{
              border: 'none',
              backgroundColor: colors.grey100,
              borderRadius: '50px',
              padding: '6px 16px',
              fontSize: '15px',
              fontWeight: 600,
              color: colors.clearblue,
              cursor: 'pointer',
              fontFamily: "'Manrope', sans-serif",
              flexShrink: 0,
            }}
          >
            Edit
          </button>
        </div>
      </div>

      {/* Continue button */}
      <div style={{ padding: '16px', paddingBottom: '32px', flexShrink: 0 }}>
        <button
          onClick={onContinue}
          disabled={!isValidAmount}
          style={{
            width: '100%',
            height: '52px',
            backgroundColor: isValidAmount ? colors.springgreen : colors.grey200,
            color: isValidAmount ? colors.black : colors.grey500,
            border: 'none',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: isValidAmount ? 'pointer' : 'not-allowed',
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          Continue
        </button>
      </div>

      <style>{`
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>

      <AccountPickerSheet
        isOpen={showAccountPicker}
        onClose={() => setShowAccountPicker(false)}
        selected={selectedAccount}
        onSelect={setSelectedAccount}
      />
    </div>
  );
}