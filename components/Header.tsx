import Link from 'next/link';
import styled from 'styled-components';
import useModal from '../hooks/useModal';
import AirbnbLogoIcon from '../public/static/svg/logo/logo.svg';
import AirbnbLogoTextIcon from '../public/static/svg/logo/logo_text.svg';
import { useSelector } from '../store';
import palette from '../styles/palette';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
import AuthModal from './auth/AuthModal';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { logoutAPI } from '../lib/api/auth';
import { userActions } from '../store/user';
import HeaderAuths from './HeaderAuths';
import HeaderUserProfile from './HedaerUserProfile';

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
  /* react-outside-click-handler div */
  .header-logo-wrapper + div {
    position: relative;
  }
`;

const Header: React.FC = () => {
  // login된 user 정보 가져오기
  const isLogged = useSelector(state => state.user.isLogged);

  return (
    <Container>
      {/* Link 컴포넌트 사용해 기본 페이지로 이동 */}
      <Link href="/">
        <a className="header-logo-wrapper">
          <AirbnbLogoIcon className="header-logo" />
          <AirbnbLogoTextIcon />
        </a>
      </Link>
      {!isLogged && <HeaderAuths />}
      {isLogged && <HeaderUserProfile />}
    </Container>
  );
};

export default Header;
