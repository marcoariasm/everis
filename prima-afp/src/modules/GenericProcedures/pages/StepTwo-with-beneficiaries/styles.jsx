import styled from 'styled-components';
import { size } from 'global/styles/Responsive';
import { allColors } from 'global/styles/index';

export const FormContainer = styled.div`
  display: flex;
  background-color: ${allColors.colorGrayCard};
  flex: 1;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  @media only screen and (max-width: ${size.tabletM}) and (orientation: portrait) {
    width: 100vw;
  }
  @media only screen and (max-width: ${size.tablet}) {
    flex: 10;
  }
  @media screen and (max-width: ${size.tabletM}) and (orientation: landscape) {
      display: block;
  }
  @media only screen 
  and (min-width: 1000px) 
  and (min-height: 1000px) 
  and (orientation: portrait) 
  and (-webkit-min-device-pixel-ratio: 1.5) {
    width: 100vw;
}
`;

export const LoginContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  @media screen and (max-width: ${size.tabletM}) and (orientation: landscape) {
      display: block;
      overflow: auto;
      min-height: min-content;
  }
  @media only screen and (max-width: ${size.tabletM})  {
    flex-direction: column;
  }
  @media screen and (max-width: ${size.laptop}) and (min-width: 1200px) {
    flex-direction: column;
  }

  @media only screen 
  and (min-width: 1000px) 
  and (min-height: 1000px) 
  and (orientation: portrait) 
  and (-webkit-min-device-pixel-ratio: 1.5) {
    flex-direction: column;
}
`;

export const MainLogo = styled.img`
  width: 88px;
  height: 32px;
  @media only screen and (max-width: ${size.mobileS}) {
    width: 80px;
    height: 28px;
  }
`;

export const SloganImg = styled.img`
  width: 101px;
  height: 11px;
  @media only screen and (max-width: ${size.tablet}) {
    display: none;
  }
`;

export const AnteTitle = styled.p`
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 16px;
    margin-top: 1em;
  }
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 16px;
    margin-top: 1em;
  }
  @media only screen and (max-width: ${size.mobileS}) {
    font-size: 14px;
    margin-top: 0.7em;
  }
`;

export const LoginTitle = styled.h1`
  margin-top: 15px;
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 23px;
    margin-top: 0px;
  }
  @media only screen and (max-width: ${size.mobileS}) {
    font-size: 20px;
  }
`;

export const TitleUnderline = styled.hr`
  height: 2px;
  background-color: ${props => props.color};
  border: 0px;
  width: 188px;
  @media only screen and (max-width: ${size.mobileL}) {
    height: 1px;
    width: 188px;
  }
`;

export const LoginCardDescription = styled.p`
  margin-top: 0.8em;
  margin-bottom: 1.3em;
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 14px;
    margin-top: 1em;
  }
  @media only screen and (max-width: ${size.mobileS}) {
    margin-bottom: 0.5em;
  }
`;

// export const CheckboxContainer = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: flex-start;
//   margin-top: 2.7em;
//   @media screen and (max-width: ${size.tabletM})  {
//     margin-top: 1.5em;
//   }
// `;

export const Text = styled.div`
  margin: 10px 0 0 0;
  > span {
    text-align: center;
    font-size: 14px;
    line-height: 21px;
    color: ${allColors.colorGrayText};
  }
`;

export const ContainerButton = styled.div`
  margin: 60px auto;
  justify-content: center;
  align-items: center;
`;

export const CheckboxContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2.7em 0;
  @media screen and (max-width: ${size.tabletM}) {
    margin: 1.5em 0;
  }
`;

export const BeneficiariesButton = styled.button`
  margin: 0 auto;
  border: 1.4px solid #00ae99;
  border-radius: 6px;
  display: table;
  padding: 1.6em 4em;
  opacity: ${(props) => (props.disabled ? "0.7" : "1")};
  outline: none;
`;

export const IconContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export const BeneficiariesContent = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  justify-content: center;
`;

export const BeneficiariesText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #00ae99;
`;

export const ContainerStepper = styled.div`
  margin-top: 40px;
  display: flex;
  min-width: 100%;
  justify-content: center;
  margin-bottom: 4em;
`;

export const OutlinedButton = styled.button`
  border: 1.4px solid #00ae99;
  border-radius: 6px;
  display: table;
  padding: 0.8em 2em;
  outline: none;
  min-width: 110px;
`;
