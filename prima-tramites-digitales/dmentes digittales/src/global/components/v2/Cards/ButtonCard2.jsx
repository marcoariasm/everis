import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { allColors } from "global/styles";
import { size } from "global/styles/Responsive";

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
  @media only screen and (max-width: ${size.tablet}) {
    padding: 20px 9px;
    font-size: 14px;
    line-heigth: 16px;
    display: grid;
    grid-template-areas: 
    "icon title"
    "icon text"
    "icon description";
    grid-template-columns: 0.25fr 1fr;
    grid-template-rows: auto auto auto;
  }
`

const Image = styled.div`
  grid-area: icon;
  & > img {
    width: 100%;
    max-width: 56px;
    height: 100%;
    max-height: 56px;
  }
`

const Title = styled.div`
  grid-area: title;
  align-self: center;
  font-family: Calibri;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 16px;
  color: ${allColors.colorGrayText};
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 16px;
  }
`

const Text = styled.div`
  grid-area: text;
  font-family: Calibri;
  font-style: normal;
  font-size: 14px;
  color: ${allColors.colorGrayText};
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 14px;
  }
`

const Description = styled.div`
  grid-area: description;
  margin-top: 8px;
  font-family: Calibri;
  font-style: normal;
  font-size: 14px;
  color: ${allColors.colorGrayComment};
`


const ButtonCard = ({ imgSrc, title, text, link, description, onClick}) => {
  return (
    <div onClick={onClick}>
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
    </div>
  );
};

export default ButtonCard;
