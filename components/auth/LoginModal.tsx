import styled from 'styled-components';
import palette from '../../styles/palette';
import CloseXIcon from '../../public/static/svg/modal/close_x_icon.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed-eye.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened-eye.svg';
import Input from '../common/Input';
import Button from '../common/Button';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { loginAPI } from '../../lib/api/auth';
import useValidateMode from '../../hooks/useValidateMode';
import { userActions } from '../../store/user';

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

  return (
    <Container onSubmit={onsubmitLogin}>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
      <div className="login-input-wrapper">
        <Input
          placeholder="Email Address."
          name="email"
          type="email"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
          isValid={email !== ''}
          errorMessage="이메일이 필요해요."
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
          isValid={password !== ''}
          errorMessage="비밀번호를 입력해주세요."
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
