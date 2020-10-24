import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import usePerfilamiento from 'modules/Retirement955/api/Perfilamiento/usePerfilamiento'
import useTotalBalance from 'modules/Retirement955/api/Globales/useTotalBalance'
import useGetBusinessDays from 'modules/Retirement955/customHooks/useGetBusinessDays'
import useContactInfo from 'modules/Retirement955/api/Afiliado/useContactInfo'

import WhiteCard from 'shared/components/WhiteCard'
import { Loading } from 'global/components/Loading'
import { HeaderMain } from './HeaderMain'
import Header from 'shared/components/Header'
import { GridAdvisoryInformation } from './GridAdvisoryInformation'
import ContentButton from './FooterSection/ContentButton'
import CardGray from 'shared/components/CardGrey'

const currentDay = new Date()

export default function CompletionOfAdvisory() {
  const { profiling, isLoading: isLoadingProfiling } = usePerfilamiento()
  const { totalBalance, isLoading: isLoadingTotalBalance } = useTotalBalance()
  const { contactInfo } = useContactInfo()

  const businessDays = useGetBusinessDays(currentDay, 0)
  const checkNoRuc = useSelector((state) => state.advisor.checkNoRuc)

  const days = moment(businessDays).format('DD/MM/YYYY')
  const email = contactInfo && contactInfo.email
  const mount = totalBalance && totalBalance.totalAmount

  return (
    <>
      {isLoadingProfiling || isLoadingTotalBalance ? (
        <Loading />
      ) : (
        <>
          <CardGray>
            <Header title="Etapa 01: Asesoría" text="" />
          </CardGray>
          <WhiteCard>
            <HeaderMain mount={mount} />
            <GridAdvisoryInformation
              amount={mount}
              days={days}
              email={email}
              profile={profiling.regime}
              ruc={checkNoRuc}
            />
            <ContentButton />
          </WhiteCard>
        </>
      )}
    </>
  )
}
