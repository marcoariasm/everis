import React, { useEffect, useState } from 'react'

import usePerfilamiento from 'modules/Retirement955/api/Perfilamiento/usePerfilamiento'

import WhiteCard from 'shared/components/WhiteCard'
import { Loading } from 'global/components/Loading'
import { ButtonPrincipal, ContentButton, ContentImage } from './style'
import { FailsText } from 'pages/NotAccess/FailsText'
import { TextSecundary } from './TextSecundary'
import CardGray from 'shared/components/CardGrey'

import ErrorAcceso from 'shared/images/error.svg'
import { prop } from 'ramda'

function NotAccess() {
  const { isLoading, isError } = usePerfilamiento()
  const [options, setOptions] = useState([
    { noBalance: false, fails: false, noRequisites: false, textFail: '', arrayFails: [] },
  ])
  const [noBalanceOption, setNoBalanceOption] = useState(false)
  const [failsOption, setFailsOption] = useState(false)
  const [noRequisitesOption, setNoRequisitesOption] = useState(false)
  const [textFailOption, setTextFailOption] = useState('')

  const primaryText = {
    noBalance:
      'No puedes realizar el trámite de Jubilación y/o Retiro de hasta el 95.5% de tu fondo,  porque no tienes saldo en tu cuenta.',
    fails:
      'No cumples con los requisitos para realizar el trámite de Jubilación y/o Retiro de hasta el 95.5% de tu fondo.',
    noRequisites:
      'Por el momento no puedes acceder al trámite de Jubilación Anticipada por Desempleo y/o Retiro de hasta el 95.5% de tu fondo, porque no cumples con los requisitos:',
    complementText:
      'Si quieres validar si calificas para el trámite de Jubilación Anticipada Ordinaria, acércate a cualquiera de nuestras agencias a nivel nacional. Saca previamente una cita llamando a Fono Prima al 615-7272.',
  }

  const textContentInfoFail = {
    noBalance:
      'Si tienes derecho al Bono de Reconocimiento comunícate con Fono Prima: Lima 615-7272 - Provincias 0-801-18010, para que te asesoren sobre el trámite a seguir.',
    fails: 'Para mayor información comunícate con Fono Prima: Lima 615-7272 - Provincias 0-801-18010.',
    complementText:
      'Si quieres validar si calificas para el trámite de Jubilación Anticipada Ordinaria, acércate a cualquiera de nuestras agencias a nivel nacional. Saca previamente una cita llamando a Fono Prima al 615-7272.',
  }

  useEffect(() => {
    if (!isLoading) {
      if (prop('errors', prop('data', isError))) {
        const errorsList = prop('errors', prop('data', isError)).map((item) => {
          if (item.code === 'CD3' && item.error === true) {
            setNoBalanceOption(true)
            setTextFailOption(textContentInfoFail.noBalance)
          } else {
            if (item.code === 'CD1' || item.code === 'CD2') {
              setFailsOption(true)
              setTextFailOption(textContentInfoFail.fails)
            } else {
              setNoRequisitesOption(true)
              setTextFailOption(textContentInfoFail.complementText)
            }
          }
          return {
            noBalance: noBalanceOption,
            fails: failsOption,
            noRequisites: noRequisitesOption,
            textFail: textFailOption,
            arrayFails: prop('errors', prop('data', isError)),
          }
        })
        setOptions(errorsList[0])
      }
    }
  }, [prop('errors', prop('data', isError))])

  return (
    <>
      {isLoading && options.textFail !== '' ? (
        <Loading />
      ) : (
        <WhiteCard marginT="83px">
          <CardGray classButton="card-gray">
            <ContentImage>
              <img src={ErrorAcceso} alt="Error de Acceso" />
            </ContentImage>
            {options.fails && <FailsText texto={primaryText.fails} textError={options.fails} />}
            {options.noBalance && <FailsText texto={primaryText.noBalance} textError={options.fails} />}
            {options.noRequisites && (
              <FailsText texto={primaryText.noRequisites} textError="" arrayFails={options.arrayFails} />
            )}
          </CardGray>
          {options.noRequisites && (
            <CardGray>
              <TextSecundary text={primaryText.complementText} />
            </CardGray>
          )}
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

export default NotAccess
