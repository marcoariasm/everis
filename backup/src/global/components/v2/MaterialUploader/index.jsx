
import React, { useRef } from 'react';
import UploadFile from 'shared/images/upload-file.svg';
import styled from 'styled-components';
import ProgressBar from '../ProgressBar';
import FileItem from './components/FileItem';
import ErrorBanner from './components/ErrorBanner';
import {
    UploaderContainer,
    HeadContainer,
    UploaderDescription,
    OutlinedButton,
    ButtonContent,
    IconContainer,
    ButtomText
} from './styledComponents';
import './styles.scss';

const FileListContainer = styled.div`
  border-top: 1px solid #cfcfcf;
  margin-top: 1.8em;
  width: 100%;
`;

const FileList = ({ filesList, handleAction, IsEditable }) => {
  return filesList.map((file, i) => (
     <FileItem key={i} IsEditable={IsEditable} file={file} handleAction={handleAction} />
  ));
}

const InformationBanner = ({ loading = false, error, files = [], handleAction, IsEditable }) => {
  if (loading) return <ProgressBar />;
  if (error) return <ErrorBanner error={error} />;
  if (files.length) return (
    <FileListContainer>
      <FileList
        IsEditable={IsEditable}
        filesList={files}
        handleAction={handleAction}
      />
    </FileListContainer>
  );
  return <></>;
}

const manageWarnings = () => console.warn(`Warning: You are missing a function parameter!`);

const MaterialUploader = ({
  loading = false,
  error = null,
  files = [],
  onChange,
  deleteFile = manageWarnings,
  downloadFile = manageWarnings,
  description = '',
  btnLabel = '',
  IsEditable = false,
  name = 'myfile',
  className = ''
}) => {
  const uploadRef = useRef(null);

  const handleClick = () => {
    uploadRef.current.click();
  }

  const getFiles = (event) => {
    const fileList = event.target.files;
    if (onChange) onChange(fileList);
  }

  const handleAction = (fileSelected) => {
    if (!fileSelected) return;
    if (IsEditable) return deleteFile(fileSelected);
    return downloadFile(fileSelected);
  }

  return (
      <UploaderContainer className={className}>
      <HeadContainer>
        <UploaderDescription
          IsEditable={IsEditable}
        >
          { description }
        </UploaderDescription>
        <input
          className="upload-input"
          onChange={getFiles}
          ref={uploadRef}
          type="file"
          name={name}
        />
        { IsEditable && 
          <OutlinedButton onClick={handleClick} className="btn" >
              <ButtonContent>
                  <IconContainer><img src={UploadFile}/></IconContainer>  
                <ButtomText>{btnLabel}</ButtomText>
            </ButtonContent>
           </OutlinedButton>
        }
        </HeadContainer>
        <InformationBanner
          loading={loading}
          IsEditable={IsEditable}
          error={error}
          files={files}
          handleAction={handleAction}
        />
      </UploaderContainer>
  )
}

export default MaterialUploader;