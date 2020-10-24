import React from "react"
import moment from "moment"

import useFinancialAdviceDetails from "modules/Retirement955/api/Afiliado/useFinancialAdviceDetails"
import useDataCoorporation from "modules/Retirement955/api/Globales/useDataCoorporation"
import useContactInfo from "modules/Retirement955/api/Afiliado/useContactInfo"
import useAfiliado from "modules/Retirement955/api/Afiliado/useAfiliado"

import useGetBusinessDays from "modules/Retirement955/customHooks/useGetBusinessDays"

import WhiteCard from "shared/components/WhiteCard"
import { TextAdvisory } from "./TextAdvisory"
import { Loading } from "global/components/Loading"
import { ButtonPrincipal, ContentButton, ContentImage } from "./style"
import CardGray from "shared/components/CardGrey"

import Validacion from "shared/images/validacion.svg"

function RegisteredAdvice() {
  const { financialAdviceDetail, isLoading: isLoadingFinancialAdvice } = useFinancialAdviceDetails()
  const { dataCoorporation, isLoading: isLoadingDataCoorporation } = useDataCoorporation()
  const { contactInfo, isLoading: isLoadingContactInfo } = useContactInfo()
  const { affiliate, isLoading: isLoadingAffiliate } = useAfiliado()

  const businessDays = useGetBusinessDays(new Date(), 0)
  const days = moment(businessDays).format("DD/MM/YYYY")

  return (
    <>
      {isLoadingFinancialAdvice || isLoadingAffiliate || isLoadingContactInfo || isLoadingDataCoorporation ? (
        <Loading />
      ) : (
        <WhiteCard marginT="83px">
          <CardGray classButton="card-gray">
            <ContentImage>
              <img src={Validacion} alt="Validacion" />
            </ContentImage>
            <TextAdvisory
              affiliate={affiliate}
              contactInfo={contactInfo}
              day={days}
              financialAdviceDetail={financialAdviceDetail}
              dataCoorporation={dataCoorporation}
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
      )}
    </>
  )
}

export default RegisteredAdvice
