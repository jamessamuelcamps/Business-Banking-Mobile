import { ArrowUp, Check } from 'lucide-react';
import iconChevronDown from '../../assets/icon-chevron-down.svg';
import iconQuestion from '../../assets/icon-question.svg';
import iconUserCog from '../../assets/icon-user-cog.svg';
import accountSpend from '../../assets/account-spend.png';
import accountSavings from '../../assets/account-savings.png';
import { tokens } from '../../design-system/tokens';

const BASE_ACCOUNTS = [
  { circleBg: '#E8F1FE', icon: accountSpend,   name: 'Spend account', account: '12335299 • 10-30-30', balance: '£0.00' },
  { circleBg: '#E3F8EB', icon: accountSavings, name: 'Earn account',  account: '12335299 • 10-30-30', balance: '£0.00' },
];

function StepAvatar({ number, active }) {
  return (
    <div style={{
      width: 24,
      height: 24,
      borderRadius: '50%',
      backgroundColor: active ? tokens.color.brand.mint : 'transparent',
      border: active ? 'none' : `1.5px solid ${tokens.color.border.default}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: tokens.typography.fontFamily,
        fontSize: '12px',
        fontWeight: tokens.typography.fontWeight.semibold,
        lineHeight: 1,
        color: active ? '#ffffff' : tokens.color.border.default,
      }}>
        {number}
      </span>
    </div>
  );
}

const iconButton = (icon, alt = '') => (
  <div style={{
    width: 40, height: 40,
    borderRadius: 36,
    backgroundColor: tokens.color.background.surface,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  }}>
    <img src={icon} alt={alt} style={{ width: 24, height: 24 }} />
  </div>
);

export default function HomePage({ savingsChoice, timeAdvanced }) {
  const balance = timeAdvanced ? '£50,000.00' : '£0.00';
  const ACCOUNTS = savingsChoice
    ? [...BASE_ACCOUNTS, { circleBg: '#E3F8EB', icon: accountSavings, name: savingsChoice.name, account: savingsChoice.rate, balance: '£0.00' }]
    : BASE_ACCOUNTS;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: '#ffffff' }}>

      {/* Top menu */}
      <div style={{ padding: '48px 16px 16px', display: 'flex', gap: '18px', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          flex: 1,
          border: `1px solid ${tokens.color.border.default}`,
          borderRadius: tokens.borderRadius.sm,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: 8,
          overflow: 'hidden',
        }}>
          <span style={{
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: tokens.typography.fontSize.sm,
            fontWeight: tokens.typography.fontWeight.regular,
            color: tokens.color.text.primary,
            fontFamily: tokens.typography.fontFamily,
          }}>
            NOBLE ESTATES DEVELOP...
          </span>
          <img src={iconChevronDown} alt="" style={{ width: 16, height: 16, flexShrink: 0 }} />
        </div>
        {iconButton(iconQuestion)}
        {iconButton(iconUserCog)}
      </div>

      {/* Scrollable content */}
      <div className="scrollbar-hide" style={{ flex: 1, overflowY: 'auto', padding: '0 16px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Urgency card — shown after 7 days when funds are sitting in Spend */}
        {timeAdvanced && savingsChoice && (
          <div style={{
            backgroundColor: '#FFFBEB',
            border: '1px solid #FCD34D',
            borderRadius: 16,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <p style={{
                margin: 0,
                fontFamily: tokens.typography.fontFamily,
                fontSize: `${tokens.typography.fontSize.default}px`,
                fontWeight: tokens.typography.fontWeight.semibold,
                lineHeight: '24px',
                color: tokens.color.text.primary,
              }}>
                Your £50,000 has been in Spend for 7 days
              </p>
              <p style={{
                margin: 0,
                fontFamily: tokens.typography.fontFamily,
                fontSize: `${tokens.typography.fontSize.sm}px`,
                fontWeight: tokens.typography.fontWeight.regular,
                lineHeight: '20px',
                color: tokens.color.text.primary,
              }}>
                It's earning 0% sitting there. Transfer to your {savingsChoice.name} to start earning {savingsChoice.rate}.
              </p>
            </div>
            <button style={{
              alignSelf: 'flex-start',
              padding: '8px 16px',
              borderRadius: `${tokens.borderRadius.pill}px`,
              backgroundColor: tokens.color.text.primary,
              border: 'none',
              cursor: 'pointer',
              fontFamily: tokens.typography.fontFamily,
              fontSize: `${tokens.typography.fontSize.sm}px`,
              fontWeight: tokens.typography.fontWeight.semibold,
              color: '#ffffff',
              lineHeight: '20px',
            }}>
              Transfer funds
            </button>
          </div>
        )}

        {/* Next actions card */}
        <div style={{
          border: `1px solid ${tokens.color.border.default}`,
          borderRadius: 24,
        }}>
          {/* Card header */}
          <div style={{ padding: '16px 16px 8px' }}>
            <p style={{
              margin: 0,
              fontFamily: tokens.typography.fontFamily,
              fontSize: `${tokens.typography.fontSize.default}px`,
              fontWeight: tokens.typography.fontWeight.semibold,
              lineHeight: '24px',
              color: tokens.color.text.primary,
            }}>
              2 steps to start earning interest
            </p>
          </div>

          {/* Step 1 */}
          <div style={{ padding: '16px 16px 8px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            {timeAdvanced ? (
              <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Check size={20} color="#007a47" strokeWidth={2.5} />
              </div>
            ) : (
              <StepAvatar number={1} active />
            )}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 2 }}>
              {timeAdvanced ? (
                <p style={{
                  margin: 0,
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: `${tokens.typography.fontSize.sm}px`,
                  fontWeight: tokens.typography.fontWeight.semibold,
                  lineHeight: '20px',
                  color: '#007a47',
                }}>
                  Fund your Spend account
                </p>
              ) : (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <p style={{
                      margin: 0,
                      fontFamily: tokens.typography.fontFamily,
                      fontSize: `${tokens.typography.fontSize.sm}px`,
                      fontWeight: tokens.typography.fontWeight.semibold,
                      lineHeight: '20px',
                      color: tokens.color.text.primary,
                    }}>
                      Fund your Spend account
                    </p>
                    <p style={{
                      margin: 0,
                      fontFamily: tokens.typography.fontFamily,
                      fontSize: `${tokens.typography.fontSize.sm}px`,
                      fontWeight: tokens.typography.fontWeight.regular,
                      lineHeight: '20px',
                      color: tokens.color.text.primary,
                    }}>
                      Make a bank transfer from your existing bank using these details:
                    </p>
                  </div>
                  <div style={{
                    alignSelf: 'flex-start',
                    backgroundColor: tokens.color.background.surface,
                    borderRadius: tokens.borderRadius.sm,
                    padding: '4px 8px',
                  }}>
                    <p style={{
                      margin: 0,
                      fontFamily: tokens.typography.fontFamily,
                      fontSize: `${tokens.typography.fontSize.sm}px`,
                      fontWeight: tokens.typography.fontWeight.semibold,
                      lineHeight: '20px',
                      color: tokens.color.text.primary,
                      whiteSpace: 'nowrap',
                    }}>
                      10-30-30 • 12335299
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ padding: '8px 16px 16px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <StepAvatar number={2} active={timeAdvanced} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 2 }}>
              <p style={{
                margin: 0,
                fontFamily: tokens.typography.fontFamily,
                fontSize: `${tokens.typography.fontSize.sm}px`,
                fontWeight: tokens.typography.fontWeight.semibold,
                lineHeight: '20px',
                color: timeAdvanced ? tokens.color.text.primary : tokens.color.border.default,
              }}>
                Transfer funds to your savings account
              </p>
              {!timeAdvanced && (
                <p style={{
                  margin: 0,
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: `${tokens.typography.fontSize.sm}px`,
                  fontWeight: tokens.typography.fontWeight.regular,
                  lineHeight: '20px',
                  color: tokens.color.border.default,
                }}>
                  Once Spend is funded, transfer across to start earning{' '}
                  <span style={{ fontWeight: tokens.typography.fontWeight.semibold }}>4.5% AER.</span>
                </p>
              )}
              {timeAdvanced && (
                <p style={{
                  margin: 0,
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: `${tokens.typography.fontSize.sm}px`,
                  fontWeight: tokens.typography.fontWeight.regular,
                  lineHeight: '20px',
                  color: tokens.color.text.primary,
                }}>
                  Once Spend is funded, transfer across to start earning{' '}
                  <span style={{ fontWeight: tokens.typography.fontWeight.semibold }}>4.5% AER.</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Balance card */}
        <div style={{
          border: `1px solid ${tokens.color.border.default}`,
          borderRadius: 16,
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{
              margin: 0,
              fontFamily: tokens.typography.fontFamily,
              fontSize: `${tokens.typography.fontSize.sm}px`,
              fontWeight: tokens.typography.fontWeight.regular,
              lineHeight: '20px',
              color: tokens.color.text.primary,
            }}>
              Available cash from all accounts
            </p>
            <p style={{
              margin: 0,
              fontFamily: tokens.typography.fontFamily,
              fontSize: '28px',
              fontWeight: tokens.typography.fontWeight.semibold,
              lineHeight: '36px',
              letterSpacing: '-0.25px',
              color: '#1A1A33',
            }}>
              {balance}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: `${tokens.borderRadius.pill}px`,
              backgroundColor: tokens.color.brand.base,
              border: 'none',
              cursor: 'pointer',
              fontFamily: tokens.typography.fontFamily,
              fontSize: `${tokens.typography.fontSize.default}px`,
              fontWeight: tokens.typography.fontWeight.semibold,
              color: tokens.color.text.primary,
              lineHeight: '24px',
            }}>
              Add money
            </button>
            {timeAdvanced && (
              <button style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: `${tokens.borderRadius.pill}px`,
                backgroundColor: tokens.color.background.surface,
                border: 'none',
                cursor: 'pointer',
                fontFamily: tokens.typography.fontFamily,
                fontSize: `${tokens.typography.fontSize.default}px`,
                fontWeight: tokens.typography.fontWeight.semibold,
                color: tokens.color.text.primary,
                lineHeight: '24px',
              }}>
                Transfer
              </button>
            )}
          </div>
        </div>

        {/* FSCS banner */}
        <div style={{
          backgroundColor: tokens.color.background.surface,
          borderRadius: 16,
          padding: 16,
          display: 'flex',
          gap: 16,
          alignItems: 'center',
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <ArrowUp size={20} color={tokens.color.text.primary} strokeWidth={2} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{
              margin: 0,
              fontFamily: tokens.typography.fontFamily,
              fontSize: `${tokens.typography.fontSize.default}px`,
              fontWeight: tokens.typography.fontWeight.semibold,
              lineHeight: '24px',
              color: tokens.color.text.primary,
            }}>
              FSCS limit has increased to £120K
            </p>
            <p style={{
              margin: 0,
              fontFamily: tokens.typography.fontFamily,
              fontSize: `${tokens.typography.fontSize.sm}px`,
              fontWeight: tokens.typography.fontWeight.regular,
              lineHeight: '20px',
              color: tokens.color.text.primary,
            }}>
              Your eligible deposits are now covered under the new £120K limit
            </p>
          </div>
        </div>

        {/* Accounts section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{
            margin: 0,
            fontFamily: tokens.typography.fontFamily,
            fontSize: `${tokens.typography.fontSize.default}px`,
            fontWeight: tokens.typography.fontWeight.semibold,
            lineHeight: '22px',
            color: '#1A1A33',
          }}>
            Accounts
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {ACCOUNTS.map((account, i) => (
              <div key={i} style={{
                border: `1px solid ${tokens.color.border.default}`,
                borderRadius: 8,
                padding: 12,
                height: 70,
                display: 'flex',
                gap: 16,
                alignItems: 'center',
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: account.circleBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  overflow: 'hidden',
                }}>
                  <img src={account.icon} alt="" style={{ maxWidth: 28, maxHeight: 28, objectFit: 'contain' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                  <p style={{
                    margin: 0,
                    fontFamily: tokens.typography.fontFamily,
                    fontSize: `${tokens.typography.fontSize.default}px`,
                    fontWeight: tokens.typography.fontWeight.semibold,
                    lineHeight: '24px',
                    color: tokens.color.text.primary,
                  }}>
                    {account.name}
                  </p>
                  <p style={{
                    margin: 0,
                    fontFamily: tokens.typography.fontFamily,
                    fontSize: `${tokens.typography.fontSize.sm}px`,
                    fontWeight: tokens.typography.fontWeight.regular,
                    lineHeight: '20px',
                    color: tokens.color.text.primary,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {account.account}
                  </p>
                </div>
                <p style={{
                  margin: 0,
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: `${tokens.typography.fontSize.default}px`,
                  fontWeight: tokens.typography.fontWeight.semibold,
                  lineHeight: '24px',
                  color: tokens.color.text.primary,
                  whiteSpace: 'nowrap',
                }}>
                  {account.balance}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
