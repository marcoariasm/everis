import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { allColors } from "global/styles"
import { size } from "global/styles/Responsive"

const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  border-radius: 8px;
  padding: 30px 18px 30px 18px;
  height: 100%;
  border: 2px #e8e8e8 solid;
  box-shadow: 0 4px 8px 1px rgba(53, 53, 53, 0.12);
  :hover{
    border: 2px ${allColors.colorOrangeMain} solid;
    box-shadow: 0 4px 8px 1px rgba(53, 53, 53, 0.12);
  }
`

const Image = styled.div`
  & > img {
    width: 100%;
    max-width: 56px;
    height: 100%;
    max-height: 56px;
  }
`

const Title = styled.div`
  font-family: Calibri;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
  color: ${allColors.colorGrayText};
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 16px;
  }
`

const Text = styled.div`
  font-family: Calibri;
  font-style: normal;
  font-size: 14px;
  color: ${allColors.colorGrayText};
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 14px;
  }
`

const Description = styled.div`
  font-family: Calibri;
  font-style: normal;
  font-size: 14px;
  color: ${allColors.colorGrayComment};
`


const ButtonCard = ({imgSrc, title, text, link, description}) => {
  return (
      <Link to={link}>
        <Content>
          <Image>
            <img src={imgSrc} alt={title} />
          </Image>
          <Title>{title}</Title>
          <Text>{text}</Text>
          <Description>{description}</Description>
        </Content>
      </Link>
  );
};

export default ButtonCard;
