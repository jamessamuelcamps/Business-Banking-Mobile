import { colors } from '../../styles/colors';

export default function ManageHeader() {
  return (
    <div style={{ 
      padding: '16px', 
      marginBottom: '8px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between' 
    }}>
      <h1 style={{ fontSize: '28px', color: colors.black, fontWeight: 600, margin: 0 }}>
        Manage
      </h1>
      <div style={{ 
        backgroundColor: colors.springgreen, 
        color: colors.black, 
        fontSize: '16px', 
        width: '40px', 
        height: '40px', 
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