import { ArrowLeft } from 'lucide-react';
import accountSavings from '../../assets/account-savings.png';
import { tokens } from '../../design-system/tokens';

function formatAmount(raw) {
  const n = parseInt(raw || '0', 10);
  return `£${n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function Row({ label, value, bold }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
      <span style={{
        fontFamily: tokens.typography.fontFamily,
        fontSize: `${tokens.typography.fontSize.sm}px`,
        fontWeight: tokens.typography.fontWeight.regular,
        color: tokens.color.text.secondary,
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: tokens.typography.fontFamily,
        fontSize: `${tokens.typography.fontSize.sm}px`,
        fontWeight: bold ? tokens.typography.fontWeight.semibold : tokens.typography.fontWeight.regular,
        color: tokens.color.text.primary,
      }}>
        {value}
      </span>
    </div>
  );
}

export default function ReviewPage({ onBack, onConfirm, savingsChoice, amount }) {
  const formatted = formatAmount(amount);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', overflow: 'hidden' }}>

      {/* Status bar spacer */}
      <div style={{ height: 47, flexShrink: 0 }} />

      {/* Nav bar */}
      <div style={{ padding: '8px 16px', flexShrink: 0 }}>
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
      </div>

      {/* Title */}
      <div style={{ padding: '8px 16px 24px', flexShrink: 0 }}>
        <h1 style={{
          margin: 0,
          fontFamily: tokens.typography.fontFamily,
          fontSize: '24px',
          fontWeight: tokens.typography.fontWeight.semibold,
          lineHeight: '30px',
          letterSpacing: '-0.2px',
          color: tokens.color.text.primary,
        }}>
          Review payment
        </h1>
      </div>

      {/* Summary card */}
      <div style={{ margin: '0 16px', border: `1px solid ${tokens.color.border.default}`, borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 20,
          backgroundColor: '#E3F8EB',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, overflow: 'hidden',
        }}>
          <img src={accountSavings} alt="" style={{ width: 26, height: 26, objectFit: 'contain' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            margin: 0,
            fontFamily: tokens.typography.fontFamily,
            fontSize: `${tokens.typography.fontSize.sm}px`,
            fontWeight: tokens.typography.fontWeight.semibold,
            lineHeight: '20px',
            color: tokens.color.text.primary,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
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
            Instant transfer
          </p>
        </div>
        <span style={{
          fontFamily: tokens.typography.fontFamily,
          fontSize: `${tokens.typography.fontSize.default}px`,
          fontWeight: tokens.typography.fontWeight.semibold,
          color: tokens.color.text.primary,
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          {formatted}
        </span>
      </div>

      {/* Payment details */}
      <div style={{ margin: '24px 16px 0', flexShrink: 0 }}>
        <p style={{
          margin: '0 0 4px',
          fontFamily: tokens.typography.fontFamily,
          fontSize: `${tokens.typography.fontSize.default}px`,
          fontWeight: tokens.typography.fontWeight.semibold,
          lineHeight: '24px',
          color: tokens.color.text.primary,
        }}>
          Payment details
        </p>
        <Row label="From"   value="Spend Account" bold />
        <div style={{ height: 1, backgroundColor: tokens.color.border.default }} />
        <Row label="To"     value={savingsChoice?.name ?? 'Savings account'} bold />
        <div style={{ height: 1, backgroundColor: tokens.color.border.default }} />
        <Row label="Amount" value={formatted} bold />
      </div>

      <div style={{ flex: 1 }} />

      {/* CTA */}
      <div style={{ padding: '0 16px 48px', flexShrink: 0 }}>
        <button
          onClick={onConfirm}
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: `${tokens.borderRadius.pill}px`,
            backgroundColor: tokens.color.brand.base,
            border: 'none', cursor: 'pointer',
            fontFamily: tokens.typography.fontFamily,
            fontSize: `${tokens.typography.fontSize.default}px`,
            fontWeight: tokens.typography.fontWeight.semibold,
            color: tokens.color.text.primary,
            lineHeight: '24px',
          }}>
          Confirm transfer
        </button>
      </div>
    </div>
  );
}
