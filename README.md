# next airbnb

## 8.1 프로젝트 생성

### lib 설치

```sh
yarn add next react react-dom
yarn add -D typescript @types/react @types/node @types/react-dom
```

### .gitignore

```tex
node_modules

.next
```



### 8.1.2 eslint 설정

```sh
yarn add eslint

npx eslint --init
```

.eslintrc.js

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    quotes: ['error', 'double'], // 더블 쿼터 사용
    '@typescript-eslint/quotes': ['error', 'double'],
    'no-used-vars': 'off', // 사용 안한 변수 경고 중복
    '@typescript-eslint/no-used-vars': 'warn',
    'jsx-ally/control-has-associated-label': 'off', // 상호 작용 엘리먼트에 label을 넣는다
    'react/no-array-index-key': 'off', // key 값으로 index 사용 가능 여부
    'comma-dangle': 'on', // 마지막에 , 넣어주기 여부
    'arrow-body-style': 'as-needed', // 화살표 함수안에 return 사용 가능
    'react/no-unescaped-entities': 'off', // 문자열 내에서 " ' > } 허용 여부
    'react/prop-types': 'off', // proptypes를 사용하지 않는다
    'object-curly-neline': 'off', // 다음 줄 바꿈 강제 사용 X
    'react/jsx-one-expression-per-line': 'off', // 한 라인에 여러 JSX 사용 가능
    'implicit-arrow-linebreak': 'off', // 화살표 함수 다음에 줄 바꿈 사용 가능
    'no-shadow': 'off', // 파일 내에서 중복 이름 사용 가능
    'spaced-comment': 'off', // 주석을 뒤에 달 수 있다
    'operator-linebreak': 'off', // 연산자 다음 줄 바꿈 사용 가능
    'react/react-in-jsx-scope': 'off', // jsx를 사용해도 React를 꼭 import하지 않아도 됨
    'react/jsx-props-no-spreading': 'off', // props를 spread 할 수 있다.
    'jsx-ally/anchor-is-valid': 'off', // next js 에서는 a 에 href 속성 없이 사용
    'global-require': 'off', // 함수 내에서 require 사용 가능
    'jsx-ally/label-has-associated-control': 'off', // label htmlFor 을 사용하지 않아도 된다
    'import/prefer-default-export': 'off', // export default 를 사용
    'no-param-ressign': 'off',
    'react/jsx-curly-newline': 'off', // jsx 안에 } 를 새로운 라인에 사용 가능
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx'], // jsx 사용 가능 확장자
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'nevet',
        ts: 'nevet',
        tsx: 'nevet',
      }, // import 시 확장자명 사용 X
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
};

```

pages/index.tsx

```tsx
const Index: React.FC = () => {
  return <div>hello </div>;
};

export default Index;

```

tsconfig.json

- 엄격한 타입 지정을 위해 strict: true 설정

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "incremental": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve"
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}

```

### styling 설정

styled-components 설치

```sh
$ yarn add styled-components babel-plugin-styled-components
$ yarn add @types/styled-components -D
```

pages/_document.tsx

```tsx
import Document, { DocumentContext, DocumentInitialProps } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
```

.babelrc

```tex
{
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true }]]
}

```

svg component화 

```sh
$ yarn add babel-plugin-inline-react-svg
```

types/image.d.ts

```typescript
declare module "*.svg"
```

.babelrc

```json
{
  "presets": ["next/babel"],
  "plugins": [["babel-plugin-styled-components", { "ssr": true }], "babel-plugin-inline-react-svg"]
}

```

pages/index.tsx

```typescript
import styled from 'styled-components';

const Container = styled.div`
  font-size: 21px;
  color: #333;
`;

const Index: React.FC = () => {
  return <Container>hello </Container>;
};

export default Index;
```

### 8.1.4 글로벌 스타일 설정하기

styles/palette.ts

```typescript
export default {
  cardinal: '#A41850',
  main_pink: '#FF385C',
  Amaranth: '#E51E53',
  bittersweet: '#ff5a5f',
  tawny: '#D93900',
  Orange: '#FC642D',
  davidson_orange: '#c13515',
  gray_b0: '#b0b0b0',
  gray_dd: '#ddd',
  gray_eb: '#ebebeb',
  gray_f7: '#f7f7f7',
  gray_c4: '#c4c4c4',
  gray_71: '#717171',
  gray_80: '#808080',
  gray_85: '#858585',
  gray_76: '#767676',
  gray_48: '#484848',
  black_22: '#222',
  snow: '#FFF8F6',
  gray_aa: '#aaa',
};
```

### html 태그 기본 스타일 제거

```sh
$ yarn add styled-reset
```

styles/GlobalStyle.tsx

```tsx
import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';
import palette from './palette';

const globalStyle = css`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    color: ${palette.black_22};
  }
`;

const GlobalStyle = createGlobalStyle`
  ${globalStyle}
`;

export default GlobalStyle;
```

pages/_app.tsx

```tsx
import { AppProps } from 'next/app';
import GlobalStyle from '../styles/GlobalStyle';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default App;

```

### 8.1.5 폰트 적용하기

pages/_document.tsx

```tsx
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

styles/GlobalStyle.ts

```typescript
import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';
import palette from './palette';

const globalStyle = css`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: Noto Sans, Noto Sans KR;
    color: ${palette.black_22};
  }
`;

const GlobalStyle = createGlobalStyle`
  ${globalStyle}
`;

export default GlobalStyle;
```

---

# 09. 공통 헤더 만들기

components/Header.tsx

```tsx
import Link from 'next/link';
import styled from 'styled-components';
import AirbnbLogoIcon from '../public/static/svg/logo/logo.svg';
import AirbnbLogoTextIcon from '../public/static/svg/logo/logo_text.svg';
import palette from '../styles/palette';

const Container = styled.div`
  /* 고정 */
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;

  /* 좌측 로고 */
  .header-logo-wrapper {
    display: flex;
    align-items: center;

    .header-logo {
      margin-right: 6px;
    }
  }

  /* 로그인, 회원가입 버튼 */
  .header-auth-buttons {
    .header-sign-up-button {
      height: 38px;
      margin-right: 8px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: #fff;
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }

    .header-login-button {
      height: 38px;
      padding: 0 16px;
      border: 0;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
      border-radius: 21px;
      background-color: #fff;
      cursor: pointer;
      outline: none;
      &:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
      }
    }
  }
`;

const Header: React.FC = () => {
  return (
    <Container>
      {/* Link 컴포넌트 사용해 기본 페이지로 이동 */}
      <Link href="/">
        <a className="header-logo-wrapper">
          <AirbnbLogoIcon className="header-logo" />
          <AirbnbLogoTextIcon />
        </a>
      </Link>
      <div className="header-auth-buttons">
        <button className="header-sign-up-button">회원가입</button>
        <button className="header-login-button">로그인</button>
      </div>
    </Container>
  );
};

export default Header;

```

pages/_app.tsx

```tsx
import { AppProps } from 'next/app';
import Header from '../components/Header';
import GlobalStyle from '../styles/GlobalStyle';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default App;

```

## 9.2 모달 컴포넌트 만들기

- 컴포넌트에 해당 모달창의 활성화 여부 상태 생성
- 버튼 클릭, 모달 배경 클릭 시 on/off

```tsx
// ...

  /* 모달 창 */
  .modal-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;

    .modal-background {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.75);
      z-index: 10;
    }
    .modal-contents {
      width: 400px;
      height: 400px;
      background-color: #fff;
      z-index: 11;
    }
  }

// ...
      <div className="header-auth-buttons">
        <button
          className="header-sign-up-button"
          onClick={() => setModalOpened(true)}
        >
          회원가입
        </button>
        <button className="header-login-button">로그인</button>
      </div>
      {modalOpened && (
        <div className="modal-wrapper">
          <div
            className="modal-background"
            role="presentation"
            onClick={() => setModalOpened(false)}
          />
          <div className="modal-contents">modal</div>
        </div>
      )}
    </Container>

// ...
```

### react Portal

- 부모 컴포넌트의 DOM 계층 구조 바깥에 있는 DOM 노드로 자식을 렌더링시키는 방법

  ```tsx
  ReactDOM.createPortal(child, container)
  ```

  - 첫 번째 인자: 리액트 컴포넌트
  - 두 번째 인자: 리액트 컴포넌트를 넣을 DOM

pages/_app.tsx

```tsx
import { AppProps } from 'next/app';
import Header from '../components/Header';
import GlobalStyle from '../styles/GlobalStyle';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      {/* 모달 담을 DOM element */}
      <div id="root-modal"/>
    </>
  );
};

export default App;

```

components/ModalPortal.tsx

```tsx
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;

  .modal-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }
  /* .modal-contents {
      width: 400px;
      height: 400px;
      background-color: #fff;
      z-index: 11;
    } */
`;

interface IProps {
  children: React.ReactNode;
}

const ModalPortal: React.FC<IProps> = ({ children }) => {
  const ref = useRef<Element | null>();
  const [mounted, setMounted] = useState(false);

  /**
   * 렌더링 시, #root-modal 엘레먼트 잡아와서 ref에 세팅
   */
  useEffect(() => {
    setMounted(true);
    if (document) {
      const dom = document.querySelector('#root-modal');
      // ref에 DOM element 세팅
      ref.current = dom;
    }
  }, []);

  if (ref.current && mounted) {
    return createPortal(
      // 인자 1: 포탈을 통해 전달할 react 컴포넌트
      <Container>
        <div className="modal-background" />
        {children}
      </Container>,
      // 인자 2: 전달할 react 컴포넌트가 담길 DOM element
      ref.current,
    );
  }
  return null;
};

export default ModalPortal;

```

### 회원가입 모달

components/auth/SignUpModal.tsx

```tsx
import styled from 'styled-components';

const Container = styled.div`
  width: 568px;
  height: 614px;
  background-color: #fff;
  z-index: 11;
`;

const SignUpModal: React.FC = () => {
  return <Container>Sign up.</Container>;
};

export default SignUpModal;
```



components/Header.tsx

```tsx
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import AirbnbLogoIcon from '../public/static/svg/logo/logo.svg';
import AirbnbLogoTextIcon from '../public/static/svg/logo/logo_text.svg';
import palette from '../styles/palette';
import SignUpModal from './auth/SignUpModal';
import ModalPortal from './ModalPortal';

// ...
const Header: React.FC = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <Container>
			// ...
      {modalOpened && (
        <ModalPortal closePortal={() => setModalOpened(false)}>
          <SignUpModal />
        </ModalPortal>
      )}
    </Container>
  );
};

export default Header;

```



components/ModalPortal.tsx

```tsx
interface IProps {
  children: React.ReactNode;
  closePortal: () => void; // 모달 비활성화 함수
}

const ModalPortal: React.FC<IProps> = ({ children, closePortal }) => {
	// ...

      <Container>
        <div className="modal-background"
          onClick={closePortal}
        />
	// ...
};

export default ModalPortal;
```

### 9.2.2 Modal Hooks 만들기

모달을 사용하기 위해 아래의 준비 필요

1. 부모 컴포넌트에 `modalOpened: boolean` 상태 선언 필요
2. 부모 컴포넌트에서 `<ModalPortal>` 의 props 로 모달 비활성화 함수 전달해야 함

따라서 hook으로 만들어 관리



hooks/useModal.tsx

```tsx
```

