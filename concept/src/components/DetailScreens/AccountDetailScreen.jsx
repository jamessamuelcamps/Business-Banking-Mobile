import React, { useState } from 'react';
import { ChevronRight, Edit2, Copy } from 'lucide-react';

const AccountDetailScreen = ({ account, onTransactionClick }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('GBP');

  const colors = {
    white: '#F9FAFA',
    brightwhite: '#FFFFFF',
    black: '#1F2020',
    springgreen: '#5BFF9A',
    clearblue: '#3280F6',
    grey100: '#F4F5F5',
    grey200: '#ECEDED',
    grey300: '#DEDFDF',
    grey500: '#9C9D9D',
    grey600: '#737474',
    textSecondary: '#5B5976',
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Mock transaction data
  const transactions = [
    {
      id: 1,
      avatar: 'SN',
      name: 'Supplier Name Ltd',
      date: 'Thurs 7 Jan · 13:24',
      amount: -525.00,
      category: 'Supplies',
      status: 'Completed',
    },
    {
      id: 2,
      avatar: 'SN',
      name: 'Another Supplier',
      date: 'Wed 6 Jan · 11:12',
      amount: -1010.00,
      category: 'Services',
      status: 'Completed',
    },
    {
      id: 3,
      avatar: 'I',
      name: 'Invoice #104',
      date: 'Sun 31 Dec · 23:59',
      amount: 40018.00,
      category: 'Income',
      status: 'Completed',
    },
  ];

  const TransactionItem = ({ transaction }) => (
    <div
      onClick={() => onTransactionClick && onTransactionClick(transaction)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        backgroundColor: colors.white,
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
        <div style={{
          backgroundColor: colors.springgreen,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: 600,
          color: colors.black,
          flexShrink: 0,
        }}>
          {transaction.avatar}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 500,
            color: colors.black,
            marginBottom: '2px',
          }}>
            {transaction.name}
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: 400,
            color: colors.textSecondary,
          }}>
            {transaction.date}
          </div>
        </div>
        <div style={{
          fontSize: '16px',
          fontWeight: 600,
          color: transaction.amount > 0 ? colors.springgreen : colors.black,
        }}>
          {transaction.amount > 0 ? '+' : ''}£{Math.abs(transaction.amount).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
        </div>
      </div>
    </div>
  );

  const AccountDetailItem = ({ label, value, onCopy }) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 0',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '14px',
          fontWeight: 400,
          color: colors.textSecondary,
          marginBottom: '2px',
        }}>
          {label}
        </div>
        <div style={{
          fontSize: '16px',
          fontWeight: 500,
          color: colors.black,
        }}>
          {value}
        </div>
      </div>
      <button
        onClick={() => onCopy(value)}
        style={{
          border: 'none',
          background: 'none',
          padding: '4px',
          cursor: 'pointer',
          color: colors.black,
          flexShrink: 0,
        }}
      >
        <Copy size={20} strokeWidth={1.5} />
      </button>
    </div>
  );

  return (
    <div style={{ backgroundColor: colors.white, minHeight: '100%', paddingBottom: '24px' }}>
      {/* Account Header with Avatar and Edit Button */}
      <div style={{
        backgroundColor: colors.white,
        padding: '16px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            backgroundColor: colors.springgreen,
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: 700,
            color: colors.black,
          }}>
            MA
          </div>
          <div>
            <div style={{
              fontSize: '20px',
              fontWeight: 600,
              color: colors.black,
              marginBottom: '2px',
            }}>
              {account.title}
            </div>
            <div style={{
              fontSize: '14px',
              fontWeight: 400,
              color: colors.textSecondary,
            }}>
              Opened in January 2025
            </div>
          </div>
        </div>
        <button
          style={{
            border: 'none',
            background: 'none',
            padding: '8px',
            cursor: 'pointer',
            color: colors.clearblue,
          }}
        >
          <Edit2 size={20} strokeWidth={2} />
        </button>
      </div>

      {/* Balance Section */}
      <div style={{
        backgroundColor: colors.grey100,
        padding: '20px 16px',
        margin: '16px',
        borderRadius: '16px',
      }}>
        {/* Current balance row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '4px',
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 400,
            color: colors.black,
          }}>
            Current balance
          </div>
          <div style={{
            fontSize: '16px',
            fontWeight: 700,
            color: colors.black,
          }}>
            {account.amount}
          </div>
        </div>

        {/* Balance after pending row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '16px',
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 400,
            color: colors.textSecondary,
          }}>
            Balance after pending
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: colors.textSecondary,
          }}>
            £420,000.00
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            flex: 1,
            backgroundColor: colors.springgreen,
            color: colors.black,
            border: 'none',
            borderRadius: '12px',
            padding: '12px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            Add money
          </button>
          <button style={{
            flex: 1,
            backgroundColor: colors.white,
            color: colors.black,
            border: `1px solid ${colors.black}`,
            borderRadius: '12px',
            padding: '12px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            Withdraw
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div style={{ marginTop: '16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          backgroundColor: colors.white,
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: colors.black,
            margin: 0,
          }}>
            Recent transactions
          </h3>
          <button style={{
            border: `1px solid ${colors.grey300}`,
            background: colors.white,
            color: colors.black,
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            padding: '6px 12px',
            borderRadius: '8px',
          }}>
            View all
          </button>
        </div>
        
        <div style={{ backgroundColor: colors.white }}>
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>

      {/* Account Details */}
      <div style={{
        backgroundColor: colors.white,
        padding: '16px',
        marginTop: '16px',
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 600,
          color: colors.black,
          marginBottom: '16px',
          marginTop: 0,
        }}>
          Account details
        </h3>
        
        {/* Currency Toggle */}
        <div style={{
          backgroundColor: colors.grey200,
          padding: '2px',
          borderRadius: '8px',
          display: 'flex',
          marginBottom: '8px',
        }}>
          {['GBP', 'USD', 'EUR'].map((currency) => (
            <button
              key={currency}
              onClick={() => setSelectedCurrency(currency)}
              style={{
                flex: 1,
                borderRadius: '6px',
                fontSize: '12px',
                padding: '4px 0',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: selectedCurrency === currency ? colors.brightwhite : 'transparent',
                color: selectedCurrency === currency ? colors.black : colors.grey600,
                boxShadow: selectedCurrency === currency ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              Receive {currency}
            </button>
          ))}
        </div>

        {selectedCurrency === 'GBP' && (
          <>
            <AccountDetailItem label="Account holder" value="Company Name Ltd" onCopy={handleCopy} />
            <AccountDetailItem label="Account number" value={account.accountNumber} onCopy={handleCopy} />
            <AccountDetailItem label="Sort code" value={account.date} onCopy={handleCopy} />
          </>
        )}
        {selectedCurrency === 'USD' && (
          <>
            <AccountDetailItem label="Account holder" value="Company Name Ltd" onCopy={handleCopy} />
            <AccountDetailItem label="Account number" value="9876543210" onCopy={handleCopy} />
            <AccountDetailItem label="Routing number (ACH)" value="021000021" onCopy={handleCopy} />
            <AccountDetailItem label="Routing number (Wire)" value="026009593" onCopy={handleCopy} />
            <AccountDetailItem label="Bank address" value="30 Hudson Yards, New York, NY 10001" onCopy={handleCopy} />
          </>
        )}
        {selectedCurrency === 'EUR' && (
          <>
            <AccountDetailItem label="Account holder" value="Company Name Ltd" onCopy={handleCopy} />
            <AccountDetailItem label="IBAN" value="GB82 WEST 1234 5698 7654 32" onCopy={handleCopy} />
            <AccountDetailItem label="BIC / SWIFT" value="WESTGB2L" onCopy={handleCopy} />
            <AccountDetailItem label="Bank address" value="1 Poultry, London EC2R 8EJ" onCopy={handleCopy} />
          </>
        )}

        {/* Share Button */}
        <button style={{
          width: '100%',
          padding: '12px',
          borderRadius: '12px',
          border: `1px solid ${colors.grey300}`,
          backgroundColor: colors.brightwhite,
          color: colors.black,
          fontSize: '16px',
          fontWeight: 600,
          cursor: 'pointer',
          marginTop: '8px',
        }}>
          Share {selectedCurrency} account details
        </button>
      </div>
    </div>
  );
};

export default AccountDetailScreen;