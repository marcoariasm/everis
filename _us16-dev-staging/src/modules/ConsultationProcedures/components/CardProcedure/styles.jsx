import styled from "styled-components";
import { size } from '../../../../shared/styles/Responsive';

export const CardProcedureGrid = styled.div`
  display: grid;
  cursor: pointer;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-row-gap: 10px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 4px 8px 1px rgba(53, 53, 53, 0.12);
  border-radius: 6px;
  padding: 1.2em 2em;
  margin-bottom: 1em;
  @media only screen and (max-width: ${size.mobileL}) {
    grid-template-columns: 5fr 1fr;
    grid-template-rows: 2.5em 1fr 3em 1em;
    align-items: center;
    grid-row-gap: 1px;

    padding: 1.2em 1em;
    > .not-responsive {
      display: none;
    }
  }
  @media only screen and (min-width: ${size.mobileL}) {
    > .is-responsive {
      display: none;
    }
  }
`;

export const IconContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export const HeaderCard = styled.div`
  display: flex;
  align-items: center;
`;

export const IconArrow = styled.img`
  width: 1em;
  transform: rotate(90deg);
`;

export const Point = styled.div`
  border-radius: 50%;
  background-color: ${(props) => (props.Inprocess ? "#00ae12" : "#fa2424")};
  width: 12px;
  height: 12px;
  margin-right: 10px;
`;
