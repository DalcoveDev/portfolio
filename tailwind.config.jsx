// tailwind.config.js
export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {},
};
import daisyui from 'daisyui';

export const plugins = [daisyui];
export const daisyuiConfig = {
  themes: [
    {
      'alphadestroyer-light': {
        primary: '#89AC46',
        secondary: '#1E1E1E',
        accent: '#FFD700',
        'base-100': '#EBE5C2',
        'base-content': '#1F1F1F',
      },
      'alphadestroyer-dark': {
        primary: '#89AC46',
        secondary: '#C4C4C4',
        accent: '#FFD700',
        'base-100': '#1A1A1A',
        'base-content': '#F2F2F2',
      },
    },
  ],
};
// This configuration sets up two themes: "alphadestroyer-light" and "alphadestroyer-dark".
// The light theme has a light background and dark text, while the dark theme has a dark background and light text.
