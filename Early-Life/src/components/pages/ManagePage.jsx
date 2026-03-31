import { useState } from 'react';
import { Search, SlidersHorizontal, MoreHorizontal, ChevronRight } from 'lucide-react';
import accountSpend from '../../assets/account-spend.png';
import accountSavings from '../../assets/account-savings.png';
import { tokens } from '../../design-system/tokens';

const TABS = ['Accounts', 'Team', 'Cards'];

// ─── Accounts ────────────────────────────────────────────────────────────────

const CURRENT_ACCOUNTS = [
  { name: 'Main Account', subtitle: '12335299 • 10-30-30', balance: '£0.00', image: accountSpend },
];

const SAVINGS_ACCOUNTS = [
  { name: 'Easy Access', subtitle: 'Easy access • ••••1179', balance: '£0.00', image: accountSavings },
];

function AccountRow({ name, subtitle, balance, image, onClick }) {
  return (
    <div onClick={onClick} style={{
      border: `1px solid ${tokens.color.border.default}`,
      borderRadius: tokens.borderRadius.sm,
      padding: tokens.spacing.sm,
      height: 70,
      display: 'flex',
      gap: tokens.spacing.md,
      alignItems: 'center',
      cursor: 'pointer',
    }}>
      <div style={{
        width: tokens.size.avatar.default,
        height: tokens.size.avatar.default,
        borderRadius: tokens.borderRadius.circle,
        backgroundColor: tokens.color.background.accountGreen,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
      }}>
        <img src={image} alt="" style={{ maxWidth: 28, maxHeight: 28, objectFit: 'contain' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: tokens.spacing.xxxs, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: `${tokens.typography.lineHeight.default}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>{name}</p>
        <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.regular, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{subtitle}</p>
      </div>
      <p style={{ margin: 0, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.bold, lineHeight: `${tokens.typography.lineHeight.default}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily, whiteSpace: 'nowrap' }}>{balance}</p>
    </div>
  );
}

function AccountsContent({ onOpenDetail }) {
  return (
    <>
      <div className="scrollbar-hide" style={{ flex: 1, overflowY: 'auto', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>Current accounts</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CURRENT_ACCOUNTS.map((a, i) => <AccountRow key={i} {...a} onClick={() => onOpenDetail('account')} />)}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>Savings accounts</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SAVINGS_ACCOUNTS.map((a, i) => <AccountRow key={i} {...a} onClick={() => onOpenDetail('account')} />)}
          </div>
        </div>
      </div>
      <div style={{ padding: '0 16px 16px', flexShrink: 0 }}>
        <button style={{ width: '100%', padding: '12px 16px', borderRadius: tokens.borderRadius.pill, backgroundColor: tokens.color.brand.base, border: 'none', cursor: 'pointer', fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, color: tokens.color.text.primary, lineHeight: '24px' }}>Open new account</button>
      </div>
    </>
  );
}

// ─── Team ─────────────────────────────────────────────────────────────────────

const ADMINS = [
  { initials: 'AT', name: 'Alex Turner',  role: 'Founder • Main admin' },
  { initials: 'JD', name: 'James Davies', role: 'Finance Director' },
];

const MEMBERS = [];

function MemberRow({ initials, name, role, onClick }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md, paddingTop: 12, paddingBottom: 12, cursor: 'pointer' }}>
      <div style={{
        width: tokens.size.avatar.default,
        height: tokens.size.avatar.default,
        borderRadius: tokens.borderRadius.circle,
        backgroundColor: tokens.color.brand.base,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 13, fontWeight: tokens.typography.fontWeight.semibold, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily, lineHeight: '18px' }}>{initials}</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: tokens.spacing.xxxs, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: `${tokens.typography.lineHeight.default}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>{name}</p>
        <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.regular, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>{role}</p>
      </div>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', color: tokens.color.text.primary }}>
        <MoreHorizontal size={20} />
      </button>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p style={{ margin: 0, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: `${tokens.typography.lineHeight.default}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>
      {children}
    </p>
  );
}

function TeamContent({ onOpenDetail }) {
  return (
    <>
      {/* Count + actions */}
      <div style={{ padding: '24px 16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.regular, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>2 team members</p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', color: tokens.color.text.primary }}>
          <Search size={20} strokeWidth={1.75} />
          <SlidersHorizontal size={20} strokeWidth={1.75} />
        </div>
      </div>

      <div className="scrollbar-hide" style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 8 }}>
          <SectionLabel>Admins</SectionLabel>
          {ADMINS.map((m, i) => <MemberRow key={i} {...m} onClick={() => onOpenDetail('member')} />)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {MEMBERS.map((m, i) => <MemberRow key={i} {...m} onClick={() => onOpenDetail('member')} />)}
        </div>
      </div>

      <div style={{ padding: '16px 16px', flexShrink: 0 }}>
        <button style={{ width: '100%', padding: '12px 16px', borderRadius: tokens.borderRadius.pill, backgroundColor: tokens.color.brand.base, border: 'none', cursor: 'pointer', fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, color: tokens.color.text.primary, lineHeight: '24px' }}>Invite someone</button>
      </div>
    </>
  );
}

// ─── Cards ────────────────────────────────────────────────────────────────────

const ACTIVE_CARDS = [
  { name: 'Alex Turner', last4: '1179' },
];

function CardThumbnail({ blocked = false }) {
  return (
    <div style={{
      width: 46,
      height: 30,
      borderRadius: 4,
      backgroundColor: blocked ? '#b0b8b8' : '#0C3637',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '5px 6px',
    }}>
      <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: blocked ? '#909898' : '#2adaa5', opacity: 0.8 }} />
      <div style={{ width: '65%', height: 2, borderRadius: 1, backgroundColor: blocked ? '#909898' : 'rgba(255,255,255,0.3)' }} />
    </div>
  );
}

function CardRow({ name, last4, blocked = false, onClick }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md, paddingTop: 12, paddingBottom: 12, cursor: 'pointer' }}>
      <CardThumbnail blocked={blocked} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: tokens.spacing.xxxs, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: `${tokens.typography.lineHeight.default}px`, color: blocked ? tokens.color.text.muted : tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>{name}</p>
        <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.regular, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: blocked ? tokens.color.text.muted : tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>••••{last4}</p>
      </div>
      <ChevronRight size={20} strokeWidth={1.75} color={blocked ? tokens.color.text.muted : tokens.color.text.primary} />
    </div>
  );
}

function CardsContent({ onOpenDetail }) {
  const [cardType, setCardType] = useState('Physical');

  return (
    <>
      {/* Segmented control */}
      <div style={{ margin: '24px 16px 0', backgroundColor: tokens.color.background.surface, borderRadius: 8, padding: 2, display: 'flex', height: 32, flexShrink: 0 }}>
        {['Physical', 'Virtual'].map(type => {
          const isActive = cardType === type;
          return (
            <button
              key={type}
              onClick={() => setCardType(type)}
              style={{
                flex: 1,
                height: 28,
                border: 'none',
                borderRadius: 7,
                backgroundColor: isActive ? tokens.color.background.white : 'transparent',
                cursor: 'pointer',
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: isActive ? tokens.typography.fontWeight.semibold : tokens.typography.fontWeight.regular,
                color: tokens.color.text.primary,
                fontFamily: tokens.typography.fontFamily,
                lineHeight: `${tokens.typography.lineHeight.sm}px`,
                boxShadow: isActive ? '0px 0px 4px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.15s ease',
                padding: '3px 12px',
              }}
            >{type}</button>
          );
        })}
      </div>

      <div className="scrollbar-hide" style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 8 }}>
          <SectionLabel>Active</SectionLabel>
          {ACTIVE_CARDS.map((c, i) => <CardRow key={i} {...c} onClick={() => onOpenDetail('card')} />)}
        </div>
      </div>

      <div style={{ padding: '16px 16px', flexShrink: 0 }}>
        <button style={{ width: '100%', padding: '12px 16px', borderRadius: tokens.borderRadius.pill, backgroundColor: tokens.color.brand.base, border: 'none', cursor: 'pointer', fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, color: tokens.color.text.primary, lineHeight: '24px' }}>Order new card</button>
      </div>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ManagePage({ onOpenDetail }) {
  const [activeTab, setActiveTab] = useState('Accounts');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: tokens.color.background.white }}>

      {/* Header */}
      <div style={{ padding: '48px 16px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <p style={{ margin: 0, fontSize: 28, fontWeight: tokens.typography.fontWeight.bold, lineHeight: '36px', letterSpacing: '-0.25px', color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>Manage</p>
          <div style={{ width: tokens.size.avatar.default, height: tokens.size.avatar.default, borderRadius: tokens.borderRadius.circle, backgroundColor: tokens.color.brand.base, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 14, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: '20px', color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>AT</span>
          </div>
        </div>

        {/* Tab menu */}
        <div style={{ display: 'flex', gap: 24, borderBottom: `1px solid ${tokens.color.border.default}` }}>
          {TABS.map(tab => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: isActive ? `2px solid ${tokens.color.brand.cta}` : '2px solid transparent',
                  marginBottom: -1,
                  padding: '0 0 12px',
                  cursor: 'pointer',
                  fontSize: tokens.typography.fontSize.sm,
                  fontWeight: isActive ? tokens.typography.fontWeight.semibold : tokens.typography.fontWeight.regular,
                  color: isActive ? tokens.color.brand.cta : tokens.color.text.primary,
                  fontFamily: tokens.typography.fontFamily,
                  lineHeight: `${tokens.typography.lineHeight.sm}px`,
                }}
              >{tab}</button>
            );
          })}
        </div>
      </div>

      {activeTab === 'Accounts' && <AccountsContent onOpenDetail={onOpenDetail} />}
      {activeTab === 'Team'     && <TeamContent     onOpenDetail={onOpenDetail} />}
      {activeTab === 'Cards'    && <CardsContent    onOpenDetail={onOpenDetail} />}
    </div>
  );
}
