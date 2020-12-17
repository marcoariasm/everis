import React, { useRef } from "react";
import styled from "styled-components";
import UploadFile from "shared/images/upload-file.svg";
import ProgressBar from "./../ProgressBar/index";
import ErrorBanner from "./components/ErrorBanner";
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
  border-top: 1px solid #cfcfcf;
  margin-top: 1.8em;
  width: 100%;
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

const InformationBanner = ({
  loading = false,
  error,
  files = [],
  handleDelete,
  IsEditable,
}) => {
  if (loading) return <ProgressBar />;
  if (error) return <ErrorBanner error={error} />;
  if (files.length)
    return (
      <FileListContainer>
        <FileList
          IsEditable={IsEditable}
          filesList={files}
          deleteItem={handleDelete}
        />
      </FileListContainer>
    );
  return <></>;
};

const MaterialUploader = ({
  loading = false,
  error = null,
  files = [],
  onChange,
  deleteFile,
  description = "",
  btnLabel = "",
  IsEditable = true,
}) => {
  const uploadRef = useRef(null);

  const handleClick = () => {
    uploadRef.current.click();
  };

  const getFiles = (event) => {
    const fileList = event.target.files;
    if (onChange) onChange(fileList);
  };

  const handleDelete = (fileToDelete) => {
    if (fileToDelete && deleteFile) deleteFile(fileToDelete);
  };

  return (
    <UploaderContainer>
      <HeadContainer IsEditable={IsEditable}>
        <UploaderDescription IsEditable={IsEditable}>
          {description}
        </UploaderDescription>
        <input
          className="upload-input"
          onChange={getFiles}
          ref={uploadRef}
          type="file"
          name="myfile"
        />
        {IsEditable ? (
          <OutlinedButton onClick={handleClick} className="btn">
            <ButtonContent>
              <IconContainer>
                <img src={UploadFile} />
              </IconContainer>
              <ButtomText>{btnLabel}</ButtomText>
            </ButtonContent>
          </OutlinedButton>
        ) : (
          <></>
        )}
      </HeadContainer>
      <InformationBanner
        loading={loading}
        IsEditable={IsEditable}
        error={error}
        files={files}
        handleDelete={handleDelete}
      />
    </UploaderContainer>
  );
};

export default MaterialUploader;
