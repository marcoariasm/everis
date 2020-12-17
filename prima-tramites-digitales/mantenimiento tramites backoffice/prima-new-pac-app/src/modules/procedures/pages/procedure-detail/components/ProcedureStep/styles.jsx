import styled from "styled-components";
import { size } from "shared/styles/Responsive";
import allColors from "global/styles";

export const ContainerButton = styled.div`
  margin-top: 1em;
  > button {
    margin-left: auto;
    width: 136px;
    height: 32px;
    font-family: Calibri;
    font-size: 14px;
    font-weight: bold;
  }
`;

export const StepperContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 4em 0 1em;
`;

export const LabelStep = styled.div`
  font-family: "Calibri";
  display: flex;
  font-size: 14px;
  flex-direction: column;
  > span:first-child {
    margin-bottom: 0.5em;
    font-weight: bold;
  }
`;

export const ContainerSelects = styled.div`
  grid-row-gap: 1.5em;
  margin: 2em 0;
  display: grid;
  grid-template-rows: 1fr 1fr;
`;
