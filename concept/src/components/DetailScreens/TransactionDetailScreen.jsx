import React from 'react';
import { Download, Share2, Flag, MessageCircle } from 'lucide-react';

const TransactionDetailScreen = ({ transaction }) => {
  const colors = {
    white: '#F9FAFA',
    brightwhite: '#FFFFFF',
    black: '#1F2020',
    springgreen: '#5BFF9A',
    grey100: '#F4F5F5',
    grey200: '#ECEDED',
    grey300: '#DEDFDF',
    grey500: '#9C9D9D',
    textSecondary: '#5B5976',
  };

  const DetailRow = ({ label, value, isHighlighted = false }) => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: `1px solid ${colors.grey200}`,
    }}>
      <span style={{
        fontSize: '14px',
        fontWeight: 600,
        color: colors.textSecondary,
      }}>
        {label}
      </span>
      <span style={{
        fontSize: '14px',
        fontWeight: isHighlighted ? 700 : 600,
        color: colors.black,
        textAlign: 'right',
      }}>
        {value}
      </span>
    </div>
  );

  const ActionButton = ({ icon: Icon, label, onClick }) => (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        padding: '12px',
        backgroundColor: colors.grey100,
        borderRadius: '12px',
        border: 'none',
        cursor: 'pointer',
        flex: 1,
      }}
    >
      <div style={{
        width: '40px',
        height: '40px',
        backgroundColor: colors.brightwhite,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.black,
      }}>
        <Icon size={20} strokeWidth={2} />
      </div>
      <span style={{
        fontSize: '12px',
        fontWeight: 600,
        color: colors.black,
      }}>
        {label}
      </span>
    </button>
  );

  return (
    <div style={{ backgroundColor: colors.white, minHeight: '100%' }}>
      {/* Transaction Header */}
      <div style={{
        backgroundColor: colors.brightwhite,
        padding: '32px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderBottom: `1px solid ${colors.grey200}`,
      }}>
        <div style={{
          backgroundColor: transaction.amount > 0 ? colors.springgreen : colors.grey100,
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: 600,
          color: colors.black,
          marginBottom: '16px',
        }}>
          {transaction.avatar}
        </div>
        
        <div style={{
          fontSize: '20px',
          fontWeight: 600,
          color: colors.black,
          marginBottom: '4px',
        }}>
          {transaction.name}
        </div>
        
        <div style={{
          fontSize: '36px',
          fontWeight: 700,
          color: transaction.amount > 0 ? colors.springgreen : colors.black,
          marginBottom: '8px',
        }}>
          {transaction.amount > 0 ? '+' : ''}£{Math.abs(transaction.amount).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
        </div>
        
        <div style={{
          display: 'inline-block',
          padding: '4px 12px',
          backgroundColor: colors.grey100,
          borderRadius: '50px',
          fontSize: '12px',
          fontWeight: 600,
          color: colors.black,
        }}>
          {transaction.status}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '16px', backgroundColor: colors.white }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <ActionButton icon={Download} label="Receipt" />
          <ActionButton icon={Share2} label="Share" />
          <ActionButton icon={Flag} label="Report" />
        </div>
      </div>

      {/* Transaction Details */}
      <div style={{
        backgroundColor: colors.brightwhite,
        padding: '16px',
        marginTop: '8px',
      }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: 600,
          color: colors.black,
          marginBottom: '16px',
          marginTop: 0,
        }}>
          Transaction details
        </h3>
        
        <div>
          <DetailRow label="Date & time" value={transaction.date} />
          <DetailRow label="Category" value={transaction.category} />
          <DetailRow label="Payment method" value="Bank transfer" />
          <DetailRow label="Reference" value={`TXN${transaction.id}2024`} />
          <DetailRow label="Transaction ID" value={`${Math.random().toString(36).substr(2, 9).toUpperCase()}`} />
        </div>
      </div>

      {/* Merchant Details */}
      <div style={{
        backgroundColor: colors.brightwhite,
        padding: '16px',
        marginTop: '8px',
      }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: 600,
          color: colors.black,
          marginBottom: '16px',
          marginTop: 0,
        }}>
          {transaction.amount > 0 ? 'Sender' : 'Recipient'} details
        </h3>
        
        <div>
          <DetailRow label="Name" value={transaction.name} />
          <DetailRow label="Account" value="****1234" />
          <DetailRow label="Sort code" value="12-34-56" />
        </div>
      </div>

      {/* Notes Section */}
      <div style={{
        backgroundColor: colors.brightwhite,
        padding: '16px',
        marginTop: '8px',
        marginBottom: '24px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 600,
            color: colors.black,
            margin: 0,
          }}>
            Notes
          </h3>
          <button style={{
            border: 'none',
            background: 'none',
            color: colors.black,
            cursor: 'pointer',
            padding: 0,
          }}>
            <MessageCircle size={20} strokeWidth={2} />
          </button>
        </div>
        
        <div style={{
          backgroundColor: colors.grey100,
          padding: '12px',
          borderRadius: '8px',
          fontSize: '14px',
          color: colors.textSecondary,
          fontStyle: 'italic',
        }}>
          No notes added
        </div>
        
        <button style={{
          marginTop: '12px',
          width: '100%',
          padding: '12px',
          backgroundColor: colors.grey100,
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 600,
          color: colors.black,
          cursor: 'pointer',
        }}>
          Add a note
        </button>
      </div>
    </div>
  );
};

export default TransactionDetailScreen;
