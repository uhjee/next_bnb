import styled from 'styled-components';
import { RootState, useSelector } from '../../store';
import LoginModal from './LoginModal';
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
      {authMode === 'login' && <LoginModal closeModal={closeModal} />}
    </Container>
  );
};

export default AuthModal;
