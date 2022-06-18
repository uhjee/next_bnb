import styled from 'styled-components';
import palette from '../../styles/palette';
import RedXIcon from '../../public/static/svg/auth/red_x_icon.svg';
import GreenCheckIcon from '../../public/static/svg/auth/green_check_icon.svg';

/**
 * 비밀번호 validation 검사 결과 표현 컴포넌트
 */

const Container = styled.p<{ isValid: boolean }>`
  color: ${({ isValid }) =>
    !isValid ? palette.davidson_orange : palette.green};
  display: flex;
  align-items: center;
  font-size: 14px;
  svg {
    margin-right: 8px;
  }
`;

interface IProps {
  isValid: boolean;
  text: string;
}

const PasswordWarning: React.FC<IProps> = ({ isValid, text }) => {
  return (
    <Container isValid={isValid}>
      {!isValid ? <RedXIcon /> : <GreenCheckIcon />}
      {text}
    </Container>
  );
};

export default PasswordWarning;
