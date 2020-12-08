import styled from 'styled-components';
import { allColors } from '../../../styles/index';
import { size } from '../../../styles/Responsive';

export const TwoColumnsContainer = styled.div`
  display: grid;
  grid-template-columns: 48% 48%;
  grid-column-gap: 4%;
  padding-top: 1.4em;
  padding-bottom: 0.8em;
  margin-bottom: 1.6em;
  grid-row-gap: 2.5em;
  @media screen and (max-width: ${size.tablet})  {
    grid-template-columns: 100%;
    grid-row-gap: 1em;
    padding-bottom: 1.9em;
  }
`;

export const TwoColumnsFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 0.8em;
  @media screen and (max-width: ${size.tablet})  {
    flex-direction: column;
    padding-bottom: 1.9em;
  }
`;

export const TwoColumnsContainerBorder = styled.div`
  display: grid;
  grid-template-columns: 48% 48%;
  grid-column-gap: 4%;
  grid-row-gap: 2.5em;
  padding-top: 2.5em;
  padding-right: 1em;
  padding-left: 1.5em;
  padding-bottom: 3.3em;
  margin-bottom: 3.5em;
  border-bottom: 1px solid ${allColors.colorGrayBorder};
  @media screen and (max-width: ${size.tablet})  {
    grid-template-columns: 100%;
    grid-row-gap: 1em;
    padding-bottom: 1em;
  }
`;

export const ThreeColumnsContainer = styled.div`
  display: grid;
  grid-template-columns: 30.6% 30.6% 30.6%;
  grid-column-gap: 4%;
  grid-row-gap: 2.5em;
  padding-top: 2.5em;
  padding-right: 1em;
  padding-left: 1.5em;
  padding-bottom: 3.3em;
  margin-bottom: 3.5em;
  border-bottom: 1px solid ${allColors.colorGrayBorder};
  @media screen and (max-width: ${size.tablet})  {
    grid-template-columns: 100%;
    grid-row-gap: 1em;
    padding-bottom: 1em;
  }
`;