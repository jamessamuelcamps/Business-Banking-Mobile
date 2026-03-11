import { ChevronRight } from 'lucide-react';
import { colors } from '../../styles/colors';
import AccountCard from '../shared/AccountCard';

function CompanySection({ name, accounts }) {
  const total = accounts
    .filter(a => !a.isAddNew && a.amount)
    .reduce((sum, a) => {
      const parsed = parseFloat(a.amount.replace(/[^0-9.]/g, ''));
      return sum + (isNaN(parsed) ? 0 : parsed);
    }, 0);

  const formattedTotal = '£' + total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px', 
        paddingLeft: '16px', 
        paddingRight: '16px',
      }}>
        <div style={{ color: colors.black, fontSize: '14px', fontWeight: 600 }}>
          {name}
        </div>
        <div style={{ color: colors.grey600, fontSize: '14px', fontWeight: 600 }}>
          {formattedTotal}
        </div>
      </div>
      <div 
        className="overflow-x-scroll scrollbar-hide" 
        style={{ 
          overflowX: 'scroll', 
          WebkitOverflowScrolling: 'touch' 
        }}
      >
        <div style={{ 
          display: 'flex', 
          width: 'max-content', 
          gap: '12px', 
          paddingLeft: '16px', 
          paddingRight: '16px' 
        }}>
          {accounts.map((account, idx) => (
            <AccountCard key={idx} {...account} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AccountsTab() {
  const companies = [
    {
      name: 'COMPANY NAME LTD',
      accounts: [
        { title: "Main Account", amount: "£500,000.00", accountNumber: "41610008", date: "11-12-13" },
        { title: "Tax Pot", amount: "£100,000.00", accountNumber: "00813796", date: "11-12-13" },
        { title: "Notice Account", amount: "£46,000.00", accountNumber: "68392952", date: "11-12-13" },
        
      ]
    },
    {
      name: 'COMPANY NAME 2',
      accounts: [
        { title: "Main Account", amount: "£15,000.00", accountNumber: "69492384", date: "11-12-13" },
        { title: "Tax Pot", amount: "£74,000.00", accountNumber: "72522263", date: "11-12-13" },
        { title: "Notice Account", amount: "£66,000.00", accountNumber: "05985166", date: "11-12-13" },
        
      ]
    },
    {
      name: 'COMPANY NAME 3',
      accounts: [
        { title: "Main Account", amount: "£500,000.00", accountNumber: "14568956", date: "11-12-13" },
        { title: "Tax Pot", amount: "£100,000.00", accountNumber: "12186289", date: "11-12-13" },
        { title: "Notice Account", amount: "£10,000.00", accountNumber: "79545226", date: "11-12-13" },
        
      ]
    }
  ];

  return (
    <>
      {companies.map((company, idx) => (
        <CompanySection key={idx} name={company.name} accounts={company.accounts} />
      ))}
      
      
    </>
  );
}