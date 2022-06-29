import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import useModal from '../hooks/useModal';
import { authActions } from '../store/auth';
import palette from '../styles/palette';
import AuthModal from './auth/AuthModal';

const Container = styled.div`
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

const HeaderAuths: React.FC = () => {
  // custom hook : useModal 사용
  const { openModal, ModalPortal, closeModal } = useModal();

  // store의 state를 변경 하기 위해
  const dispatch = useDispatch();

  return (
    <Container>
      <div className="header-auth-buttons">
        <button
          className="header-sign-up-button"
          onClick={() => {
            dispatch(authActions.setAuthMode('signup'));
            openModal();
          }}
        >
          Sign Up
        </button>
        <button
          className="header-login-button"
          onClick={() => {
            dispatch(authActions.setAuthMode('login'));
            openModal();
          }}
        >
          Sign In
        </button>
      </div>

      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default HeaderAuths;
