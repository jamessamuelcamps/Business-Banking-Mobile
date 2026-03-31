import { useState } from 'react';
import { ArrowLeft, Copy, Minus, Plus } from 'lucide-react';
import { tokens } from '../../design-system/tokens';

const TRANSACTIONS = [
  { type: 'debit',  name: 'Supplier Name Ltd', date: 'Thurs 7 Jan',       amount: '-£525.00' },
  { type: 'credit', name: 'Invoice #19445',     date: 'Deposit',           amount: '+£10,000.00' },
  { type: 'debit',  name: 'Another Supplier',   date: 'Sun 31 Dec 2025',   amount: '-£1,044.00' },
];

const CURRENCIES = ['Receive GBP', 'Receive USD', 'Receive EUR'];

const ACCOUNT_DETAILS = [
  { label: 'Account holder', value: 'Noble Estates Ltd' },
  { label: 'Sort code',      value: '00-00-00' },
  { label: 'Account number', value: '12345678' },
];

function DetailHeader({ title, subtitle, onBack }) {
  return (
    <div style={{ padding: '48px 16px 24px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
      <button
        onClick={onBack}
        style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: tokens.color.background.surface, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
      >
        <ArrowLeft size={18} strokeWidth={2} color={tokens.color.text.primary} />
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: `${tokens.typography.lineHeight.default}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>{title}</p>
        <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.regular, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>{subtitle}</p>
      </div>
      <button style={{ padding: '6px 16px', borderRadius: tokens.borderRadius.pill, backgroundColor: tokens.color.background.surface, border: 'none', cursor: 'pointer', fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.semibold, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily, lineHeight: `${tokens.typography.lineHeight.sm}px`, flexShrink: 0 }}>Edit</button>
    </div>
  );
}

function SectionLabel({ children, style }) {
  return (
    <p style={{ margin: 0, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: `${tokens.typography.lineHeight.default}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily, ...style }}>
      {children}
    </p>
  );
}

export default function AccountDetailPage({ onBack }) {
  const [activeCurrency, setActiveCurrency] = useState('Receive GBP');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: tokens.color.background.white }}>
      <DetailHeader title="Main Account" subtitle="Opened in Jan 2025" onBack={onBack} />

      <div className="scrollbar-hide" style={{ flex: 1, overflowY: 'auto', padding: '0 16px 32px' }}>

        {/* Balance card */}
        <div style={{ border: `1px solid ${tokens.color.border.default}`, borderRadius: tokens.borderRadius.sm, padding: 16, display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>Current balance</p>
              <p style={{ margin: 0, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.bold, lineHeight: `${tokens.typography.lineHeight.default}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>£0.00</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.regular, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>Balance after pending</p>
              <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.regular, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>£0.00</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ flex: 1, padding: '12px 16px', borderRadius: tokens.borderRadius.pill, backgroundColor: tokens.color.brand.base, border: 'none', cursor: 'pointer', fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily, lineHeight: '24px' }}>Add money</button>
            <button style={{ flex: 1, padding: '12px 16px', borderRadius: tokens.borderRadius.pill, backgroundColor: tokens.color.background.surface, border: 'none', cursor: 'pointer', fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily, lineHeight: '24px' }}>Withdraw</button>
          </div>
        </div>

        {/* Recent transactions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
          <SectionLabel>Recent transactions</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {TRANSACTIONS.map((tx, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 12, paddingBottom: 12, }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: tx.type === 'credit' ? tokens.color.background.accountGreen : tokens.color.background.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {tx.type === 'credit'
                    ? <Plus size={16} strokeWidth={2} color={tokens.color.brand.positive} />
                    : <Minus size={16} strokeWidth={2} color={tokens.color.text.primary} />
                  }
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: `${tokens.typography.lineHeight.default}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>{tx.name}</p>
                  <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.regular, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>{tx.date}</p>
                </div>
                <p style={{ margin: 0, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: `${tokens.typography.lineHeight.default}px`, color: tx.type === 'credit' ? tokens.color.brand.positive : tokens.color.text.primary, fontFamily: tokens.typography.fontFamily, whiteSpace: 'nowrap' }}>{tx.amount}</p>
              </div>
            ))}
          </div>
          <button style={{ width: '100%', padding: '12px 16px', borderRadius: tokens.borderRadius.pill, backgroundColor: tokens.color.background.surface, border: 'none', cursor: 'pointer', fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily, lineHeight: '24px' }}>See all transactions</button>
        </div>

        {/* Account details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionLabel>Account details</SectionLabel>

          {/* Currency tabs */}
          <div style={{ backgroundColor: tokens.color.background.surface, borderRadius: 8, padding: 2, display: 'flex', height: 32 }}>
            {CURRENCIES.map(c => {
              const isActive = activeCurrency === c;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCurrency(c)}
                  style={{ flex: 1, height: 28, border: 'none', borderRadius: 7, backgroundColor: isActive ? tokens.color.background.white : 'transparent', cursor: 'pointer', fontSize: tokens.typography.fontSize.sm, fontWeight: isActive ? tokens.typography.fontWeight.semibold : tokens.typography.fontWeight.regular, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily, lineHeight: `${tokens.typography.lineHeight.sm}px`, boxShadow: isActive ? '0px 0px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s ease', whiteSpace: 'nowrap', padding: '3px 12px' }}
                >{c}</button>
              );
            })}
          </div>

          {/* Copy rows */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {ACCOUNT_DETAILS.map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, paddingBottom: 14 }}>
                <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.regular, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>{row.label}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <p style={{ margin: 0, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.bold, lineHeight: `${tokens.typography.lineHeight.default}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>{row.value}</p>
                  <button onClick={() => navigator.clipboard?.writeText(row.value)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', color: tokens.color.text.primary }}>
                    <Copy size={16} strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button style={{ width: '100%', padding: '12px 16px', borderRadius: tokens.borderRadius.pill, backgroundColor: tokens.color.background.surface, border: 'none', cursor: 'pointer', fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily, lineHeight: '24px' }}>Share GBP account details</button>
        </div>

      </div>
    </div>
  );
}
