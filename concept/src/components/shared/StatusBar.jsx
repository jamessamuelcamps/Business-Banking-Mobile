import { colors } from '../../styles/colors';

export default function StatusBar() {
  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 50, 
      height: '44px',
      backgroundColor: colors.white 
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingLeft: '24px', 
        paddingRight: '24px', 
        paddingTop: '8px' 
      }}>
        <div style={{ color: colors.black, fontSize: '14px', fontWeight: 600 }}>
          9:41
        </div>
        <div style={{ 
          width: '128px', 
          height: '28px', 
          borderRadius: '50px', 
          backgroundColor: colors.pitchblack 
        }} />
        <div style={{ display: 'flex', alignItems: 'center', color: colors.black, gap: '4px' }}>
          <svg width="18" height="12" fill="currentColor">
            <rect x="0" y="3" width="4" height="6" rx="1"/>
            <rect x="5" y="2" width="4" height="8" rx="1"/>
            <rect x="10" y="1" width="4" height="10" rx="1"/>
            <rect x="15" y="0" width="3" height="12" rx="1"/>
          </svg>
        </div>
      </div>
    </div>
  );
}