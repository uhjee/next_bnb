import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';


/**
 * 모달 사용을 위해
 *   1. 포탈을 통해 #root-modal 엘레먼트로 컴포넌트 전달
 *   2. 모달 open 함수, close 함수 반환
 */

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

const useModal = () => {
  // 모달 활성화 여부
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);

  interface IProps {
    children: React.ReactNode;
  }

  const ModalPortal: React.FC<IProps> = ({ children }) => {
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

    if (ref.current && mounted && modalOpened) {
      return createPortal(
        // 인자 1: 포탈을 통해 전달할 react 컴포넌트
        <Container>
          <div
            className="modal-background"
            role="presetaion"
            onClick={closeModal}
          />
          {children}
        </Container>,
        // 인자 2: 전달할 react 컴포넌트가 담길 DOM element
        ref.current,
      );
    }
    return null;
  };

  return {
    openModal,
    closeModal,
    ModalPortal,
  };
};


export default useModal;