export const appTheme = {
    colors: {
      bgPrimary: '#f8f9fa',
      bgSecondary: '#ffffff',
      textPrimary: '#212529',
      textSecondary: '#495057',
    },
    shadows: {
      sm: '0 1px 3px rgba(0,0,0,0.12)',
      md: '0 4px 6px rgba(0,0,0,0.1)',
    },
    breakpoints: {
      mobile: '576px',
      tablet: '768px',
      desktop: '992px',
    },
  };
  
  export type AppTheme = typeof appTheme;