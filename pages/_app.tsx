import { AppProps } from 'next/app';
import React from 'react';
import Header from '../components/Header';
import { wrapper } from '../store';
import GlobalStyle from '../styles/GlobalStyle';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <React.StrictMode>
        <Component {...pageProps} />
        {/* 모달 담을 DOM element */}
        <div id="root-modal" />
      </React.StrictMode>
    </>
  );
};

export default wrapper.withRedux(App);
