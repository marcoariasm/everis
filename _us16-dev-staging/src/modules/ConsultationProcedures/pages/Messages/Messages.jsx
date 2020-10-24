import React from "react";

import messageOrange from "shared/images/messageOrange.png";
import sendMessage from "shared/images/sendMessage.png";
import fileClick from "shared/images/fileClick.svg";
import WhiteCard from "shared/components/WhiteCard";
import Header from "shared/components/Header";
import FileItem from "modules/shared/components/MaterialUploader/components/FileItem";

import { messages } from '../../shared/constants/Messages';

import {
  WriteResponseSection,
  CardMessage,
  FileListContainer,
  MessagesContainer,
  TextareaResponse,
  Title,
  MessageImg,
  UploadDocument,
  IconPDF
} from './styles';

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
