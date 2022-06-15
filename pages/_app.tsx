import { AppProps } from 'next/app';
import Header from '../components/Header';
import { wrapper } from '../store';
import GlobalStyle from '../styles/GlobalStyle';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      {/* 모달 담을 DOM element */}
      <div id="root-modal" />
    </>
  );
};

export default wrapper.withRedux(App);
