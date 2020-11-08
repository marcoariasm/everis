import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HeaderContent = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 1rem;
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem;

    ${({border})=> {
        if(typeof(border) === 'string'){
            return `${border};`
        }else
        if(typeof(border) === 'boolean' && border === true){
            return `border-bottom: 1px solid #e9ecef;`
        }
    }}
`;

const CloseButton = styled.button`
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .5;
    &:not(:disabled):not(.disabled) {
        cursor: pointer;
    }
    position:absolute;
    right:1rem;
`
export const ModalHeader = ({children,border=false, title, close}) => {
    return (
        <HeaderContent border={border}>
            {
                title ? (
                    <div style={{display:'flex',width:'100%'}}>
                        <span style={{width:'85%',lineHeight:'1.5'}}>{title}</span>
                        <CloseButton type="button" onClick={close}>
                            <span aria-hidden="true">×</span>
                        </CloseButton>
                    </div>
                ):
                (
                   children
                )
            }
        </HeaderContent>
    )
}
ModalHeader.propTypes = {
    children: PropTypes.node
};
