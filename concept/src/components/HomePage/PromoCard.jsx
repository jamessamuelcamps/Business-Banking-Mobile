import { ChevronRight } from 'lucide-react';
import { colors } from '../../styles/colors';
import treeImage from '../../assets/img/tree.png';

export default function PromoCard() {
  return (
    <div style={{ 
      margin: '24px 16px', 
      padding: '24px 16px',
      backgroundImage: `url(${treeImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      color: colors.brightwhite, 
      height: 'calc(100dvh - 610px)',
      borderRadius: '24px'
    }}>
      <div style={{ display: 'flex', height: '100%', width:'40%' }}>
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center'
        }}>
          <div style={{ 
            backgroundColor: colors.midnightgreen, 
            color: 'white', 
            fontSize: '12px', 
            padding: '4px 12px', 
            marginBottom: '16px', 
            width: 'fit-content', 
            borderRadius: '50px', 
            fontWeight: 600 
          }}>
            New
          </div>
          <p style={{ 
            color: colors.black, 
            fontSize: '16px', 
            marginBottom: '12px', 
            fontWeight: 500 
          }}>
            Earn  
            <span style={{ 
            color: colors.midnightgreen,
            fontWeight: 900 
            }}> 4.5% </span> 
          with our 95 Day Notice Account.
          </p>
          <button style={{ 
            color: colors.grey600, 
            fontSize: '14px', 
            fontWeight: 500, 
            border: 'none', 
            background: 'none', 
            padding: 0, 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center' 
          }}>
            Start saving <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}