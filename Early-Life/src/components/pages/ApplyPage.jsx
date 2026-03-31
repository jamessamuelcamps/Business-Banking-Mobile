import { useState } from 'react';
import { MoreHorizontal, X, ArrowRight } from 'lucide-react';
import { tokens } from '../../design-system/tokens';

const treeImage = 'http://localhost:3845/assets/9241a996b65b6d75dde13ba389494850aefa6b34.png';

const TABS = ['Savings', 'Escrow', 'Client'];

const PRODUCTS = [
  {
    title: 'Notice',
    badge: 'Up to 4.5% AER',
    description: "Earn more by planning ahead – just give 35, 90 or 120 days' notice to withdraw.",
  },
  {
    title: 'Notice base rate tracker',
    badge: '4.12% AER',
    description: 'Our top rate – linked to the Bank of England base rate – with access after 95 days\' notice.',
  },
  {
    title: 'Fixed term',
    badge: '4.05% AER',
    description: "Lock in a fixed rate and know exactly what you'll earn – from 6 to 60 months.",
  },
];

export default function ApplyPage() {
  const [activeTab, setActiveTab] = useState('Savings');

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      backgroundColor: tokens.color.background.white,
    }}>

      {/* Header */}
      <div style={{
        padding: '48px 16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <p style={{
          margin: 0,
          fontSize: 28,
          fontWeight: tokens.typography.fontWeight.bold,
          lineHeight: '36px',
          letterSpacing: '-0.25px',
          color: tokens.color.text.primary,
          fontFamily: tokens.typography.fontFamily,
        }}>Apply</p>
        <div style={{
          width: tokens.size.avatar.default,
          height: tokens.size.avatar.default,
          borderRadius: tokens.borderRadius.circle,
          backgroundColor: tokens.color.brand.base,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{
            fontSize: 14,
            fontWeight: tokens.typography.fontWeight.semibold,
            lineHeight: '20px',
            color: tokens.color.text.primary,
            fontFamily: tokens.typography.fontFamily,
          }}>AT</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="scrollbar-hide" style={{ flex: 1, overflowY: 'auto', padding: '0 16px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Promo banner */}
        <div style={{
          border: `1px solid ${tokens.color.border.default}`,
          borderRadius: tokens.borderRadius.sm,
          padding: 16,
          height: 174,
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          {/* Top bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{
              backgroundColor: tokens.color.brand.teal,
              borderRadius: tokens.borderRadius.pill,
              padding: '2px 12px',
              height: 24,
              display: 'flex',
              alignItems: 'center',
            }}>
              <span style={{
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: tokens.typography.fontWeight.semibold,
                color: tokens.color.text.white,
                fontFamily: tokens.typography.fontFamily,
                lineHeight: '20px',
              }}>Best rate</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <MoreHorizontal size={24} color={tokens.color.text.primary} strokeWidth={1.75} />
              <X size={24} color={tokens.color.text.primary} strokeWidth={1.75} />
            </div>
          </div>

          {/* Body text */}
          <p style={{
            margin: 0,
            fontSize: tokens.typography.fontSize.sm,
            fontWeight: tokens.typography.fontWeight.semibold,
            lineHeight: '20px',
            color: tokens.color.text.primary,
            fontFamily: tokens.typography.fontFamily,
            width: 161,
          }}>Earn 4.5% with our new 95-day Notice account</p>

          {/* Tree image */}
          <div style={{
            position: 'absolute',
            right: 12,
            top: 34,
            width: 126,
            height: 126,
            overflow: 'hidden',
          }}>
            <img
              src={treeImage}
              alt=""
              style={{ width: '151%', maxWidth: 'none', position: 'absolute', top: '-8.76%', left: '-32%' }}
            />
          </div>

          {/* Learn more link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{
              fontSize: tokens.typography.fontSize.sm,
              fontWeight: tokens.typography.fontWeight.semibold,
              color: tokens.color.brand.cta,
              fontFamily: tokens.typography.fontFamily,
              lineHeight: '20px',
            }}>Learn more</span>
            <ArrowRight size={12} color={tokens.color.brand.cta} strokeWidth={2} />
          </div>
        </div>

        {/* Tab menu */}
        <div style={{
          backgroundColor: tokens.color.background.surface,
          borderRadius: 8,
          padding: 2,
          display: 'flex',
          height: 32,
          flexShrink: 0,
        }}>
          {TABS.map(tab => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
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
                  lineHeight: '20px',
                  boxShadow: isActive ? '0px 0px 4px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s ease',
                  padding: '3px 12px',
                }}
              >{tab}</button>
            );
          })}
        </div>

        {/* Product cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {PRODUCTS.map((product, i) => (
            <div
              key={i}
              style={{
                border: `1px solid ${tokens.color.border.default}`,
                borderRadius: tokens.borderRadius.sm,
                padding: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{
                  margin: 0,
                  fontSize: tokens.typography.fontSize.default,
                  fontWeight: tokens.typography.fontWeight.semibold,
                  lineHeight: '24px',
                  color: tokens.color.text.primary,
                  fontFamily: tokens.typography.fontFamily,
                }}>{product.title}</p>
                <div style={{
                  backgroundColor: tokens.color.brand.teal,
                  borderRadius: tokens.borderRadius.pill,
                  padding: '2px 12px',
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontSize: tokens.typography.fontSize.sm,
                    fontWeight: tokens.typography.fontWeight.semibold,
                    color: tokens.color.text.white,
                    fontFamily: tokens.typography.fontFamily,
                    lineHeight: '20px',
                    whiteSpace: 'nowrap',
                  }}>{product.badge}</span>
                </div>
              </div>
              <p style={{
                margin: 0,
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: tokens.typography.fontWeight.regular,
                lineHeight: '20px',
                color: tokens.color.text.primary,
                fontFamily: tokens.typography.fontFamily,
              }}>{product.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
