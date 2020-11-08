import styled from "styled-components";
import { size } from "global/styles/Responsive";
import { allColors } from "global/styles";

export const ContainerNumbersPagination = styled.div`
  margin 0 1em;
`;

export const ContainerCardsProcedure = styled.div`
  margin-bottom: 2em;
`;

export const PaginationContainer = styled.ul`
  justify-content: flex-end;

  @media only screen and (max-width: ${size.mobileL}) {
    justify-content: ${(props) => (props.alignEnd ? "flex-end" : "center")};
    > div {
      font-family: Calibri;
      font-size: 14px;
      line-height: 1.5;
      color: #696158;
      text-align: center;
    }
  }
`;

export const HeaderPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5em;

  @media only screen and (max-width: ${size.mobileL}) {
    flex-direction: column;
    margin-bottom: 0.5em;
    align-items: unset;
  }
`;

export const PaginationButton = styled.button`
  outline: none;
  background: ${allColors.colorWhiteBase};
  border: 0.1em solid ${allColors.colorGreen};
  border-radius: 16px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: ${allColors.colorGreen};
  cursor: pointer;
  font-family: Calibri;
  padding: 2px 0;
  width: 85px;
  visibility: ${(props) => (props.isHidden ? "hidden" : "")};
  display: ${(props) => (props.displayNone ? "none" : "")};
`;
