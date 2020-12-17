import styled from "styled-components";
import { size } from "shared/styles/Responsive";
import allColors from "global/styles";

export const WriteResponseSection = styled.div`
  display grid;
  margin: 1em 0 2em;
  grid-template-columns: 1fr 45px;
`;

export const ErroFile = styled.span`
  margin-top: 1.5em;
  display: block;
  color: ${allColors.colorOrangeMain};
  font-size: 14px;
`;

export const CardMessage = styled.div`
  padding: 1em;
  position: relative;
  margin-${(props) => (props.isExecutive ? "left" : "right")}: auto;
  width: fit-content;
  max-width: 70%;
  display: grid;
  border: 1px solid #e8e8e8;
  grid-row-gap: 10px;
  border-radius: 6px;
  margin-bottom:1em;
  background-color: ${(props) =>
    props.isExecutive
      ? allColors.colorGreenSelectCard
      : allColors.colorPinkCardBackground};
  @media only screen and (max-width: ${size.mobileL}) {
    max-width: 85%;
    > span:first-child {
      font-size:13px;
    }
    > span:not(:first-of-type){
      font-size:16px;
    }
  }
}
`;

export const MessagesContainer = styled.div`
  width: 100%;
  margin-bottom: 1em;
  height: 40vh;
  overflow-y: auto;
  padding-right: 1em;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #b3b3b3;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
  }
  &::-webkit-scrollbar-thumb:active {
    background-color: #999999;
  }
`;

export const TextareaResponse = styled.textarea`
  border: 1px solid #c0c0c0;
  border-radius: 6px 0 0 6px;
  width: 102%;
  height: 36px;
  outline: none;
  resize: none;
  color: #696158;
  font-size: 16px;
  font-family: Calibri;
  padding: 7px 2em;
  overflow: auto;
  &::-webkit-input-placeholder {
    color: ${allColors.colorGrayText};
  }
`;

export const SubTittle = styled.span`
  color: ${allColors.colorOrangeMainActive};
  font-family: FS Emeric;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 1em;
  display: block;
`;

export const SendMessage = styled.button`
  cursor: pointer;
  position: relative;
  right: 7px;
  border-radius: 0 6px 6px 0;
  background-color: #ff4f00;
  display: flex;
  align-items: center;
  justify-content: center;
  > img {
    width: 18px;
    height: 17px;
  }
`;

export const UploadDocument = styled.div`
  cursor: pointer;
  margin-right: 1em;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 1em 2em;
  border-radius: 6px;
  box-shadow: 0 4px 8px 1px rgba(53, 53, 53, 0.12);
  border: solid 1px #e8e8e8;
  > span {
    font-family: Calibri;
    font-size: 16px;
    font-weight: bold;
    color: #ff4f00;
  }
  @media only screen and (max-width: ${size.mobileL}) {
    width: 100%;
  }
`;

export const IconPDF = styled.img`
  margin-right: 1em;
  @media only screen and (max-width: ${size.mobileL}) {
    width: 35px;
  }
`;
