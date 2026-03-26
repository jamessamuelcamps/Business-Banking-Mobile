import { tokens } from '../../design-system/tokens';

export default function StatusBar() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: `${tokens.spacing.lg}px`,
      paddingRight: `${tokens.spacing.md}px`,
      paddingTop: '14px',
      paddingBottom: '4px',
      height: '50px',
      flexShrink: 0,
    }}>
      {/* Time */}
      <span style={{
        fontSize: '15px',
        fontWeight: tokens.typography.fontWeight.bold,
        color: tokens.color.text.primary,
        letterSpacing: '-0.3px',
      }}>
        9:41
      </span>

      {/* Dynamic island */}
      <div style={{
        width: '120px',
        height: '34px',
        borderRadius: `${tokens.borderRadius.pill}px`,
        backgroundColor: '#000000',
      }} />

      {/* Status icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.xs / 2}px` }}>
        {/* Signal */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill={tokens.color.text.primary}>
          <rect x="0" y="6" width="3" height="6" rx="0.5" />
          <rect x="4.5" y="4" width="3" height="8" rx="0.5" />
          <rect x="9" y="2" width="3" height="10" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5C8.83 9.5 9.5 10.17 9.5 11S8.83 12.5 8 12.5 6.5 11.83 6.5 11 7.17 9.5 8 9.5Z" fill={tokens.color.text.primary}/>
          <path d="M8 6C9.93 6 11.68 6.78 12.95 8.05L14.36 6.64C12.73 5.01 10.48 4 8 4S3.27 5.01 1.64 6.64L3.05 8.05C4.32 6.78 6.07 6 8 6Z" fill={tokens.color.text.primary}/>
          <path d="M8 2.5C11.03 2.5 13.76 3.71 15.75 5.71L17 4.46C14.67 2.14 11.5 0.75 8 0.75S1.33 2.14-1 4.46L0.25 5.71C2.24 3.71 4.97 2.5 8 2.5Z" fill={tokens.color.text.primary}/>
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={tokens.color.text.primary} strokeOpacity="0.35"/>
          <rect x="2" y="2" width="17" height="8" rx="2" fill={tokens.color.text.primary}/>
          <path d="M23 4v4a2 2 0 000-4z" fill={tokens.color.text.primary} fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}
