import React from "react";
import messageOrange from "shared/images/messageOrange.png";
import sendMessage from "shared/images/sendMessage.png";
import fileClick from "shared/images/fileClick.svg";
import styled from "styled-components";
import WhiteCard from "shared/components/WhiteCard";
import Header from "shared/components/Header";
import { size } from "shared/styles/Responsive";
import FileItem from "modules/shared/components/MaterialUploader/components/FileItem";
import { allColors } from "shared/styles/index";

const messages = [
  {
    documents: [
      {
        name: "DNI lado b.jpg",
        size: "153Kb",
      },
      {
        name: "DNI lado a.jpg",
        size: "153Kb",
      },
    ],
    textMessages: "Estimados, envío mi documentación necesaria",
    date: "05/08/2020 11:54:21 am",
    isExecutive: false,
    executiveName: "",
  },
  {
    documents: [],
    textMessages:
      "Estimada Maria Luisa, se recepciona la documentación, su tramite se ecnuentra en proceso",
    date: "05/08/2020 11:54:21 am",
    isExecutive: true,
    executiveName: "Roberto Ramirez",
  },
  {
    documents: [
      {
        name: "DNI lado b.jpg",
        size: "153Kb",
      },
      {
        name: "DNI lado a.jpg",
        size: "153Kb",
      },
    ],
    textMessages: "Estimados, envío mi documentación necesaria",
    date: "05/08/2020 11:54:21 am",
    isExecutive: false,
    executiveName: "",
  },
  {
    documents: [],
    textMessages:
      "Estimada Maria Luisa, se recepciona la documentación, su tramite se ecnuentra en proceso",
    date: "05/08/2020 11:54:21 am",
    isExecutive: true,
    executiveName: "Roberto Ramirez",
  },
];

export const WriteResponseSection = styled.div`
  display grid;
  margin-top: 1em;
  grid-template-columns: 1fr 45px;
  >img {
    height:36px;
    width:auto;
    position: relative;
    right: 7px;
  }
`;

export const CardMessage = styled.div`
  padding: 1em 1.5em;
  position: relative;
  margin-${(props) => (props.isExecutive ? "right" : "left")}: auto;
  width: fit-content;
  display: grid;
  box-shadow: 0 4px 8px 1px rgba(53, 53, 53, 0.12);
  border: 1px solid #e8e8e8;
  grid-row-gap: 10px;
  border-radius: 6px;
  margin-bottom:1em;
  background-color: ${(props) =>
    props.isExecutive
      ? allColors.colorWhiteBase
      : allColors.colorPinkCardBackground};
  @media only screen and (max-width: ${size.mobileL}) {
    max-width: 90%;
    > span:first-child {
      font-size:13px;
    }
    > span:not(:first-of-type){
      font-size:16px;
    }
  }
}
`;

const FileListContainer = styled.div`
  width: 75%;
  margin-left: auto;
  @media only screen and (max-width: ${size.mobileL}) {
    width: 110%;
  }
`;

const MessagesContainer = styled.div`
  width: 100%;
  margin-bottom: 3em;
  max-height: 40vh;
  overflow-y: auto;
  padding-right: 1em;
  @media only screen and (max-width: ${size.mobileL}) {
    max-height: 45vh;
  }
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

const TextareaResponse = styled.textarea`
  border: 1px solid #c0c0c0;
  border-radius: 6px;
  width: 100%;
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

export const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0 2em;
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 23px;
    text-align: left;
  }
  @media only screen and (max-width: ${size.mobileS}) {
    font-size: 20px;
  }
`;

export const MessageImg = styled.img`
  margin-right: 0.5em;
`;

export const UploadDocument = styled.div`
  margin: 1em 0;
  margin: 2em;
  display: flex;
  align-items: center;
`;

export const IconPDF = styled.img`
  margin-right: 1em;
  @media only screen and (max-width: ${size.mobileL}) {
    width: 35px;
  }
`;

const FileList = ({ filesList, deleteItem, IsEditable }) => {
  return filesList.map((file, i) => (
    <FileItem
      key={i}
      IsEditable={IsEditable}
      file={file}
      handleDelete={deleteItem}
    />
  ));
};

const MessagesCards = () => {
  return messages.map((message, i) => (
    <CardMessage key={i} isExecutive={message.isExecutive}>
      <span className="bodyTextSmall">{message.date}</span>
      {message.isExecutive ? (
        <span className="cardTitle">Ejecutivo: {message.executiveName}</span>
      ) : (
        <></>
      )}
      <span className="bodyTextSecundary">{message.textMessages}</span>
      <FileListContainer>
        <FileList IsEditable={false} filesList={message.documents} />
      </FileListContainer>
    </CardMessage>
  ));
};

function Messages() {
  return (
    <>
      <Header title="" text="" />
      <WhiteCard>
        <Title className="headerSubTitleHighligh">
          <MessageImg src={messageOrange} alt="messageOrange" />
          Mensajes
        </Title>
        <MessagesContainer>
          <MessagesCards />
        </MessagesContainer>
        <span className="tableBodyTitle">Respuesta</span>
        <WriteResponseSection>
          <TextareaResponse placeholder="Escribe un mensaje"></TextareaResponse>
          <img src={sendMessage} alt="sendMessage" />
        </WriteResponseSection>
        <UploadDocument>
          <IconPDF src={fileClick} alt="fileClick" />
          <span className="link">Cargar documento</span>
        </UploadDocument>
      </WhiteCard>
    </>
  );
}

export default Messages;
