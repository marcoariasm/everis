import React from 'react';
import styled from 'styled-components';
import FileIcon from '../../../../shared/images/fileVerde.svg';
import Trash from '../../../../shared/images/tacho.svg';
import { size } from 'shared/styles/Responsive';

const FileItemContainer = styled.div`
  display: grid;
  grid-template-columns: 2em auto 2em;
  grid-column-gap: 5px;
  align-items: center;
  padding: 1.3em 1em 1.6em 1em;
  width: 100%;
  @media screen and (max-width: ${size.tabletS})  {
    grid-column-gap: 10px;
    padding: 1.3em 1em 1em 1em;
  }
  @media screen and (max-width: ${size.mobileL})  {
    grid-column-gap: 15px;
  }
`;

const FileDescription = styled.p`
  color: #696158;
  font-size: 12px;
  font-family: 'Calibri';
  @media screen and (max-width: ${size.tabletS})  {
    font-size: 11px;
  }
  @media screen and (max-width: ${size.mobileL})  {
    font-size: 10px;
  }
  @media screen and (max-width: ${size.mobileM})  {
    font-size: 9px;
  }
`;

const FileItem = ({ file, handleDelete, icon = FileIcon }) => (
    <FileItemContainer>
        <img src={icon} /><div>
            <FileDescription>{file.name}</FileDescription>
            <FileDescription>{file.size}</FileDescription>
        </div>
        <button
          onClick={() => handleDelete(file)}
          style={{ outline: 'none' }}
        >
          <img src={Trash} />
        </button>
    </FileItemContainer>
);

export default FileItem;