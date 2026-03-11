import React, { useState } from 'react';
import { Lock, Unlock, Settings, Trash2, Eye, EyeOff } from 'lucide-react';

const CardDetailScreen = ({ card }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);

  const colors = {
    white: '#F9FAFA',
    brightwhite: '#FFFFFF',
    black: '#1F2020',
    springgreen: '#5BFF9A',
    aquamarine: '#2ADAA5',
    clearblue: '#3280F6',
    lightred: '#CE000A',
    grey100: '#F4F5F5',
    grey200: '#ECEDED',
    grey300: '#DEDFDF',
    grey500: '#9C9D9D',
    textSecondary: '#5B5976',
  };

  const QuickActionButton = ({ icon: Icon, label, onClick, color = colors.black }) => (
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
        color: color,
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

  const SettingRow = ({ label, value, onClick, hasChevron = true }) => (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 0',
        borderBottom: `1px solid ${colors.grey200}`,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <span style={{
        fontSize: '16px',
        fontWeight: 500,
        color: colors.black,
      }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          fontSize: '16px',
          fontWeight: 600,
          color: colors.textSecondary,
        }}>
          {value}
        </span>
        {hasChevron && onClick && (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke={colors.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </div>
  );

  const SpendingItem = ({ category, amount, limit, percentage }) => (
    <div style={{
      padding: '12px 0',
      borderBottom: `1px solid ${colors.grey200}`,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px',
      }}>
        <span style={{
          fontSize: '14px',
          fontWeight: 600,
          color: colors.black,
        }}>
          {category}
        </span>
        <span style={{
          fontSize: '14px',
          fontWeight: 600,
          color: colors.textSecondary,
        }}>
          £{amount.toLocaleString()} / £{limit.toLocaleString()}
        </span>
      </div>
      <div style={{
        width: '100%',
        height: '6px',
        backgroundColor: colors.grey200,
        borderRadius: '3px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: percentage > 80 ? colors.lightred : colors.aquamarine,
          borderRadius: '3px',
        }}></div>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: colors.white, minHeight: '100%' }}>
      {/* Card Visual */}
      <div style={{
        backgroundColor: colors.brightwhite,
        padding: '24px 16px',
        borderBottom: `1px solid ${colors.grey200}`,
      }}>
        <div style={{
          width: '100%',
          height: '200px',
          background: `linear-gradient(135deg, ${colors.aquamarine} 0%, ${colors.clearblue} 100%)`,
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Card chip */}
          <div style={{
            width: '48px',
            height: '36px',
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            borderRadius: '6px',
          }}></div>

          {/* Card number */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
            }}>
              <div style={{
                fontSize: '18px',
                fontWeight: 600,
                color: colors.brightwhite,
                letterSpacing: '2px',
              }}>
                {showCardNumber ? '4532 8765 3421 9876' : '•••• •••• •••• 9876'}
              </div>
              <button
                onClick={() => setShowCardNumber(!showCardNumber)}
                style={{
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: colors.brightwhite,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showCardNumber ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
              <div>
                <div style={{
                  fontSize: '10px',
                  color: colors.brightwhite,
                  opacity: 0.8,
                  marginBottom: '4px',
                }}>
                  CARDHOLDER NAME
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: colors.brightwhite,
                }}>
                  {card?.holderName || 'ALEX TURNER'}
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '10px',
                  color: colors.brightwhite,
                  opacity: 0.8,
                  marginBottom: '4px',
                }}>
                  EXPIRES
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: colors.brightwhite,
                }}>
                  12/26
                </div>
              </div>
            </div>
          </div>

          {/* Card network logo */}
          <div style={{
            position: 'absolute',
            right: '24px',
            top: '24px',
            fontSize: '24px',
            fontWeight: 700,
            color: colors.brightwhite,
          }}>
            VISA
          </div>
        </div>

        {/* Lock Status */}
        {isLocked && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: colors.grey100,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <Lock size={20} color={colors.lightred} />
            <span style={{
              fontSize: '14px',
              fontWeight: 600,
              color: colors.black,
            }}>
              This card is currently locked
            </span>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '16px', backgroundColor: colors.white }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: 600,
          color: colors.black,
          marginBottom: '12px',
          marginTop: 0,
        }}>
          Quick actions
        </h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          <QuickActionButton 
            icon={isLocked ? Unlock : Lock} 
            label={isLocked ? "Unlock" : "Lock"} 
            onClick={() => setIsLocked(!isLocked)}
            color={isLocked ? colors.springgreen : colors.lightred}
          />
          <QuickActionButton icon={Settings} label="Settings" />
          <QuickActionButton icon={Trash2} label="Cancel" color={colors.lightred} />
        </div>
      </div>

      {/* Card Limits */}
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
          Card limits
        </h3>
        
        <div>
          <SettingRow label="Daily spending limit" value="£10,000" onClick={() => {}} />
          <SettingRow label="Monthly spending limit" value="£50,000" onClick={() => {}} />
          <SettingRow label="ATM withdrawal limit" value="£500" onClick={() => {}} />
          <SettingRow label="Online transaction limit" value="£25,000" onClick={() => {}} />
        </div>
      </div>

      {/* This Month's Spending */}
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
          This month's spending
        </h3>
        
        <div>
          <SpendingItem 
            category="Total spent" 
            amount={8240} 
            limit={10000} 
            percentage={82.4} 
          />
          <SpendingItem 
            category="Online transactions" 
            amount={5120} 
            limit={25000} 
            percentage={20.5} 
          />
          <SpendingItem 
            category="ATM withdrawals" 
            amount={320} 
            limit={500} 
            percentage={64} 
          />
        </div>
      </div>

      {/* Card Settings */}
      <div style={{
        backgroundColor: colors.brightwhite,
        padding: '16px',
        marginTop: '8px',
        marginBottom: '24px',
      }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: 600,
          color: colors.black,
          marginBottom: '16px',
          marginTop: 0,
        }}>
          Card settings
        </h3>
        
        <div>
          <SettingRow label="Contactless payments" value="Enabled" onClick={() => {}} />
          <SettingRow label="Online payments" value="Enabled" onClick={() => {}} />
          <SettingRow label="International payments" value="Disabled" onClick={() => {}} />
          <SettingRow label="ATM withdrawals" value="Enabled" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default CardDetailScreen;
