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
