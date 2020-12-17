import React from 'react'
import styled from 'styled-components'
import { prop } from 'ramda'

import useInformation from 'modules/Retirement955/api/Globales/useInformation'
import usePerfilamiento from 'modules/Retirement955/api/Perfilamiento/usePerfilamiento'
import useAfiliado from 'modules/Retirement955/api/Afiliado/useAfiliado'

import { textValiDPrerequisites } from 'modules/Retirement955/constants/ConstantValidationPrerequisites'
import { profilingValue, DATA_UIT } from 'modules/Retirement955/constants/Parameters'

import WhiteCard from 'modules/shared/components/WhiteCard'
import { Username } from 'modules/Retirement955/pages/ValidationPrerequisites/Username'
import { Loading } from 'global/components/v1/Loading'
import { InformationText } from 'modules/Retirement955/pages/ValidationPrerequisites/InformationText/'
import Header from 'modules/shared/components/Header'
import { Footer } from 'modules/Retirement955/pages/ValidationPrerequisites/Footer'
import CardGray from 'modules/shared/components/CardGrey'
import { CardContainer } from 'modules/Retirement955/pages/ValidationPrerequisites/CardContainer'

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
