import { colors } from '../../styles/colors';

export default function AccountCard({ title, amount, accountNumber, date, isAddNew }) {
  if (isAddNew) {
    return (
      <div style={{ 
        width: '149px', 
        height: '128px', 
        padding: '16px', 
        borderRadius: '12px 0 12px 12px', 
        border: `1px dashed ${colors.black}`, 
        backgroundColor: 'transparent', 
        flexShrink: 0 
      }}>
        <span style={{ color: colors.black, fontSize: '14px', fontWeight: 600 }}>
          {title}
        </span>
      </div>
    );
  }

  return (
    <div style={{ 
      backgroundColor: colors.grey100, 
      padding: '16px', 
      minWidth: '156px', 
      height: '128px', 
      borderRadius: '16px', 
      display: 'flex', 
      flexDirection: 'column', 
      flexShrink: 0 
    }}>
      <div style={{ 
        color: colors.textSecondary, 
        fontSize: '12px', 
        marginBottom: '4px', 
        fontWeight: 600 
      }}>
        {title}
      </div>
      <div style={{ 
        color: colors.black, 
        fontSize: '16px', 
        marginBottom: 'auto', 
        fontWeight: 700 
      }}>
        {amount}
      </div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        color: colors.textSecondary, 
        fontSize: '12px' 
      }}>
        <span>{accountNumber}</span>
        <span>{date}</span>
      </div>
    </div>
  );
}