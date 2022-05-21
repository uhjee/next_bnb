import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;

  .modal-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }
  /* .modal-contents {
      width: 400px;
      height: 400px;
      background-color: #fff;
      z-index: 11;
    } */
`;

interface IProps {
  children: React.ReactNode;
  closePortal: () => void; // 모달 비활성화 함수
}

const ModalPortal: React.FC<IProps> = ({ children, closePortal }) => {
  const ref = useRef<Element | null>();
  const [mounted, setMounted] = useState(false);

  /**
   * 렌더링 시, #root-modal 엘레먼트 잡아와서 ref에 세팅
   */
  useEffect(() => {
    setMounted(true);
    if (document) {
      const dom = document.querySelector('#root-modal');
      // ref에 DOM element 세팅
      ref.current = dom;
    }
  }, []);

  if (ref.current && mounted) {
    return createPortal(
      // 인자 1: 포탈을 통해 전달할 react 컴포넌트
      <Container>
        <div className="modal-background"
          onClick={closePortal}
        />
        {children}
      </Container>,
      // 인자 2: 전달할 react 컴포넌트가 담길 DOM element
      ref.current,
    );
  }
  return null;
};

export default ModalPortal;
