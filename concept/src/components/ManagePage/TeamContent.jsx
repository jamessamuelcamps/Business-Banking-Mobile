import React from 'react';
import { colors } from '../../styles/colors';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { PendingIcon } from '../shared/SvgIcons';

const TeamContent = () => {
  const teamMembers = [
    { initials: 'AT', name: 'Alex Turner', username: 'alex.turner' },
    { initials: 'BM', name: 'Brian Murphy', username: 'brian.murphy' },
    { initials: 'CC', name: 'Charles Coates', username: 'charles.coates' },
    { initials: 'JA', name: 'Joanna Ashford', username: 'joanna.ashford' },
    { initials: 'JB', name: 'Jonathan Bartlett', username: 'jonathan.bartlett' },
  ];

  return (
    <div style={{ paddingBottom: '96px' }}>
      {/* Pending invitations banner */}
      <div style={{
        margin: '16px 16px 24px',
        backgroundColor: colors.grey100,
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
         <PendingIcon size={24} />
          <span style={{ fontSize: '16px', color: colors.black, fontWeight: 500 }}>
            Pending invitations
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            backgroundColor: colors.springgreen,
            color: colors.black,
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 600,
          }}>
            5
          </div>
          <ChevronRight size={20} style={{ color: colors.black }} />
        </div>
      </div>

      {/* Your team header with Sort and Filter */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingBottom: '12px',
      }}>
        <div style={{ fontSize: '14px', color: colors.black, fontWeight: 600 }}>
          Your team
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            paddingLeft: '12px',
            paddingRight: '10px',
            paddingTop: '6px',
            paddingBottom: '6px',
            fontSize: '14px',
            fontWeight: 500,
            color: colors.black,
            backgroundColor: 'transparent',
            border: '1px solid ' + colors.grey300,
            borderRadius: '50px',
            cursor: 'pointer',
          }}>
            Sort
            <ChevronDown size={16} />
          </button>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            paddingLeft: '12px',
            paddingRight: '10px',
            paddingTop: '6px',
            paddingBottom: '6px',
            fontSize: '14px',
            fontWeight: 500,
            color: colors.black,
            backgroundColor: 'transparent',
            border: '1px solid ' + colors.grey300,
            borderRadius: '50px',
            cursor: 'pointer',
          }}>
            Filter
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Team member list — same style as TransactionItem in CashflowTab */}
      {teamMembers.map((member, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            <div style={{
              backgroundColor: colors.springgreen,
              color: colors.black,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 600,
              flexShrink: 0,
            }}>
              {member.initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: '16px',
                color: colors.black,
                fontWeight: 500,
                marginBottom: '2px',
              }}>
                {member.name}
              </div>
              <div style={{
                fontSize: '14px',
                color: colors.textSecondary,
                fontWeight: 400,
              }}>
                {member.username}
              </div>
            </div>
            <ChevronRight size={20} style={{ color: colors.black, flexShrink: 0 }} />
          </div>
        </div>
      ))}

      {/* Invite user CTA button */}
      <div style={{ padding: '24px 16px 0' }}>
        <button style={{
          width: '100%',
          padding: '12px',
          backgroundColor: colors.springgreen,
          color: colors.black,
          border: 'none',
          borderRadius: '10px 0px 10px 10px',
          fontSize: '16px',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          alignSelf: 'stretch',
          fontFamily: "'Manrope', sans-serif",
        }}>
          
          Invite user
        </button>
      </div>
    </div>
  );
};

export default TeamContent;