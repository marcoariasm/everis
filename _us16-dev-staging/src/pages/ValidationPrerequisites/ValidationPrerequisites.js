import React from 'react'
import styled from 'styled-components'
import { prop, path } from 'ramda'

import useInformation from 'modules/Retirement955/api/Globales/useInformation'
import usePerfilamiento from 'modules/Retirement955/api/Perfilamiento/usePerfilamiento'
import useAfiliado from 'modules/Retirement955/api/Afiliado/useAfiliado'

import { textValiDPrerequisites } from 'shared/constant/ConstantValidationPrerequisites'
import { profilingValue, DATA_UIT } from 'shared/constant/Parameters'

import WhiteCard from 'shared/components/WhiteCard'
import { Username } from 'pages/ValidationPrerequisites/Username'
import { Loading } from 'global/components/Loading'
import { InformationText } from 'pages/ValidationPrerequisites/InformationText/'
import Header from 'shared/components/Header'
import { Footer } from 'pages/ValidationPrerequisites/Footer'
import CardGray from 'shared/components/CardGrey'
import { CardContainer } from 'pages/ValidationPrerequisites/CardContainer'

const ContainerErrorStyled = styled.div`
  padding: 4rem;
  background: white;
  text-align: center;
  margin: 4rem;
`

const ContainerCardSimple = styled.div`
  display: grid;
  flex-direction: column;
  align-content: space-between;
`
const defaultErrorMessage = 'Lo sentimos, hubo un error inesperado. Intenta nuevamente en unos minutos.'

function ValidationPrerequisites() {
  const { profiling, isLoading: isLoadingProfiling, isError: isProfilingError } = usePerfilamiento()
  const { affiliate, isLoading: isLoadingAffiliate, isError: isAffiliateError } = useAfiliado()
  const { information, isLoading: isLoadingInformation, isError: isInformationError } = useInformation(DATA_UIT)

  const isLoadingData = () => isLoadingProfiling || isLoadingAffiliate || isLoadingInformation
  const isErrorData = () => isProfilingError || isAffiliateError || isInformationError

  const getErrorComponent = () => <ContainerErrorStyled>{defaultErrorMessage}</ContainerErrorStyled>
  const getMainContent = () => (
    <>
      <CardGray>
        {prop('regime', profiling) === path([0, 'value'], profilingValue) && (
          <Header
            title="Etapa 01: Pre - Requisitos"
            text="Trámite de jubilación anticipada por desempleo (REJA) y/o retiro de hasta el 95.5% de tu fondo."
          />
        )}
        {(profiling.regime === profilingValue[1].value || profiling.regime === profilingValue[2].value) && (
          <Header
            title="Etapa 01: Pre - Requisitos"
            text="Trámite de jubilación por edad Legal y/o retiro de hasta el 95.5% de tu fondo."
          />
        )}
      </CardGray>
      <WhiteCard>
        {(profiling.regime === profilingValue[0].value || profiling.regime === profilingValue[1].value) && (
          <>
            <Username user={affiliate?.firstName} text={textValiDPrerequisites.reja.subtitle} />
            <CardContainer>
              <CardGray classButton="card-gray">
                <InformationText
                  title={textValiDPrerequisites.reja.titleCardOne}
                  text={textValiDPrerequisites.reja.textCardOne}
                />
              </CardGray>
              <CardGray classButton="card-gray">
                <InformationText
                  title={textValiDPrerequisites.reja.titleCardTwo}
                  text={textValiDPrerequisites.reja.textCardTwo}
                  value={prop('UIT_AMOUNT', information)}
                />
              </CardGray>
            </CardContainer>
          </>
        )}
        {(profiling.regime === profilingValue[2].value || profiling.regime === profilingValue[3].value) && (
          <>
            <Username user={affiliate?.firstName} text={textValiDPrerequisites.legal.subtitle} />
            <ContainerCardSimple>
              <CardGray classButton="card-gray">
                <InformationText
                  title={textValiDPrerequisites.legal.titleCardOne}
                  text={textValiDPrerequisites.legal.textCardOne}
                />
              </CardGray>
            </ContainerCardSimple>
          </>
        )}
        <Footer gender={affiliate.gender} />
      </WhiteCard>
    </>
  )

  const getContent = () => (isErrorData() ? getErrorComponent() : getMainContent())

  return <>{isLoadingData() ? <Loading /> : getContent()}</>
}

export default ValidationPrerequisites
