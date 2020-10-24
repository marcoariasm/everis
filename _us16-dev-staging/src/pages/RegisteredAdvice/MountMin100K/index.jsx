import React from 'react'
import moment from 'moment'
import { prop, path } from 'ramda'

export const MountMin100K = ({ affiliate, contactInfo, day, financialAdviceDetail, dataCoorporation }) => {
  const getRegime = () => prop('regime', financialAdviceDetail)
  const getFirstValidationPending = () => path(['validations', 0, 'pending'], financialAdviceDetail)
  const getFirstCorporationStatementAccepted = () => path(['statements', 0, 'accepted'], financialAdviceDetail)

  return (
    <>
      {(getRegime() === 'Legal_Age' || (getRegime() === 'Reja' && getFirstValidationPending() === false)) && (
        <span className="bodyText">
          Hola {affiliate.firstName}, el{' '}
          <strong>{moment(financialAdviceDetail.registrationDate).format('DD/MM/YYYY')}</strong> realizaste la
          Etapa 1 del trámite de jubilación y/o retiro de hasta el 95.5% de tu fondo.
        </span>
      )}
      {getRegime() === 'Reja' && getFirstValidationPending() === true && (
        <span className="bodyText">
          Hola {affiliate.firstName}, el{' '}
          <strong>{moment(financialAdviceDetail.registrationDate).format('DD/MM/YYYY')}</strong> iniciaste la Etapa
          1 del trámite de jubilación y/o retiro de hasta el 95.5% de tu fondo.
        </span>
      )}
      {((getRegime() === 'Reja' && getFirstValidationPending() === false) || getRegime() === 'Legal_Age') && (
        <span className="bodyText">
          Si tomaste una decisión, continua con la Etapa 2 del trámite sacando tu cita al 615-7272 en Lima o al
          0-801-18010 desde provincias.
        </span>
      )}
      {getFirstValidationPending() === true && getFirstCorporationStatementAccepted() === false && (
        <span className="bodyText">
          Estamos validando con SUNAT el Reporte Tributario de Rentas de Cuarta Categoría. De estar conforme,
          <strong>
            {' '}
            el {day} recibirás la Constancia de Asesoría en {contactInfo.email}.{' '}
          </strong>
          Recibida la constancia, podrás continuar con la Etapa 2 del trámite sacando tu cita al 615-7272 en Lima o
          al 0-801-18010 desde provincias.
        </span>
      )}
      {getFirstValidationPending() === true && getFirstCorporationStatementAccepted() === true && (
        <span className="bodyText">
          Estamos validando con SUNAT que no cuentes con RUC. De no haber observaciones,
          <strong>
            {' '}
            el {day} recibirás la Constancia de Asesoría en {contactInfo.email}.{' '}
          </strong>
          Recibida la constancia, podrás continuar con la Etapa 2 del trámite sacando tu cita al 615-7272 en Lima o
          al 0-801-18010 desde provincias.
        </span>
      )}
    </>
  )
}
