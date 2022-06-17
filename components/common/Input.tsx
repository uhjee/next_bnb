import styled, { css } from 'styled-components';
import palette from '../../styles/palette';


// styled-component 함수의 타입
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
