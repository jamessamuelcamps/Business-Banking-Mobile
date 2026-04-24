import { tokens, proto } from '../../design-system/tokens';

export default function IPhoneShell({ children, showHomeIndicator = true }) {
  return (
    <div style={{
      position: 'relative',
      width: '393px',
      height: '844px',
      borderRadius: '24px',
      backgroundColor: proto.color.appBackground,
      overflow: 'hidden',
      boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.08)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      {children}

      {/* Home indicator */}
      {showHomeIndicator && <div style={{
        position: 'absolute',
        bottom: '8px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '134px',
        height: '5px',
        borderRadius: `${tokens.borderRadius.circle}px`,
        backgroundColor: 'rgba(0,0,0,0.2)',
      }} />}
    </div>
  );
}
