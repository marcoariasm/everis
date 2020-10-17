
import React, { useRef } from 'react';
import './styles.scss';
import UploadFile from '../../shared/images/upload-file.svg';
import ErrorFile from '../../shared/images/errorFile.svg';
import FileIcon from '../../shared/images/fileVerde.svg';
import Trash from '../../shared/images/tacho.svg';
import styled from 'styled-components';
// import ProgressBar from '../ProgressBar';
import {
    UploaderContainer,
    HeadContainer,
    UploaderDescription,
    OutlinedButton,
    ButtonContent,
    IconContainer,
    ButtomText
} from './styledComponents';
import FileItem from './components/FileItem';
import ErrorBanner from './components/ErrorBanner';


const FileListContainer = styled.div`
  border-top: 1px solid #cfcfcf;
  margin-top: 1.8em;
  width: 100%;
`;

const FileList = ({ filesList, deleteItem }) => {
  return filesList.map(file => <FileItem file={file} handleDelete={deleteItem} />);
}

const InformationBanner = ({ loading = false, error, files = [], handleDelete }) => {
  // if (loading) return <ProgressBar />;
  if (error) return <ErrorBanner error={error} />;
  if (files.length) return <FileListContainer><FileList filesList={files} deleteItem={handleDelete} /></FileListContainer>;
  return <></>;
}

const MaterialUploader = ({ loading = false, error = null, files = [], onChange, deleteFile, description = '', btnLabel = '' }) => {
  const uploadRef = useRef(null);

  const handleClick = () => {
    uploadRef.current.click();
  }

  const getFiles = (event) => {
    const fileList = event.target.files;
    if (onChange) onChange(fileList);
  }

  const handleDelete = (fileToDelete) => {
    if (fileToDelete && deleteFile) deleteFile(fileToDelete);
  }

  return (
      <UploaderContainer>
      <HeadContainer>
        <UploaderDescription>{ description }</UploaderDescription>
        <input
          className="upload-input"
          onChange={getFiles}
          ref={uploadRef}
          type="file"
          name="myfile"
        />
        <OutlinedButton onClick={handleClick} className="btn" >
          <ButtonContent>
                <IconContainer><img src={UploadFile}/></IconContainer>  
              <ButtomText>{btnLabel}</ButtomText>
          </ButtonContent>
        </OutlinedButton>
        </HeadContainer>
        <InformationBanner
          loading={loading}
          error={error}
          files={files}
          handleDelete={handleDelete}
        />
      </UploaderContainer>
  )
}

export default MaterialUploader;