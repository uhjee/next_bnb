import Link from 'next/link';
import styled from 'styled-components';
import useModal from '../hooks/useModal';
import AirbnbLogoIcon from '../public/static/svg/logo/logo.svg';
import AirbnbLogoTextIcon from '../public/static/svg/logo/logo_text.svg';
import HamburgerIcon from '../public/static/svg/header/hamburger.svg';
import { useSelector } from '../store';
import palette from '../styles/palette';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
import AuthModal from './auth/AuthModal';

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

  // store의 state를 변경 하기 위해
  const dispatch = useDispatch();

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
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default Header;
