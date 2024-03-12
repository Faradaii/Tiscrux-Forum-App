import { createContext } from 'react';
import { getDefaultBrowserTheme } from '@/utils';

const defaultTheme = getDefaultBrowserTheme();

const ThemeContext = createContext(defaultTheme);

export default ThemeContext;