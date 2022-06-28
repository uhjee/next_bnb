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
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

/**
 * 모달 사용을 위해
 *   1. 포탈을 통해 #root-modal 엘레먼트로 컴포넌트 전달
 *   2. 모달 open 함수, close 함수 반환
 */

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
`;

const useModal = () => {
  // 모달 활성화 여부
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);

  interface IProps {
    children: React.ReactNode;
  }

  // Component 
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

    if (ref.current && mounted && modalOpened) {
      return createPortal(
        // 인자 1: 포탈을 통해 전달할 react 컴포넌트
        <Container>
          <div
            className="modal-background"
            role="presetaion"
            onClick={closeModal}
          />
          {children}
        </Container>,
        // 인자 2: 전달할 react 컴포넌트가 담길 DOM element
        ref.current,
      );
    }
    return null;
  };

  return {
    openModal,
    closeModal,
    ModalPortal,
  };
};

export default useModal;

```

components/Header.tsx

```tsx
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import useModal from '../hooks/useModal';
import AirbnbLogoIcon from '../public/static/svg/logo/logo.svg';
import AirbnbLogoTextIcon from '../public/static/svg/logo/logo_text.svg';
import palette from '../styles/palette';
import SignUpModal from './auth/SignUpModal';
import ModalPortal from './ModalPortal';

// ...

const Header: React.FC = () => {
  // custom hook : useModal 사용
  const { openModal, ModalPortal } = useModal();
  
  return (
    <Container>
			// ...
      <div className="header-auth-buttons">
        <button className="header-sign-up-button" onClick={openModal}>
          회원가입
        </button>
        <button className="header-login-button">로그인</button>
      </div>
      <ModalPortal>
        <SignUpModal />
      </ModalPortal>
    </Container>
  );
};

export default Header;

```

---

# 10. 회원 가입과 로그인

compoenents/auth/SignupModal.tsx

- 퍼블리싱

```tsx
import styled from 'styled-components';
import palette from '../../styles/palette';
import CloseXIcon from '../../public/static/svg/modal/close_x_icon.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed-eye.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened-eye.svg';
import PersonIcon from '../../public/static/svg/auth/person.svg';

const Container = styled.form`
  width: 568px;
  padding: 32px;
  /* height: 614px; */
  background-color: #fff;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
    input {
      position: relative;
      width: 100%;
      height: 46px;
      padding: 0 44px 0 11px;
      border: 1px solid ${palette.gray_eb};
      border-radius: 4px;
      font-size: 16px;
      outline: none;
      ::placeholder {
        color: ${palette.gray_76};
      }
    }
    svg {
      position: absolute;
      right: 11px;
      top: 16px;
    }
  }
`;

const SignUpModal: React.FC = () => {
  return (
    <Container>
      <CloseXIcon className="modal-close-x-icon" />
      <div className="input-wrapper">
        <input type="email" name="eamil" placeholder="이메일 주소" />
        <MailIcon />
      </div>
      <div className="input-wrapper">
        <input placeholder="이름(예: 살바도르)" />
        <PersonIcon />
      </div>
      <div className="input-wrapper">
        <input placeholder="성(예: 달리)" />
        <PersonIcon />
      </div>
      <div className="input-wrapper">
        <input placeholder="비밀번호 설정하기" type="password" />
        <OpenedEyeIcon />
      </div>
    </Container>
  );
};

export default SignUpModal;
```

---

# 10. 회원가입, 로그인

## 10.1 회원가입 인풋

### 10.1.1 디자인 시스템

일관된 스타일, 재사용성을 위해 컴포넌트 마다 디자인 시스템 적용

e.g. input, button ... 

### 10.1.2 공통 input 컴포넌트

components/common/Input.tsx

```tsx
import styled from 'styled-components';
import palette from '../../styles/palette';

// generic으로 styled Component의 props에 타입 추가
const Container = styled.div<{ iconExist: boolean }>`
  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({ iconExist }) => (iconExist ? '0 44px 0 11px' : '0 11px')};
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    ::placeholder {
      color: ${palette.gray_76};
    }

    &:focus {
      border-color: ${palette.Amaranth} !important;
    }
  }
  .input-icon-wrapper {
    position: absolute;
    top: 0;
    right: 11px;
    height: 46px;
    display: flex;
    align-items: center;
  }
`;

// React.InputHTMLAttributes<HTMLInputElement> :: <input> 태그가 가지는 속성들에 대한 타입
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
}

const Input: React.FC<IProps> = ({ icon, ...props }) => {
  return (
    // styled Component에 props로 변수 전달
    <Container iconExist={!!icon}>
      <input {...props} />
      <div className="input-icon-wrapper">{icon}</div>
    </Container>
  );
};

export default Input;

```

- React.InputHTMLAttributes<HTMLInputElement> :: <input> 태그가 가지는 속성들에 대한 타입

  ```tsx
  // React.InputHTMLAttributes<HTMLInputElement> :: <input> 태그가 가지는 속성들에 대한 타입
  interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: JSX.Element;
  }
  ```

  

- generic으로 styled Component의 props에 타입 추가

  ```tsx
  // 선언
  const Container = styled.div<{ iconExist: boolean }>`
  `;
  
  // ...
  
  // 호출
  <Container iconExist={!!icon}>
  
  ```

  

Input 컴포넌트 사용

components/auth/SignUpModel.tsx

```tsx
import styled from 'styled-components';
import palette from '../../styles/palette';
import CloseXIcon from '../../public/static/svg/modal/close_x_icon.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed-eye.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened-eye.svg';
import PersonIcon from '../../public/static/svg/auth/person.svg';
import Input from '../common/Input';
import React, { useState } from 'react';

const Container = styled.form`
  width: 568px;
  padding: 32px;
  /* height: 614px; */
  background-color: #fff;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }
  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }
`;

const SignUpModal: React.FC = () => {
  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');

  /**
   * 이메일 변경 이벤트 핸들러
   * @param event
   */
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  /**
   * 이메일 변경 이벤트 핸들러
   * @param event
   */
  const onChangeLastname = (event: React.ChangeEvent<HTMLInputElement>) =>
    setLastname(event.target.value);
  /**
   * 이메일 변경 이벤트 핸들러
   * @param event
   */
  const onChangeFirstname = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFirstname(event.target.value);
  /**
   * 이메일 변경 이벤트 핸들러
   * @param event
   */
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  // 비밀번호 표현 여부 토글
  const [hidePassword, setHidePassword] = useState(true);

  const toggleHidePassword = () => setHidePassword(!hidePassword);

  return (
    <Container>
      <CloseXIcon className="modal-close-x-icon" />
      <div className="input-wrapper">
        <Input
          type="email"
          name="eamil" // name: email은 브라우저가 저장할 수 있도록 해줌
          placeholder="이메일 주소"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="이름(예: 살바도르)"
          icon={<PersonIcon />}
          value={lastname}
          onChange={onChangeLastname}
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="성(예: 달리)"
          icon={<PersonIcon />}
          value={firstname}
          onChange={onChangeFirstname}
        />
      </div>
      <div className="input-wrapper sign-up-password-input-wrapper">
        <Input
          placeholder="비밀번호 설정하기"
          type={hidePassword ? 'password' : 'text'} // input 값이 *로 대체되어 보임
          icon={
            hidePassword ? (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            ) : (
              <ClosedEyeIcon onClick={toggleHidePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
        />
      </div>
    </Container>
  );
};

export default SignUpModal;

```



- 상태값 관리
  - emial, firstname, lastname, password

- input 엘레먼트의 type 속성 -  password    |  text

## 10.2 회원가입 셀렉터

### 10.2.1 공통 셀렉터 컴포넌트

components/common/Selector.tsx

```tsx
import styled from 'styled-components';
import { urlToHttpOptions } from 'url';
import palette from '../../styles/palette';

const Container = styled.div`
  width: 100%;
  height: 46px;

  select {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 1px solid ${palette.gray_eb};
    padding: 0 11px;
    border-radius: 4px;
    outline: none;
    /* select 요소의 화살표 제거 */
    -webkit-appearance: none;
    background-image: url('/static/svg/common/selector/selector_down_arrow.svg');
    background-position: right 11px center;
    background-repeat: no-repeat;
    font-size: 16px;

    &:focus {
      border-color: ${palette.Amaranth};
    }
  }
`;

// options, values 를 optional로 설정 -> undefined도 올 수 있게 됨
interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  value?: string;
  disabledOptions?: string[];
}

const Selector: React.FC<IProps> = ({
  options = [],
  disabledOptions = [],
  ...props
}) => {
  return (
    <Container>
      <select {...props}>
        {/* 기본값 -> disabled 처리되어 있음 */}
        {disabledOptions &&
          disabledOptions.map((option, index) => (
            <option key={index} value={option} disabled>
              {option}
            </option>
          ))}
        {/* selectable Options */}
        {options &&
          options.map((option, index) => (
            <option value={option} key={index}>
              {' '}
              {option}
            </option>
          ))}
      </select>
    </Container>
  );
};

```

components/auth/SignUpModal.tsx

```tsx
import Selector from '../common/Selector';
import { monthList, dayList, yearList } from '../../lib/staticData';

const Container = styled.form`
	// ...
  .sign-up-birthday-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.gray_48};
  }
  
  .sign-up-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;

    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }

    .sign-up-modal-birthday-day-selector {
      margin-right: 16px;
      width: 25%;
    }

    .sign-up-modal-birthday-year-selector {
      width: 33.3333%;
    }
  }
`;

const SignUpModal: React.FC = () => {
 // ...
  
  // 생년월일
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();

  const onChangeBirthYear = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setBirthYear(event.target.value);
  const onChangeBirthDay = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setBirthDay(event.target.value);
  const onChangeBirthMonth = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setBirthMonth(event.target.value);
  return (
    <Container>
    	// ...
      <p className="sign-up-birthday-label">Birthdate</p>
      <p className="sign-up-modal-birthday-info">
        만 18세 이상의 성인만 회원으로 가입할 수 있어요. 생일은 다른 사용자에게
        공개되지 않아요.
      </p>
      <div className="sign-up-modal-birthday-selectors">
        <div className="sign-up-modal-birthday-month-selector">
          <Selector
            options={monthList}
            defaultValue="Month"
            disabledOptions={['Month']}
            value={birthMonth}
            onChange={onChangeBirthMonth}
          />
        </div>
        <div className="sign-up-modal-birthday-day-selector">
          <Selector
            options={dayList}
            defaultValue="Day"
            disabledOptions={['Day']}
            value={birthDay}
            onChange={onChangeBirthDay}
          />
        </div>
        <div className="sign-up-modal-birthday-year-selector">
          <Selector
            options={yearList}
            defaultValue="Year"
            disabledOptions={['Year']}
            value={birthYear}
            onChange={onChangeBirthYear}
          />
        </div>
      </div>
    </Container>
  );
};

export default SignUpModal;

```

lib/staticDate.ts

```typescript
// 1월부터 12월까지
export const monthList = Array.from(Array(12), (_, i) => String(i + 1));

// 1부터 31까지
export const dayList = Array.from(Array(31), (_, i) => String(i + 1));

// 2020년부터 1900년까지
export const yearList = Array.from(Array(121), (_, i) => String(2020 - i));

```

---

## 10.3 회원가입 버튼

components/common/Button.tsx

```tsx
import styled from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.button`
  width: 100%;
  height: 48px;
  border: 0;
  border-radius: 4px;
  background-color: ${palette.bittersweet};
  color: #fff;
  font-size: 16px;
  font-weight: 800;
  outline: none;
  cursor: pointer;
`;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<IProps> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default Button;

```

---

## 10.4 회원가입 API

 *    1. api method 가 POST 인지 확인
 *    2. req.body에 필요한 파라미터가 들어있는지 확인
 *    3. email duplication check
 *    4. password encode
 *    5. 유저 정보 추가
 *    6. 추가된 유저의 정보와 token 전달

types/user.d.ts

```typescript
//** users.json 에 저장된 유저 타입 */
export type StoredUserType = {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birthday: string;
  profileImage: string;
};
```

lib/data/user.ts

```typescript
import { readFileSync, writeFileSync } from 'fs';
import { StoredUserType } from '../../types/user';

/**
 * User fs 함수들
 */

/**
 * 유저 리스트 데이터 불러오기
 *
 * @return  {[StoredUserType[]]}  [return description]
 */
const getList = () => {
  const filePath = 'data/user.json';
  const usersBuffer = readFileSync(filePath);
  const userString = usersBuffer.toString();

  if (!userString) {
    return [];
  }

  const users: StoredUserType[] = JSON.parse(userString);
  return users;
};

/**
 * 특정 email을 가진 유저가 있는지 확인하기
 *
 * @param   {string}  email  [email description]
 *
 * @return  {[boolean]}         [return description]
 */
const exist = ({ email }: { email: string }): boolean => {
  const users = getList();
  return users.some(user => user.email === email);
};

/**
 * 유저 리스트 저장하기
 *
 * @param   {StoredUserType[]}  users  [users description]
 *
 */
const write = async (users: StoredUserType[]) => {
  writeFileSync('data/users.json', JSON.stringify(users));
};

export default {
  getList,
  exist,
  write,
};
```



pages/api/auth/signup.js

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';

/**
 * 회원을 추가한다.(회원가입)
 *    1. api method 가 POST 인지 확인
 *    2. req.body에 필요한 파라미터가 들어있는지 확인
 *    3. email duplication check
 *    4. password encode
 *    5. 유저 정보 추가
 *    6. 추가된 유저의 정보와 token 전달
 * @author  uhjee
 * @param   {NextApiRequest}   req  [req description]
 * @param   {NextApiResponse}  res  [res description]
 *
 * @return  {[NextApiResponse]}                [return description]
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // 파라미터 확인
    const { email, firstname, lastname, password, birthday } = req.body;
    if (!email || !firstname || !lastname || !password || !birthday) {
      res.statusCode = 400;
      return res.send('필수 데이터가 없습니다.');
    }

    // email 중복 확인
    const userExist = Data.user.exist({ email });
    if (userExist) {
      res.statusCode = 409;
      res.send('이미 가입된 이메일입니다.');
    }

    return res.end();
  }
  res.statusCode = 405;

  return res.end();
};

```

### 10.4.2 비밀번호 암호화 하기

### bcrypjs

- 암-복호화 라이브러리

```shell
yarn add bcryptjs
yarn add @types/bcryptjs -D
```



pages/api/auth/signup.ts - 

```typescript
// ...
    // 비밀번호 복호화
    const salt = bcrypt.genSaltSync(10); // hash 해킹 방지 값
    const hashedPassword = bcrypt.hashSync(password, salt);
// ...
```



### 10.4.3. JWT 토큰 생성하기

### JWT; json web token

전자서명된 URL로 이용할 수 있는 문자만 구성된 JSON

```shell
yarn add jsonwebtoken
yarn add @types/jsonwebtoken
```

.env.local

```json
JWT_SECRET=my_private_secret
```

pages/api/auth/signup.ts 

- cookie에 저장

```typescript
    // JWT - cookie 세팅
    const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET!);

    res.setHeader(
      'Set-Cookie',
      `access_token=${token}; path=/; expires=${new Date(
        Date.now() + 60 * 60 * 24 * 3 * 1000, // 3일
      )}; httponly`,
    );
```



### api 생성

lib/api/index.ts

```typescript
import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default axios;
```

lib/api/auth.ts

```typescript
import axios from '.';

// 회원가입 body
interface SignUpAPIBody {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: string;
}

// 회원가입 API
export const signupAPI = (body: SignUpAPIBody) =>
  axios.post('/api/auth/signup', body);

```

components/auth/SignUpModal.tsx

```tsx
  /**
   * 회원가입 API를 호출한다.
   * @param event
   */
  const onSubmitSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const signUpBody = {
        email,
        lastname,
        firstname,
        password,
        birthday: new Date(
          `${birthYear}-${birthMonth!.replace('월', '')}-${birthDay}`,
        ).toISOString(),
      };
      await signupAPI(signUpBody);
    } catch (e) {
      console.log(e);
    }
  };

// ...

    <Container onSubmit={onSubmitSignup}>

```

## 10.5 유저 정보 저장하기

/pages/api/auth/signup.ts

### Partial<Pick<StoredUserType, 'password'>>

- Partial: 특정 타입의 부분 집합을 만족하는 타입 정의
- Pick: 특정 타입에서 몇 개의 속성을 선택해 타입 정의

```typescript
    // password  삭제한 유저정보 return
    // ts의 유틸리티 password 속성을 Partial로 만든 타입 - 타입에러 없이 delete 사용 가능
    const newUserWithoutPassword: Partial<Pick<StoredUserType, 'password'>> =
      newUser;
    delete newUserWithoutPassword.password;

    res.statusCode = 200;
    return res.send(newUser);

// ...
```

types/user.d.ts

```typescript
//...
// ** signUpAPI의 결과 타입 */
export type UserType = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  birthday: string;
  profileImage: string;
};

```



lib/api/auth.ts

```typescript
import { UserType } from '../../types/user';

/**
 * react 컴포넌트에서 API 호출을 위해 호출하는 함수들
 */

// ...

// 회원가입 API
export const signupAPI = (body: SignUpAPIBody) =>
  axios.post<UserType>('/api/auth/signup', body);

```

### 10.5.1 유저 리덕스 모듈 생성

```sh
$ yarn add next-redux-wrapper @reduxjs/toolkit react-redux redux
$ yarn add @types/react-redux
```

store/user.ts

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../types/reduxState';
import { UserType } from '../types/user';

// * 초기 상태값
const initialState: UserState = {
  id: 0,
  email: '',
  lastname: '',
  firstname: '',
  birthday: '',
  isLogged: false,
  profileImage: '',
};

// createSlice 함수 호출 - Action 및 reducer 선언 후 생성해줌 Slice 반환
// Slice 인터페이스는 actions, reducer, getInitailState 등을 속성으로 갖는다.
const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // * 로그인한 유저 변경하기
    // payload를 갖는 Action 타입 - generic으로 payload 타입 지정
    setLoggedUser(state, action: PayloadAction<UserType>) {
      state = { ...action.payload, isLogged: true };
      return state;
    },
  },
});

export const userActions = { ...user.actions };

export default user;

```

store/index.ts

```typescript
import { HYDRATE, createWrapper, MakeStore } from 'next-redux-wrapper';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './user';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux';

const rootReducer = combineReducers({
  user: user.reducer,
});

// * Store의 타입
export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
  // Hydrate: 서버에서 생성된 리덕스 스토어를 클라이언트에서 사용할 수 있도록 전달
  if (action.type === HYDRATE) {
    if (state === initialRootState) {
      return {
        ...state,
        ...action.payload,
      };
    }
    return state;
  }
  return rootReducer(state, action);
};

// 타입 지원하는 useSelector로 커스텀 하기
export const userSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore: MakeStore<any> = () => {
  // configureStore 로 store 설정
  const store = configureStore({
    reducer,
    devTools: true,
  });

  initialRootState = store.getState();
  return store;
};

export const wrapper = createWrapper(initStore);

```

---

## 10.6  회원가입 밸리데이션

- validateMode: 유효하지 않은 값을 가진 컴포넌트에 대해 error UI 표현하는 flag
- isValid: 컴포넌트의 값이 유효한지 여부
- errorMessage: isValid인 경우 띄울 에러 메세지
- useValidation: boolean :: 컴포넌트 validation 사용할지 안할지

/components/common/Input.tsx

```tsx
type InputContainerProps = {
  iconExist: boolean;
  isValid: boolean;
  useValidation: boolean;
};

// generic으로 styled Component의 props에 타입 추가
const Container = styled.div<InputContainerProps>`
  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({ iconExist }) => (iconExist ? '0 44px 0 11px' : '0 11px')};
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    ::placeholder {
      color: ${palette.gray_76};
    }

    &:focus {
      border-color: ${palette.dark_cyan} !important;
    }
  }
  .input-icon-wrapper {
    position: absolute;
    top: 0;
    right: 11px;
    height: 46px;
    display: flex;
    align-items: center;
  }
  .input-error-message {
    margin-top: 8px;
    font-weight: 600;
    font-size: 14px;
    color: ${palette.tawny};
  }
  // 유효성 검사 -> 유효하지 않은 경우
  ${({ useValidation, isValid }) =>
    useValidation &&
    !isValid &&
    css`
      input {
        background-color: ${palette.snow};
        border-color: ${palette.Orange};
        & :focus {
          border-color: ${palette.Orange};
        }
      }
    `}

  // 유효성 검사 -> 유효한 경우
  ${({ useValidation, isValid }) =>
    useValidation &&
    isValid &&
    css`
      input {
        border-color: ${palette.dark_cyan};
      }
    `}
`;

// ...

// React.InputHTMLAttributes<HTMLInputElement> :: <input> 태그가 가지는 속성들에 대한 타입
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  isValid?: boolean;
  validateMode?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
}

const Input: React.FC<IProps> = ({
  icon,
  validateMode = false,
  isValid = false,
  useValidation = true,
  errorMessage,
  ...props
}) => {
  return (
    // styled Component에 props로 변수 전달
    <Container
      iconExist={!!icon}
      isValid={isValid}
      useValidation={validateMode && useValidation}
    >
      <input {...props} />
      <div className="input-icon-wrapper">{icon}</div>
      {useValidation && validateMode && !isValid && errorMessage && (
        <p className="input-error-message">{errorMessage}</p>
      )}
    </Container>
  );
};

export default Input;
```



components/auth/SignUpModal.tsx

- 회원가입 API 호출 함수에 파라미터 유효 코드 추가
- Input 컴포넌트를 호출하는 jsx 코드에 props 추가

```tsx
// ...
/**
   * 회원가입 API를 호출한다.
   * @param event
   */
const onSubmitSignup = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  // 파라미터 유효성 검사
  setValidation(true);

  if (!email || !lastname || !firstname || !password) {
    return undefined;
  }
  
  
  
// ...
      <div className="input-wrapper">
        <Input
          type="email"
          name="eamil" // name: email은 브라우저가 저장할 수 있도록 해줌
          placeholder="Enter E-mail Address"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
          validateMode={validateMode}
          useValidation
          isValid={!!email}
          errorMessage="이메일이 필요해요."
        />
 // ...
```

---

## 10.7 useValidateMode 훅스 만들기

- 훅스 생성 이유
  - validation check를 하는 컴포넌트마다 `validateMode`라는 state를 만들고 전달하기 번거롭다

### store에 validateMode state 생성

types/reduxState.d.ts

```typescript
// * 공통 redux state
export type CommonState = {
  validateMode: boolean; // 화면에 유효성 검사 결과를 띄울지 여부
};

```

store/common.ts

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonState } from '../types/reduxState';

// * 초기 상태
const initialState: CommonState = {
  validateMode: false,
};

// createSlice 함수 호출 - Action 및 reducer 선언 후 생성해줌 Slice 반환
// Slice 인터페이스는 actions, reducer, getInitailState 등을 속성으로 갖는다.
const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    // * validateMode 변경하기
    setValidateMode(state, action: PayloadAction<boolean>) {
      state.validateMode = action.payload;
    },
  },
});

export const commonActions = { ...common.actions };

export default common;

```

store/index.ts

```typescript
const rootReducer = combineReducers({
  common: common.reducer,
  user: user.reducer,
});
```

### useSelector 사용해 store 의 validateMode 가져오기

components/common/Input.tsx

- IProps 에서 validateMode 삭제
- useState로 관리하던 validateMode 삭제

```tsx
// React.InputHTMLAttributes<HTMLInputElement> :: <input> 태그가 가지는 속성들에 대한 타입
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
}

const Input: React.FC<IProps> = ({
  icon,
  isValid = false,
  useValidation = true,
  errorMessage,
  ...props
}) => {
  // 유효성 검사 활성화 여부(store에서 꺼내오기)
  const validateMode = useSelector(state => state.common.validateMode);

```

### dispatch - store state 변경

components/auth/SignUpModal.tsx

```tsx
  // Redux
  const dispatch = useDispatch();

  /**
   * 회원가입 API를 호출한다.
   * @param event
   */
  const onSubmitSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 파라미터 유효성 검사 (store.common.validateMode 변경)
    dispatch(commonActions.setValidateMode(true));
    
  //...
```

### 커스텀 훅 생성

hooks/useValidateMode.ts

```typescript
import { useDispatch } from 'react-redux';
import { useSelector } from '../store';
import { commonActions } from '../store/common';

/**
 * store.state.common 의 validateMode 의 값과 해당 setter 반환
 *
 * @return  {[array]}  [return description]
 */
export default () => {
  const dispatch = useDispatch();
  const validateMode = useSelector(state => state.common.validateMode);

  const setValidateMode = (value: boolean) =>
    dispatch(commonActions.setValidateMode(value));

  return { validateMode, setValidateMode };
};
```

---

## 10.8 회원가입 비밀번호 밸리데이션

components/auth/SignUpModal.tsx

```tsx
  // 비밀번호 input El에 focus 되었는지 여부
  const [passwordFocused, setPasswordFocused] = useState(false);

  const onFocusPassword = () => {
    setPasswordFocused(true);
  };

// ...

<Input
  placeholder="Enter Password"
  type={hidePassword ? 'password' : 'text'} // input 값이 *로 대체되어 보임
  icon={
    hidePassword ? (
      <OpenedEyeIcon onClick={toggleHidePassword} />
    ) : (
      <ClosedEyeIcon onClick={toggleHidePassword} />
    )
  }
  value={password}
  onChange={onChangePassword}
  onFocus={onFocusPassword}
  useValidation
  isValid={!!password}
  errorMessage="비밀전호를 입력하세요."
  />
```

### validation

1. 비밀번호에 lastname이나 email 앞부분이 포함되면 안된다.

   ```tsx
     // password가 name이나 email을 포함하는지 여부
     const isPasswordHasNameOrEmail = useMemo(
       () =>
         !password ||
         !lastname ||
         !email ||
         password.includes(lastname) ||
         password.includes(email.split('@')[0]),
       [password, lastname, email],
     );
   ```

   

2. 비밀번호 자릿수 최소 자릿수 이상이어야 한다.

   ```tsx
     // [password validation #2] password가 최소 자릿수 이상인지
     const isPasswordOverMinLength = useMemo(
       () => !!password && password.length >= PASSWORD_MIN_LENGTH,
       [password],
     );
   ```

   

3. 숫자나 기호를 포함해야 한다.

   ```tsx
     // [password validation #3] password가 숫자, 특수문자를 포함했는지
     const isPasswordHasNumberOrSymbol = useMemo(
       () =>
         !(
           (
             /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) || // 특수문자 포함 여부
             /[0-9]/g.test(password)
           ) // 숫자 포함 여부
         ),
       [password],
     );
   ```

위 세가지 validation 조건들의 list => rendering 돌릴 기준

```tsx
  const passwordValidArr = [
    {
      isValid: !isPasswordHasNameOrEmail,
      text: '비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없어요.',
    },
    {
      isValid: isPasswordOverMinLength,
      text: '비밀번호는 최소 8자 이상 입력해주셔야 해요.',
    },
    {
      isValid: isPasswordHasNumberOrSymbol,
      text: '비밀번호는 숫자나 기호가 포함되어야 해요.',
    },
  ];
```



components/auth/PasswordWarning.tsx

```tsx
import styled from 'styled-components';
import palette from '../../styles/palette';
import RedXIcon from '../../public/static/svg/auth/red_x_icon.svg';
import GreenCheckIcon from '../../public/static/svg/auth/green_check_icon.svg';

const Container = styled.p<{ isValid: boolean }>`
  color: ${({ isValid }) =>
    isValid ? palette.davidson_orange : palette.green};
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
  }
`;

interface IProps {
  isValid: boolean;
  text: string;
}

const PasswordWarning: React.FC<IProps> = ({ isValid, text }) => {
  return (
    <Container isValid={isValid}>
      {isValid ? <RedXIcon /> : <GreenCheckIcon />}
      {text}
    </Container>
  );
};

export default PasswordWarning;

```

components/auth/SignUpModal.tsx

```tsx
      <div className="input-wrapper sign-up-password-input-wrapper">
        {/* ======================== PASSWORD ========================= */}
        <Input
          placeholder="Enter Password"
          type={hidePassword ? 'password' : 'text'} // input 값이 *로 대체되어 보임
          icon={
            hidePassword ? (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            ) : (
              <ClosedEyeIcon onClick={toggleHidePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
          onFocus={onFocusPassword}
          useValidation
          isValid={
            !isPasswordHasNameOrEmail &&
            isPasswordOverMinLength &&
            isPasswordHasNumberOrSymbol
          }
          errorMessage="비밀전호를 입력하세요."
        />
      </div>
      {passwordFocused && (
        <div className="password-warning-wrapper">
          {passwordValidArr &&
            passwordValidArr.map((passwordValid, index) => (
              <PasswordWarning
                isValid={passwordValid.isValid}
                text={passwordValid.text}
                key={index}
              />
            ))}
        </div>
      )}
```

---

## 10.9 회원가입 Selector 밸리데이션 (생년월일)

/components/common/Input.tsx

- styled-component 제네릭 추가

```tsx
// ...
const Container = styled.div<{ isValid: boolean; validateMode: boolean }>`
  width: 100%;
  height: 46px;

  select {
    width: 100%;
    height: 100%;
    border: 1px solid ${palette.gray_eb};
    padding: 0 11px;
    border-radius: 4px;
    outline: none;
    /* select 요소의 화살표 제거 */
    -webkit-appearance: none;
    background-image: url('/static/svg/common/selector/selector_down_arrow.svg');
    background-position: right 11px center;
    background-repeat: no-repeat;
    font-size: 16px;

    background-color: #fff;
    &:focus {
      border-color: ${palette.Amaranth};
    }
  }
  ${({ isValid, validateMode }) =>
    validateMode &&
    css`
      select {
        border-color: ${isValid ? palette.dark_cyan : palette.tawny} !important;
        background-color: ${isValid ? '#fff' : palette.snow};
      }
    `}
`;
// ...

  return (
    <Container isValid={isValid} validateMode={validateMode}>
      <select {...props}>
```

- useSelector 사용해 common state 확인

```tsx
  // 유효성 검사 모드인지 확인 (state.common)
  const validateMode = useSelector(state => state.common.validateMode);

```



components/auth/SignUpModal.tsx

```tsx

  /**
   * 회원가입 폼 입력 값 확인하기
   */
  const validateSignUpForm = () => {
    // input 값 확인
    if (!email || !lastname || !firstname || !password) return false;

    // 비밀번호 확인
    if (
      isPasswordHasNameOrEmail ||
      !isPasswordOverMinLength ||
      !isPasswordHasNumberOrSymbol
    )
      return false;

    // 생년월일 셀렉터 값 확인
    if (!birthYear || !birthMonth || !birthDay) return false;
    return true;
  };

// ...


  /**
   * 회원가입 API를 호출한다.
   * @param event
   */
  const onSubmitSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 파라미터 유효성 검사 (store.common.validateMode 변경)
    setValidateMode(true);
    // console.log(validateSignUpForm());
    if (validateSignUpForm())
      try {
        const signUpBody = {
          email,
          lastname,
          firstname,
          password,
          birthday: new Date(
            `${birthYear}-${birthMonth!.replace('월', '')}-${birthDay}`,
          ).toISOString(),
        };

        const { data } = await signupAPI(signUpBody);
        // redux에 회원가입F된 유저정보 저장
        dispatch(userActions.setLoggedUser(data));
      } catch (e) {
        console.log(e);
      }
  };
```

---

## 10.10 유저 로그인 뷰 만들기

components/Header.tsx

```tsx
import Link from 'next/link';
import styled from 'styled-components';
import useModal from '../hooks/useModal';
import AirbnbLogoIcon from '../public/static/svg/logo/logo.svg';
import AirbnbLogoTextIcon from '../public/static/svg/logo/logo_text.svg';
import HamburgerIcon from '../public/static/svg/header/hamburger.svg';
import { useSelector } from '../store';
import palette from '../styles/palette';
import SignUpModal from './auth/SignUpModal';

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

  .header-user-profile {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 6px 0 16px;
    border: 0;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
    border-radius: 21px;
    background-color: #fff;
    cursor: pointer;
    outline: none;
    &:hober {
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    }

    .header-user-profile-image {
      margin-left: 8px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
`;

const Header: React.FC = () => {
  // custom hook : useModal 사용
  const { openModal, ModalPortal, closeModal } = useModal();

  // login된 user 정보 가져오기
  const user = useSelector(state => state.user);

  return (
    <Container>
      {/* Link 컴포넌트 사용해 기본 페이지로 이동 */}
      <Link href="/">
        <a className="header-logo-wrapper">
          <AirbnbLogoIcon className="header-logo" />
          <AirbnbLogoTextIcon />
        </a>
      </Link>
      {!user.isLogged && (
        <div className="header-auth-buttons">
          <button className="header-sign-up-button" onClick={openModal}>
            Sign Up
          </button>
          <button className="header-login-button">Sign In</button>
        </div>
      )}
      {user.isLogged && (
        <button className="header-user-profile">
          <HamburgerIcon />
          <img
            src={user.profileImage}
            alt=""
            className="header-user-profile-image"
          />
        </button>
      )}

      <ModalPortal>
        <SignUpModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default Header;
```

---

## 10.11 로그인 모달 만들기

- 리덕스에 모달의 종류를 담는 값 생성

  store/auth.ts

  ```typescript
  import { createSlice, PayloadAction } from '@reduxjs/toolkit';
  
  // 초기 상태
  const initialState: { authMode: 'signup' | 'login' } = {
    authMode: 'signup',
  };
  
  const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      // 인증 팝업 변경하기
      setAuthMode(state, action: PayloadAction<'signup' | 'login'>) {
        state.authMode = action.payload;
      },
    },
  });
  
  export const authActions = { ...auth.actions };
  
  export default auth;
  
  ```

  

components/auth/LoginModal.tsx

```tsx
import styled from 'styled-components';
import palette from '../../styles/palette';
import CloseXIcon from '../../public/static/svg/modal/close_x_icon.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed-eye.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened-eye.svg';
import Input from '../common/Input';
import Button from '../common/Button';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: #fff;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .login-input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .login-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .login-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }

  .login-modal-set-signup {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

interface IProps {
  closeModal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Email.. input change event handler
   * @param event
   */
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  /**
   * Password.. input change event handler
   * @param event
   */
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // 비밀번호 '*' 표현 여부
  const [isPasswordHided, setIsPasswordHided] = useState(true);
  const togglePasswordHiding = () => {
    setIsPasswordHided(!isPasswordHided);
  };

  const dispatch = useDispatch();

  /**
   * 회원가입 모달로 변경하기
   */
  const changeToSignUpModal = () => {
    dispatch(authActions.setAuthMode('signup'));
  };

  return (
    <Container>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
      <div className="login-input-wrapper">
        <Input
          placeholder="Email Address."
          name="email"
          type="email"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className="login-input-wrapper login-password-input-wrapper">
        <Input
          placeholder="Password"
          type={isPasswordHided ? 'password' : 'text'}
          icon={
            isPasswordHided ? (
              <ClosedEyeIcon onClick={togglePasswordHiding} />
            ) : (
              <OpenedEyeIcon onClick={togglePasswordHiding} />
            )
          }
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div className="login-modal-submit-button-wrapper">
        <Button>로그인</Button>
      </div>
      <p>
        이미 에어비앤비 계정이 있나요?
        <span
          className="login-modal-set-signup"
          role="presentaion"
          onClick={changeToSignUpModal}
        >
          Sign Up
        </span>
      </p>
    </Container>
  );
};

export default LoginModal;
```

---

## 10.12 login API 만들기

login API 흐름

1. api mehtod 확인 
2. req.body에 필요한 값  (email, password) 이 전부 들어있는지 확인
3. 패스워드 확인
4. 로그인된 유저의 정보와 token 전달

lib/data/user.ts

```typescript
/**
 * parameter로 받은 email을 가진 user 불러오기
 *
 * @param   {string}  email  [email description]
 * @return  {[type]}         [return description]
 */
const find = ({ email }: { email: string }) => {
  const users = getList();
  return users.find(user => user.email === email);
};
```



pages/api/auth/login.ts

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Data from '../../../lib/data';
import { StoredUserType } from '../../../types/user';

/**
 * 로그인을 처리한다.
 *    1. api method 가 POST 인지 확인
 *    2. req.body에 필요한 파라미터가 들어있는지 확인
 *    4. password 확인
 *    6. 로그인된 유저의 정보와 token 전달
 * @author  uhjee
 * @param   {NextApiRequest}   req  [req description]
 * @param   {NextApiResponse}  res  [res description]
 *
 * @return  {[NextApiResponse]}                [return description]
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      // parameter validation
      if (!email || !password) {
        res.statusCode = 400;
        return res.send('필수 데이터가 없습니다.');
      }

      // email을 가진 user 찾기
      const user = Data.user.find({ email });
      if (!user) {
        res.statusCode = 405;
        return res.send('해당 이메일을 가진 유저가 없습니다.');
      }

      // bcrypt 사용해 비밀번호가 일치하는지 확인 (복호화하지 않은 상태에서 확인)
      const isPasswordMatched = bcrypt.compareSync(password, user.password);
      if (!isPasswordMatched) {
        res.statusCode = 403;
        return res.send('비밀번호가 일치하지 않습니다.');
      }

      // * 비밀번호가 일치하는 경우, password 제거 후, token 전달
      const token = jwt.sign(String(user.id), process.env.JWT_SECRET!);
      res.setHeader(
        'Set-Cookie',
        `access_token=${token}; path=/; expires=${new Date(
          Date.now() + 60 * 60 * 24 * 1000 * 3, // 3일
        )}; httponly`,
      );

      const newUserWithoutPassword: Partial<Pick<StoredUserType, 'password'>> =
        user;

      delete newUserWithoutPassword.password;
      res.statusCode = 200;
      return res.send(user);
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      return res.send(e);
    }
  }
  res.statusCode = 405;

  return res.end();
};

```

lib/api/auth.ts

```typescript
// 로그인 API 요청
export const loginAPI = (body: { email: string; password: string }) =>
  axios.post<UserType>('/api/auth/login', body);

```



components/auth/LoginModal.tsx

```tsx
// ...

  // validation 모드 세팅
  const { setValidateMode } = useValidateMode();

  /**
   * login을 진행한다.
   * @param event
   */
  const onsubmitLogin = async (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidateMode(true);

    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
    } else {
      const loginBody = { email, password };

      try {
        const { data } = await loginAPI(loginBody);

        // redux에 로그인 유저 정보 세팅
        dispatch(userActions.setLoggedUser(data));
        closeModal();
      } catch (e) {
        console.log(e);
      }
    }
  };

  /**
   * 컴포넌트 초기화
   */
  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

//...

  return (
    <Container onSubmit={onsubmitLogin}>
      
// ...
```

---

## 10.14 로그인 유지하기

- 모든 페이지에서 유저가 페이지에 접속했을 때, access_token이 있다면, user 정보를 불러와 redux store에 저장 -> loing 상태
- 모든 페이지 -> app.tsx에서 getInitialProps 사용

pages/_app.tsx

```tsx
/**
 * 컴포넌트의 getInitailProps -> 서버에서 페이지 렌더링 전에 데이터를 가져옴
 * @param context
 * @returns
 */
/**
 * 컴포넌트의 getInitailProps -> 서버에서 페이지 렌더링 전에 데이터를 가져옴
 * @param context
 * @returns
 */
app.getInitialProps = async (context: AppContext) => {
  const appInitailProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  axios.defaults.headers.common.Cookie = cookieObject.access_token;
  return { ...appInitailProps };
};

// ...
```



lib/util.ts

```typescript
/**
 * 문자열로 된 cookie를 parsing 한다.
 *
 * @param   {string}  cookieString  [cookieString description]
 *
 * @return  {string}                [return description]
 */
export const cookieStringToObject = (cookieString: string | undefined) => {
  const cookies: { [key: string]: string } = {};
  if (cookieString) {
    //* 'token = value
    const itemString = cookieString?.split(/\s*;\s*/); // \s은 스페이스
    itemString.forEach(pairs => {
      //* [token, value]
      const pair = pairs.split(/\s*=\s*/);
      cookies[pair[0]] = pair.splice(1).join('=');
    });
  }
  return cookies;
};
```

---

## 10.15 유저 메뉴 만들기

### react-outside-click-handler 라이브러리

- OutsideClickHandler 컴포넌트를 사용해 **컴포넌트의 외부**를 클릭 시 원하는 이벤트를 넣을 수 있는 기능 제공

```sh
$ yarn add react-outside-click-handler
$ yarn add @types/react-outside-click-handler -D
```



components/Header.tsx

```tsx
  // 유저 팝업이 열리고 닫히는 여부 관리 상태
  const [isUsermenuOpened, setIsUsermenuOpened] = useState(false);

// ...

      {user.isLogged && (
        <OutsideClickHandler
          onOutsideClick={() => {
            if (isUsermenuOpened) {
              setIsUsermenuOpened(false);
            }
          }}
        >
          <button
            className="header-user-profile"
            type="button"
            onClick={() => setIsUsermenuOpened(!isUsermenuOpened)}
          >
            <HamburgerIcon />
            <img
              src={user.profileImage}
              alt=""
              className="header-user-profile-image"
            />
          </button>
          {/* 유저 메뉴 팝업 */}
          {isUsermenuOpened && <div>유저 메뉴</div>}
        </OutsideClickHandler>
  // ...
```



