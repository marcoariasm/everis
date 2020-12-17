import React, { useContext, useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import sendMessageIcon from "shared/images/sendMessage.svg";
import fileClick from "shared/images/fileClick.svg";
import WhiteCard from "modules/shared/components/WhiteCard";
import Header from "modules/shared/components/Header";
import FileItem from "modules/shared/components/DocumentList/components/FileItem";
import { ProcedureDetailContext } from "modules/ConsultationProcedures/routes/UserProcedureDetailContext";
import { downloadFile } from "../../../shared/helpers/HelperDowloadFile";
import {
  sendMessage,
  downloadFileMessage,
  getProcedureDetail,
} from "../../services";
import { useRouteMatch } from "react-router-dom";

import {
  WriteResponseSection,
  CardMessage,
  MessagesContainer,
  TextareaResponse,
  Title,
  UploadDocument,
  SendMessage,
  IconPDF,
} from "./styles";

const MessagesCards = ({ messages, executiveName, downloadFileOfMessage }) => {
  return messages.map((messageItem, i) => (
    <CardMessage key={i} isExecutive={!!messageItem.idExecutive}>
      <span className="bodyTextSmall">{messageItem.dateRegister}</span>
      {messageItem.executiveId && (
        <span className="cardTitle">Ejecutivo: {executiveName}</span>
      )}
      {messageItem.message && (
        <span className="bodyTextSecundary">{messageItem.message}</span>
      )}
      {messageItem.documentName && (
        <FileItem
          key={i}
          id={messageItem.id}
          IsEditable={false}
          handleAction={downloadFileOfMessage}
          documentName={messageItem.documentName}
        />
      )}
    </CardMessage>
  ));
};

function Messages() {
  const { url } = useRouteMatch();
  const uploadRef = useRef(null);

  let history = useHistory();
  const { procedureDetail, setProcedureDetail } = useContext(
    ProcedureDetailContext
  );
  const isFinishedRequest =
    procedureDetail.status === "Finalizado" ||
    procedureDetail.status === "Rechazado";
  const [messages, setmessages] = useState([]);
  const [currentMessage, setCurrentmessage] = useState("");
  const [currentFileToSend, setCurrentFileToSend] = useState(null);

  const getDetailProcedure = () => {
    getProcedureDetail(procedureDetail.idRequest)
      .then((response) => setProcedureDetail(response))
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const handleClick = () => {
    uploadRef.current.click();
  };

  const downloadFileOfMessage = (event, id, documentName) => {
    event.preventDefault();
    const payload = { idRequestMessage: id };

    downloadFileMessage(payload)
      .then((response) => response.blob())
      .then((blob) => downloadFile(blob, documentName))
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const generateMessagePayload = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (!!currentFileToSend || !!currentMessage) {
      const formData = new FormData();
      formData.append("idRequest", procedureDetail.idRequest);
      formData.append("message", currentMessage);
      formData.append("file", currentFileToSend);

      sendMessage(formData)
        .then((response) => {
          setCurrentmessage("");
          setCurrentFileToSend(null);
          getDetailProcedure();
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  };

  const getFiles = (event) => {
    event.preventDefault();
    const fileList = event.target.files;
    if (fileList.length > 0) {
      setCurrentFileToSend(fileList[0]);
    }
  };

  useEffect(() => {
    if (!!currentFileToSend) {
      generateMessagePayload();
    }
    return () => {
      setCurrentFileToSend(null);
    };
  }, [currentFileToSend]);

  useEffect(() => {
    if (Object.values(procedureDetail).length === 0) {
      history.push("/");
    }
    if (
      procedureDetail &&
      procedureDetail.messages &&
      procedureDetail.messages.length > 0
    ) {
      const messageDiv = document.getElementById("messages");
      const messages = procedureDetail.messages.reverse();
      setmessages(messages);
      setTimeout(() => {
        messageDiv.scrollTop =
          messageDiv.scrollHeight - messageDiv.clientHeight;
      }, 100);
    }
  }, [procedureDetail]);

  const handleMessageChange = (e) => {
    setCurrentmessage(e.target.value.trim());
  };

  return (
    <>
      <Header title="" text="" />
      <WhiteCard>
        <Title className="headerTitleHighligh">
          {url.includes("apoderados")
            ? "Trámites realizados por apoderados"
            : "Estado de mis trámites"}
        </Title>
        <MessagesContainer id="messages">
          {procedureDetail &&
            procedureDetail.messages &&
            procedureDetail.messages.length > 0 && (
              <MessagesCards
                messages={messages}
                downloadFileOfMessage={downloadFileOfMessage}
                executiveName={
                  procedureDetail.executive
                    ? procedureDetail.executive.fullname
                    : ""
                }
              />
            )}
        </MessagesContainer>
        {!url.includes("apoderados") && !isFinishedRequest && (
          <>
            <span className="tableBodyTitle">Respuesta</span>
            <form>
              <WriteResponseSection>
                <TextareaResponse
                  value={currentMessage}
                  onChange={handleMessageChange}
                  placeholder="Escribe un mensaje"
                ></TextareaResponse>
                <SendMessage onClick={(event) => generateMessagePayload(event)}>
                  <img src={sendMessageIcon} alt="sendMessage" />
                </SendMessage>
              </WriteResponseSection>
              <UploadDocument onClick={handleClick}>
                <IconPDF src={fileClick} alt="fileClick" />
                <span>Cargar documento</span>
                <input
                  className="upload-input"
                  onChange={(event) => getFiles(event)}
                  ref={uploadRef}
                  type="file"
                />
              </UploadDocument>
            </form>
          </>
        )}
      </WhiteCard>
    </>
  );
}

export default Messages;
