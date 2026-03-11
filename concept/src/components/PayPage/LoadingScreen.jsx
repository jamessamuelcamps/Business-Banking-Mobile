import { useEffect, useState } from 'react';
import { colors } from '../../styles/colors';

export default function LoadingScreen() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      backgroundColor: colors.white,
    }}>
      {/* Spinner */}
      <div style={{ position: 'relative', width: '72px', height: '72px' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          border: `4px solid ${colors.grey200}`,
          borderTopColor: colors.springgreen,
          animation: 'spin 0.8s linear infinite',
        }} />
        {/* Icon inside spinner */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M9.41 19.53L11.72 21.84C11.86 21.98 11.93 22.15 11.93 22.35C11.93 22.56 11.86 22.74 11.72 22.89C11.56 23.05 11.38 23.12 11.18 23.12C10.98 23.12 10.8 23.05 10.65 22.89L7.17 19.41C7.08 19.32 7.01 19.22 6.97 19.12C6.93 19.01 6.91 18.9 6.91 18.78C6.91 18.66 6.93 18.55 6.97 18.44C7.01 18.34 7.08 18.24 7.17 18.15L10.66 14.65C10.81 14.5 10.99 14.43 11.19 14.43C11.39 14.44 11.56 14.51 11.72 14.67C11.86 14.82 11.94 15 11.94 15.2C11.95 15.39 11.87 15.57 11.72 15.72L9.41 18.03H15.94C16.15 18.03 16.33 18.1 16.48 18.25C16.62 18.39 16.69 18.57 16.69 18.78C16.69 18.99 16.62 19.17 16.48 19.31C16.33 19.46 16.15 19.53 15.94 19.53H9.41Z"
              fill={colors.grey500}
            />
          </svg>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '20px', fontWeight: 600, color: colors.black, marginBottom: '8px' }}>
          Processing{dots}
        </div>
        <div style={{ fontSize: '15px', color: colors.textSecondary }}>
          Sending your payment securely
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
