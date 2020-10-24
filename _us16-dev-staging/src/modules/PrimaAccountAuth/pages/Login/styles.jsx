import styled from 'styled-components'

import { allColors } from 'shared/styles'
import { size } from 'shared/styles/Responsive'

import LoginMainImg from 'shared/images/loginMainImage.png'
import LoginMainImgMobile from 'shared/images/rectangulofondo.svg'

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  align-items: center;
  height: 100vh;
  background-image: url(${LoginMainImg});
  background-repeat: no-repeat;
  background-size: 100% 40%;
  background-color: ${allColors.colorGrayCard};
  @media only screen and (min-width: ${size.tablet}) {
    background-size: cover;
  }
  @media only screen and (max-width: ${size.mobileL}) {
    background-size: 100%;
    background-image: url(${LoginMainImgMobile});
  }
`
export const LogoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: space-between;
  justify-content: flex-start;
  margin: 1em auto 0 auto;
  height: 20vh;
  width: 90vw;
  @media only screen and (min-width: ${size.tablet}) {
    height: 10vh;
  }
`
export const ContentForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  margin: 0 auto;
  @media only screen and (min-width: ${size.tablet}) {
    justify-self: flex-end;
    align-self: flex-start;
    margin: 0 14% 0 0;
    height: 75vh;
  }
`
export const ContentDataForm = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 8% 8% 8% 76%;
  padding: 45px 30px;
  border-radius: 14px;
  width: 90vw;
  height: 65vh;
  background: ${allColors.colorWhiteBase};
  @media only screen and (min-width: ${size.tablet}) {
    width: 50vw;
    min-height: 60vw;
    height:auto;
  }
  @media only screen and (min-width: ${size.laptop}) {
    width: 35vw;
    min-height: 50vw;
    height:auto;
  }
  @media only screen and (min-width: ${size.laptopL}) {
    width: 29vw;
    min-height: 33vw;
    height:auto;
  }
`
export const ContentTitle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`
export const ContentSubTitle = styled.div`
  text-align: left;
`
export const SPAN1 = styled.span`
  font-family: Calibri;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0px;
  text-align: left;
`

export const SPANTITLE =styled.span`
font-family: FS Emeric;
font-size: 26px;
font-style: normal;
font-weight: 700;
line-height: 31px;
letter-spacing: 0px;
text-align: left;

`

export const Line = styled.hr`
  height: 1px;
  width: 50%;
  border: 0;
  margin-bottom: 1em;
  background-color: #FFF;
`
export const AffiliateForm = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: space-between;
  justify-content: center;
  flex-direction: column;
`
export const RecoverAccountSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
export const RecoverAccounText = styled.p`
  color: ${allColors.colorGrayText};
  text-align: center;
`
export const UrlStyles = styled.a`
  color: ${allColors.colorOrangeMain};
  text-decoration: underline;
  font-family: Calibri;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: right;

`
export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: .8em;
  @media screen and (max-width: ${size.tabletM}) {
    margin-top: 1.5em;
  }
`
export const NewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  height: 15vh;
  width: 90vw;
  margin: 0 auto;
  @media only screen and (min-width: ${size.tablet}) {
    display: none;
  }
`
