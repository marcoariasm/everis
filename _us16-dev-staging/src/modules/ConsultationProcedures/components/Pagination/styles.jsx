import styled from "styled-components";
import { size } from '../../../../shared/styles/Responsive';
import { allColors } from '../../../../shared/styles/index';

export const ContainerNumbersPagination = styled.div`
  margin 0 1em;
  @media only screen and (max-width: ${size.mobileL}) {
    margin 0 0.5em;
  }
`;

export const HeaderPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5em;
  @media only screen and (max-width: ${size.mobileL}) {
    flex-direction: column;
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
  width: 110px;
  display: ${(props) => (props.isHidden ? "none" : "")};
  @media only screen and (max-width: ${size.mobileL}) {
    width: 85px;
  }
`;