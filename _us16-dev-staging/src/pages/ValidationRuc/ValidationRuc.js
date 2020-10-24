import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router-dom'
import { prop } from 'ramda'

import usePerfilamiento from 'modules/Retirement955/api/Perfilamiento/usePerfilamiento'
import useGetBusinessDays from 'modules/Retirement955/customHooks/useGetBusinessDays'
import useContactInfo from 'modules/Retirement955/api/Afiliado/useContactInfo'

import { profilingValue } from 'shared/constant/Parameters'

import WhiteCard from 'shared/components/WhiteCard'
import SelectOption from 'pages/ValidationRuc/components/MainSection/SelectOption'
import PopPupWarning from 'shared/components/PopPupValidation/PopPupWarning'
import { Loading } from 'global/components/Loading'
import Header from 'shared/components/Header'
import ContentText from 'pages/ValidationRuc/components/TitleSection/ContentText'
import ContentPaginator from 'shared/components/ContainerPaginator'
import ContainerText from 'pages/ValidationRuc/components/FooterSection/ContainerText'
import CardContainer from 'pages/ValidationRuc/components/MainSection/CardContainer'
import CardGray from 'shared/components/CardGrey'

const currentDay = new Date()

function ValidationRuc() {
  const businessDays = useGetBusinessDays(currentDay, 0)
  const { profiling, isLoading: isLoadingProfiling } = usePerfilamiento()
  const { contactInfo, isLoading: isLoadingContactInfo } = useContactInfo()

  const [validation, setValidation] = useState(null)
  const [declaration, setDeclaration] = useState(false)
  const [fail, setFail] = useState(false)
  const [showModalValidation, setShowModalValidation] = useState(false)
  const [messageValidation, setMessageValidation] = useState(null)
  const [redirection, setRedirection] = useState(false)
  const [backRedirection, setBackRedirection] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleShowModalValidation = () => {
    setShowModalValidation(true)
  }

  const handleCloseModalValidation = () => {
    setShowModalValidation(false)
  }

  const email = prop('email', contactInfo)

  function getCheck(event) {
    setValidation(event)
  }

  function getDeclaration(event) {
    setDeclaration(event)
  }

  function getError() {
    if (validation === 'no_ruc') {
      setFail(false)
    }
    if (validation === null || declaration === false) {
      return ' Por favor completa la información requerida en la pantalla para que puedas continuar con el trámite'
    }
    if (validation === 'si_ruc' && fail === false) {
      return ' Por favor completa la información requerida en la pantalla para que puedas continuar con el trámite'
    } else {
      setFail(false)
      return ''
    }
  }

  function getFail(event) {
    setFail(event)
  }

  function click(event) {
    if (event === 'next') {
      const error = getError()
      setMessageValidation(error)
      if (error) {
        handleShowModalValidation()
      } else {
        setRedirection(true)
        window.scrollTo(0, 0)
      }
    } else if (event === 'return') {
      setBackRedirection(true)
      window.scrollTo(0, 0)
    }
  }

  return (
    <>
      {isLoadingProfiling || isLoadingContactInfo ? (
        <Loading />
      ) : (
        <>
          <CardGray>
            {(profiling.regime === profilingValue[0].value || profiling.regime === profilingValue[1].value) && (
              <Header
                title="Etapa 01: Pre - Requisitos"
                text="Trámite de jubilación anticipada por desempleo (REJA) y/o retiro de hasta el 95.5% de tu fondo."
              />
            )}
            {(profiling.regime === profilingValue[2].value || profiling.regime === profilingValue[3].value) && (
              <Header
                title="Etapa 01: Pre - Requisitos"
                text="Trámite de jubilación por edad Legal y/o retiro de hasta el 95.5% de tu fondo."
              />
            )}
          </CardGray>
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
          <WhiteCard>
            <ContentText />
            <CardContainer onChange={getCheck} />
            <SelectOption validation={validation} email={email} businessDay={businessDays} onChange={getFail} />
            <ContainerText onChange={getDeclaration} />
          </WhiteCard>
          <ContentPaginator onClick={click} />
        </>
      )}
      {redirection && <Redirect to="/proceso95-5/homeAdvice"></Redirect>}
      {backRedirection && <Redirect to="/proceso95-5/dataValidation"></Redirect>}
    </>
  )
}

export default ValidationRuc
