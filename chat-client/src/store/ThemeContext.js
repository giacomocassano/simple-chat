import {createContext, useState} from 'react';

//Define the themes
const dark = {
  primary: '#4f6373',
  secondary: '#728fa5',
  textPrimary: '#ffffff',
  textSecondary: '#c8c8c8',
  accent: '#5eb2f2',
  primaryRGB: '79, 103, 115',
  secondaryRGB: '114, 143, 165',
  textPrimaryGB: '255, 255, 255',
  textSecondaryRGB: '200, 200, 200',
  accentRGB: '94, 178, 242',
  redReactionRGB: '255, 99, 132',
  yellowReactionRGB: '255, 205, 86',
  greenReactionRGB: '0, 255, 0',
};

const forest = {
  primary: '#133416',
  secondary: '#005C53',
  textPrimary: '#ffffff',
  textSecondary: '#f0ee2',
  accent: '#379634',
  primaryRGB: '19, 52, 22',
  secondaryRGB: '0, 92, 83',
  textPrimaryGB: '255, 255, 255',
  textSecondaryRGB: '240, 238, 226',
  accentRGB: '55, 150, 52',
  redReactionRGB: '255, 99, 132',
  yellowReactionRGB: '255, 205, 86',
  greenReactionRGB: '0, 255, 0',
};

const rose = {
  primary: '#402e2a',
  secondary: '#5F7367',
  textPrimary: '#ffffff',
  textSecondary: '#684551',
  accent: '#cea0ae',
  primaryRGB: '64, 46, 42',
  secondaryRGB: '95, 115, 103',
  textPrimaryGB: '255, 255, 255',
  textSecondaryRGB: '104, 69, 81',
  accentRGB: '206, 160, 174',
  redReactionRGB: '255, 99, 132',
  yellowReactionRGB: '255, 205, 86',
  greenReactionRGB: '0, 255, 0',
};

//Create the themes object
const themes = {
  dark,
  forest,
  rose,
};

//Create the context with the default theme and the themes object
export const ThemeContext = createContext({
  theme: dark,
  themes: themes,
});

//Create the provider component
export const MyThemeProvider = ({children}) => {
  //The current theme is stored in the state
  const [mode, setMode] = useState(dark);

  //Set the theme and save it in the local storage
  const setTheme = (theme) => {
    window.localStorage.setItem('theme', theme);
    setMode(getTheme(theme));
  };

  //Get the theme object from the themes object
  const getTheme = (theme) => {
    const themeObj = themes[theme];
    if (!themeObj) return dark;
    return themeObj;
  };

  //Load the theme from the local storage
  const loadTheme = () => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setMode(getTheme(localTheme));
  };

  return <ThemeContext.Provider value={{theme: mode, themes, setTheme, loadTheme}}>{children}</ThemeContext.Provider>;
};
