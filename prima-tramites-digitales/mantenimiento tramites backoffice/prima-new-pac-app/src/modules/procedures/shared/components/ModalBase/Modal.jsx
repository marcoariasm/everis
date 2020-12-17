import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import CloseIcon from 'shared/images/iconos/X-gray.svg';

const Modal = ({
  children,
  show,
  onClose,
  width,
  padding,
  className = null,
}) => {
  const refModal = useRef()

  useEffect(() => {
    if (show) {
      refModal.current.style.display = 'flex';
    } else {
      refModal.current.style.display = 'none';
      onClose()
    }
  }, [show, onClose])

  useEffect(() => {
    window.addEventListener("click", hiddenModalIf)
    return () => {
      window.removeEventListener("click", hiddenModalIf)
    }
  })

  const hiddenModalIf = e => {
    if (e.target === refModal.current) {
      refModal.current.style.display = 'none';
      onClose();
    }
  }

  const childrenWithProps = React.Children.map(children,
    (child) => React.cloneElement(child, {
      onClose: onClose
    })
  );

  return (
    <Wrapper show={show} ref={refModal} className={className}>
      <Content width={width} padding={padding} className="modal-container">
{/*        <Column
          width="100"
        >
          <img src={CloseIcon} onClick={onClose} alt="X"/>
        </Column>*/}
        {childrenWithProps}
      </Content>
    </Wrapper>
  )
}

export default Modal

const Wrapper = styled.div`
  position: fixed;
  animation: modal .2s;
  display: none;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background: rgba(55,48,48,.9);
  z-index: 200;
  @keyframes modal {
    0% { transform: scale(0.1) }
    100% { transform: scale(1) }
  }
`

const Content = styled.div`
  width: ${({ width }) => width || '50%' };
  height: auto;
  margin: 15% auto;
  background-color: white;
  border-radius: 10px;
  padding: 35px;
  @media screen and (max-width : 800px){
    margin-top: 30px;
    padding: 10px;
    width: 80%;
  }
`

const Column = styled.div`
  width: ${({ width }) => `${width}%`};
  margin-right: ${({ mRight }) => `${mRight || 0}px`};
  text-align: end;
  & img {
    cursor: pointer;
  }
`
