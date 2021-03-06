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
const PASSWORD_MIN_LENGTH = 8; // ???????????? ?????? ?????????
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
   * ????????? ?????? ????????? ?????????
   * @param event
   */
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  /**
   * ????????? ?????? ????????? ?????????
   * @param event
   */
  const onChangeLastname = (event: React.ChangeEvent<HTMLInputElement>) =>
    setLastname(event.target.value);
  /**
   * ????????? ?????? ????????? ?????????
   * @param event
   */
  const onChangeFirstname = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFirstname(event.target.value);
  /**
   * ????????? ?????? ????????? ?????????
   * @param event
   */
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  // ???????????? ?????? ?????? ??????
  const [hidePassword, setHidePassword] = useState(true);
  const toggleHidePassword = () => setHidePassword(!hidePassword);

  // ????????????
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

  // customHooks - state.comomn.validateMode ??????
  const { setValidateMode } = useValidateMode();

  // ???????????? input El??? focus ???????????? ??????
  const [passwordFocused, setPasswordFocused] = useState(false);

  const onFocusPassword = () => {
    setPasswordFocused(true);
  };

  // [password validation #1] password??? name?????? email??? ??????????????? ??????
  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !lastname ||
      !email ||
      password.includes(lastname) ||
      password.includes(email.split('@')[0]),
    [password, lastname, email],
  );

  // [password validation #2] password??? ?????? ????????? ????????????
  const isPasswordOverMinLength = useMemo(
    () => !!password && password.length >= PASSWORD_MIN_LENGTH,
    [password],
  );

  // [password validation #3] password??? ??????, ??????????????? ???????????????
  const isPasswordHasNumberOrSymbol = useMemo(
    () =>
      /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) && // ???????????? ?????? ??????
      /[0-9]/g.test(password), // ?????? ?????? ??????
    [password],
  );

  const passwordValidArr = [
    {
      isValid: !isPasswordHasNameOrEmail,
      text: '??????????????? ?????? ???????????? ????????? ????????? ????????? ??? ?????????.',
    },
    {
      isValid: isPasswordOverMinLength,
      text: '??????????????? ?????? 8??? ?????? ?????????????????? ??????.',
    },
    {
      isValid: isPasswordHasNumberOrSymbol,
      text: '??????????????? ????????? ????????? ??????????????? ??????.',
    },
  ];

  /**
   * ???????????? ??? ?????? ??? ????????????
   */
  const validateSignUpForm = () => {
    // input ??? ??????
    if (!email || !lastname || !firstname || !password) return false;

    // ???????????? ??????
    if (
      isPasswordHasNameOrEmail ||
      !isPasswordOverMinLength ||
      !isPasswordHasNumberOrSymbol
    )
      return false;

    // ???????????? ????????? ??? ??????
    if (!birthYear || !birthMonth || !birthDay) return false;
    return true;
  };

  /**
   * ! useEffect??? ??? ?????? ????????? ????????? ?????? -> CleanUp Function
   */
  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  /**
   * ???????????? API??? ????????????.
   * @param event
   */
  const onSubmitSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // ???????????? ????????? ?????? (store.common.validateMode ??????)
    setValidateMode(true);

    if (validateSignUpForm())
      try {
        const signUpBody = {
          email,
          lastname,
          firstname,
          password,
          birthday: new Date(
            `${birthYear}-${birthMonth!.replace('???', '')}-${birthDay}`,
          ).toISOString(),
        };

        const { data } = await signupAPI(signUpBody);
        // redux??? ????????????F??? ???????????? ??????
        dispatch(userActions.setLoggedUser(data));
        closeModal();
      } catch (e) {
        console.log(e);
      }
  };

  /**
   * ????????? ????????? ????????????
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
          name="eamil" // name: email??? ??????????????? ????????? ??? ????????? ??????
          placeholder="Enter E-mail Address"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
          useValidation
          isValid={!!email}
          errorMessage="???????????? ????????????."
        />
      </div>
      <div className="input-wrapper">
        {/* ======================== LAST NAME ========================= */}
        <Input
          placeholder="Last Name (e.g. ????????????)"
          icon={<PersonIcon />}
          value={lastname}
          onChange={onChangeLastname}
          useValidation
          isValid={!!lastname}
          errorMessage="????????? ????????????."
        />
      </div>
      <div className="input-wrapper">
        {/* ======================== FIRST NAME~ ========================= */}
        <Input
          placeholder="First Name (e.g. ??????)"
          icon={<PersonIcon />}
          value={firstname}
          onChange={onChangeFirstname}
          useValidation
          isValid={!!firstname}
          errorMessage="?????? ????????????."
        />
      </div>
      <div className="input-wrapper sign-up-password-input-wrapper">
        {/* ======================== PASSWORD ========================= */}
        <Input
          placeholder="Enter Password"
          type={hidePassword ? 'password' : 'text'} // input ?????? *??? ???????????? ??????
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
          errorMessage="??????????????? ???????????????."
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
        ??? 18??? ????????? ????????? ???????????? ????????? ??? ?????????. ????????? ?????? ???????????????
        ???????????? ?????????.
      </p>
      {/* ======================== BIRTHDAY ========================= */}
      <div className="sign-up-modal-birthday-selectors">
        <div className="sign-up-modal-birthday-month-selector">
          <Selector
            options={monthList}
            defaultValue="Month"
            disabledOptions={['???']}
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
        ?????? ??????????????? ????????? ??????????
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
