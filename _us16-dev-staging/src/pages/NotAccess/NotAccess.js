import React from 'react'
import usePerfilamiento from 'api/Perfilamiento/usePerfilamiento'
import WhiteCard from 'shared/components/WhiteCard'
import ContentText from 'pages/NotAccess/components/MainSection/ContentText'
import ContentTextAditional from 'pages/NotAccess/components/MainSection/ContentTextAditional'
import ContentImage from 'pages/NotAccess/components/MainSection/ContentImage'
import ContentButton from 'pages/NotAccess/components/FooterSection/ContentButton'
import CardGray from 'shared/components/CardGrey'

function NotAccess() {
  const { perfilamiento } = usePerfilamiento()
  let noBalance = false
  let fails = false
  let noRequisites = false
  let textFail = ''

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
  if (perfilamiento) {
    if (perfilamiento.length === 1) {
      switch (perfilamiento[0].message) {
        case '65 anios sin saldo en su cuenta CIC':
          noBalance = true
          textFail = textContentInfoFail.noBalance
          break
        case 'Afiliado fallecido':
          fails = true
          textFail = textContentInfoFail.fails
          break
        case 'Afiliado con Invalidez':
          fails = true
          textFail = textContentInfoFail.fails
          break
        case 'Afiliado Pensionista':
          fails = true
          textFail = textContentInfoFail.fails
          break
        default:
          return null
      }
    } else {
      noRequisites = true
    }
  }

  return (
    <WhiteCard>
      <CardGray classButton="card-gray">
        <ContentImage />
        {fails && <ContentText texto={primaryText.fails} textError={textFail} />}
        {noBalance && <ContentText texto={primaryText.noBalance} textError={textFail} />}
        {noRequisites && <ContentText texto={primaryText.noRequisites} textError="" />}
      </CardGray>

      <CardGray>
        <ContentTextAditional texto={primaryText.complementText} />
      </CardGray>
      <ContentButton
        classButton="btn-pagina-principal"
        texto="Volver a la página principal"
        widthB="21px"
        heightB="15px"
        url="https://primazonasegura.prima.com.pe/PrimaWeb/zona-transaccional/afiliados/mis-datos-contrasenas/actualiza-tus-datos/"
      />
    </WhiteCard>
  )
}

export default NotAccess
