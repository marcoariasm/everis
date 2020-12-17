import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { size } from 'global/styles/Responsive'
import { allColors } from 'global/styles/index'

const Title = styled.div`
    margin: 40px 0 10px 0;
    > span {
        color: ${allColors.colorGreenBalance};
        font-family: Calibri;
        font-size: 18px;
        font-weight: bold;
    }
`

const TitleGreen = ({ text }) => {
    return (
        <Title>
            <span>{text}</span>
        </Title>
    )
}

export default TitleGreen