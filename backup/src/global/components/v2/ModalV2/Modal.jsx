import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'

import config, { media } from '../../../constants/styled.config';

const createMediaQueries = (tipo) => config.resolutions.map(size => {
    let mquery = '';
    if(tipo === 'large'){
        mquery= media[size]`
            max-width: ${config.ModalMaxWidth.large[size]}rem;
            margin: 1.75rem auto;
        `;
    }else{
        mquery = media[size]`
            max-width: ${config.ModalMaxWidth.normal[size]}rem;
            margin: 1.75rem auto;
        `;
    }
    return mquery;
});
const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    display: none;
    overflow: hidden;
    outline: 0;
    z-index: 1072;
    overflow-x: hidden;
    background: rgba(0,0,0,0.5);

    ${props => props.scroll && `
        overflow-x: hidden;
        overflow-y: auto;
        padding: 2rem 0rem;
    `}

    ${props => props.show && `
        display: block;
        opacity: 1;
    `}

`;
const ModalSubContainer = styled.div`
    position: relative;
    width: auto;
    margin: .5rem;
    pointer-events: none;
    ${props => props.large ?  createMediaQueries('large') : createMediaQueries('')}

    ${props => props.centered && `
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        min-height: calc(100% - (.5rem * 2));    
        margin:0 auto !important;

        @media (min-width: 576px){
            min-height: calc(100% - (1rem * 2));
        }
    `};
`;
const ModalContent = styled.div`
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.2);
    ${({borderRadius})=> borderRadius ? `border-radius: ${borderRadius};` : `border-radius: .3rem;`}
    ${({padding})=> padding && `padding: ${padding};`}
    outline: 0;
`;


export const ModalV2 = ({
    children,
    onClose = null,
    show, 
    centered=false,
    scroll=false,
    large=false,
    clickOutside = false,
    borderRadius=false,
    className = null,
    padding=false
}) => {
    const refModal = useRef()
    useEffect(() => {
      if (show) {
        refModal.current.style.display = 'block'
      } else {
        refModal.current.style.display = 'none'
        if(onClose){
            onClose();
        }
      }
    }, [show])

    useEffect(() => {
        window.addEventListener("click", hiddenModalIf)
        return () => {
          window.removeEventListener("click", hiddenModalIf)
        }
    })
    const hiddenModalIf = e => {
        if (e.target === refModal.current && clickOutside === true) {
          refModal.current.style.display = 'none'
          if(onClose){
             onClose();
          }
        }
    }

    const ModalRender =         
        (<ModalContainer  show={show} ref={refModal} className={className} scroll={scroll}>
            <ModalSubContainer large={large} centered={centered}>
                <ModalContent borderRadius={borderRadius} padding={padding}>
                    {children}
                </ModalContent>
            </ModalSubContainer>
        </ModalContainer>);

    return ReactDOM.createPortal(ModalRender,document.getElementById("modal"))
}


