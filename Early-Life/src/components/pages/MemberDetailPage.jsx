import { ArrowLeft, Copy, ChevronRight } from 'lucide-react';
import { tokens } from '../../design-system/tokens';

const ACCESS_ROWS = [
  { title: 'Admin',              subtitle: 'Company role' },
  { title: 'Approver',           subtitle: 'Payment authentication role' },
  { title: "Edit Alex's access", subtitle: 'Block or delete Alex from the app' },
];

const CARDS = [
  { label: 'Physical card', last4: '1179' },
  { label: 'Virtual card',  last4: '1587' },
];

const PERSONAL_DETAILS = [
  { label: 'Address', value: '123 Fake Street, London SW1 4SL' },
  { label: 'Email',   value: 'alex.turner@company.com' },
  { label: 'Phone',   value: '07123 456789' },
];

function SectionLabel({ children }) {
  return (
    <p style={{ margin: 0, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: `${tokens.typography.lineHeight.default}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>
      {children}
    </p>
  );
}

function CardThumbnail() {
  return (
    <div style={{ width: 46, height: 30, borderRadius: 4, backgroundColor: '#0C3637', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '5px 6px' }}>
      <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#2adaa5', opacity: 0.8 }} />
      <div style={{ width: '65%', height: 2, borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.3)' }} />
    </div>
  );
}

export default function MemberDetailPage({ onBack }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: tokens.color.background.white }}>

      {/* Header */}
      <div style={{ padding: '48px 16px 24px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: tokens.color.background.surface, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ArrowLeft size={18} strokeWidth={2} color={tokens.color.text.primary} />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: `${tokens.typography.lineHeight.default}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>Alex Turner</p>
          <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.regular, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>Founder • Main admin</p>
        </div>
        <button style={{ padding: '6px 16px', borderRadius: tokens.borderRadius.pill, backgroundColor: tokens.color.background.surface, border: 'none', cursor: 'pointer', fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.semibold, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily, lineHeight: `${tokens.typography.lineHeight.sm}px`, flexShrink: 0 }}>Edit</button>
      </div>

      <div className="scrollbar-hide" style={{ flex: 1, overflowY: 'auto', padding: '0 16px 32px', display: 'flex', flexDirection: 'column', gap: 32 }}>

        {/* Access & roles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <SectionLabel>Access & roles</SectionLabel>
          {ACCESS_ROWS.map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, paddingBottom: 14, cursor: 'pointer' }}>
              <div>
                <p style={{ margin: 0, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: `${tokens.typography.lineHeight.default}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>{row.title}</p>
                <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.regular, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>{row.subtitle}</p>
              </div>
              <ChevronRight size={20} strokeWidth={1.75} color={tokens.color.text.primary} />
            </div>
          ))}
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <SectionLabel>Cards</SectionLabel>
          {CARDS.map((card, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 14, paddingBottom: 14, cursor: 'pointer' }}>
              <CardThumbnail />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: `${tokens.typography.lineHeight.default}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>{card.label}</p>
                <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.regular, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>••••{card.last4}</p>
              </div>
              <ChevronRight size={20} strokeWidth={1.75} color={tokens.color.text.primary} />
            </div>
          ))}
        </div>

        {/* Personal details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <SectionLabel>Personal details</SectionLabel>
          {PERSONAL_DETAILS.map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, paddingBottom: 14, gap: 12 }}>
              <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.regular, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily, flexShrink: 0 }}>{row.label}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily, textAlign: 'right' }}>{row.value}</p>
                <button onClick={() => navigator.clipboard?.writeText(row.value)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', flexShrink: 0, color: tokens.color.text.primary }}>
                  <Copy size={16} strokeWidth={1.75} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
