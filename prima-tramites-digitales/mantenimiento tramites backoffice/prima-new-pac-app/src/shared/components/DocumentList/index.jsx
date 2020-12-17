import React, { useRef } from "react";
import styled from "styled-components";
import UploadFile from "../../images/upload-file.svg";
import FileItem from "./components/FileItem";
import {
  ButtomText,
  ButtonContent,
  HeadContainer,
  IconContainer,
  OutlinedButton,
  UploaderContainer,
  UploaderDescription,
} from "./styledComponents";
import "./styles.scss";

const FileListContainer = styled.div`
  border-top: ${(props) => (props.IsEditable ? "1px solid #cfcfcf" : "")};
  width: 100%;
  & > div:not(:last-child) {
    border-bottom: ${(props) => (props.IsEditable ? "" : "1px solid #cfcfcf")};
  }
`;

const FileList = ({ filesList, handleAction, IsEditable = true }) => {
  return filesList.map((file, i) => (
    <FileItem
      key={i}
      id={file.idRequestDocument}
      IsEditable={IsEditable}
      documentName={file.documentName}
      handleAction={handleAction}
    />
  ));
};

const InformationBanner = ({
  files = [],
  handleAction,
  IsEditable,
}) => {
  if (files.length)
    return (
      <FileListContainer IsEditable={IsEditable}>
        <FileList
          IsEditable={IsEditable}
          filesList={files}
          handleAction={handleAction}
        />
      </FileListContainer>
    );
  return <></>;
};

const manageWarnings = () =>
  console.warn(`Warning: You are missing a function parameter!`);

const DocumentList = ({
  loading = false,
  error = null,
  files = [],
  onChange,
  handleAction,
  deleteFile = manageWarnings,
  downloadFile = manageWarnings,
  description = "",
  btnLabel = "",
  IsEditable = false,
  name = "myfile",
  className = "",
}) => {
  const uploadRef = useRef(null);

  const handleClick = () => {
    uploadRef.current.click();
  };

  const getFiles = (event) => {
    const fileList = event.target.files;
    if (onChange) onChange(fileList);
  };

  return (
    <UploaderContainer className={className}>
      <HeadContainer>
        <UploaderDescription IsEditable={IsEditable}>
          {description}
        </UploaderDescription>
        <input
          className="upload-input"
          onChange={getFiles}
          ref={uploadRef}
          type="file"
          name={name}
        />
        {IsEditable && (
          <OutlinedButton onClick={handleClick} className="btn">
            <ButtonContent>
              <IconContainer>
                <img src={UploadFile} />
              </IconContainer>
              <ButtomText>{btnLabel}</ButtomText>
            </ButtonContent>
          </OutlinedButton>
        )}
      </HeadContainer>
      <InformationBanner
        loading={loading}
        IsEditable={IsEditable}
        error={error}
        files={files}
        handleAction={handleAction}
      />
    </UploaderContainer>
  );
};

export default DocumentList;
