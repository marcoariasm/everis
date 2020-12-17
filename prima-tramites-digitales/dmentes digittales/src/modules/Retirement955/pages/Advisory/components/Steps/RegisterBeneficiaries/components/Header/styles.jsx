import styled from 'styled-components'

import { size } from 'global/styles/Responsive'
import { allColors } from 'global/styles'

export const Title = styled.h1`
  margin-top: 37px;
  margin-bottom: 30px;
  text-align: center;
  @media only screen and (min-width: ${size.tablet}) {
    margin-top: 26px;
    margin-bottom: 26px;
  }
`
export const PrimaryText = styled(Title)`
  font-size: 18px;
  line-height: 22px;
  text-align: left;
  margin-top: 0;
  margin-bottom: 27px;
  @media only screen and (min-width: ${size.tablet}) {
    margin-bottom: 22px;
  }
`
export const List = styled.div`
  list-style: none;
  font-size: 18px;
  line-height: 22px;
  margin-left: 20px;
  margin-bottom: 15px;
  & ul > li::before {
    content: '•';
    color: ${allColors.colorGreen};
    margin-right: 15px;
  }
  & ul > li {
    text-indent: -1.4em;
    margin-bottom: 15px;
    div {
      display: contents;
      text-decoration: underline;
    }
    span {
      font-size: 18px;
      line-height: 25px;
      @media only screen and (min-width: ${size.mobileS}) and (max-width: ${size.laptop}) {
        line-height: 22px !important;
      }
    }
  }
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopM}) {
    font-size: 16px;
    margin-bottom: 25px;
    & ul > li {
      margin-bottom: 5px;
    }
  }
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 18px;
    line-height: 25px;
    margin-bottom: 35px;
  }
`
