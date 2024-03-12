import type { AppProps } from 'next/app';
import { useState, useEffect, useMemo } from 'react';
import '@/styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store/store';
import AppShell from './AppShell';
import ThemeContext from '@/context/ThemeContext';
import LocaleContext from '@/context/LocaleContext';

export default function App ({ Component, pageProps }: AppProps):
JSX.Element {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') ?? 'light';
    }
    return 'light';
  });
  const [locale, setLocale] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('locale') ?? 'id';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('class', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeContextValue = useMemo(() => ({
    theme,
    toggleTheme
  }), [theme]);

  const toggleLocale = () => {
    setLocale((prevLocale) => (prevLocale === 'id' ? 'en' : 'id'));
  };

  const localeContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale
    };
  }, [locale]);

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={themeContextValue}>
        <LocaleContext.Provider value={localeContextValue}>
          <AppShell>
            <Component {...pageProps} />
          </AppShell>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    </Provider>
  );
}
