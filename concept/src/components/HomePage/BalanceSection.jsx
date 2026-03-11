import { Info, Plus } from 'lucide-react';
import { colors } from '../../styles/colors';

export default function BalanceSection({ totalBalance, onOpenBalanceModal }) {
  const formatCurrency = (amount) => {
    return '£' + amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div style={{ padding: '16px', paddingTop: '24px', paddingBottom: 0 }}>
      <div style={{ color: colors.grey600, fontSize: '14px' }}>
        Available cash in selected accounts
      </div>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '16px' 
      }}>
        <div style={{ color: colors.black, fontSize: '28px', fontWeight: 600 }}>
          {formatCurrency(totalBalance)}
        </div>
        <button 
          onClick={onOpenBalanceModal}
          style={{ 
            backgroundColor: colors.whitesmoke, 
            color: colors.black, 
            width: '32px', 
            height: '32px', 
            border: 'none', 
            borderRadius: '50%', 
            padding: '4px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            cursor: 'pointer' 
          }}
        >
          <svg width="4" height="16" fill="currentColor">
            <circle cx="2" cy="2" r="2"/>
            <circle cx="2" cy="8" r="2"/>
            <circle cx="2" cy="14" r="2"/>
          </svg>
        </button>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button style={{ 
          backgroundColor: colors.springgreen, 
          color: colors.black, 
          height: '48px', 
          paddingLeft: '16px', 
          paddingRight: '16px', 
          borderRadius: '72px', 
          fontSize: '16px', 
          fontWeight: 500, 
          border: 'none', 
          cursor: 'pointer' 
        }}>
          Add money
        </button>
        <button style={{ 
          backgroundColor: colors.whitesmoke, 
          color: colors.black, 
          width: '32px', 
          height: '32px', 
          border: 'none', 
          borderRadius: '50%', 
          padding: '4px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          cursor: 'pointer' 
        }}>
          <Info size={24} strokeWidth={1.5} />
        </button>
        <button style={{ 
          backgroundColor: colors.whitesmoke, 
          color: colors.black, 
          width: '32px', 
          height: '32px', 
          border: 'none', 
          borderRadius: '50%', 
          padding: '4px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          cursor: 'pointer' 
        }}>
          <Plus size={24} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
