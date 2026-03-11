import { ChevronRight } from 'lucide-react';
import { colors } from '../../styles/colors';
import { WarningIcon } from '../shared/SvgIcons';
import { PlusIcon } from '../shared/SvgIcons';
import { MinusIcon } from '../shared/SvgIcons';

export default function InvoicesTab() {
  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', paddingLeft: '16px', paddingRight: '16px', marginBottom: '24px' }}>
        <div style={{ 
          flex: 1, 
          backgroundColor: colors.grey100, 
          borderRadius: '12px', 
          padding: '16px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between' 
        }}>
          <div>
            <div style={{ fontSize: '12px', color: colors.black, fontWeight: 600, marginBottom: '4px' }}>
              Invoices due
            </div>
            <div style={{ fontSize: '16px', color: colors.black, fontWeight: 700 }}>
              3
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '14px', color: colors.black, fontWeight: 600 }}>
              1 overdue
            </div>
            
            <WarningIcon size={32} />
          </div>
        </div>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ 
            backgroundColor: colors.grey100, 
            borderRadius: '12px', 
            padding: '16px', 
            flex: 1 
          }}>
            <div style={{ fontSize: '12px', color: colors.black, fontWeight: 600, marginBottom: '4px' }}>
              Cash incoming
            </div>
            <div style={{ fontSize: '16px', color: colors.black, fontWeight: 700 }}>
              £62,350.00
            </div>
          </div>
          <div style={{ 
            backgroundColor: colors.grey100, 
            borderRadius: '12px', 
            padding: '16px', 
            flex: 1 
          }}>
            <div style={{ fontSize: '12px', color: colors.black, fontWeight: 600, marginBottom: '4px' }}>
              Cash outgoing
            </div>
            <div style={{ fontSize: '16px', color: colors.black, fontWeight: 700 }}>
              £0.00
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', color: colors.black, fontWeight: 600, marginBottom: '4px', paddingLeft: '16px', paddingRight: '16px' }}>
          Quick actions
        </h3>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          cursor: 'pointer',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <PlusIcon size={24}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '16px', color: colors.black, fontWeight: 500 }}>
                Create an invoice
              </div>
            </div>
            <ChevronRight size={20} style={{ color: colors.black }} />
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          cursor: 'pointer',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <MinusIcon size={24}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '16px', color: colors.black, fontWeight: 500 }}>
                Pay a bill
              </div>
            </div>
            <ChevronRight size={20} style={{ color: colors.black }} />
          </div>
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingLeft: '16px', 
        paddingRight: '16px', 
        marginBottom: '16px' 
      }}>
        <h2 style={{ fontSize: '14px', color: colors.black, fontWeight: 600 }}>
          Invoices due
        </h2>
        <button style={{ color: colors.black, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
          <svg width="4" height="16" fill="currentColor">
            <circle cx="2" cy="2" r="2"/>
            <circle cx="2" cy="8" r="2"/>
            <circle cx="2" cy="14" r="2"/>
          </svg>
        </button>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        backgroundColor: colors.brightwhite,
        cursor: 'pointer',
      }}>
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
            IS
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: '16px',
              color: colors.black,
              fontWeight: 500,
              marginBottom: '2px',
            }}>
              Ideal Standard Ltd
            </div>
            <div style={{
              fontSize: '14px',
              color: colors.lightred,
              fontWeight: 400,
            }}>
              Overdue
            </div>
          </div>
          <div style={{
            fontSize: '16px',
            color: colors.black,
            fontWeight: 600,
          }}>
            £5,000.00
          </div>
        </div>     
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        backgroundColor: colors.brightwhite,
        cursor: 'pointer',
      }}>
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
            IS
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: '16px',
              color: colors.black,
              fontWeight: 500,
              marginBottom: '2px',
            }}>
              Mark Harris Ltd
            </div>
            <div style={{
              fontSize: '14px',
              color: colors.textSecondary,
              fontWeight: 400,
            }}>
              Due in 3 days
            </div>
          </div>
          <div style={{
            fontSize: '16px',
            color: colors.black,
            fontWeight: 600,
          }}>
            £15,000.00
          </div>
        </div>     
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        backgroundColor: colors.brightwhite,
        cursor: 'pointer',
      }}>
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
            EF
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: '16px',
              color: colors.black,
              fontWeight: 500,
              marginBottom: '2px',
            }}>
              Ecka Fabrication
            </div>
            <div style={{
              fontSize: '14px',
              color: colors.textSecondary,
              fontWeight: 400,
            }}>
              Due in 5 days
            </div>
          </div>
          <div style={{
            fontSize: '16px',
            color: colors.black,
            fontWeight: 600,
          }}>
            £12,450.00
          </div>
        </div>
      </div>
    </div>
  );
}