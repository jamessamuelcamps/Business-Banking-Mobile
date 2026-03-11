import React from 'react';
import GroupedListItem from '../shared/GroupedListItem';
import { colors } from '../../styles/colors';

const AccountsContent = ({ openModal }) => {
  const companies = [
    {
      name: 'COMPANY NAME LTD',
      accounts: [
        { 
          name: 'Main Account',
          accountNumber: '41610008',
          date: '11-12-13',
          balance: '£500,000.00'
        },
        { 
          name: 'Tax Pot',
          accountNumber: '00813796',
          date: '11-12-13',
          balance: '£100,000.00'
        },
        { 
          name: 'Notice Account',
          accountNumber: '68392952',
          date: '11-12-13',
          balance: '£46,000.00'
        }
      ]
    },
    {
      name: 'COMPANY NAME 2',
      accounts: [
        { 
          name: 'Main Account',
          accountNumber: '69492384',
          date: '11-12-13',
          balance: '£15,000.00'
        },
        { 
          name: 'Tax Pot',
          accountNumber: '72522263',
          date: '11-12-13',
          balance: '£74,000.00'
        },
        { 
          name: 'Notice Savings',
          accountNumber: '05985166',
          date: '11-12-13',
          balance: '£66,000.00'
        }
      ]
    },
    {
      name: 'COMPANY NAME 3',
      accounts: [
        { 
          name: 'Main Account',
          accountNumber: '14568956',
          date: '11-12-13',
          balance: '£500,000.00'
        },
        { 
          name: 'Tax Pot',
          accountNumber: '12186289',
          date: '11-12-13',
          balance: '£100,000.00'
        },
        { 
          name: 'Notice Account',
          accountNumber: '79545226',
          date: '11-12-13',
          balance: '£10,000.00'
        }
      ]
    }
  ];

  const handleAccountClick = (account) => {
    openModal({
      type: 'account',
      title: account.name,
      data: {
        title: account.name,
        amount: account.balance,
        accountNumber: account.accountNumber,
        date: account.date
      }
    });
  };

  return (
    <div style={{ paddingBottom: '96px' }}>
      {companies.map((company, companyIndex) => (
        <div key={companyIndex}>
          {/* Company name subtitle */}
          <div style={{ 
            fontSize: '14px', 
            color: colors.black, 
            fontWeight: 600,
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingTop: companyIndex === 0 ? '16px' : '24px',
            paddingBottom: '12px'
          }}>
            {company.name}
          </div>

          {/* Grouped list of accounts */}
          <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
            {company.accounts.map((account, index) => (
              <GroupedListItem
                key={index}
                item={account}
                index={index}
                totalItems={company.accounts.length}
                colors={colors}
                showChevron={false}
                onClick={() => handleAccountClick(account)}
                renderContent={(item) => (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    width: '100%',
                    flex: 1,
                  }}>
                    {/* Left side - Account name and details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ 
                        fontSize: '16px', 
                        color: colors.black, 
                        fontWeight: 500,
                        marginBottom: '2px',
                      }}>
                        {item.name}
                      </div>
                      <div style={{ 
                        fontSize: '14px', 
                        color: colors.textSecondary,
                        fontWeight: 400,
                      }}>
                        {item.accountNumber} • {item.date}
                      </div>
                    </div>

                    {/* Right side - Balance */}
                    <div style={{ 
                      fontSize: '16px', 
                      color: colors.black, 
                      fontWeight: 600,
                    }}>
                      {item.balance}
                    </div>
                  </div>
                )}
              />
            ))}
          </div>

          {/* Add new account button */}
          <div style={{ 
            paddingLeft: '16px', 
            paddingRight: '16px',
            paddingTop: '2px'
          }}>
            <button style={{
              width: '100%',
              backgroundColor: colors.grey100,
              border: 'none',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}>
              <span style={{ fontSize: '16px', color: colors.black, fontWeight: 500 }}>
                Add new account
              </span>
              <span style={{ 
                fontSize: '16px', 
                color: colors.clearblue, 
                fontWeight: 600, 
                backgroundColor: colors.white, 
                borderRadius: '30px', 
                padding: '8px 12px'
              }}>
                Add
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AccountsContent;