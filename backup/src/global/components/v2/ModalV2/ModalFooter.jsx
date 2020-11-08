import React from 'react'
import styled from 'styled-components'

const FooterContent = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    padding: 1rem;

    ${({border})=> {
        if(typeof(border) === 'string'){
            return `${border};`
        }else
        if(typeof(border) === 'boolean' && border === true){
            return `border-top: 1px solid #e9ecef;`
        }
    }}
`;

export const ModalFooter = ({children, border = false}) => {
    return (
        <FooterContent border={border}>
            {children}
        </FooterContent>
    )
}
