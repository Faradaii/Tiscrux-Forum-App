import type { AppProps } from 'next/app';
import { useState, useEffect, useMemo } from 'react';
import '@/styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store/store';
import AppShell from './AppShell';
import ThemeContext from '@/context/ThemeContext';

export default function App ({ Component, pageProps }: AppProps):
JSX.Element {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') ?? 'light';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('class', theme);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeContextValue = useMemo(() => ({
    theme,
    toggleTheme
  }), [theme]);

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={themeContextValue}>
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </ThemeContext.Provider>
    </Provider>
  );
}
