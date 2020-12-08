import styled from "styled-components";
import { size } from "global/styles/Responsive";
import { allColors } from "global/styles";

export const CardProcedureGrid = styled.div`
  display: grid;
  cursor: pointer;
  grid-template-columns: 5fr 1fr;
  grid-template-rows: 1fr 1em 1fr;
  grid-row-gap: ${(props) => (props.hasAffiliate ? "10px" : "0")};
  border: 1px solid #e8e8e8;
  box-shadow: 0 4px 8px 1px rgba(53, 53, 53, 0.12);
  border-radius: 6px;
  padding: 1.2em 2em;
  margin-bottom: 1em;
  @media only screen and (max-width: ${size.mobileL}) {
    grid-template-rows: ${(props) =>
      props.hasAffiliate ? "2.5em 1fr 2.5em 1em" : "2.5em 1fr 2em"};
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
  @media only screen and (max-width: ${size.mobileL}) {
    > .not-responsive {
      display: none;
    }
    > div {
      display: none;
    }
  }
  @media only screen and (min-width: ${size.mobileL}) {
    > .is-responsive {
      display: none;
    }
  }
`;

export const IconArrow = styled.img`
  width: 1em;
  transform: rotate(90deg);
`;

export const Point = styled.div`
  border-radius: 50%;
  background-color: ${(props) => allColors[props.color]};
  width: 12px;
  height: 12px;
  margin-right: 10px;
`;
