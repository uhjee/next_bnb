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

