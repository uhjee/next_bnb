import App, { AppContext, AppProps } from 'next/app';
import React from 'react';
import Header from '../components/Header';
import axios from '../lib/api';
import { meAPI } from '../lib/api/auth';
import { cookieStringToObject } from '../lib/util';
import { wrapper } from '../store';
import { userActions } from '../store/user';
import GlobalStyle from '../styles/GlobalStyle';

const app = ({ Component, pageProps }: AppProps) => {
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

/**
 * 컴포넌트의 getInitailProps -> 서버에서 페이지 렌더링 전에 데이터를 가져옴
 * @param context
 * @returns
 */
app.getInitialProps = wrapper.getInitialAppProps(store => async context => {
  const appInitailProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);

  // console.log({ ctx: context.ctx });

  const { isLogged } = store.getState().user;

  try {
    if (!isLogged && cookieObject.access_token) {
      // axios instance의 모든 cookie에 token 세팅
      axios.defaults.headers.common.cookie = cookieObject.access_token;
      const { data } = await meAPI();

      // redux에 저장 - 새로고침을 해도 로그인 유지
      store.dispatch(userActions.setLoggedUser(data));
    }
  } catch (e) {
    console.log(e);
  }

  return { ...appInitailProps };
});

export default wrapper.withRedux(app);
