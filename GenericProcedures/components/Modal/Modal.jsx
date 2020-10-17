import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import Button from '../../../../global/components/Button/ButtonNormal/Button'

const Modal = ({
  children,
  show,
  onClose,
  onClick,
  nameButton,
  hideButtonCancel = false,
  justifyContent,
  width,
  padding,
  disabledOnClick,
  className = null,
  hideFooter = false,
}) => {
  const refModal = useRef()

  useEffect(() => {
    if (show) {
      refModal.current.style.display = 'block'
    } else {
      refModal.current.style.display = 'none'
      onClose()
    }
  }, [show, onClose])

  useEffect(() => {
    window.addEventListener('click', hiddenModalIf)
    return () => {
      window.removeEventListener('click', hiddenModalIf)
    }
  })

  const hiddenModalIf = (e) => {
    if (e.target === refModal.current) {
      refModal.current.style.display = 'none'
      onClose()
    }
  }

  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      onClick: onClick,
      onClose: onClose,
    })
  )

  return (
    <Wrapper show={show} ref={refModal} className={className}>
      <Content width={width} padding={padding} className="modal-container">
        {childrenWithProps}
        {!hideFooter && (
          <Footer justifyContent={justifyContent}>
            {!hideButtonCancel && (
              <Button customStyle={{ width: '170px' }} className="action" onClick={onClose}>
                Cancelar
              </Button>
            )}
            <Button onClick={onClick} disabled={disabledOnClick}>
              {nameButton}
            </Button>
          </Footer>
        )}
      </Content>
    </Wrapper>
  )
}

export default Modal

const Wrapper = styled.div`
  position: fixed;
  animation: modal 0.2s;
  display: none;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background: rgba(55, 48, 48, 0.9);
  z-index: 200;
  @keyframes modal {
    0% {
      transform: scale(0.1);
    }
    100% {
      transform: scale(1);
    }
  }
`

const Content = styled.div`
  width: ${({ width }) => width || '50%'};
  height: auto;
  margin: 15% auto;
  background-color: white;
  border-radius: 15px;
  padding: ${({ padding }) => (padding ? padding : '35px 20px')};
  @media screen and (max-width: 800px) {
    margin-top: 30px;
    padding: 10px;
    width: 80%;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || 'space-between'};
  width: 100%;
  margin-top: 20px;
  & > button:nth-child(1) {
    margin: ${({ justifyContent }) =>
      justifyContent === 'flex-end' || justifyContent === 'flex-start' ? '0 30px 0 0' : '0'};
  }
`
