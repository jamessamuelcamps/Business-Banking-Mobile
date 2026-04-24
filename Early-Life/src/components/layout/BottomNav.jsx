import { motion } from 'framer-motion';
import { tokens } from '../../design-system/tokens';

const NAV_ACTIVE_COLOR = '#2ADAA5';
const NAV_INACTIVE_COLOR = tokens.color.text.primary;

const NAV_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    viewBox: '0 0 19.5 19.5',
    path: 'M9.75 0.75V18.75M0.75 9.75H18.75M2.75 0.75H16.75C17.8546 0.75 18.75 1.64543 18.75 2.75V16.75C18.75 17.8546 17.8546 18.75 16.75 18.75H2.75C1.64543 18.75 0.75 17.8546 0.75 16.75V2.75C0.75 1.64543 1.64543 0.75 2.75 0.75Z',
    strokeWidth: 1.5,
  },
  {
    id: 'apply',
    label: 'Apply',
    viewBox: '0 0 20.5 20.5',
    path: 'M0.75 19.75C0.75 16.75 2.6 14.39 5.83 13.75C8.25 13.27 10.75 11.75 11.75 10.75M9.74998 18.75C7.99404 18.7553 6.30023 18.1005 5.0045 16.9154C3.70876 15.7303 2.90575 14.1016 2.75471 12.3521C2.60368 10.6027 3.11567 8.86037 4.18913 7.47075C5.26259 6.08113 6.81911 5.14571 8.54998 4.85001C14.25 3.75001 15.75 3.23001 17.75 0.750008C18.75 2.75001 19.75 4.93001 19.75 8.75001C19.75 14.25 14.97 18.75 9.74998 18.75Z',
    strokeWidth: 1.5,
  },
  {
    id: 'pay',
    label: 'Pay',
    viewBox: '0 0 17.5 19.5',
    path: 'M4.75 0.75L0.75 4.75M0.75 4.75L4.75 8.75M0.75 4.75H16.75M12.75 18.75L16.75 14.75M16.75 14.75L12.75 10.75M16.75 14.75H0.75',
    strokeWidth: 1.5,
  },
  {
    id: 'manage',
    label: 'Manage',
    viewBox: '0 0 21.5166 21.4986',
    path: 'M0.750003 10.7505C0.74953 10.9418 0.803919 11.1291 0.90672 11.2904C1.00952 11.4517 1.15642 11.5802 1.33 11.6605L9.93 15.5705C10.1892 15.6879 10.4705 15.7486 10.755 15.7486C11.0395 15.7486 11.3208 15.6879 11.58 15.5705L20.16 11.6705C20.337 11.5909 20.487 11.4616 20.5918 11.2982C20.6966 11.1349 20.7515 10.9445 20.75 10.7505M0.750003 15.7505C0.74953 15.9418 0.803919 16.1291 0.90672 16.2904C1.00952 16.4517 1.15642 16.5802 1.33 16.6605L9.93 20.5705C10.1892 20.6879 10.4705 20.7486 10.755 20.7486C11.0395 20.7486 11.3208 20.6879 11.58 20.5705L20.16 16.6705C20.337 16.5909 20.487 16.4616 20.5918 16.2982C20.6966 16.1349 20.7515 15.9445 20.75 15.7505M11.58 0.930357C11.3195 0.811506 11.0364 0.75 10.75 0.75C10.4636 0.75 10.1806 0.811506 9.92002 0.930357L1.35003 4.83036C1.17257 4.9086 1.0217 5.03676 0.915788 5.19921C0.809871 5.36167 0.753479 5.55142 0.753479 5.74536C0.753479 5.93929 0.809871 6.12904 0.915788 6.2915C1.0217 6.45396 1.17257 6.58211 1.35003 6.66036L9.93003 10.5704C10.1906 10.6892 10.4736 10.7507 10.76 10.7507C11.0464 10.7507 11.3295 10.6892 11.59 10.5704L20.17 6.67036C20.3475 6.59211 20.4983 6.46396 20.6043 6.3015C20.7102 6.13904 20.7666 5.94929 20.7666 5.75536C20.7666 5.56142 20.7102 5.37167 20.6043 5.20921C20.4983 5.04676 20.3475 4.9186 20.17 4.84036L11.58 0.930357Z',
    strokeWidth: 1.5,
  },
  {
    id: 'card',
    label: 'Card',
    viewBox: '0 0 22 16',
    path: 'M21 5.5H1M1 3C1 1.89543 1.89543 1 3 1H19C20.1046 1 21 1.89543 21 3V13C21 14.1046 20.1046 15 19 15H3C1.89543 15 1 14.1046 1 13V3ZM5 11H7M9 11H13',
    strokeWidth: 1.5,
  },
];

export default function BottomNav({ currentPage, onNavigate }) {
  return (
    <div style={{
      flexShrink: 0,
      backgroundColor: tokens.color.background.white,
      borderTop: `1px solid ${tokens.color.border.default}`,
      paddingTop: `${tokens.spacing.xs + 3}px`,
      paddingBottom: '20px',
      boxShadow: '0px 4px 48px 0px rgba(0,0,0,0.15)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {NAV_ITEMS.map(item => {
          const isActive = currentPage === item.id;
          const color = isActive ? NAV_ACTIVE_COLOR : NAV_INACTIVE_COLOR;
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              whileTap={{ scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                color,
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: `4px ${tokens.spacing.sm}px`,
                fontFamily: tokens.typography.fontFamily,
              }}
            >
              <svg width="24" height="24" viewBox={item.viewBox} fill="none">
                <path
                  d={item.path}
                  stroke="currentColor"
                  strokeWidth={item.strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span style={{
                fontSize: '13px',
                fontWeight: 500,
                lineHeight: '18px',
              }}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
