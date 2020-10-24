import { allColors } from '../../../../shared/styles/index';
import styled from 'styled-components';
import { size } from '../../../../shared/styles/Responsive';
import Wallpaper from '../../../../shared/images/wallpaper.png';


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${Wallpaper});
  background-size:     cover;
  background-repeat:   no-repeat;
  background-position: left center;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  @media screen and (max-width: ${size.tabletM}) {
    background-image: none;
    background-color: #f7f7f8;
  }
`;

export const InputGrid = styled.div`
width: 100%;
  display: grid;
  grid-row-gap: 2em;
  place-items: center;
  @media screen and (max-width: ${size.laptopL})  {
    width: 250px;
  }
  @media screen and (max-width: ${size.tabletM})  {
    width: 100%;
    margin: 1.2em 0em;
  }
`;

export const ModalHighlitedDescription = styled.p`
  color: #00ae99;
  font-size: 16px;
  font-family: 'Calibri';
  font-weight: bold;
`;

export const ModalDescription = styled.p`
  color: #696158;
  font-size: 16px;
  font-family: 'Calibri';
  display: flex;
  text-align: center;
`;

export const ModalNotification = styled.div`
  border-radius: 6px;
  border: 1px solid #00ae99;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 20px 5em;
  margin-top: 2em;
  @media screen and (max-width: ${size.tabletS})  {
    padding: 20px 0.8em;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const ModalIcon = styled.img`
  width: 48px;
  height: 48px;
`;

export const ModalMessage = styled.p`
  color: #00ae99;
  font-size: 20px;
  font-family: 'Calibri';
  font-weight: bold;
  margin-top: 0.7em;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2em;
  width: 15em;
  @media screen and (max-width: ${size.mobileL})  {
    width: 9em;
  }
`;