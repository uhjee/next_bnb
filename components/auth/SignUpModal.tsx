import styled from 'styled-components';
import palette from '../../styles/palette';
import CloseXIcon from '../../public/static/svg/modal/close_x_icon.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed-eye.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened-eye.svg';
import PersonIcon from '../../public/static/svg/auth/person.svg';
import Input from '../common/Input';
import Selector from '../common/Selector';

import { monthList, dayList, yearList } from '../../lib/staticData';
import React, { useState } from 'react';
import Button from '../common/Button';
import { signupAPI } from '../../lib/api/auth';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user';

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
  .sign-up-birthday-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.gray_48};
  }

  .sign-up-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;

    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }

    .sign-up-modal-birthday-day-selector {
      margin-right: 16px;
      width: 25%;
    }

    .sign-up-modal-birthday-year-selector {
      width: 33.3333%;
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

  // 생년월일
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();

  const onChangeBirthYear = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setBirthYear(event.target.value);
  const onChangeBirthDay = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setBirthDay(event.target.value);
  const onChangeBirthMonth = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setBirthMonth(event.target.value);

  // Redux
  const dispatch = useDispatch();

  /**
   * 회원가입 API를 호출한다.
   * @param event
   */
  const onSubmitSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const signUpBody = {
        email,
        lastname,
        firstname,
        password,
        birthday: new Date(
          `${birthYear}-${birthMonth!.replace('월', '')}-${birthDay}`,
        ).toISOString(),
      };

      const { data } = await signupAPI(signUpBody);
      // redux에 회원가입F된 유저정보 저장
      dispatch(userActions.setLoggedUser(data));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container onSubmit={onSubmitSignup}>
      <CloseXIcon className="modal-close-x-icon" />
      <div className="input-wrapper">
        <Input
          type="email"
          name="eamil" // name: email은 브라우저가 저장할 수 있도록 해줌
          placeholder="Enter E-mail Address"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="Last Name (e.g. 살바도르)"
          icon={<PersonIcon />}
          value={lastname}
          onChange={onChangeLastname}
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="First Name (e.g. 달리)"
          icon={<PersonIcon />}
          value={firstname}
          onChange={onChangeFirstname}
        />
      </div>
      <div className="input-wrapper sign-up-password-input-wrapper">
        <Input
          placeholder="Enter Password"
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
      <p className="sign-up-birthday-label">Birthdate</p>
      <p className="sign-up-modal-birthday-info">
        만 18세 이상의 성인만 회원으로 가입할 수 있어요. 생일은 다른 사용자에게
        공개되지 않아요.
      </p>
      <div className="sign-up-modal-birthday-selectors">
        <div className="sign-up-modal-birthday-month-selector">
          <Selector
            options={monthList}
            defaultValue="Month"
            disabledOptions={['Month']}
            value={birthMonth}
            onChange={onChangeBirthMonth}
          />
        </div>
        <div className="sign-up-modal-birthday-day-selector">
          <Selector
            options={dayList}
            defaultValue="Day"
            disabledOptions={['Day']}
            value={birthDay}
            onChange={onChangeBirthDay}
          />
        </div>
        <div className="sign-up-modal-birthday-year-selector">
          <Selector
            options={yearList}
            defaultValue="Year"
            disabledOptions={['Year']}
            value={birthYear}
            onChange={onChangeBirthYear}
          />
        </div>
      </div>
      <div className="sign-up-modal-submit-button-wrapper">
        <Button type="submit">Sign up</Button>
      </div>
    </Container>
  );
};

export default SignUpModal;
