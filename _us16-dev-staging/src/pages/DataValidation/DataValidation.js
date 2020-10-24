import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router-dom'
import MediaQuery from 'react-responsive'

import usePerfilamiento from 'modules/Retirement955/api/Perfilamiento/usePerfilamiento'
import useContactInfo from 'modules/Retirement955/api/Afiliado/useContactInfo'
import useAfiliado from 'modules/Retirement955/api/Afiliado/useAfiliado'

import useGetErrorContactInfo from 'modules/Retirement955/customHooks/useGetErrorContactInfo'

import { textHeader } from 'shared/constant/ConstantHeader'
import { textDataValidation } from 'shared/constant/ConstantDataValidation'
import { profilingValue } from 'shared/constant/Parameters'

import WhiteCard from 'shared/components/WhiteCard'
import UpdateContent from './components/FooterSection/UpdateContent'
import Paginator from 'global/components/Paginator/Paginator'
import TextFinal from './components/FooterSection/TextFinal'
import TableHeading from 'pages/DataValidation/components/MainSection/TableHeading'
import PopPupWarning from 'shared/components/PopPupValidation/PopPupWarning'
import PopPup from 'pages/DataValidation/components/MainSection/popPup/PopPup'
import { Loading } from 'global/components/Loading'
import Header from 'shared/components/Header'
import GridContactInformation from 'pages/DataValidation/components/MainSection/GridContactInformation'
import GridBasicInformation from 'pages/DataValidation/components/MainSection/gridInfoBasic/GridBasicInformation'
import { Title } from 'pages/DataValidation/Title'
import ContentData from 'pages/DataValidation/components/MainSection/ContentData'
import CardGray from 'shared/components/CardGrey'
import ErrorMessage from '../../modules/Retirement955/commons/ErrorMessage'

function DataValidation() {
  const { profiling, isLoading: isLoadingProfiling } = usePerfilamiento()
  const { affiliate, isLoading: isLoadingAffiliate } = useAfiliado()
  const { contactInfo, isLoading: isLoadingContactInfo, isError: isErrorContactInfo } = useContactInfo()

  const error = ''
  const [showModal, setShowModal] = useState(false)
  const [showModalValidation, setShowModalValidation] = useState(false)
  const [messageValidation, setMessageValidation] = useState(null)
  const [redirection, setRedirection] = useState(null)
  const [backRedirection, setBackRedirection] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleShowModalValidation = () => {
    setShowModalValidation(true)
  }

  const handleCloseModalValidation = () => {
    setShowModalValidation(false)
  }

  const goToUpdate = () => {
    window.open(textDataValidation.updateUrl, textDataValidation.targetBlank)
  }

  function getError(e) {
    if (e === 'next') {
      setMessageValidation(error)
      if (error) {
        handleShowModalValidation()
      } else {
        setRedirection(true)
      }
    } else if (e === 'return') {
      setBackRedirection(true)
    }
  }

  return (
    <>
      {ReactDOM.createPortal(
        <PopPupWarning
          widthB="170px"
          heightB="45px"
          marginT="50px"
          marginB="40px"
          justifyContent="center"
          nameButton="Entendido"
          hideButtonCancel={true}
          show={showModalValidation}
          onClose={handleCloseModalValidation}
          onClick={handleCloseModalValidation}
          texto={messageValidation}
        />,
        document.getElementById('modal')
      )}
      {isLoadingProfiling || isLoadingContactInfo || isLoadingAffiliate ? (
        <Loading />
      ) : (
        <>
          <CardGray>
            <CardGray>
              {(profiling.regime === profilingValue[0].value || profiling.regime === profilingValue[1].value) && (
                <Header title={textHeader.title} text={textHeader.textReja} />
              )}
              {(profiling.regime === profilingValue[2].value || profiling.regime === profilingValue[3].value) && (
                <Header title={textHeader.title} text={textHeader.textLegal} />
              )}
            </CardGray>
          </CardGray>
          <WhiteCard>
            <Title />
            <ContentData>
              <TableHeading title={textDataValidation.titleBasicInfo} />
              <GridBasicInformation infoBasic={affiliate} />
              <TableHeading title={textDataValidation.titleContactInfo} />
              {!isErrorContactInfo ? <GridContactInformation contactInfo={contactInfo} /> : <ErrorMessage />}
              <UpdateContent>
                <TextFinal className="bodyText">¿Tus datos no son correctos?</TextFinal>
                <a onClick={handleShowModal}>Actualizar datos</a>
              </UpdateContent>
            </ContentData>
          </WhiteCard>
          <MediaQuery maxDeviceWidth={375}>
            <Paginator widthB="120px" heightB="45px" onClick={getError} />
          </MediaQuery>
          <MediaQuery minDeviceWidth={376}>
            <Paginator widthB="138px" heightB="45px" onClick={getError} />
          </MediaQuery>
        </>
      )}
      {ReactDOM.createPortal(
        <>
          <MediaQuery maxDeviceWidth={1023}>
            <PopPup
              widthB="170px"
              heightB="45px"
              marginT="30px"
              marginB="40px"
              justifyContent="center"
              onClose={handleCloseModal}
              show={showModal}
              onClick={goToUpdate}
              hideButtonCancel={true}
              nameButton="Actualizar datos"
            />
          </MediaQuery>
          <MediaQuery minDeviceWidth={1023}>
            <PopPup
              widthB="170px"
              heightB="45px"
              marginT="30px"
              marginB="40px"
              justifyContent="center"
              onClose={handleCloseModal}
              hideButtonCancel={true}
              show={showModal}
              onClick={goToUpdate}
              nameButton="Actualizar datos"
            />
          </MediaQuery>
        </>,
        document.getElementById('modal')
      )}
      {redirection &&
        (profiling.regime === profilingValue[0].value || profiling.regime === profilingValue[1].value) && (
          <Redirect to="/proceso95-5/validation-ruc"></Redirect>
        )}
      {redirection &&
        (profiling.regime === profilingValue[2].value || profiling.regime === profilingValue[3].value) && (
          <Redirect to="/proceso95-5/homeAdvice"></Redirect>
        )}
      {backRedirection && <Redirect to="/proceso95-5/validation-prerequisites"></Redirect>}
    </>
  )
}

export default DataValidation
