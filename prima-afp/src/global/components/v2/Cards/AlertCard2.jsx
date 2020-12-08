import React from "react"
import styled from "styled-components"

import { allColors } from "global/styles"
import { size } from "global/styles/Responsive"
import Alerta from 'shared/images/alerta.svg'

const Content = styled.div`
  display: grid;
  grid-template-columns: 0.05fr 1fr;
  grid-column-gap: 2%;
  height: 64px;
  border-radius: 8px;
  padding: 9px 8px;
  background-color: #FFF2F5;
  margin: 0 0 14px 0;
  `
  
const Image = styled.div`
  margin: auto;
  & > img {
    width: 100%;
    max-width: 24px;
  }
`

const Text = styled.div`
  margin: auto 0;
  font-family: Calibri;
  font-style: normal;
  font-size: 16px;
  line-height: 18px;
  color: ${allColors.colorGrayText};
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 16px;
  }
`

const AlertCard2  = ({ hidden, text1, text2, text3, link, showLink}) => {
  return (
    <div hidden={hidden}>
      <Content>
        <Image>
          <img src={Alerta} alt={"Alerta"} />
        </Image>
        <Text>
          <span>
            {text1}
          </span><br/>
          <span>
            {text2}
          </span>
          <span><a href={link}><strong><u>{showLink?"enlace":""}</u></strong></a></span>&nbsp;
          <span>
            {text3}
          </span>
        </Text>
      </Content>
    </div>
  );
};

export default AlertCard2;
