import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { useDropzone } from 'react-dropzone'

import { size } from 'shared/styles/Responsive'
import { allColors } from 'shared/styles/index'

import { extensionAllowed } from 'shared/constant/ConstantDocuments'
import { maxDocSizeMB } from 'shared/constant/ConstantDocuments'

import CardInformationGray from 'pages/ValidationRuc/components/MainSection/CardInformationGray'
import CardErrorFile from 'pages/ValidationRuc/components/MainSection/CardErrorFile'
import CardAddFile from 'pages/ValidationRuc/components/MainSection/CardAddFile'

import File from 'shared/images/documento.svg'
import DeleteFile from 'shared/images/deleteFile.svg'
import Progress from 'pages/ValidationRuc/components/MainSection/Progress'

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676'
  }
  if (props.isDragReject) {
    return '#ff1744'
  }
  if (props.isDragActive) {
    return '#2196f3'
  }
  return '#d7d9d9'
}
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 35px 20px 20px 20px;
  box-sizing: border-box;
  color: ${allColors.colorGrayCard};
  border-radius: 8.5px;
  border: 2px dashed ${(props) => getColor(props)};
  background: ${allColors.colorGrayCard};
  @media screen and (min-width: ${size.tablet}) and (max-width: ${size.laptop}) {
    padding: ${(props) => props.heightC} ${(props) => props.widthC};
    font-size: 20px;
    flex-direction: ${({ direction }) => direction};
  }
  @media screen and (min-width: ${size.laptop}) and (max-width: ${size.laptopL}) {
    padding: ${(props) => props.heightC} ${(props) => props.widthC};
    font-size: 20px;
    flex-direction: ${({ direction }) => direction};
  }
  @media only screen and (min-width: ${size.laptopM}) {
    padding-top: 24.44px;
    width: 100%;
    flex-direction: ${({ direction }) => direction};
  }
`
const ContentFileName = styled.div`
  display: grid;
  grid-template-columns: 20px 3fr 20px;
  grid-column-gap: 15px;
  align-items: flex-start;
  margin-top: 15px;
  padding: 20px 0;
  border-radius: 7px;
  border: 2px dashed ${allColors.colorGrayCardDashed};
  background: ${allColors.colorGrayCard};
`
const IconDeleteFile = styled.div`
  text-align: right;
  cursor: pointer;
`
const FileName = styled.div`
  align-items: center;
  & img {
    vertical-align: middle;
    padding-right: 13px;
  }
  & span {
    font-family: Calibri;
    word-break: break-all;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: ${allColors.colorGreen};
  }
  @media only screen and (min-width: 360px) and (max-width: 414px) and (orientation: portrait) {
    img {
      height: 25px;
      margin-left: -15%;
      padding-right: 9px;
    }
  }
`

const CardUploadFile = ({ businessDay, email, onChange }) => {
  const [tmpFile, setTmpFile] = useState(null)
  const [msgError, setMsgError] = useState(null)
  const [isLoading, setLoading] = useState(false)

  function validateSize(file) {
    let sizeItem = (file.size / 1000000).toFixed(2)
    if (sizeItem < maxDocSizeMB) {
      onChange(true)
      return false
    } else {
      onChange(false)
      return true
    }
  }

  function validateFormat(file) {
    let count = 0
    for (let i = 0; i < extensionAllowed.length; i++) {
      if (extensionAllowed[i].type === file.type) {
        setTmpFile(file)
        onChange(true)
        return false
      } else {
        count++
      }
      if (count === extensionAllowed.length) {
        onChange(false)
        return true
      }
    }
  }

  function getInfoFail(file) {
    const noSize = validateSize(file)
    const noFormat = validateFormat(file)
    if (noFormat || (noSize && noFormat)) {
      onChange(false)
      setTmpFile('error')
      setMsgError('El documento debe tener extensión PDF o JPG.')
    } else if (noSize) {
      onChange(false)
      setTmpFile('error')
      setMsgError('El archivo excede el peso permitido(5MB).')
    }
  }
  const onDrop = useCallback((acceptedFiles) => {
    setLoading(true)
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        getInfoFail(file)
      }
      reader.readAsDataURL(file)
    })
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })

  function deleteFail() {
    if (tmpFile) {
      onChange(false)
      setTmpFile(null)
    }
  }

  return (
    <>
      {tmpFile === null && (
        <>
          <Content {...getRootProps({ isDragActive })} direction="column">
            <CardAddFile
              title="Carga el Reporte Tributario de Rentas de Cuarta Categoría"
              subtitle="El peso del documento no debe exceder de 5MB. y deben ser de extensión: .pdf o .jpg."
              textDragDrop="Arrastra y suelta el archivo o da clic en el botón"
            />
            <input name="file" {...getInputProps()} />
          </Content>
        </>
      )}
      {tmpFile === 'error' && (
        <>
          <Content {...getRootProps({ isDragActive })} direction="column">
            <CardErrorFile
              title={msgError}
              textError="Carga el documento nuevamente arrastrando y soltando el archivo o dando clic en el botón."
            />
            <input name="file" {...getInputProps()} />
          </Content>
        </>
      )}

      {isLoading && tmpFile !== null && tmpFile !== 'error' && (
        <>
          <Content direction="row">
            <Progress fileName={tmpFile.name} />
          </Content>
        </>
      )}
      {tmpFile !== null && tmpFile !== 'error' && !isLoading && (
        <>
          <Content direction="row">
            <CardInformationGray
              title="El documento fue subido con éxito"
              text={`Este documento será validado con SUNAT, de no estar conforme el ${moment(businessDay).format(
                'DD/MM/YYYY'
              )} te lo notificaremos a tu correo electrónico ${email}. En ese caso, no podrás continuar con el trámite.`}
            />
          </Content>
          <ContentFileName>
            <div>
              <img alt="img" src={File} width="20" height="20" />
            </div>
            <FileName>
              <span> {tmpFile.name} </span>
            </FileName>
            <IconDeleteFile>
              <img alt="img" src={DeleteFile} onClick={deleteFail} width="20" height="20" />
            </IconDeleteFile>
          </ContentFileName>
        </>
      )}
    </>
  )
}

export default CardUploadFile
