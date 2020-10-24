import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'
import { allColors } from 'shared/styles/index'

import Button from 'global/components/Button/ButtonNormal/Button'

import CloseModalImg from 'shared/images/closeModal.svg'

const Modal = ({
  children,
  show,
  onClick,
  onClose,
  nameButton,
  hideButtonCancel,
  hiddenCloseModal,
  justifyContent,
  width,
  widthB,
  heightB,
  marginT,
  marginB,
  label,
  marginR,
  hidden,
  height,
  maxWidth,
  closeModal,
  heightTablet,
  heightmobile,
  widthMobile,
  hideFooter = false
}) => {
  const refModal = useRef()

  useEffect(() => {
    if (show) {
      refModal.current.style.visibility = 'visible'
    } else {
      refModal.current.style.visibility = 'hidden'
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
      refModal.current.style.visibility = 'hidden'
      onClose()
    }
  }
  return (
    <Wrapper show={show} ref={refModal}>
      <Content
        width={width}
        height={height}
        maxWidth={maxWidth}
        heightTablet={heightTablet}
        heightmobile={heightmobile}
        widthMobile={widthMobile}
      >
        <CloseModal>{hiddenCloseModal && <img src={CloseModalImg} onClick={onClose} alt="Cerrar Modal" />}</CloseModal>
        {children}
        <Footer
          justifyContent={justifyContent}
          marginT={marginT}
          marginB={marginB}
          onClick={onClick}
          marginR={marginR}
          closeModal={closeModal}
          hideFooter={hideFooter}
        >
          {!hidden && (
            <>
              {!hideButtonCancel && (
                <Button size="18" classButton="btn-cancelar" widthB={widthB} heightB={heightB}>
                  {label}
                </Button>
              )}
              {hideButtonCancel && (
                <Button
                  size="18"
                  widthB={widthB}
                  heightB={heightB}
                  classButton="btn-pagina-principal"
                  onClick={onClick}
                >
                  {nameButton}
                </Button>
              )}
            </>
          )}
        </Footer>
      </Content>
    </Wrapper>
  )
}

export default Modal

const Wrapper = styled.div`
  display: flex;
  position: absolute;
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
  @media screen and (max-width: ${size.tabletM}) {
      padding-top: 1.5em;
      align-items: flex-start;
      overflow: auto;
      min-height: min-content;
  }
  @media screen and (orientation: landscape) {
    overflow-y: scroll;
  }
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ widthMobile }) => widthMobile || '90%'};
  min-height: ${({ heightmobile }) => heightmobile + 'px' || 'auto'};
  height:auto;
  padding: 10px;
  border-radius: 15px;
  background-color: ${allColors.colorWhiteBase};
  

  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopL}) {
    min-width: ${({ width }) => width || '73%'};
    max-width: ${({ maxWidth }) => maxWidth || '73%'};
    min-height: ${({ heightTablet }) => `${heightTablet}px` || 'auto'};
  }
  @media only screen and (min-width: ${size.laptopL}) and (max-width: ${size.laptopM}) {
    min-width: ${({ width }) => width || '41%'};
    max-width: ${({ maxWidth }) => maxWidth || '41%'};
    padding: 20px;
    min-height: ${({ height }) => `${height}px` || 'auto'};
  }
  @media only screen and (min-width: ${size.laptopM}) {
    width: 45%;
    padding: 20px;
    min-height: 660px;
    min-height: ${({ height }) => `${height}px` || 'auto'};
  }
`
const CloseModal = styled.div`
  margin-left: auto;
  & img {
    width: 12px;
    height: 12px;
    cursor: pointer;
  }
  @media only screen and (min-width: ${size.tablet}) {
    & img {
      width: 15px;
      height: 15px;
    }
  }
`
const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ marginT, hideFooter }) => (marginT && hideFooter ) ? '0px' : '20px'};
  margin-bottom: ${({ marginB, hideFooter  }) => (marginB && hideFooter ) ? '0px' : '20px'};
  margin-right: ${({ marginR, hideFooter  }) => (marginR && hideFooter ) ? '0px' :'20px'};
  @media only screen and (min-width: ${size.tablet}) {
    justify-content: flex-end;
  }
`
