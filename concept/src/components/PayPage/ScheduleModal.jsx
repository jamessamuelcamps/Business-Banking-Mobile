import { useState, useEffect } from 'react';
import { colors } from '../../styles/colors';

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
const DAYS_SHORT = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const REPEAT_OPTIONS = [
  { id: null, label: 'Send once' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'fortnightly', label: 'Fortnightly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'annually', label: 'Annually' },
];
const ENDS_OPTIONS = [
  { id: 'cancelled', label: 'When cancelled' },
  { id: '3months', label: 'After 3 months' },
  { id: '6months', label: 'After 6 months' },
  { id: '1year', label: 'After 1 year' },
];

// Small calendar for the Starts picker sheet
function CalendarPicker({ value, onChange }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const selected = value ? new Date(value + 'T00:00:00') : null;
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => viewMonth === 0 ? (setViewMonth(11), setViewYear(y => y-1)) : setViewMonth(m => m-1);
  const nextMonth = () => viewMonth === 11 ? (setViewMonth(0), setViewYear(y => y+1)) : setViewMonth(m => m+1);
  const isPast = (day) => new Date(viewYear, viewMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isSelected = (day) => selected && day === selected.getDate() && viewMonth === selected.getMonth() && viewYear === selected.getFullYear();
  const isToday = (day) => day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const handleSelect = (day) => {
    if (isPast(day)) return;
    const mm = String(viewMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    onChange(`${viewYear}-${mm}-${dd}`);
  };

  return (
    <div style={{ padding: '8px 16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <button onClick={prevMonth} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span style={{ fontSize: '15px', fontWeight: 600, color: colors.black }}>{MONTHS[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '4px' }}>
        {DAYS_SHORT.map(d => <div key={d} style={{ textAlign: 'center', fontSize: '11px', fontWeight: 600, color: colors.grey500, padding: '2px 0' }}>{d}</div>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const past = isPast(day);
          const sel = isSelected(day);
          const tod = isToday(day);
          return (
            <button key={i} onClick={() => handleSelect(day)} disabled={past} style={{
              border: 'none', borderRadius: '50%', width: '34px', height: '34px', margin: '0 auto',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', fontWeight: sel ? 700 : 400, cursor: past ? 'default' : 'pointer',
              backgroundColor: sel ? colors.springgreen : 'transparent',
              color: past ? colors.grey300 : tod && !sel ? colors.clearblue : colors.black,
              fontFamily: "'Manrope', sans-serif",
            }}>{day}</button>
          );
        })}
      </div>
    </div>
  );
}

// Reusable bottom picker sheet
function PickerSheet({ isOpen, onClose, title, children }) {
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
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 8px' }}>
          <div style={{ width: '36px', height: '4px', borderRadius: '2px', backgroundColor: colors.grey300 }} />
        </div>
        <div style={{ fontSize: '14px', fontWeight: 600, color: colors.black, padding: '4px 16px 12px' }}>
          {title}
        </div>
        {children}
      </div>
    </>
  );
}

// Styled input field row
function FieldRow({ label, value, placeholder, onTap }) {
  return (
    <div style={{ paddingLeft: '16px', paddingRight: '16px', paddingBottom: '20px' }}>
      <div style={{ fontSize: '14px', fontWeight: 600, color: colors.black, marginBottom: '8px' }}>
        {label}
      </div>
      <div
        onClick={onTap}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: colors.grey100, borderRadius: '12px', padding: '14px 16px', cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: '16px', color: value ? colors.black : colors.grey500, fontWeight: value ? 500 : 400 }}>
          {value || placeholder}
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.grey500} strokeWidth="2" strokeLinecap="round">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0,3)}`;
}

export default function ScheduleModal({ scheduleOptions, onClose, onConfirm }) {
  const [translateY, setTranslateY] = useState('100%');
  const [repeat, setRepeat] = useState(scheduleOptions.repeat !== undefined ? scheduleOptions.repeat : undefined);
  const [deferDate, setDeferDate] = useState(scheduleOptions.deferDate || '');
  const [ends, setEnds] = useState('cancelled');

  const [openPicker, setOpenPicker] = useState(null); // 'starts' | 'repeats' | 'ends'

  useEffect(() => {
    setTimeout(() => setTranslateY('0%'), 10);
  }, []);

  const handleClose = () => {
    setTranslateY('100%');
    setTimeout(onClose, 300);
  };

  // repeat === null means 'Send once' (explicitly selected), undefined means not yet chosen
  const repeatSelected = repeat !== undefined;
  const isValid = deferDate || repeatSelected;

  const handleConfirm = () => {
    if (!isValid) return;
    onConfirm({ repeat, deferDate, ends });
  };

  const handleClear = () => {
    setRepeat(undefined);
    setDeferDate('');
    setEnds('cancelled');
    onConfirm({ repeat: null, deferDate: null, ends: null });
  };

  const closePicker = () => setOpenPicker(null);

  return (
    <>
      {/* Backdrop */}
      <div onClick={handleClose} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 200 }} />

      {/* Main modal — auto height bottom sheet */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        backgroundColor: colors.white, borderRadius: '24px 24px 0 0',
        zIndex: 201, display: 'flex', flexDirection: 'column',
        transform: `translateY(${translateY})`,
        transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}>

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px 16px 0', flexShrink: 0 }}>
          <button onClick={handleClose} style={{
            width: '32px', height: '32px', borderRadius: '50%', backgroundColor: colors.grey100,
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={colors.black} strokeWidth="2" strokeLinecap="round">
              <line x1="1" y1="1" x2="11" y2="11"/><line x1="11" y1="1" x2="1" y2="11"/>
            </svg>
          </button>
        </div>

        {/* Title */}
        <div style={{ padding: '24px 16px', flexShrink: 0 }}>
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: colors.black, margin: 0 }}>
            Schedule payment
          </h1>
        </div>

        {/* Fields */}
        <div style={{ flex: 1 }}>
          <FieldRow
            label="Starts"
            value={formatDate(deferDate)}
            placeholder="Select date"
            onTap={() => setOpenPicker('starts')}
          />
          <FieldRow
            label="Repeats"
            value={REPEAT_OPTIONS.find(o => o.id === repeat)?.label || ''}
            placeholder="Select frequency"
            onTap={() => setOpenPicker('repeats')}
          />
          {repeat && (            <FieldRow
              label="Ends"
              value={ENDS_OPTIONS.find(o => o.id === ends)?.label || ''}
              placeholder="When cancelled"
              onTap={() => setOpenPicker('ends')}
            />
          )}
        </div>

        {/* Persistent buttons */}
        <div style={{ padding: '16px', paddingBottom: '32px', flexShrink: 0 }}>
          <button onClick={handleConfirm} disabled={!isValid} style={{
            width: '100%', height: '52px',
            backgroundColor: isValid ? colors.springgreen : colors.grey200,
            color: isValid ? colors.black : colors.grey500,
            border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: 600,
            cursor: isValid ? 'pointer' : 'not-allowed', fontFamily: "'Manrope', sans-serif",
            marginBottom: '12px', transition: 'background-color 0.2s',
          }}>
            Apply
          </button>
          <button onClick={handleClear} disabled={!isValid} style={{
            width: '100%', height: '44px', backgroundColor: 'transparent', border: 'none',
            cursor: isValid ? 'pointer' : 'not-allowed', fontSize: '16px', fontWeight: 500,
            color: isValid ? colors.grey600 : colors.grey300, fontFamily: "'Manrope', sans-serif",
            transition: 'color 0.2s',
          }}>
            Clear
          </button>
        </div>

        {/* Starts picker sheet */}
        <PickerSheet isOpen={openPicker === 'starts'} onClose={closePicker} title="Start date">
          <CalendarPicker value={deferDate} onChange={(d) => { setDeferDate(d); closePicker(); }} />
        </PickerSheet>

        {/* Repeats picker sheet */}
        <PickerSheet isOpen={openPicker === 'repeats'} onClose={closePicker} title="Frequency">
          {REPEAT_OPTIONS.map(option => (
            <div key={String(option.id)} onClick={() => { setRepeat(option.id); closePicker(); }} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px', cursor: 'pointer',
            }}>
              <span style={{ fontSize: '16px', fontWeight: 500, color: colors.black }}>{option.label}</span>
              {repeat === option.id && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12L10 17L19 7" stroke={colors.clearblue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          ))}
        </PickerSheet>

        {/* Ends picker sheet */}
        <PickerSheet isOpen={openPicker === 'ends'} onClose={closePicker} title="Ends">
          {ENDS_OPTIONS.map(option => (
            <div key={option.id} onClick={() => { setEnds(option.id); closePicker(); }} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px', cursor: 'pointer',
            }}>
              <span style={{ fontSize: '16px', fontWeight: 500, color: colors.black }}>{option.label}</span>
              {ends === option.id && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12L10 17L19 7" stroke={colors.clearblue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          ))}
        </PickerSheet>

      </div>
    </>
  );
}