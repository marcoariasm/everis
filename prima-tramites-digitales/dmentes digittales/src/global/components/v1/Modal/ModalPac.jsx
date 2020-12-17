import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import MediaQuery from 'react-responsive'

import { size } from 'global/styles/Responsive'

import Button from 'global/components/v1/Button/ButtonNormal/Button'

const Modal = ({
  children,
  show,
  onClose,
  onButtonClick,
  nameButton,
  hideButtonCancel = false,
  justifyContent,
  width,
  padding,
  heightB,
  widthB,
  className = null,
  hideFooter = false,
}) => {
  const refModal = useRef()

  useEffect(() => {
    if (show) {
      refModal.current.style.visibility = 'visible';
    } else {
      refModal.current.style.visibility = 'hidden';
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
      refModal.current.style.visibility = 'hidden';
      onClose()
    }
  }

  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child)
  );

  return (
    <Wrapper show={show} ref={refModal} className={className}>
      <Content width={width} padding={padding} className="modal-container">
        {!hideFooter && (
          <>
            {childrenWithProps}
            <MediaQuery maxDeviceWidth={767}>
              <Footer justifyContent={justifyContent} className="modal-footer">
                <Button
                  size="18"
                  widthB={widthB}
                  heightB={heightB}
                  classButton="btn-pagina-principal"
                  onClick={onButtonClick}
                >
                  {nameButton}
                </Button>
                <div>
                  {!hideButtonCancel && (
                    <Button
                      size="18"
                      classButton="btn-cancelar"
                      widthB={widthB}
                      heightB={heightB}
                      onClick={onClose}
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </Footer>
            </MediaQuery>
            <MediaQuery minDeviceWidth={767}>
              <Footer justifyContent={justifyContent} className="modal-footer">
                <div>
                  {!hideButtonCancel && (
                    <Button
                      size="18"
                      classButton="btn-cancelar"
                      widthB={widthB}
                      heightB={heightB}
                      onClick={onClose}
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
                <Button
                  size="18"
                  widthB={widthB}
                  heightB={heightB}
                  classButton="btn-pagina-principal"
                  onClick={onButtonClick}
                >
                  {nameButton}
                </Button>
              </Footer>
            </MediaQuery>
          </>
        )}
      </Content>
    </Wrapper>
  );
}

export default Modal

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  animation: modal 0.2s;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgba(55, 48, 48, 0.9);
  @keyframes modal {
    0% {
      transform: scale(0.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: auto;
  padding: 10px;
  border-radius: 15px;
  background-color: white;
  margin: 40% auto;
  @media only screen and (min-width: ${size.tablet}) {
    width: 564px;
    margin: auto;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${({ marginT }) => marginT || '20px'};
  margin-bottom: ${({ marginB }) => marginB || '20px'};
  & > div {
    margin-top: 10px;
  }
  @media only screen and (min-width: ${size.tablet}) {
    flex-direction: row;
    justify-content: flex-end;
    margin-right: ${({ marginR }) => marginR || '20px'};
    & > div {
      margin-right: 10px;
      margin-top: 0px;
    }
  }
`;