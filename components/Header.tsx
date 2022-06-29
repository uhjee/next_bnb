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
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { logoutAPI } from '../lib/api/auth';
import { userActions } from '../store/user';

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

  /* react-outside-click-handler div */
  .header-logo-wrapper + div {
    position: relative;
  }

  .header-usermenu {
    position: absolute;
    right: 0;
    top: 52px;
    width: 240px;
    padding: 8px 0;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    background-color: #fff;

    li {
      display: flex;
      align-items: center;
      width: 100%;
      height: 42px;
      padding: 0 16px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }

    .header-usermenu-divider {
      width: 100%;
      height: 1px;
      margin: 8px 0;
      background-color: ${palette.gray_dd};
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

  // 유저 팝업이 열리고 닫히는 여부 관리 상태
  const [isUsermenuOpened, setIsUsermenuOpened] = useState(false);

  /**
   * 로그아웃 처리한다.
   */
  const logout = async () => {
    try {
      // 01. api를 통해 cookies의 access_token 초기화
      await logoutAPI();
      // 02. redux의 user 초기화
      dispatch(userActions.initUser());
    } catch (e) {
      console.log(e);
    }
  };

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
        <OutsideClickHandler
          onOutsideClick={() => {
            // 컴포넌트 외부 클릭시 유저 메뉴 닫히도록
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
          {isUsermenuOpened && (
            <ul className="header-usermenu">
              <li>숙소 관리</li>
              <Link href="/room/register/building">
                <a
                  role="presentation"
                  onClick={() => {
                    setIsUsermenuOpened(false);
                  }}
                >
                  <li>숙소 등록하기</li>
                </a>
              </Link>
              <div className="header-usermenu-divider" />
              <li role="presentation" onClick={logout}>
                로그아웃
              </li>
            </ul>
          )}
        </OutsideClickHandler>
      )}

      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default Header;
