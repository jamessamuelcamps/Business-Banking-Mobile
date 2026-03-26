import { motion } from 'framer-motion';
import { MessageCircle, Phone, BookOpen, ChevronRight } from 'lucide-react';
import { tokens } from '../../design-system/tokens';

const HELP_ITEMS = [
  { id: 'chat', label: 'Chat with us', subtitle: 'Usually responds in minutes', Icon: MessageCircle },
  { id: 'call', label: 'Call us', subtitle: 'Mon–Fri, 9am–6pm', Icon: Phone },
  { id: 'guides', label: 'Guides & FAQs', subtitle: 'Browse our help centre', Icon: BookOpen },
];

export default function HelpPage() {
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
          Help
        </h1>
        <p style={{
          fontSize: `${tokens.typography.fontSize.sm}px`,
          color: tokens.color.text.secondary,
          marginTop: `${tokens.spacing.xxxs + 2}px`,
          fontWeight: tokens.typography.fontWeight.regular,
        }}>
          How can we help you today?
        </p>
      </div>

      <div
        className="scrollbar-hide"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: `0 ${tokens.spacing.md}px`,
          paddingBottom: `${tokens.spacing.lg}px`,
        }}
      >
        <div style={{
          borderRadius: `${tokens.borderRadius.sm * 2}px`,
          overflow: 'hidden',
          border: `1px solid ${tokens.color.border.default}`,
          backgroundColor: tokens.color.background.white,
        }}>
          {HELP_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              whileTap={{ backgroundColor: tokens.color.background.surface }}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: `${tokens.spacing.md}px`,
                cursor: 'pointer',
                borderTop: i > 0 ? `1px solid ${tokens.color.border.default}` : 'none',
              }}
            >
              <div style={{
                width: `${tokens.size.avatar.default}px`,
                height: `${tokens.size.avatar.default}px`,
                borderRadius: `${tokens.borderRadius.sm}px`,
                backgroundColor: tokens.color.background.surface,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: `${tokens.spacing.sm}px`,
                flexShrink: 0,
              }}>
                <item.Icon size={tokens.size.icon.md} color={tokens.color.text.primary} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: `${tokens.typography.fontSize.default}px`,
                  fontWeight: tokens.typography.fontWeight.semibold,
                  color: tokens.color.text.primary,
                }}>{item.label}</p>
                <p style={{
                  fontSize: `${tokens.typography.fontSize.xs}px`,
                  color: tokens.color.text.secondary,
                  marginTop: `${tokens.spacing.xxxs}px`,
                  fontWeight: tokens.typography.fontWeight.regular,
                }}>{item.subtitle}</p>
              </div>
              <ChevronRight size={tokens.size.icon.sm} color={tokens.color.border.default} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
