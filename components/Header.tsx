import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import useModal from '../hooks/useModal';
import AirbnbLogoIcon from '../public/static/svg/logo/logo.svg';
import AirbnbLogoTextIcon from '../public/static/svg/logo/logo_text.svg';
import palette from '../styles/palette';
import SignUpModal from './auth/SignUpModal';
import ModalPortal from './ModalPortal';

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
  // custom hook : useModal 사용
  const { openModal, ModalPortal } = useModal();
  
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
