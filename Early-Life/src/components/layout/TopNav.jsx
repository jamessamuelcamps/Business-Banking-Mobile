import { ChevronDown } from 'lucide-react';
import { tokens, proto } from '../../design-system/tokens';

export default function TopNav() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingLeft: `${tokens.spacing.md}px`,
      paddingRight: `${tokens.spacing.md}px`,
      paddingTop: `${tokens.spacing.md}px`,
      paddingBottom: `${tokens.spacing.md}px`,
      flexShrink: 0,
      backgroundColor: tokens.color.background.white,
    }}>
      {/* Company name pill */}
      <button style={{
        display: 'flex',
        alignItems: 'center',
        gap: `${tokens.spacing.xs}px`,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: `${tokens.spacing.xs}px ${tokens.spacing.md}px`,
        borderRadius: `${tokens.borderRadius.sm}px`,
        backgroundColor: proto.color.appBackground,
        flex: 1,
        marginRight: `${tokens.spacing.xs}px`,
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontSize: `${tokens.typography.fontSize.default}px`,
          fontWeight: 500,
          color: tokens.color.text.primary,
          fontFamily: tokens.typography.fontFamily,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          NOBLE ESTATES DEVELOPMENT
        </span>
        <ChevronDown size={tokens.size.icon.default} color={tokens.color.text.primary} style={{ flexShrink: 0 }} />
      </button>

      {/* Avatar */}
      <div style={{
        width: `${tokens.size.avatar.default}px`,
        height: `${tokens.size.avatar.default}px`,
        borderRadius: `${tokens.borderRadius.circle}px`,
        backgroundColor: proto.color.darkSurface,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
      }}>
        {/* Person icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" fill={tokens.color.brand.base} />
          <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke={tokens.color.brand.base} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
