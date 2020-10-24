import styled from "styled-components";
import { size } from '../../../../shared/styles/Responsive';

export const Point = styled.div`
  border-radius: 50%;
  background-color: ${(props) => (props.Inprocess ? "#00ae12" : "#fa2424")};
  width: 12px;
  height: 12px;
  margin-right: 10px;
`;

export const State = styled.div`
  display: flex;
  margin-right 1em;
  align-items: center;
`;

export const ContainerStates = styled.div`
  display: flex;
  padding-left: 2em;
  @media only screen and (max-width: ${size.mobileL}) {
    padding-left: 0;
    margin-bottom: 1em;
  }
`;