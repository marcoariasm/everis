import React from 'react'
import styled from 'styled-components'

import { allColors } from 'shared/styles/index'

import ButtonUploadFile from 'shared/images/buttonUploadFile.svg'

const Button = styled.button`
  cursor: pointer;
  background-image: url(${ButtonUploadFile});
  background-repeat: no-repeat;
  background-position: 15px 1j.0px;
  border-radius: 6px;
  font-family: Calibri;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  color: ${allColors.colorGrayCard};
  border: none;
  width: 190px;
  height: 45px;
  &:focus {
    outline: none;
  }
`

const FileUploader = () => {
  return (
    <>
      <Button></Button>
    </>
  )
}

export default FileUploader
