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
import React, { useEffect, useMemo, useState } from 'react';
import Button from '../common/Button';
import { signupAPI } from '../../lib/api/auth';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user';
import { commonActions } from '../../store/common';
import useValidateMode from '../../hooks/useValidateMode';
import PasswordWarning from './PasswordWarning';
import { useSelector, RootState } from '../../store';
import { authActions } from '../../store/auth';

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
  .password-warning-wrapper {
    & > * {
      margin-bottom: 4px;
      &:last-child {
        margin-bottom: 0;
      }
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

  .sign-up-modal-submit-button-wrapper {
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }

  .sign-up-modal-set-login {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

// * CONSTANTS
const PASSWORD_MIN_LENGTH = 8; // 비밀번호 최소 자릿수
const disabledMonths = ['Month'];
const disabledDays = ['Day'];
const disabledYears = ['Year'];

interface IProps {
  closeModal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
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

  // customHooks - state.comomn.validateMode 변경
  const { setValidateMode } = useValidateMode();

  // 비밀번호 input El에 focus 되었는지 여부
  const [passwordFocused, setPasswordFocused] = useState(false);

  const onFocusPassword = () => {
    setPasswordFocused(true);
  };

  // [password validation #1] password가 name이나 email을 포함하는지 여부
  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !lastname ||
      !email ||
      password.includes(lastname) ||
      password.includes(email.split('@')[0]),
    [password, lastname, email],
  );

  // [password validation #2] password가 최소 자릿수 이상인지
  const isPasswordOverMinLength = useMemo(
    () => !!password && password.length >= PASSWORD_MIN_LENGTH,
    [password],
  );

  // [password validation #3] password가 숫자, 특수문자를 포함했는지
  const isPasswordHasNumberOrSymbol = useMemo(
    () =>
      /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) && // 특수문자 포함 여부
      /[0-9]/g.test(password), // 숫자 포함 여부
    [password],
  );

  const passwordValidArr = [
    {
      isValid: !isPasswordHasNameOrEmail,
      text: '비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없어요.',
    },
    {
      isValid: isPasswordOverMinLength,
      text: '비밀번호는 최소 8자 이상 입력해주셔야 해요.',
    },
    {
      isValid: isPasswordHasNumberOrSymbol,
      text: '비밀번호는 숫자나 기호가 포함되어야 해요.',
    },
  ];

  /**
   * 회원가입 폼 입력 값 확인하기
   */
  const validateSignUpForm = () => {
    // input 값 확인
    if (!email || !lastname || !firstname || !password) return false;

    // 비밀번호 확인
    if (
      isPasswordHasNameOrEmail ||
      !isPasswordOverMinLength ||
      !isPasswordHasNumberOrSymbol
    )
      return false;

    // 생년월일 셀렉터 값 확인
    if (!birthYear || !birthMonth || !birthDay) return false;
    return true;
  };

  /**
   * ! useEffect의 첫 번째 인자의 반환값 함수 -> CleanUp Function
   */
  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  /**
   * 회원가입 API를 호출한다.
   * @param event
   */
  const onSubmitSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 파라미터 유효성 검사 (store.common.validateMode 변경)
    setValidateMode(true);

    if (validateSignUpForm())
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
        closeModal();
      } catch (e) {
        console.log(e);
      }
  };

  /**
   * 로그인 모달로 변경하기
   */
  const changeToLoginModal = () => {
    dispatch(authActions.setAuthMode('login'));
  };
  return (
    <Container onSubmit={onSubmitSignup}>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
      <div className="input-wrapper">
        {/* ======================== E-MAIL ========================= */}
        <Input
          type="email"
          name="eamil" // name: email은 브라우저가 저장할 수 있도록 해줌
          placeholder="Enter E-mail Address"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
          useValidation
          isValid={!!email}
          errorMessage="이메일이 필요해요."
        />
      </div>
      <div className="input-wrapper">
        {/* ======================== LAST NAME ========================= */}
        <Input
          placeholder="Last Name (e.g. 살바도르)"
          icon={<PersonIcon />}
          value={lastname}
          onChange={onChangeLastname}
          useValidation
          isValid={!!lastname}
          errorMessage="이름을 필요해요."
        />
      </div>
      <div className="input-wrapper">
        {/* ======================== FIRST NAME~ ========================= */}
        <Input
          placeholder="First Name (e.g. 달리)"
          icon={<PersonIcon />}
          value={firstname}
          onChange={onChangeFirstname}
          useValidation
          isValid={!!firstname}
          errorMessage="성이 필요해요."
        />
      </div>
      <div className="input-wrapper sign-up-password-input-wrapper">
        {/* ======================== PASSWORD ========================= */}
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
          onFocus={onFocusPassword}
          useValidation
          isValid={
            !isPasswordHasNameOrEmail &&
            isPasswordOverMinLength &&
            isPasswordHasNumberOrSymbol
          }
          errorMessage="비밀전호를 입력하세요."
        />
      </div>
      {passwordFocused && (
        <div className="password-warning-wrapper">
          {passwordValidArr &&
            passwordValidArr.map((passwordValid, index) => (
              <PasswordWarning
                isValid={passwordValid.isValid}
                text={passwordValid.text}
                key={index}
              />
            ))}
        </div>
      )}
      <p className="sign-up-birthday-label">Birthdate</p>
      <p className="sign-up-modal-birthday-info">
        만 18세 이상의 성인만 회원으로 가입할 수 있어요. 생일은 다른 사용자에게
        공개되지 않아요.
      </p>
      {/* ======================== BIRTHDAY ========================= */}
      <div className="sign-up-modal-birthday-selectors">
        <div className="sign-up-modal-birthday-month-selector">
          <Selector
            options={monthList}
            defaultValue="Month"
            disabledOptions={['월']}
            value={birthMonth}
            onChange={onChangeBirthMonth}
            isValid={!!birthMonth}
          />
        </div>
        <div className="sign-up-modal-birthday-day-selector">
          <Selector
            options={dayList}
            defaultValue="Day"
            disabledOptions={disabledDays}
            value={birthDay}
            onChange={onChangeBirthDay}
            isValid={!!birthMonth}
          />
        </div>
        <div className="sign-up-modal-birthday-year-selector">
          <Selector
            options={yearList}
            defaultValue="Year"
            disabledOptions={disabledYears}
            value={birthYear}
            onChange={onChangeBirthYear}
            isValid={!!birthDay}
          />
        </div>
      </div>
      <div className="sign-up-modal-submit-button-wrapper">
        <Button type="submit">Sign up</Button>
      </div>
      <p>
        이미 에어비앤비 계정이 있나요?
        <span
          className="sign-up-modal-set-login"
          role="presentaion"
          onClick={changeToLoginModal}
        >
          Sign In
        </span>
      </p>
    </Container>
  );
};

export default SignUpModal;
