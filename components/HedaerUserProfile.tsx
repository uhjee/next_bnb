import Link from 'next/link';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import { logoutAPI } from '../lib/api/auth';
import { useSelector } from '../store';
import { userActions } from '../store/user';
import HamburgerIcon from '../public/static/svg/header/hamburger.svg';
import styled from 'styled-components';
import palette from '../styles/palette';

const Container = styled.div`
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

/**
 * 로그인 되었을 때 헤더에서 표현되는 컴포넌트
 * @returns
 */
const HeaderUserProfile: React.FC = () => {
  // login된 user 정보 가져오기
  const userProfileImage = useSelector(state => state.user.profileImage);

  // 유저 팝업이 열리고 닫히는 여부 관리 상태
  const [isUsermenuOpened, setIsUsermenuOpened] = useState(false);

  // store의 state를 변경 하기 위해
  const dispatch = useDispatch();

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
            src={userProfileImage}
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
    </Container>
  );
};

export default HeaderUserProfile;
