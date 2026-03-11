import { colors } from '../styles/colors';
import NavBar from './shared/NavBar';

const approvals = [
  { id: 1, initials: 'JS', name: 'John & Sons', ref: 'INV293821', amount: '£15,000.00' },
  { id: 2, initials: 'WW', name: 'Woodworks', ref: 'INV905291', amount: '£66,500.00' },
];

const recentPayments = [
  { id: 1, name: 'Supplier Name Ltd', subtitle: 'Brian Murphy', amount: '-£5,020.30' },
  { id: 2, name: 'Andrew Gunnerson', subtitle: 'Henry', amount: '-£600.11' },
  { id: 3, name: 'Power tools LLC', subtitle: 'Jessica', amount: '-£7,308.26' },
];

// Invoice-style icon used for payment rows
function PaymentIcon() {
  return (
    <div style={{
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      backgroundColor: colors.grey100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_1271_2958" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect width="24" height="24" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_1271_2958)">
          <path d="M5.99997 21.4999C5.30127 21.4999 4.70993 21.2579 4.22595 20.774C3.74198 20.29 3.5 19.6986 3.5 18.9999V17.4038C3.5 17.1461 3.58623 16.9311 3.75868 16.7586C3.93111 16.5862 4.14617 16.5 4.40385 16.5H6.5V3.18652C6.5 3.08269 6.54199 3.01314 6.62598 2.97787C6.70994 2.94262 6.79039 2.95705 6.86733 3.02115L7.60193 3.63074C7.68911 3.70511 7.78334 3.74229 7.88462 3.74229C7.98591 3.74229 8.08013 3.70511 8.1673 3.63074L9.00577 2.94615C9.09296 2.87178 9.18718 2.83459 9.28845 2.83459C9.38973 2.83459 9.48397 2.87178 9.57115 2.94615L10.4096 3.63074C10.4968 3.70511 10.591 3.74229 10.6923 3.74229C10.7936 3.74229 10.8878 3.70511 10.975 3.63074L11.8135 2.94615C11.9006 2.87178 11.9949 2.83459 12.0961 2.83459C12.1974 2.83459 12.2916 2.87178 12.3788 2.94615L13.2173 3.63074C13.3045 3.70511 13.3987 3.74229 13.5 3.74229C13.6013 3.74229 13.6955 3.70511 13.7827 3.63074L14.6211 2.94615C14.7083 2.87178 14.8025 2.83459 14.9038 2.83459C15.0051 2.83459 15.0993 2.87178 15.1865 2.94615L16.025 3.63074C16.1121 3.70511 16.2064 3.74229 16.3077 3.74229C16.4089 3.74229 16.5032 3.70511 16.5904 3.63074L17.4288 2.94615C17.516 2.87178 17.6102 2.83459 17.7115 2.83459C17.8128 2.83459 17.907 2.87178 17.9942 2.94615L18.8327 3.63074C18.9198 3.70511 19.014 3.74229 19.1153 3.74229C19.2166 3.74229 19.3108 3.70511 19.398 3.63074L20.1326 3.02115C20.2096 2.95705 20.29 2.94262 20.374 2.97787C20.458 3.01314 20.5 3.08269 20.5 3.18652V18.9999C20.5 19.6986 20.258 20.29 19.774 20.774C19.29 21.2579 18.6987 21.4999 18 21.4999H5.99997ZM18 19.9999C18.2833 19.9999 18.5208 19.9041 18.7125 19.7124C18.9041 19.5208 19 19.2833 19 18.9999V4.99995H7.99998V16.5H16.0961C16.3538 16.5 16.5689 16.5862 16.7413 16.7586C16.9138 16.9311 17 17.1461 17 17.4038V18.9999C17 19.2833 17.0958 19.5208 17.2875 19.7124C17.4791 19.9041 17.7166 19.9999 18 19.9999ZM9.94228 7.24997H14.1154C14.3282 7.24997 14.5064 7.32176 14.65 7.46535C14.7936 7.60893 14.8654 7.78713 14.8654 7.99995C14.8654 8.21276 14.7936 8.39096 14.65 8.53454C14.5064 8.67813 14.3282 8.74992 14.1154 8.74992H9.94228C9.72946 8.74992 9.55126 8.67813 9.40768 8.53454C9.26409 8.39096 9.1923 8.21276 9.1923 7.99995C9.1923 7.78713 9.26409 7.60893 9.40768 7.46535C9.55126 7.32176 9.72946 7.24997 9.94228 7.24997ZM9.94228 10.25H14.1154C14.3282 10.25 14.5064 10.3218 14.65 10.4653C14.7936 10.6089 14.8654 10.7871 14.8654 10.9999C14.8654 11.2128 14.7936 11.391 14.65 11.5345C14.5064 11.6781 14.3282 11.7499 14.1154 11.7499H9.94228C9.72946 11.7499 9.55126 11.6781 9.40768 11.5345C9.26409 11.391 9.1923 11.2128 9.1923 10.9999C9.1923 10.7871 9.26409 10.6089 9.40768 10.4653C9.55126 10.3218 9.72946 10.25 9.94228 10.25ZM16.9423 8.88454C16.6974 8.88454 16.4888 8.79833 16.3163 8.6259C16.1439 8.45346 16.0577 8.24481 16.0577 7.99995C16.0577 7.75508 16.1439 7.54643 16.3163 7.37399C16.4888 7.20156 16.6974 7.11535 16.9423 7.11535C17.1871 7.11535 17.3958 7.20156 17.5682 7.37399C17.7407 7.54643 17.8269 7.75508 17.8269 7.99995C17.8269 8.24481 17.7407 8.45346 17.5682 8.6259C17.3958 8.79833 17.1871 8.88454 16.9423 8.88454ZM16.9423 11.8845C16.6974 11.8845 16.4888 11.7983 16.3163 11.6259C16.1439 11.4535 16.0577 11.2448 16.0577 10.9999C16.0577 10.7551 16.1439 10.5464 16.3163 10.374C16.4888 10.2016 16.6974 10.1153 16.9423 10.1153C17.1871 10.1153 17.3958 10.2016 17.5682 10.374C17.7407 10.5464 17.8269 10.7551 17.8269 10.9999C17.8269 11.2448 17.7407 11.4535 17.5682 11.6259C17.3958 11.7983 17.1871 11.8845 16.9423 11.8845ZM5.99997 19.9999H15.5V17.9999H4.99997V18.9999C4.99997 19.2833 5.09581 19.5208 5.28747 19.7124C5.47914 19.9041 5.71664 19.9999 5.99997 19.9999Z" fill="#1A1A33"/>
        </g>
      </svg>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: '14px',
      fontWeight: 600,
      color: colors.black,
      paddingLeft: '16px',
      paddingRight: '16px',
      marginBottom: '12px',
    }}>
      {children}
    </div>
  );
}

export default function PaymentsPage({ onNavigate, onStartPayment }) {
  return (
    <div style={{
      width: '390px',
      maxWidth: '390px',
      margin: '0 auto',
      height: '100%',
      fontFamily: "'Manrope', sans-serif",
      backgroundColor: colors.white,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Scrollable body */}
      <div
        className="scrollbar-hide"
        style={{
          height: '100%',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: '100px',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px',
          paddingBottom: '20px',
        }}>
          <h1 style={{ fontSize: '28px', fontWeight: 600, color: colors.black, margin: 0 }}>
            Payments
          </h1>
          <div style={{
            backgroundColor: colors.springgreen,
            color: colors.black,
            fontSize: '16px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
          }}>
            AT
          </div>
        </div>

        {/* Send / Transfer pills */}
        <div style={{
          display: 'flex',
          gap: '10px',
          paddingLeft: '16px',
          paddingRight: '16px',
          marginBottom: '28px',
        }}>
          {/* Send - filled green */}
          <button
            onClick={onStartPayment}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '40px',
              paddingLeft: '18px',
              paddingRight: '18px',
              backgroundColor: colors.springgreen,
              color: colors.black,
              border: 'none',
              borderRadius: '50px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            {/* Arrow up-right icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.black} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
            Send
          </button>

          {/* Transfer - outlined */}
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '40px',
              paddingLeft: '18px',
              paddingRight: '18px',
              backgroundColor: colors.grey100,
              color: colors.black,
              border: 'none',
              borderRadius: '50px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            {/* Transfer arrows icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
              <path d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
            Transfer
          </button>
        </div>

        {/* Approvals section */}
        <div style={{ marginBottom: '28px' }}>
          <SectionLabel>Approvals</SectionLabel>
          <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
            <div style={{ backgroundColor: colors.grey100, borderRadius: '16px', overflow: 'hidden' }}>
              {approvals.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderBottom: index < approvals.length - 1 ? `1px solid ${colors.white}` : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                    <PaymentIcon />
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 500, color: colors.black }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: 400 }}>
                        {item.ref}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: colors.black }}>
                    {item.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Send money section */}
        <div style={{ marginBottom: '28px' }}>
          <SectionLabel>Send money</SectionLabel>

          {/* Pay someone */}
          <div
            onClick={onStartPayment}
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
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.black} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '16px', fontWeight: 500, color: colors.black, marginBottom: '2px' }}>
                  Pay someone
                </div>
                <div style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 400 }}>
                  By bank transfer
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.grey500} strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </div>

          {/* International payment */}
          <div
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
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.black} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '16px', fontWeight: 500, color: colors.black, marginBottom: '2px' }}>
                  International payment
                </div>
                <div style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 400 }}>
                  Send money in other currencies
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.grey500} strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Payments cards section */}
        <div style={{ marginBottom: '28px' }}>
          <SectionLabel>Payments</SectionLabel>
          <div
            className="scrollbar-hide"
            style={{
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              paddingLeft: '16px',
              paddingRight: '16px',
            }}
          >
            <div style={{ display: 'flex', gap: '12px', width: 'max-content' }}>
              {/* Scheduled */}
              <div style={{
                width: '148px',
                backgroundColor: 'transparent',
                border: `1px solid ${colors.grey300}`,
                borderRadius: '16px',
                padding: '16px',
                cursor: 'pointer',
              }}>
                <div style={{ marginBottom: '16px' }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 0.25C24.7211 0.25 28.2368 0.250902 30.9395 0.614258C33.6348 0.976651 35.4843 1.69521 36.8945 3.10547C38.3048 4.51573 39.0233 6.36518 39.3857 9.06055C39.7491 11.7632 39.75 15.2789 39.75 20C39.75 24.7211 39.7491 28.2368 39.3857 30.9395C39.0233 33.6348 38.3048 35.4843 36.8945 36.8945C35.4843 38.3048 33.6348 39.0233 30.9395 39.3857C28.2368 39.7491 24.7211 39.75 20 39.75C15.2789 39.75 11.7632 39.7491 9.06055 39.3857C6.36518 39.0233 4.51573 38.3048 3.10547 36.8945C1.69521 35.4843 0.976651 33.6348 0.614258 30.9395C0.250902 28.2368 0.25 24.7211 0.25 20C0.25 15.2789 0.250902 11.7632 0.614258 9.06055C0.976651 6.36518 1.69521 4.51573 3.10547 3.10547C4.51573 1.69521 6.36518 0.976651 9.06055 0.614258C11.7632 0.250902 15.2789 0.25 20 0.25Z" fill="#EBE7FF" stroke="#DEDFDF" strokeWidth="0.5"/>
                    <path d="M22.6923 26C22.05 26 21.5048 25.776 21.0567 25.3279C20.6087 24.8798 20.3846 24.3346 20.3846 23.6923C20.3846 23.05 20.6087 22.5048 21.0567 22.0567C21.5048 21.6087 22.05 21.3846 22.6923 21.3846C23.3346 21.3846 23.8798 21.6087 24.3279 22.0567C24.7759 22.5048 25 23.05 25 23.6923C25 24.3346 24.7759 24.8798 24.3279 25.3279C23.8798 25.776 23.3346 26 22.6923 26ZM13.3077 29.5C12.8026 29.5 12.375 29.325 12.025 28.975C11.675 28.625 11.5 28.1974 11.5 27.6923V14.3077C11.5 13.8026 11.675 13.375 12.025 13.025C12.375 12.675 12.8026 12.5 13.3077 12.5H14.6923V11.1538C14.6923 10.9346 14.7657 10.7516 14.9125 10.6048C15.0593 10.458 15.2423 10.3846 15.4616 10.3846C15.6808 10.3846 15.8638 10.458 16.0106 10.6048C16.1574 10.7516 16.2308 10.9346 16.2308 11.1538V12.5H23.8077V11.1346C23.8077 10.9218 23.8794 10.7436 24.023 10.6C24.1666 10.4564 24.3448 10.3846 24.5576 10.3846C24.7704 10.3846 24.9486 10.4564 25.0922 10.6C25.2358 10.7436 25.3076 10.9218 25.3076 11.1346V12.5H26.6923C27.1974 12.5 27.625 12.675 27.975 13.025C28.325 13.375 28.5 13.8026 28.5 14.3077V27.6923C28.5 28.1974 28.325 28.625 27.975 28.975C27.625 29.325 27.1974 29.5 26.6923 29.5H13.3077ZM13.3077 28H26.6923C26.7692 28 26.8397 27.9679 26.9038 27.9038C26.9679 27.8397 27 27.7692 27 27.6923V18.3077H13V27.6923C13 27.7692 13.032 27.8397 13.0961 27.9038C13.1602 27.9679 13.2308 28 13.3077 28ZM13 16.8077H27V14.3077C27 14.2308 26.9679 14.1603 26.9038 14.0961C26.8397 14.032 26.7692 14 26.6923 14H13.3077C13.2308 14 13.1602 14.032 13.0961 14.0961C13.032 14.1603 13 14.2308 13 14.3077V16.8077Z" fill="#1A1A33"/>
                  </svg>
                </div>
                <div style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: 500, marginBottom: '4px' }}>
                  Scheduled
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: colors.black }}>
                  8 payments
                </div>
              </div>

              {/* Bulk */}
              <div style={{
                width: '148px',
                backgroundColor: 'transparent',
                border: `1px solid ${colors.grey300}`,
                borderRadius: '16px',
                padding: '16px',
                cursor: 'pointer',
              }}>
                <div style={{ marginBottom: '16px' }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 0.25C24.7211 0.25 28.2368 0.250902 30.9395 0.614258C33.6348 0.976651 35.4843 1.69521 36.8945 3.10547C38.3048 4.51573 39.0233 6.36518 39.3857 9.06055C39.7491 11.7632 39.75 15.2789 39.75 20C39.75 24.7211 39.7491 28.2368 39.3857 30.9395C39.0233 33.6348 38.3048 35.4843 36.8945 36.8945C35.4843 38.3048 33.6348 39.0233 30.9395 39.3857C28.2368 39.7491 24.7211 39.75 20 39.75C15.2789 39.75 11.7632 39.7491 9.06055 39.3857C6.36518 39.0233 4.51573 38.3048 3.10547 36.8945C1.69521 35.4843 0.976651 33.6348 0.614258 30.9395C0.250902 28.2368 0.25 24.7211 0.25 20C0.25 15.2789 0.250902 11.7632 0.614258 9.06055C0.976651 6.36518 1.69521 4.51573 3.10547 3.10547C4.51573 1.69521 6.36518 0.976651 9.06055 0.614258C11.7632 0.250902 15.2789 0.25 20 0.25Z" fill="#EBE7FF" stroke="#DEDFDF" strokeWidth="0.5"/>
                    <path d="M12.25 25.6346C12.0375 25.6346 11.8594 25.5626 11.7156 25.4188C11.5719 25.275 11.5 25.0968 11.5 24.8842C11.5 24.6716 11.5719 24.4935 11.7156 24.35C11.8594 24.2064 12.0375 24.1346 12.25 24.1346H27.75C27.9625 24.1346 28.1406 24.2065 28.2843 24.3503C28.4281 24.4941 28.5 24.6723 28.5 24.8849C28.5 25.0975 28.4281 25.2756 28.2843 25.4192C28.1406 25.5628 27.9625 25.6346 27.75 25.6346H12.25ZM12.25 20.7499C12.0375 20.7499 11.8594 20.678 11.7156 20.5342C11.5719 20.3904 11.5 20.2122 11.5 19.9996C11.5 19.787 11.5719 19.6089 11.7156 19.4654C11.8594 19.3218 12.0375 19.25 12.25 19.25H27.75C27.9625 19.25 28.1406 19.3219 28.2843 19.4657C28.4281 19.6095 28.5 19.7877 28.5 20.0003C28.5 20.2129 28.4281 20.391 28.2843 20.5346C28.1406 20.6781 27.9625 20.7499 27.75 20.7499H12.25ZM12.25 15.8653C12.0375 15.8653 11.8594 15.7934 11.7156 15.6496C11.5719 15.5058 11.5 15.3276 11.5 15.115C11.5 14.9024 11.5719 14.7243 11.7156 14.5808C11.8594 14.4372 12.0375 14.3654 12.25 14.3654H27.75C27.9625 14.3654 28.1406 14.4373 28.2843 14.5811C28.4281 14.7249 28.5 14.9031 28.5 15.1157C28.5 15.3283 28.4281 15.5064 28.2843 15.65C28.1406 15.7935 27.9625 15.8653 27.75 15.8653H12.25Z" fill="#1A1A33"/>
                  </svg>
                </div>
                <div style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: 500, marginBottom: '4px' }}>
                  Bulk
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: colors.black }}>
                  2 drafts
                </div>
              </div>

              {/* Set up direct debit */}
              <div style={{
                width: '148px',
                backgroundColor: 'transparent',
                border: `1px dashed ${colors.grey300}`,
                borderRadius: '16px',
                padding: '16px',
                cursor: 'pointer',
              }}>
                <div style={{ marginBottom: '16px' }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.25" y="0.25" width="39.5" height="39.5" rx="9.75" fill="#EBE7FF"/>
                    <rect x="0.25" y="0.25" width="39.5" height="39.5" rx="9.75" stroke="#DEDFDF" strokeWidth="0.5"/>
                    <mask id="mask0_988_3980" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="8" y="8" width="24" height="24">
                      <rect x="8" y="8" width="24" height="24" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask0_988_3980)">
                      <path d="M20.0499 27.75C17.8832 27.75 16.0416 26.996 14.5249 25.488C13.0082 23.9793 12.2499 22.15 12.2499 20V19.225L10.9249 20.55C10.7749 20.6833 10.5999 20.75 10.3999 20.75C10.1999 20.75 10.0249 20.6833 9.8749 20.55C9.7249 20.4 9.6499 20.2207 9.6499 20.012C9.6499 19.804 9.7249 19.6333 9.8749 19.5L12.3749 17C12.4582 16.9 12.5539 16.8333 12.6619 16.8C12.7706 16.7667 12.8832 16.75 12.9999 16.75C13.1166 16.75 13.2292 16.7667 13.3379 16.8C13.4459 16.8333 13.5416 16.9 13.6249 17L16.1249 19.5C16.2749 19.6333 16.3499 19.804 16.3499 20.012C16.3499 20.2207 16.2749 20.4 16.1249 20.55C15.9749 20.6833 15.7999 20.75 15.5999 20.75C15.3999 20.75 15.2249 20.6833 15.0749 20.55L13.7499 19.225V20C13.7499 21.7333 14.3626 23.2083 15.5879 24.425C16.8126 25.6417 18.2999 26.25 20.0499 26.25C20.3832 26.25 20.7206 26.221 21.0619 26.163C21.4039 26.1043 21.7416 26.0167 22.0749 25.9C22.1916 25.8333 22.3249 25.8167 22.4749 25.85C22.6249 25.8833 22.7416 25.95 22.8249 26.05C23.0582 26.2667 23.1499 26.504 23.0999 26.762C23.0499 27.0207 22.8832 27.2 22.5999 27.3C22.1832 27.4333 21.7626 27.5417 21.3379 27.625C20.9126 27.7083 20.4832 27.75 20.0499 27.75ZM26.9999 23.25C26.8832 23.25 26.7709 23.2333 26.6629 23.2C26.5542 23.1667 26.4582 23.1 26.3749 23L23.8749 20.5C23.7249 20.3667 23.6499 20.1957 23.6499 19.987C23.6499 19.779 23.7249 19.6 23.8749 19.45C24.0249 19.3167 24.1999 19.25 24.3999 19.25C24.5999 19.25 24.7749 19.3167 24.9249 19.45L26.2499 20.775V20C26.2499 18.2667 25.6376 16.7917 24.4129 15.575C23.1876 14.3583 21.6999 13.75 19.9499 13.75C19.6166 13.75 19.2792 13.7793 18.9379 13.838C18.5959 13.896 18.2582 13.9833 17.9249 14.1C17.8082 14.1667 17.6749 14.1833 17.5249 14.15C17.3749 14.1167 17.2582 14.05 17.1749 13.95C16.9416 13.7333 16.8499 13.4957 16.8999 13.237C16.9499 12.979 17.1166 12.8 17.3999 12.7C17.8166 12.5667 18.2376 12.4583 18.6629 12.375C19.0876 12.2917 19.5166 12.25 19.9499 12.25C22.1166 12.25 23.9582 13.004 25.4749 14.512C26.9916 16.0207 27.7499 17.85 27.7499 20V20.775L29.0749 19.45C29.2249 19.3167 29.3999 19.25 29.5999 19.25C29.7999 19.25 29.9749 19.3167 30.1249 19.45C30.2749 19.6 30.3499 19.779 30.3499 19.987C30.3499 20.1957 30.2749 20.3667 30.1249 20.5L27.6249 23C27.5416 23.1 27.4456 23.1667 27.3369 23.2C27.2289 23.2333 27.1166 23.25 26.9999 23.25Z" fill="#1A1A33"/>
                    </g>
                  </svg>
                </div>
                <div style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: 500, marginBottom: '4px' }}>
                  Set up
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: colors.black }}>
                  direct debit
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent payments section */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            paddingLeft: '16px',
            paddingRight: '16px',
            marginBottom: '12px',
            cursor: 'pointer',
          }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: colors.black }}>
              Recent payments
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.black} strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>

          {recentPayments.map((payment) => (
            <div
              key={payment.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <PaymentIcon />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '16px', fontWeight: 500, color: colors.black, marginBottom: '2px' }}>
                    {payment.name}
                  </div>
                  <div style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: 400 }}>
                    {payment.subtitle}
                  </div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: colors.black }}>
                  {payment.amount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nav bar */}
      <NavBar activeItem="payments" onNavigate={onNavigate} />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}