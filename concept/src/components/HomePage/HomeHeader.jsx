import { Bell } from 'lucide-react';
import { colors } from '../../styles/colors';

export default function HomeHeader() {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '16px', 
      paddingBottom: 0 
    }}>
      <div style={{ 
        position: 'relative', 
        backgroundColor: colors.grey100, 
        width: '48px', 
        height: '48px', 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Bell size={24} strokeWidth={1.5} style={{ color: colors.black }} />
        <div style={{ 
          position: 'absolute', 
          top: '-4px', 
          right: '-4px', 
          backgroundColor: colors.lightred, 
          color: 'white', 
          width: '20px', 
          height: '20px', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '12px', 
          fontWeight: 600 
        }}>
          6
        </div>
      </div>
      <div style={{ 
        backgroundColor: colors.springgreen, 
        color: colors.black, 
        fontSize: '18px', 
        width: '48px', 
        height: '48px', 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        fontWeight: 600 
      }}>
        AT
      </div>
    </div>
  );
}