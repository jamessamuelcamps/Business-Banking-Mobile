import React from 'react';
import GroupedListItem from '../shared/GroupedListItem';
import { colors } from '../../styles/colors';
import { PersonIcon } from '../shared/SvgIcons';
import { BankIcon } from '../shared/SvgIcons';
import { TickIcon } from '../shared/SvgIcons';

const CompaniesContent = ({ openModal }) => {
  const companies = [
    {
      initials: 'CN',
      name: 'COMPANY NAME LTD',
      availableFunds: '£600,000',
      teamMembers: 2,
      accounts: 3,
    },
    {
      initials: 'CN',
      name: 'COMPANY NAME 2',
      availableFunds: '£155,500',
      teamMembers: 2,
      accounts: 3,
    },
    {
      initials: 'CN',
      name: 'COMPANY NAME 3',
      availableFunds: '£600,000',
      teamMembers: 2,
      accounts: 3,
    },
  ];

  const handleCompanyClick = (company) => {
    if (openModal) {
      openModal({
        type: 'company',
        title: company.name,
        data: company,
      });
    }
  };

  
  // Three-dot menu icon
  const MoreIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="4" r="2" fill={colors.grey600} />
      <circle cx="10" cy="10" r="2" fill={colors.grey600} />
      <circle cx="10" cy="16" r="2" fill={colors.grey600} />
    </svg>
  );

  return (
    <div style={{ paddingBottom: '96px' }}>
      {companies.map((company, companyIndex) => (
        <div
          key={companyIndex}
          style={{
            paddingLeft: '16px',
            paddingRight: '16px',
            marginTop: companyIndex === 0 ? '16px' : '12px',
          }}
        >
          {/* Company card - two grouped rows */}
          <div>
            {/* Top row: Avatar, company name, available funds, menu */}
            <GroupedListItem
              item={company}
              index={0}
              totalItems={2}
              colors={colors}
              showChevron={false}
              onClick={() => handleCompanyClick(company)}
              renderContent={(item) => (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    flex: 1,
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
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
                    }}
                  >
                    {item.initials}
                  </div>

                  {/* Company info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '16px',
                        color: colors.black,
                        fontWeight: 600,
                        marginBottom: '2px',
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: '14px',
                        color: colors.textSecondary,
                        fontWeight: 400,
                      }}
                    >
                      Available funds: {item.availableFunds}
                    </div>
                  </div>

                  {/* More menu button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <MoreIcon />
                  </button>
                </div>
              )}
            />

            {/* Bottom row: Stats footer */}
            <GroupedListItem
              item={company}
              index={1}
              totalItems={2}
              colors={colors}
              showChevron={false}
              onClick={() => handleCompanyClick(company)}
              renderContent={(item) => (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    flex: 1,
                  }}
                >
                  {/* Left side stats */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      flex: 1,
                    }}
                  >
                    {/* Team members */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <PersonIcon />
                      <span
                        style={{
                          fontSize: '14px',
                          color: colors.black,
                          fontWeight: 600,
                        }}
                      >
                        {item.teamMembers}
                      </span>
                    </div>

                    {/* Accounts */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <BankIcon />
                      <span
                        style={{
                          fontSize: '14px',
                          color: colors.black,
                          fontWeight: 600,
                        }}
                      >
                        {item.accounts}
                      </span>
                    </div>
                  </div>

                  {/* Right side checkmark */}
                  <TickIcon />
                </div>
              )}
            />
          </div>
        </div>
      ))}

      {/* Add new company button */}
      <div
        style={{
          position: 'fixed',
          bottom: '122px',
          left: '16px',
          right: '16px',
          maxWidth: '358px',
          margin: '0 auto',
        }}
      >
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
                  
                  Add new company
                </button>
      </div>
    </div>
  );
};

export default CompaniesContent;