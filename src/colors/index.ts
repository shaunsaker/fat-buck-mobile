import tinycolor from 'tinycolor2';

const BLACK = '#0B0B00';
const WHITE = '#FCFCFD';
const PRIMARY = '#9C9F02';
const SECONDARY = 'red';
const ACCENT = '#00D193';

export const colors = {
  // input colors
  black: BLACK,
  white: WHITE,
  primary: PRIMARY,
  secondary: SECONDARY,
  accent: ACCENT,
  success: ACCENT,

  // calculated colors
  transBlack: tinycolor(BLACK).setAlpha(0.5).toString(),
  transWhite: tinycolor(WHITE).setAlpha(0.5).toString(),
  darkTransWhite: tinycolor(WHITE).setAlpha(0.8).toString(),
  lightTransWhite: tinycolor(WHITE).setAlpha(0.17).toString(),
  veryLightTransWhite: tinycolor(WHITE).setAlpha(0.05).toString(),
  lightPrimary: tinycolor(PRIMARY).setAlpha(0.33).toString(),
  lightAccent: tinycolor(ACCENT).setAlpha(0.33).toString(),
  grey: tinycolor(BLACK).setAlpha(0.33).toString(),
  lightSuccess: tinycolor(ACCENT).setAlpha(0.33).toString(),
};
