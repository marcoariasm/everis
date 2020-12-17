import styled from 'styled-components';
import { size } from '../../../../global/styles/Responsive';

export const UploaderContainer = styled.div`
  padding: 1em;
  border-radius: 14px;
  display: table;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 15em;
  box-shadow: 0 8px 10px -2px rgba(103, 103, 103, 0.12);
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='%23CFCFCFFF' stroke-width='2' stroke-dasharray='7%2c 10' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
`;

export const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 12em;
`;

export const UploaderDescription = styled.p`
  color: #696158;
  font-size: 14px;
  font-family: 'Calibri';
  font-weight: bold;
  max-width: 265px;
  text-align: center;
  padding-top: ${(props) => (props.IsEditable ? "2em" : "1em")};
  @media screen and (max-width: ${size.mobileM})  {
    font-size: 12px;
  }
`;

export const OutlinedButton = styled.button`
    border: 1.4px solid #00ae99;
    border-radius: 6px;
    display: flex;
    padding: 0.8em 2em;
    outline: none;
    min-width: 110px;
    flex-direction: row;
    max-width: 180px;
    margin: 1.8em 0 0 0;
    @media screen and (max-width: ${size.mobileM})  {
      padding: 0.5em 1.5em;
      min-width: 90px;
    }
`;

export const ButtonContent = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  justify-content: center;
`;

export const IconContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export const ButtomText = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #00ae99;
  @media screen and (max-width: ${size.mobileM})  {
      font-size: 12px;
    }
`;