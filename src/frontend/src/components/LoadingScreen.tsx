import type React from 'react';

const themeColors = {
  background: '#1f2937',
  primary: '#4f46e5',
  secondary: '#374151',
};

export default function LoadingScreen() {
  return (
    <div style={containerStyle}>
      <div style={loaderStyle}></div>
      <style>{keyframes}</style>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '300px',
  width: '100vw',
  backgroundColor: themeColors.background,
  margin: 0,
  padding: 0,
};

const loaderStyle: React.CSSProperties = {
  width: '60px',
  height: '60px',
  border: `4px solid ${themeColors.secondary}`,
  borderTop: `4px solid ${themeColors.primary}`,
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
