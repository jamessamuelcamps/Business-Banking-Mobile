/**
 * ListItem — web port of acorn-2026/src/components/ListItem/ListItem.tsx
 * Variants: standard | nav | detail
 *
 * standard — avatar/icon ring + title + subtitle + optional amount or trailing icon
 * nav      — bare icon + label + optional trailing icon (min-height 48px)
 * detail   — label + value + optional copy icon (used in DetailsCard rows)
 */
import { motion } from 'framer-motion';
import { tokens } from '../tokens';

// ── Avatar slot ───────────────────────────────────────────────────────────────
function AvatarGreen({ initials }) {
  return (
    <div style={{
      width: `${tokens.size.avatar.default}px`,
      height: `${tokens.size.avatar.default}px`,
      borderRadius: `${tokens.borderRadius.circle}px`,
      backgroundColor: tokens.color.brand.base,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: tokens.typography.fontFamily,
        fontSize: '17px',
        fontWeight: tokens.typography.fontWeight.semibold,
        color: tokens.color.text.primary,
        lineHeight: '20px',
      }}>{initials}</span>
    </div>
  );
}

function IconRing({ icon }) {
  return (
    <div style={{
      width: `${tokens.size.avatar.default}px`,
      height: `${tokens.size.avatar.default}px`,
      borderRadius: `${tokens.borderRadius.circle}px`,
      border: `1px solid ${tokens.color.border.default}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      {icon}
    </div>
  );
}

// ── Detail variant ────────────────────────────────────────────────────────────
function DetailRow({ title, detailValue, copyIcon, onPress }) {
  return (
    <motion.div
      onClick={onPress}
      whileTap={onPress ? { opacity: 0.75 } : {}}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        paddingTop: `${tokens.spacing.sm}px`,
        paddingBottom: `${tokens.spacing.sm}px`,
        minHeight: '48px',
        cursor: onPress ? 'pointer' : 'default',
        fontFamily: tokens.typography.fontFamily,
      }}
    >
      <span style={{
        flex: 1,
        fontSize: `${tokens.typography.fontSize.default}px`,
        fontWeight: tokens.typography.fontWeight.regular,
        lineHeight: `${tokens.typography.lineHeight.default}px`,
        color: tokens.color.text.primary,
      }}>{title}</span>
      {detailValue && (
        <span style={{
          fontSize: `${tokens.typography.fontSize.default}px`,
          fontWeight: tokens.typography.fontWeight.semibold,
          lineHeight: `${tokens.typography.lineHeight.default}px`,
          color: tokens.color.text.primary,
          flexShrink: 0,
        }}>{detailValue}</span>
      )}
      {copyIcon && (
        <div style={{
          width: `${tokens.size.icon.default}px`,
          height: `${tokens.size.icon.default}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>{copyIcon}</div>
      )}
    </motion.div>
  );
}

// ── Nav variant ───────────────────────────────────────────────────────────────
function NavRow({ leadingIcon, title, trailingIcon, onPress }) {
  return (
    <motion.div
      onClick={onPress}
      whileTap={onPress ? { opacity: 0.75 } : {}}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        paddingTop: `${tokens.spacing.sm}px`,
        paddingBottom: `${tokens.spacing.sm}px`,
        minHeight: '48px',
        cursor: onPress ? 'pointer' : 'default',
        fontFamily: tokens.typography.fontFamily,
      }}
    >
      {leadingIcon && (
        <div style={{
          width: `${tokens.size.icon.md}px`,
          height: `${tokens.size.icon.md}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>{leadingIcon}</div>
      )}
      <span style={{
        flex: 1,
        fontSize: `${tokens.typography.fontSize.default}px`,
        fontWeight: tokens.typography.fontWeight.semibold,
        lineHeight: `${tokens.typography.lineHeight.default}px`,
        color: tokens.color.text.primary,
      }}>{title}</span>
      {trailingIcon && (
        <div style={{
          width: `${tokens.size.icon.default}px`,
          height: `${tokens.size.icon.default}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>{trailingIcon}</div>
      )}
    </motion.div>
  );
}

// ── Standard variant (default) ────────────────────────────────────────────────
export default function ListItem({
  variant = 'standard',
  title,
  subtitle,
  accentLabel,
  leadingIcon,
  avatarInitials,
  amount,
  amountPositive = false,
  trailingIcon,
  actionLabel,
  onActionPress,
  detailValue,
  copyIcon,
  onPress,
}) {
  if (variant === 'detail') {
    return <DetailRow title={title} detailValue={detailValue} copyIcon={copyIcon} onPress={onPress} />;
  }
  if (variant === 'nav') {
    return <NavRow leadingIcon={leadingIcon} title={title} trailingIcon={trailingIcon} onPress={onPress} />;
  }

  const leftSlot = avatarInitials
    ? <AvatarGreen initials={avatarInitials} />
    : leadingIcon
    ? <IconRing icon={leadingIcon} />
    : null;

  return (
    <motion.div
      onClick={onPress}
      whileTap={onPress ? { opacity: 0.75 } : {}}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        minHeight: '70px',
        paddingTop: `${tokens.spacing.sm}px`,
        paddingBottom: `${tokens.spacing.sm}px`,
        cursor: onPress ? 'pointer' : 'default',
        fontFamily: tokens.typography.fontFamily,
      }}
    >
      {/* Left: avatar/icon + copy */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: `${tokens.spacing.md}px`,
        minWidth: 0,
      }}>
        {leftSlot}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: `${tokens.spacing.xxxs}px`,
          minWidth: 0,
        }}>
          {accentLabel && (
            <span style={{
              fontSize: `${tokens.typography.fontSize.sm}px`,
              fontWeight: tokens.typography.fontWeight.regular,
              lineHeight: `${tokens.typography.lineHeight.sm}px`,
              color: tokens.color.semantic.info,
            }}>{accentLabel}</span>
          )}
          <span style={{
            fontSize: `${tokens.typography.fontSize.default}px`,
            fontWeight: tokens.typography.fontWeight.semibold,
            lineHeight: `${tokens.typography.lineHeight.default}px`,
            color: tokens.color.text.primary,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>{title}</span>
          {subtitle && (
            <span style={{
              fontSize: `${tokens.typography.fontSize.sm}px`,
              fontWeight: tokens.typography.fontWeight.regular,
              lineHeight: `${tokens.typography.lineHeight.sm}px`,
              color: tokens.color.text.primary,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>{subtitle}</span>
          )}
        </div>
      </div>

      {/* Right: amount */}
      {amount !== undefined && (
        <span style={{
          fontSize: `${tokens.typography.fontSize.default}px`,
          fontWeight: tokens.typography.fontWeight.bold,
          lineHeight: `${tokens.typography.lineHeight.default}px`,
          color: amountPositive ? tokens.color.brand.positive : tokens.color.text.primary,
          textAlign: 'right',
          flexShrink: 0,
        }}>{amount}</span>
      )}

      {/* Right: trailing icon (when no amount) */}
      {amount === undefined && trailingIcon && (
        <div style={{
          width: `${tokens.size.icon.default}px`,
          height: `${tokens.size.icon.default}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>{trailingIcon}</div>
      )}

      {/* Right: action pill */}
      {actionLabel && (
        <motion.button
          onClick={(e) => { e.stopPropagation(); onActionPress?.(); }}
          whileTap={{ opacity: 0.75 }}
          style={{
            backgroundColor: tokens.color.background.surface,
            borderRadius: `${tokens.borderRadius.pill}px`,
            height: `${tokens.size.avatar.default}px`,
            paddingLeft: `${tokens.spacing.md}px`,
            paddingRight: `${tokens.spacing.md}px`,
            display: 'flex',
            alignItems: 'center',
            border: 'none',
            cursor: 'pointer',
            fontFamily: tokens.typography.fontFamily,
            fontSize: `${tokens.typography.fontSize.default}px`,
            fontWeight: tokens.typography.fontWeight.semibold,
            color: tokens.color.text.primary,
            flexShrink: 0,
          }}
        >{actionLabel}</motion.button>
      )}
    </motion.div>
  );
}
