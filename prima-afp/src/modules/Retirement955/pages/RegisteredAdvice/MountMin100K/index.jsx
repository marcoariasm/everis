import React from 'react';
import moment from 'moment';
import { find, path, pipe, prop, propEq, propOr, toLower } from 'ramda';

import { profilingValue } from 'modules/Retirement955/constants/Parameters';
import { toCamelCase } from 'modules/shared/helpers/HelperForm';

export const MountMin100K = ({
	affiliate,
	dataCoorporation,
	dateFinancial,
	financialAdviceDetails,
	infoContact,
}) => {
	const getRegime = () => prop('regime', financialAdviceDetails);
	const getSunatValidationPending = () =>
		pipe(prop('validations'), find(propEq('validation', 'SUNAT')), prop('pending'))(financialAdviceDetails);
	const getDocumentValidationPending = () =>
		pipe(prop('validations'), find(propEq('validation', 'DOCUMENTO')), prop('pending'))(financialAdviceDetails);
	const getRucAccepted = () =>
		pipe(
			prop('statements'),
			find(propEq('statement', 'LEGAL_PERSON_DECLARATION')),
			prop('accepted')
		)(financialAdviceDetails);
	const email = toLower(propOr('', 'email', infoContact));

	return (
		<>
			{(getRegime() === profilingValue[1].value ||
				getRegime() === profilingValue[2].value ||
				getRegime() === profilingValue[3].value ||
				(getRegime() === profilingValue[0].value && getSunatValidationPending() === false)) && (
				<span className='bodyText'>
					Hola {toCamelCase(affiliate.firstName)}, el{' '}
					<strong>{moment(financialAdviceDetails.registrationDate).format('DD/MM/YYYY')}</strong> realizaste la
					Etapa 1 del trámite de jubilación y/o retiro de hasta el 95.5% de tu fondo.
				</span>
			)}
			{getRegime() === profilingValue[0].value && getSunatValidationPending() === true && (
				<span className='bodyText'>
					Hola {toCamelCase(affiliate.firstName)}, el{' '}
					<strong>{moment(financialAdviceDetails.registrationDate).format('DD/MM/YYYY')}</strong> iniciaste la
					Etapa 1 del trámite de jubilación y/o retiro de hasta el 95.5% de tu fondo.
				</span>
			)}
			{((getRegime() === profilingValue[0].value && getSunatValidationPending() === false) ||
				getRegime() === profilingValue[1].value ||
				getRegime() === profilingValue[2].value ||
				getRegime() === profilingValue[3].value) && (
				<span className='bodyText'>
					Si tomaste una decisión, ingresa a nuestra página web a "Mis Trámites Virtuales", opción: Etapa 2 -
					Decisión para jubilación y/o retiro 95.5%, para que continúes con tu trámite.
				</span>
			)}
			{getRegime() === profilingValue[0].value &&
				getDocumentValidationPending() === true &&
				getRucAccepted() === false && (
					<span className='bodyText'>
						Estamos validando con SUNAT el Reporte Tributario de Rentas de Cuarta Categoría. De estar conforme,
						<strong>
							{' '}
							el {moment(dateFinancial).format('DD/MM/YYYY')} recibirás la Constancia de Asesoría en {email}.{' '}
						</strong>
						Recibida la constancia, podrás continuar con la Etapa 2 del trámite ingresando a nuestra página web a
						"Mis Trámites Virtuales", opción: Etapa 2 - Decisión para jubilación y/o retiro 95.5%.
					</span>
				)}
			{getSunatValidationPending() === true && getRucAccepted() === true && (
				<span className='bodyText'>
					Estamos validando con SUNAT que no cuentes con RUC. De no haber observaciones,
					<strong>
						{' '}
						el {moment(dateFinancial).format('DD/MM/YYYY')} recibirás la Constancia de Asesoría en {email}.{' '}
					</strong>
					Recibida la constancia, podrás continuar con el trámite ingresando a nuestra página web a "Mis Trámites
					Virtuales", opción: Etapa 2 - Decisión para jubilación y/o retiro 95.5%.
				</span>
			)}
		</>
	);
};
