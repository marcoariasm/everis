import { allColors } from "global/styles";
import styled from "styled-components";
import { size } from 'global/styles/Responsive';

export const Point = styled.div`
  border-radius: 50%;
  background-color: ${(props) => allColors[props.colorClassName]};
  width: 12px;
  height: 12px;
  margin-right: 7px;
`;

export const State = styled.div`
  display: flex;
  margin-right 1.5em;
  align-items: center;
`;

export const ContainerStates = styled.div`
  display: flex;
  @media only screen and (max-width: ${size.mobileL}) {
    display: none;
  }
`;