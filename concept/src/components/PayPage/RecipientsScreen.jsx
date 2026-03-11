import { ChevronRight } from 'lucide-react';
import { colors } from '../../styles/colors';
import { RECENT_RECIPIENTS, ALL_RECIPIENTS } from '../../data/recipientsData';

// Flag emoji components for currency/region indicators
function FlagBadge({ type }) {
  const flags = {
    GBP: '🇬🇧',
    EUR: '🇪🇺',
    USD: '🇺🇸',
  };
  return (
    <span style={{ fontSize: '16px', lineHeight: 1 }}>
      {flags[type] || '🇬🇧'}
    </span>
  );
}

// Avatar with a small flag badge in the bottom-right corner
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
        <div style={{
          position: 'absolute',
          bottom: '-2px',
          right: '-4px',
          fontSize: '16px',
          lineHeight: 1,
        }}>
          <FlagBadge type={currency} />
        </div>
      )}
    </div>
  );
}

// Card style matching AccountCard from the home screen drawer
function RecentRecipientCard({ recipient, onSelect }) {
  return (
    <div
      onClick={() => onSelect(recipient)}
      style={{
        backgroundColor: colors.grey100,
        padding: '16px',
        width: '156px',
        height: '128px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0,
        cursor: 'pointer',
      }}
    >
      {/* Name at top */}
      <div style={{
        fontSize: '15px',
        fontWeight: 600,
        color: colors.black,
        lineHeight: '1.3',
      }}>
        {recipient.name}
      </div>

      {/* Account number and currency at bottom */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: 500 }}>
          •• {recipient.lastFour}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: 500 }}>
            {recipient.currency}
          </span>
          <FlagBadge type={recipient.currency} />
        </div>
      </div>
    </div>
  );
}

// Standard list row — no background, flag badge on avatar
function RecipientRow({ recipient, onSelect }) {
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
            {recipient.name}
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


export default function RecipientsScreen({ onSelectRecipient, onOpenSearch, onClose }) {
  return (
    <div className="scrollbar-hide" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>

      {/* Top nav — X close left, ? help right */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        flexShrink: 0,
      }}>
        <button
          onClick={onClose}
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
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={colors.black} strokeWidth="2" strokeLinecap="round">
            <line x1="2" y1="2" x2="14" y2="14"/>
            <line x1="14" y1="2" x2="2" y2="14"/>
          </svg>
        </button>

        <button
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.1342 23.7667C16.4891 23.7667 16.7887 23.6442 17.0332 23.3991C17.2776 23.154 17.3998 22.854 17.3998 22.4991C17.3998 22.1442 17.2773 21.8445 17.0322 21.6001C16.7871 21.3556 16.4871 21.2334 16.1322 21.2334C15.7773 21.2334 15.4776 21.356 15.2332 21.6011C14.9887 21.8462 14.8665 22.1462 14.8665 22.5011C14.8665 22.856 14.9891 23.1556 15.2342 23.4001C15.4793 23.6445 15.7793 23.7667 16.1342 23.7667ZM16.0088 29.3334C14.1702 29.3334 12.4424 28.9834 10.8255 28.2834C9.20839 27.5834 7.79428 26.6279 6.58317 25.4167C5.37206 24.2056 4.4165 22.7908 3.7165 21.1721C3.0165 19.5534 2.6665 17.8239 2.6665 15.9834C2.6665 14.143 3.0165 12.4134 3.7165 10.7947C4.4165 9.17608 5.37206 7.76675 6.58317 6.56675C7.79428 5.36675 9.20917 4.41675 10.8278 3.71675C12.4465 3.01675 14.1761 2.66675 16.0165 2.66675C17.8569 2.66675 19.5865 3.01675 21.2052 3.71675C22.8238 4.41675 24.2332 5.36675 25.4332 6.56675C26.6332 7.76675 27.5832 9.17786 28.2832 10.8001C28.9832 12.4223 29.3332 14.1526 29.3332 15.9911C29.3332 17.8297 28.9832 19.5575 28.2832 21.1744C27.5832 22.7915 26.6332 24.2036 25.4332 25.4107C24.2332 26.6176 22.8221 27.5732 21.1998 28.2774C19.5776 28.9814 17.8473 29.3334 16.0088 29.3334ZM16.0165 27.3334C19.1609 27.3334 21.8332 26.2279 24.0332 24.0167C26.2332 21.8056 27.3332 19.1279 27.3332 15.9834C27.3332 12.839 26.2353 10.1667 24.0395 7.96675C21.8437 5.76675 19.1638 4.66675 15.9998 4.66675C12.8665 4.66675 10.1943 5.76464 7.98317 7.96041C5.77206 10.1562 4.6665 12.8361 4.6665 16.0001C4.6665 19.1334 5.77206 21.8056 7.98317 24.0167C10.1943 26.2279 12.8721 27.3334 16.0165 27.3334ZM16.0922 10.0001C16.7639 10.0001 17.3554 10.2056 17.8665 10.6167C18.3776 11.0279 18.6332 11.5523 18.6332 12.1901C18.6332 12.7745 18.4593 13.2826 18.1115 13.7144C17.7637 14.1462 17.3709 14.5525 16.9332 14.9334C16.4221 15.3556 15.9776 15.8265 15.5998 16.3461C15.2221 16.8659 15.0332 17.4505 15.0332 18.1001C15.0332 18.3445 15.1265 18.539 15.3132 18.6834C15.4998 18.8279 15.7176 18.9001 15.9665 18.9001C16.2332 18.9001 16.4541 18.8112 16.6292 18.6334C16.8041 18.4556 16.9165 18.2334 16.9665 17.9667C17.0332 17.5001 17.2109 17.0779 17.4998 16.7001C17.7887 16.3223 18.1246 15.9803 18.5075 15.6741C19.0579 15.2247 19.5109 14.7001 19.8665 14.1001C20.2221 13.5001 20.3998 12.8489 20.3998 12.1464C20.3998 11.0266 19.9832 10.0945 19.1498 9.35008C18.3165 8.60564 17.3282 8.23342 16.1848 8.23342C15.3948 8.23342 14.6332 8.40008 13.8998 8.73342C13.1665 9.06675 12.5665 9.55564 12.0998 10.2001C11.9443 10.4223 11.8721 10.6612 11.8832 10.9167C11.8943 11.1723 11.9995 11.3779 12.1988 11.5334C12.4524 11.7112 12.7152 11.7667 12.9872 11.7001C13.2589 11.6334 13.4854 11.4779 13.6665 11.2334C13.9498 10.8356 14.3041 10.5306 14.7292 10.3184C15.1541 10.1062 15.6084 10.0001 16.0922 10.0001Z" fill="#1A1A33"/>
          </svg>
        </button>
      </div>

      {/* Title row with + button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '16px',
        paddingRight: '16px',
        marginBottom: '24px',
        flexShrink: 0,
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: 600, color: colors.black, margin: 0 }}>
          Select recipient
        </h1>
        <button style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'transparent',
          border: `1.5px solid ${colors.grey300}`,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.black} strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>

        {/* Recently paid horizontal scroll */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: colors.black,
            paddingLeft: '16px',
            paddingRight: '16px',
            marginBottom: '12px',
          }}>
            Recently paid
          </div>
          <div
            className="scrollbar-hide"
            style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}
          >
            <div style={{
              display: 'flex',
              gap: '12px',
              paddingLeft: '16px',
              paddingRight: '16px',
              width: 'max-content',
            }}>
              {RECENT_RECIPIENTS.map(recipient => (
                <RecentRecipientCard
                  key={recipient.id}
                  recipient={recipient}
                  onSelect={onSelectRecipient}
                />
              ))}
            </div>
          </div>
        </div>

        {/* All recipients header with search + more */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '16px',
          paddingRight: '16px',
          marginBottom: '4px',
        }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: colors.black }}>
            All recipients
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Search icon — opens search modal */}
            <button
              onClick={onOpenSearch}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
            {/* More options */}
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
              <svg width="4" height="18" viewBox="0 0 4 18" fill={colors.black}>
                <circle cx="2" cy="2" r="2"/>
                <circle cx="2" cy="9" r="2"/>
                <circle cx="2" cy="16" r="2"/>
              </svg>
            </button>
          </div>
        </div>

        {/* All recipients list */}
        <div style={{ paddingBottom: '120px' }}>
          {ALL_RECIPIENTS.map(recipient => (
            <RecipientRow
              key={recipient.id}
              recipient={recipient}
              onSelect={onSelectRecipient}
            />
          ))}
        </div>
    </div>
  );
}