import { ArrowLeft, ChevronRight, Snowflake, Ban, SlidersHorizontal } from 'lucide-react';
import { tokens } from '../../design-system/tokens';

const MANAGEMENT_ROWS = [
  { icon: Snowflake,         title: 'Freeze card',        subtitle: 'Temporarily disable card use' },
  { icon: Ban,               title: 'Cancel card',        subtitle: 'Permanently disable this card' },
  { icon: SlidersHorizontal, title: 'Limits and controls', subtitle: 'Set how this card can be used' },
];

function CardVisual() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: 210,
      borderRadius: 12,
      backgroundColor: '#0C3637',
      background: 'linear-gradient(135deg, #0C3637 0%, #1a5254 50%, #0a2e2f 100%)',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {/* Subtle diagonal highlight */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.04)' }} />

      {/* Active badge */}
      <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', alignItems: 'center', gap: 5, backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 20, padding: '4px 10px' }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#2adaa5' }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: '#ffffff', fontFamily: tokens.typography.fontFamily, lineHeight: '16px' }}>Active</span>
      </div>

      {/* VISA */}
      <p style={{ position: 'absolute', top: 14, left: 16, margin: 0, fontSize: 22, fontWeight: 700, fontStyle: 'italic', color: '#ffffff', fontFamily: 'serif', letterSpacing: '-0.5px', lineHeight: '28px' }}>VISA</p>

      {/* OakNorth branding */}
      <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#2adaa5', fontFamily: tokens.typography.fontFamily, lineHeight: '22px' }}>OakNorth</span>
        <div style={{ width: 24, height: 24, borderRadius: 12, border: '2px solid #2adaa5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#2adaa5' }} />
        </div>
      </div>
    </div>
  );
}

export default function CardDetailPage({ onBack }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: tokens.color.background.white }}>

      {/* Header */}
      <div style={{ padding: '48px 16px 24px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: tokens.color.background.surface, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ArrowLeft size={18} strokeWidth={2} color={tokens.color.text.primary} />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: `${tokens.typography.lineHeight.default}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>Physical card</p>
          <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.regular, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>••••1179</p>
        </div>
      </div>

      <div className="scrollbar-hide" style={{ flex: 1, overflowY: 'auto', padding: '0 16px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Card visual + view details button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <CardVisual />
          <button style={{ width: '100%', padding: '12px 16px', borderRadius: tokens.borderRadius.pill, backgroundColor: tokens.color.background.surface, border: 'none', cursor: 'pointer', fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily, lineHeight: '24px' }}>View card details</button>
        </div>

        {/* Spending limit */}
        <div style={{ border: `1px solid ${tokens.color.border.default}`, borderRadius: tokens.borderRadius.sm, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>Spending limit</p>
            <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.regular, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>0% of limit reached</p>
          </div>
          {/* Progress bar */}
          <div style={{ height: 8, borderRadius: 8, backgroundColor: tokens.color.background.surface, overflow: 'hidden' }}>
            <div style={{ width: '0%', height: '100%', borderRadius: 8, backgroundColor: tokens.color.brand.mint }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.regular, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>£0.00</p>
            <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.regular, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>£0.00</p>
          </div>
        </div>

        {/* Card management */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p style={{ margin: 0, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: `${tokens.typography.lineHeight.default}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>Card management</p>
          {MANAGEMENT_ROWS.map(({ icon: Icon, title, subtitle }, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 14, paddingBottom: 14, cursor: 'pointer' }}>
              <div style={{ width: 36, height: 36, borderRadius: 18, border: `1px solid ${tokens.color.border.default}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} strokeWidth={1.75} color={tokens.color.text.primary} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: tokens.typography.fontSize.default, fontWeight: tokens.typography.fontWeight.semibold, lineHeight: `${tokens.typography.lineHeight.default}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>{title}</p>
                <p style={{ margin: 0, fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.regular, lineHeight: `${tokens.typography.lineHeight.sm}px`, color: tokens.color.text.primary, fontFamily: tokens.typography.fontFamily }}>{subtitle}</p>
              </div>
              <ChevronRight size={20} strokeWidth={1.75} color={tokens.color.text.primary} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
