import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { size } from 'shared/styles/Responsive'

import CardInformationGray from 'pages/ValidationRuc/components/MainSection/CardInformationGray'
import CardGray from 'shared/components/CardGrey'
import CardUploadFile from 'pages/ValidationRuc/components/MainSection/CardUploadFile'

const Container = styled.div`
  margin-top: 18px;
  & > div {
    padding: 35px 25px 30px 25px;
  }
  @media screen and (min-width: ${size.tablet}) {
    & > div {
      padding: 45px 50px 55px 50px;
    }
  }
`

const SelectOption = ({ validation, businessDay, email, onChange }) => {
  return (
    <Container>
      {validation === 'no_ruc' && (
        <CardGray classButton="card-gray-dashed">
          <CardInformationGray
            title="Validaremos tu respuesta con SUNAT"
            text={`De no estar conforme, el ${moment(businessDay).format(
              'DD/MM/YYYY'
            )} te notificaremos a tu correo electrónico ${email} que no podrás continuar con el trámite.`}
          />
        </CardGray>
      )}
      {validation === 'si_ruc' && <CardUploadFile businessDay={businessDay} email={email} onChange={onChange} />}
    </Container>
  )
}

export default SelectOption
