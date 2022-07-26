export const theme = {
  //變數
  logoGreen: '#8fbc8f',
  lightLogoGreen: '#ebf3eb',
  fontGreen: '#6fa96f',
  darkGreen: '#426f42',
  darkGray: '#3e4543',
  gray: '#d3d3d3',
  fontGray: '#e0e0e0',
  lightGray: '#f5f5f5',
  white: '#fff',
  black: '#1c1c1c',
  opBlack: 'rgba(0, 0, 0, 0.9)',
  opLightBlack: 'rgba(0, 0, 0, 0.3)',
  opWhite: 'rgba(255, 255, 255, 0.8)',
  yellow: '#fffdd0',
  darkYellow: '#fef263',
  starYellow: '#fef263',
  red: '#f08080',
  darkRed: '#e6005c',
};

// RWD
export const pad = '(min-width: 768px)';

export const scrollType = `
  &::-webkit-scrollbar {
    border-radius: 20px;
    width: 10px;
    background-color: ${theme.lightLogoGreen};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${theme.logoGreen};
  }
`;
