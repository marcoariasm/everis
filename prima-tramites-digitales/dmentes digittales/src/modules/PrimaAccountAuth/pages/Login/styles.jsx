import styled from 'styled-components'

import { allColors } from 'global/styles'
import { size } from 'global/styles/Responsive'

export const FormContainer = styled.div`
  @media only screen and (min-width: ${size.tabletM}) {
    display: flex;
    justify-content: flex-end;
  }
`;

export const ContentForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  margin: 0 auto;
  @media only screen and (min-width: ${size.tabletM}) {
    width: 29vw;
    min-height: 33vw;
    height: auto;
  }
  .group .dropdown-input {
    font-family: Calibri;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0px;
    text-align: left;
  }
  
  .md-select .option-list li {
      font-family: Calibri;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: 0px;
      text-align: left;
  }
  
  .componenet-text-input .textfield {
      font-family: Calibri;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 21px;
  }
  @media only screen 
  and (min-width: 1024px) 
  and (max-height: 1366px) 
  and (orientation: landscape) 
  and (-webkit-min-device-pixel-ratio: 1.5) {
    justify-self: flex-end;
    align-self: flex-start;
    margin: 5% 10% 0 0;
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
  margin: 0 auto;
  @media only screen and (min-width: ${size.tablet}) {
    width: 72vw;
    min-height: 60vw;
    height:auto;
  }
  @media only screen and (min-width: ${size.laptop}) and (max-width: ${size.laptopL}) {
    margin-left: 65%;
    width: 40vw;
    min-height: 40vw;
    height:auto;
  }
  @media only screen and (min-width: ${size.laptopL}) {
    width: 29vw;
    min-height: 33vw;
    height:auto;
    margin-left: 75%;
  }
  @media only screen 
  and (min-width: 1024px) 
  and (max-height: 1366px) 
  and (orientation: portrait) 
  and (-webkit-min-device-pixel-ratio: 1.5) {
    width: 70vw;
    min-height: 52vw;
    height: auto;
    margin: 50% 10% 0 -60%;
  }
  @media only screen 
  and (min-width: 1024px) 
  and (max-height: 1366px) 
  and (orientation: landscape) 
  and (-webkit-min-device-pixel-ratio: 1.5) {
    width: 33vw;
    min-height: 33vw;
    height:auto;
    margin: auto 0;
  }
`
export const ContentTitle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  font-family: FS Emeric;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 31px;
  letter-spacing: 0px;
  text-align: left;
  color: var(--orangeColorMain);
`
export const ContentSubTitle = styled.p`
  text-align: left;
  font-family: Calibri;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0px;
  text-align: left;
  color: var(--grayColorText);
`

export const Line = styled.hr`
  height: 1px;
  width: 50%;
  border: 0;
  margin-bottom: 1em;
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