import styled from 'styled-components';
import { RootState, useSelector } from '../../store';
import SignUpModal from './SignUpModal';

const Container = styled.div`
  z-index: 11;
`;

interface IProps {
  closeModal: () => void;
}

const AuthModal: React.FC<IProps> = ({ closeModal }) => {
  // 모달의 종류 state
  const authMode = useSelector((state: RootState) => state.auth.authMode);

  return (
    <Container>
      {authMode === 'signup' && <SignUpModal closeModal={closeModal} />}
      {authMode === 'login' && <div>로그인</div>}
    </Container>
  );
};

export default AuthModal;
