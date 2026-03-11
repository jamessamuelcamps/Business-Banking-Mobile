import { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { colors } from '../../styles/colors';
import { ALL_RECIPIENTS } from '../../data/recipientsData';

function FlagBadge({ type }) {
  const flags = { GBP: '🇬🇧', EUR: '🇪🇺', USD: '🇺🇸' };
  return <span style={{ fontSize: '16px', lineHeight: 1 }}>{flags[type] || '🇬🇧'}</span>;
}

function RecipientAvatar({ initials, currency }) {
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <div style={{
        backgroundColor: colors.springgreen,
        color: colors.black,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '15px',
        fontWeight: 600,
      }}>
        {initials}
      </div>
      {currency && (
        <div style={{ position: 'absolute', bottom: '-2px', right: '-4px', fontSize: '16px', lineHeight: 1 }}>
          <FlagBadge type={currency} />
        </div>
      )}
    </div>
  );
}

function RecipientRow({ recipient, query, onSelect }) {
  const highlight = (text) => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span style={{ fontWeight: 700, color: colors.black }}>{text.slice(idx, idx + query.length)}</span>
        {text.slice(idx + query.length)}
      </>
    );
  };

  return (
    <div
      onClick={() => onSelect(recipient)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
        <RecipientAvatar initials={recipient.initials} currency={recipient.currency} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '16px', fontWeight: 600, color: colors.black, marginBottom: '2px' }}>
            {highlight(recipient.name)}
          </div>
          <div style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 400 }}>
            {recipient.currency} account •••• {recipient.lastFour}
          </div>
        </div>
        <ChevronRight size={20} style={{ color: colors.grey500, flexShrink: 0 }} />
      </div>
    </div>
  );
}

export default function SearchModal({ onClose, onSelectRecipient }) {
  const [query, setQuery] = useState('');
  const [translateY, setTranslateY] = useState('100%');
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setTranslateY('0%'), 10);
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const handleClose = () => {
    setTranslateY('100%');
    setTimeout(onClose, 300);
  };

  const filtered = query.trim()
    ? ALL_RECIPIENTS.filter(r => r.name.toLowerCase().includes(query.toLowerCase()))
    : ALL_RECIPIENTS;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 200 }}
      />

      {/* Modal panel */}
      <div style={{
        position: 'absolute',
        top: '44px',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.white,
        borderRadius: '16px 16px 0 0',
        zIndex: 201,
        display: 'flex',
        flexDirection: 'column',
        transform: `translateY(${translateY})`,
        transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          borderBottom: `0.5px solid ${colors.grey300}`,
          position: 'relative',
          minHeight: '52px',
          flexShrink: 0,
        }}>
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              left: '16px',
              border: 'none',
              background: 'none',
              padding: 0,
              cursor: 'pointer',
              color: colors.clearblue,
              fontSize: '17px',
              fontWeight: 400,
            }}
          >
            Cancel
          </button>
          <h2 style={{ fontSize: '17px', fontWeight: 600, color: colors.black, margin: 0 }}>
            Search
          </h2>
        </div>

        {/* Search input */}
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${colors.grey200}` }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: colors.grey100,
            borderRadius: '12px',
            padding: '10px 14px',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.grey500} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search recipients..."
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
            {query.length > 0 && (
              <button
                onClick={() => setQuery('')}
                style={{
                  border: 'none',
                  background: colors.grey300,
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={colors.white} strokeWidth="2">
                  <line x1="1" y1="1" x2="9" y2="9"/>
                  <line x1="9" y1="1" x2="1" y2="9"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div
          className="scrollbar-hide"
          style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: '40px' }}
        >
          {filtered.length > 0 ? (
            filtered.map(recipient => (
              <RecipientRow
                key={recipient.id}
                recipient={recipient}
                query={query}
                onSelect={onSelectRecipient}
              />
            ))
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '48px 24px',
              gap: '8px',
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={colors.grey300} strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <div style={{ fontSize: '16px', fontWeight: 500, color: colors.grey500 }}>No results found</div>
              <div style={{ fontSize: '14px', color: colors.grey500, textAlign: 'center' }}>
                Try a different name or account number
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}