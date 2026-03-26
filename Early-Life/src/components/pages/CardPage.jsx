import { motion } from 'framer-motion';
import { Wifi, Plus } from 'lucide-react';
import { tokens, proto } from '../../design-system/tokens';

export default function CardPage() {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      backgroundColor: tokens.color.background.white,
      fontFamily: tokens.typography.fontFamily,
    }}>
      <div style={{ padding: `${tokens.spacing.md + 4}px ${tokens.spacing.md + 4}px ${tokens.spacing.md}px` }}>
        <h1 style={{
          fontSize: '26px',
          fontWeight: tokens.typography.fontWeight.bold,
          color: tokens.color.text.primary,
          letterSpacing: '-0.5px',
        }}>
          Cards
        </h1>
      </div>

      <div
        className="scrollbar-hide"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: `0 ${tokens.spacing.md}px`,
          display: 'flex',
          flexDirection: 'column',
          gap: `${tokens.spacing.md}px`,
          paddingBottom: `${tokens.spacing.lg}px`,
        }}
      >
        {/* Card visual */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          style={{
            borderRadius: '20px',
            background: `linear-gradient(135deg, ${proto.color.darkSurface} 0%, #071e1f 100%)`,
            padding: `${tokens.spacing.lg}px`,
            aspectRatio: '1.586',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background rings */}
          <div style={{
            position: 'absolute', top: '-40px', right: '-40px',
            width: '200px', height: '200px', borderRadius: `${tokens.borderRadius.circle}px`,
            border: `40px solid ${tokens.color.brand.base}12`,
          }} />
          <div style={{
            position: 'absolute', bottom: '-60px', left: '-20px',
            width: '180px', height: '180px', borderRadius: `${tokens.borderRadius.circle}px`,
            border: `40px solid ${tokens.color.brand.base}0d`,
          }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <p style={{
                fontSize: `${tokens.typography.fontSize.xs - 1}px`,
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: tokens.typography.letterSpacing.sectionLabel,
                marginBottom: `${tokens.spacing.xxxs}px`,
              }}>OAKNORTH BANK</p>
              <p style={{
                fontSize: `${tokens.typography.fontSize.sm}px`,
                fontWeight: tokens.typography.fontWeight.bold,
                color: tokens.color.text.white,
              }}>Business Debit</p>
            </div>
            <Wifi size={22} color={tokens.color.brand.base} style={{ transform: 'rotate(90deg)' }} />
          </div>

          <p style={{
            fontSize: '18px',
            fontWeight: tokens.typography.fontWeight.semibold,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '3px',
            marginBottom: '20px',
          }}>
            •••• •••• •••• ——
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <p style={{ fontSize: `${tokens.typography.fontSize.xs - 2}px`, color: 'rgba(255,255,255,0.4)', marginBottom: `${tokens.spacing.xxxs}px` }}>CARD HOLDER</p>
              <p style={{ fontSize: `${tokens.typography.fontSize.xs + 1}px`, fontWeight: tokens.typography.fontWeight.semibold, color: 'rgba(255,255,255,0.8)' }}>Acme Ltd</p>
            </div>
            <p style={{
              fontSize: `${tokens.typography.fontSize.xs + 1}px`,
              fontWeight: tokens.typography.fontWeight.semibold,
              color: tokens.color.brand.base,
            }}>Order card</p>
          </div>
        </motion.div>

        {/* Order card CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: `${tokens.spacing.xs}px`,
            padding: `${tokens.spacing.md}px`,
            borderRadius: `${tokens.borderRadius.pill}px`,
            backgroundColor: proto.color.darkSurface,
            border: 'none',
            cursor: 'pointer',
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          <Plus size={tokens.size.icon.md} color={tokens.color.brand.base} />
          <span style={{
            fontSize: `${tokens.typography.fontSize.default}px`,
            fontWeight: tokens.typography.fontWeight.semibold,
            color: tokens.color.text.white,
          }}>Order your business card</span>
        </motion.button>
      </div>
    </div>
  );
}
