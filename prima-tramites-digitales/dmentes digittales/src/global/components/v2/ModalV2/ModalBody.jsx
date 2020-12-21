import React from 'react'
import PropTypes from 'prop-types';

import styled from 'styled-components'

const BodyContent = styled.div`
    position: relative;
    text-align: center;
    color: #696158;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    ${({padding})=> (padding) ? `padding:${padding};` : `padding: 1rem;`};
`;

export const ModalBody = ({children,padding = false, style}) => {
    return (
        <BodyContent padding={padding} style={style}>
            {children}
        </BodyContent>
    )
}

ModalBody.propTypes = {
    children: PropTypes.node,
    padding:PropTypes.string
};