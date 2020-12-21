import { allColors } from 'global/styles/index';
import styled from 'styled-components';
import { size } from 'global/styles/Responsive';

export const LoginContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  height: 100vh;
  width: 100vw;
  padding: 0 5em;
  margin-top: -0.5em;
 @media screen and (max-width: ${size.tabletM}) {
     padding: 2em 3em;
      justify-content: center;
      align-items: flex-start;
      display: block;
      overflow: auto;
      min-height: min-content;
  }
  @media screen and (max-width: ${size.tabletS})  {
    padding: 2em 1em;
  }
`;

export const CheckboxLabel = styled.p`
  font-size: 12px;
  font-weight: 400;
  span {
    color: ${allColors.colorOrangeMain};
  }
`;

export const DetailsNav = styled.div`
  width: 100vw;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 25px 50px;
  @media screen and (max-width: ${size.tabletM})  {
    display: none;
  }
`;

export const LoginCardDescription = styled.p`
  margin-top: 0.8em;
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 14px;
    margin-top: 1em;
  }
  @media only screen and (max-width: ${size.mobileS}) {
    margin-bottom: 0.5em;
  }
`;

export const NavLogo = styled.img`
  width: 110px;
  height: 45px;
`;

export const NavSlogan = styled.img`
  width: 150px;
  height: 45px;
`;

export const TwoColumnsForm = styled.div`
  display: grid;
  grid-template-columns: 48% 48%;
  grid-column-gap: 4%;
  padding-top: 1.4em;
  padding-bottom: 0.8em;
  margin-bottom: 1.6em;
  grid-row-gap: 2.5em;
  @media screen and (max-width: ${size.tabletM})  {
    grid-template-columns: 100%;
    grid-row-gap: 1em;
    padding-bottom: 1.9em;
  }
`;