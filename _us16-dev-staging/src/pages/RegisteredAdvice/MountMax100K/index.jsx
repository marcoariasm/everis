import React from 'react'
import moment from 'moment'
import { prop, path } from 'ramda'

export const MountMax100K = ({ affiliate, contactInfo, day, financialAdviceDetail, dataCoorporation }) => {
  const getEmailAffiliate = () => path([0, 'email', 1, 'value'], contactInfo)
  const getFirstValidationSunatPending = () => path(['validations', 0, 'pending'], financialAdviceDetail)
  const getFirstValidationAsesoriaPending = () => path(['validations', 2, 'pending'], financialAdviceDetail)
  const getFirstCorporationStatementAccepted = () => path(['statements', 0, 'accepted'], dataCoorporation)
  const getPhoneAffiliate = () => prop(['phones'], contactInfo)
  const getRegime = () => prop('regime', financialAdviceDetail)

  return (
    <>
      {getRegime() === 'Legal_Age' && getFirstValidationAsesoriaPending() === false && (
        <span className="bodyText">
          Hola {affiliate.firstName}, el{' '}
          <strong>{moment(financialAdviceDetail.registrationDate).format('DD/MM/YYYY')}</strong> realizaste la
          Etapa 1 del trámite de jubilación y/o retiro de hasta el 95.5% de tu fondo.
        </span>
      )}
      {((getRegime() === 'Legal_Age' && getFirstValidationAsesoriaPending() === true) ||
        (getRegime() === 'Reja' &&
          getFirstValidationSunatPending() === true &&
          getFirstValidationAsesoriaPending() === true) ||
        (getRegime() === 'Reja' &&
          getFirstValidationSunatPending() === false &&
          getFirstValidationAsesoriaPending() === true)) && (
        <span className="bodyText">
          Hola {affiliate.firstName}, el{' '}
          <strong>{moment(financialAdviceDetail.registrationDate).format('DD/MM/YYYY')}</strong> finalizaste la
          primera parte de la asesoría virtual para iniciar el trámite de jubilación y/o retiro de hasta el 95.5%
          de tu fondo.
        </span>
      )}
      {getRegime() === 'Reja' &&
        getFirstValidationSunatPending() === false &&
        getFirstValidationAsesoriaPending() === false && (
          <span className="bodyText">
            Hola {affiliate.firstName}, el{' '}
            <strong>{moment(financialAdviceDetail.registrationDate).format('DD/MM/YYYY')}</strong> recibiste la
            Asesoría Virtual para el trámite de jubilación y/o retiro de hasta el 95.5% de tu fondo.
          </span>
        )}
      {getRegime() === 'Reja' &&
        getFirstValidationSunatPending() === true &&
        getFirstValidationAsesoriaPending() === false && (
          <span className="bodyText">
            Hola {affiliate.firstName}, el{' '}
            <strong>{moment(financialAdviceDetail.registrationDate).format('DD/MM/YYYY')}</strong> iniciaste la
            Etapa 1 del trámite de jubilación y/o retiro de hasta el 95.5% de tu fondo.
          </span>
        )}
      {((getRegime() === 'Legal_Age' && getFirstValidationAsesoriaPending() === false) ||
        (getRegime() === 'Reja' &&
          getFirstValidationSunatPending() === false &&
          getFirstValidationAsesoriaPending() === false)) && (
        <span className="bodyText">
          Si tomaste una decisión, continua con la Etapa 2 del trámite sacando tu cita al 615-7272 en Lima o al
          0-801-18010 desde provincias.
        </span>
      )}
      {((getRegime() === 'Legal_Age' && getFirstValidationAsesoriaPending() === true) ||
        (getRegime() === 'Reja' &&
          getFirstValidationSunatPending() === false &&
          getFirstValidationAsesoriaPending() === true)) && (
        <span className="bodyText">
          Para continuar, te brindaremos una asesoría personalizada para absolver tus dudas y acompañarte en tu
          proceso de decisión. Te llamaremos en un plazo máximo de 2 días útiles a tu celular registrado:{' '}
          {getPhoneAffiliate()}.
        </span>
      )}
      {getRegime() === 'Reja' &&
        getFirstCorporationStatementAccepted() === false &&
        getFirstValidationSunatPending() === true &&
        getFirstValidationAsesoriaPending() === true && (
          <span className="bodyText">
            Estamos validando con SUNAT el Reporte Tributario de Rentas de Cuarta Categoría. Asimismo, te
            brindaremos una asesoría personalizada para absolver tus dudas y acompañarte en tu proceso de decisión.
            Te llamaremos en un plazo máximo de 2 días útiles a tu celular registrado: {getPhoneAffiliate()}.
          </span>
        )}
      {getRegime() === 'Reja' &&
        getFirstCorporationStatementAccepted() === false &&
        getFirstValidationSunatPending() === true &&
        getFirstValidationAsesoriaPending() === false && (
          <span className="bodyText">
            Estamos validando con SUNAT el Reporte Tributario de Rentas de Cuarta Categoría. De estar conforme,
            <strong>
              {' '}
              el
              {day} recibirás la Constancia de Asesoría en {getEmailAffiliate()}.{' '}
            </strong>
            Recibida la constancia, podrás continuar con la Etapa 2 del trámite sacando tu cita al 615-7272 en Lima
            o al 0-801-18010 desde provincias.
          </span>
        )}
      {getRegime() === 'Reja' &&
        getFirstCorporationStatementAccepted() === true &&
        getFirstValidationSunatPending() === true &&
        getFirstValidationAsesoriaPending() === true && (
          <span className="bodyText">
            Estamos validando con SUNAT que no cuentes con RUC. Asimismo, te brindaremos una asesoría personalizada
            para absolver tus dudas y acompañarte en tu proceso de decisión. Te llamaremos en un plazo máximo de 2
            días útiles a tu celular registrado: {getPhoneAffiliate()}.
          </span>
        )}
      {getRegime() === 'Reja' &&
        getFirstCorporationStatementAccepted() === true &&
        getFirstValidationSunatPending() === true &&
        getFirstValidationAsesoriaPending() === false && (
          <span className="bodyText">
            Estamos validando con SUNAT que no cuentes con RUC. De estar conforme,
            <strong>
              {' '}
              el {day} recibirás la Constancia de Asesoría en {getEmailAffiliate()}.{' '}
            </strong>
            Recibida la constancia, podrás continuar con la Etapa 2 del trámite sacando tu cita al 615-7272 en Lima
            o al 0-801-18010 desde provincias.
          </span>
        )}
    </>
  )
}
