import { createContext } from 'react';
import { getDefaultBrowserTheme } from '@/utils';
import { type ThemeType } from '../../types';

const defaultTheme: ThemeType = {
  theme: getDefaultBrowserTheme(),
  toggleTheme: () => {}
};

const ThemeContext = createContext<ThemeType>(defaultTheme);

export default ThemeContext;