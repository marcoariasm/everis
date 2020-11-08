import React, { useEffect, useState } from 'react'
import { prop } from 'ramda'

import useInformation from 'modules/Retirement955/api/Globales/useInformation'
import useFinancialAdvice from 'modules/Retirement955/api/Afiliado/useFinancialAdvice'
import useFinancialAdviceDetails from 'modules/Retirement955/api/Afiliado/useFinancialAdviceDetails'
import useContactInfo from 'modules/Retirement955/api/Afiliado/useAffiliateContact'
import useAfiliado from 'modules/Retirement955/api/Afiliado/useAfiliado'

import { BUSINESS_DAY, DATA_CORPORATION } from 'modules/Retirement955/constants/Parameters'

import WhiteCard from 'modules/shared/components/WhiteCard'
import { TextAdvisory } from './TextAdvisory'
import { Loading } from 'global/components/v1/Loading'
import ErrorMessage from 'modules/Retirement955/commons/ErrorMessage'
import { ButtonPrincipal, ContentButton, ContentImage } from './style'
import CardGray from 'modules/shared/components/CardGrey'

import Validacion from 'shared/images/validacion.svg'

function RegisteredAdvice() {
  const { financialAdvice, isLoading: isLoadingFinancialAdvice } = useFinancialAdvice()
  const { information: informationDay, isLoading: isLoadingInformationDay } = useInformation(BUSINESS_DAY)
  const { information, isLoading: isLoadingInformation } = useInformation(DATA_CORPORATION)
  const { contactInfo } = useContactInfo({
    authenticated: false,
  })
  const { affiliate, isLoading: isLoadingAffiliate } = useAfiliado()

  const financialAdviceId = prop('procedureId', financialAdvice)

  const { financialAdviceDetails, idLoading: isLoadingFinancialAdviceDetails } = useFinancialAdviceDetails(
    financialAdviceId
  )

  const days = prop('LIMIT_DAYS', informationDay)
  const [selectOptions, setSelectOptions] = useState([])

  useEffect(() => {
    if (contactInfo.data) {
      const options = {
        phones: contactInfo.data.phones,
        email: contactInfo.data.email,
      }
      setSelectOptions(options)
    }
  }, [contactInfo.data])

  if (
    isLoadingFinancialAdvice ||
    isLoadingFinancialAdviceDetails ||
    isLoadingAffiliate ||
    contactInfo.Loading ||
    isLoadingInformation ||
    isLoadingInformationDay
  ) {
    return <Loading />
  }
  return (
    <WhiteCard marginT="83px">
      <CardGray classButton="card-gray">
        <ContentImage>
          <img src={Validacion} alt="Validacion" />
        </ContentImage>
        <TextAdvisory
          affiliate={affiliate}
          infoContact={selectOptions}
          day={days}
          financialAdviceDetails={financialAdviceDetails}
          dataCoorporation={information}
        />
      </CardGray>
      <ContentButton>
        <ButtonPrincipal
          href="https://www.prima.com.pe/wcm/portal/PrimaAFP/inicio"
          target="blank"
          widthB="21px"
          heightB="15px"
        >
          Volver a la página principal
        </ButtonPrincipal>
      </ContentButton>
    </WhiteCard>
  )
}

export default RegisteredAdvice
