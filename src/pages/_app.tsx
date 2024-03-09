import type { AppProps } from 'next/app';
import React from 'react';
import '@/styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store/store';
import Layout from '../layouts';

export default function App ({ Component, pageProps }: AppProps):
JSX.Element {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
