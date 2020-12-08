import React from 'react';
import moment from 'moment';
import { filter, find, head, pipe, prop, propEq, propOr, toLower } from 'ramda';

import { profilingValue } from 'modules/Retirement955/constants/Parameters';
import { toCamelCase } from 'modules/shared/helpers/HelperForm';

export const MountMax100K = ({
	affiliate,
	infoContact,
	dateFinancial,
	day,
	financialAdviceDetails,
	dataCoorporation,
}) => {
	const getDocumentValidationPending = () =>
		pipe(prop('validations'), find(propEq('validation', 'DOCUMENTO')), prop('pending'))(financialAdviceDetails);
	const getSunatValidationPending = () =>
		pipe(prop('validations'), find(propEq('validation', 'SUNAT')), prop('pending'))(financialAdviceDetails);
	const getAdvisoryValidationPending = () =>
		pipe(prop('validations'), find(propEq('validation', 'CONTACTO')), prop('pending'))(financialAdviceDetails);
	const getRucAccepted = () =>
		pipe(
			prop('statements'),
			find(propEq('statement', 'LEGAL_PERSON_DECLARATION')),
			prop('accepted')
		)(financialAdviceDetails);
	const getPhoneAffiliate = () =>
		prop('number', pipe(filter(propEq('type', 'MOBILE_PHONE')), head)(propOr([], 'phones', infoContact)));
	const getRegime = () => prop('regime', financialAdviceDetails);
	const email = toLower(propOr('', 'email', infoContact));

	return (
		<>
			{(getRegime() === profilingValue[1].value ||
				getRegime() === profilingValue[2].value ||
				getRegime() === profilingValue[3].value) &&
				getAdvisoryValidationPending() === false && (
					<span className='bodyText'>
						Hola {toCamelCase(affiliate.firstName)}, el{' '}
						<strong>{moment(financialAdviceDetails.registrationDate).format('DD/MM/YYYY')}</strong> realizaste la
						Etapa 1 del trámite de jubilación y/o retiro de hasta el 95.5% de tu fondo.
					</span>
				)}
			{(((getRegime() === profilingValue[1].value ||
				getRegime() === profilingValue[2].value ||
				getRegime() === profilingValue[3].value) &&
				getAdvisoryValidationPending() === true) ||
				(getRegime() === profilingValue[0].value &&
					getSunatValidationPending() === true &&
					getAdvisoryValidationPending() === true) ||
				(getRegime() === profilingValue[0].value &&
					getSunatValidationPending() === false &&
					getAdvisoryValidationPending() === true)) && (
				<span className='bodyText'>
					Hola {toCamelCase(affiliate.firstName)}, el{' '}
					<strong>{moment(financialAdviceDetails.registrationDate).format('DD/MM/YYYY')}</strong> finalizaste la
					primera parte de la asesoría virtual para iniciar el trámite de jubilación y/o retiro de hasta el 95.5%
					de tu fondo.
				</span>
			)}
			{getRegime() === profilingValue[0].value &&
				getSunatValidationPending() === false &&
				getAdvisoryValidationPending() === false && (
					<span className='bodyText'>
						Hola {toCamelCase(affiliate.firstName)}, el{' '}
						<strong>{moment(financialAdviceDetails.registrationDate).format('DD/MM/YYYY')}</strong> recibiste la
						Asesoría Virtual para el trámite de jubilación y/o retiro de hasta el 95.5% de tu fondo.
					</span>
				)}
			{getRegime() === profilingValue[0].value &&
				getSunatValidationPending() === true &&
				getAdvisoryValidationPending() === false && (
					<span className='bodyText'>
						Hola {toCamelCase(affiliate.firstName)}, el{' '}
						<strong>{moment(financialAdviceDetails.registrationDate).format('DD/MM/YYYY')}</strong> iniciaste la
						Etapa 1 del trámite de jubilación y/o retiro de hasta el 95.5% de tu fondo.
					</span>
				)}
			{(((getRegime() === profilingValue[1].value ||
				getRegime() === profilingValue[2].value ||
				getRegime() === profilingValue[3].value) &&
				getAdvisoryValidationPending() === false) ||
				(getRegime() === profilingValue[0].value &&
					getSunatValidationPending() === false &&
					getAdvisoryValidationPending() === false)) && (
				<span className='bodyText'>
					Si tomaste una decisión, ingresa a nuestra página web a "Mis Trámites Virtuales", opción: Etapa 2 -
					Decisión para jubilación y/o retiro 95.5%, para que continúes con tu trámite.
				</span>
			)}
			{(((getRegime() === profilingValue[1].value ||
				getRegime() === profilingValue[2].value ||
				getRegime() === profilingValue[3].value) &&
				getAdvisoryValidationPending() === true) ||
				(getRegime() === profilingValue[0].value &&
					getRucAccepted() === false &&
					getDocumentValidationPending() === false &&
					getAdvisoryValidationPending() === true) ||
				(getRegime() === profilingValue[0].value &&
					getRucAccepted() === true &&
					getSunatValidationPending() === false &&
					getAdvisoryValidationPending() === true)) && (
				<span className='bodyText'>
					Para continuar, te brindaremos una asesoría personalizada para absolver tus dudas y acompañarte en tu
					proceso de decisión. Te llamaremos en un plazo máximo de {day} días útiles a tu celular registrado:{' '}
					{getPhoneAffiliate()}.
				</span>
			)}
			{getRegime() === profilingValue[0].value &&
				getRucAccepted() === false &&
				getDocumentValidationPending() === true &&
				getAdvisoryValidationPending() === true && (
					<span className='bodyText'>
						Estamos validando con SUNAT el Reporte Tributario de Rentas de Cuarta Categoría. Asimismo, te
						brindaremos una asesoría personalizada para absolver tus dudas y acompañarte en tu proceso de decisión.
						Te llamaremos en un plazo máximo de {day} días útiles a tu celular registrado: {getPhoneAffiliate()}.
					</span>
				)}
			{getRegime() === profilingValue[0].value &&
				getRucAccepted() === false &&
				getDocumentValidationPending() === true &&
				getAdvisoryValidationPending() === false && (
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
			{getRegime() === profilingValue[0].value &&
				getRucAccepted() === true &&
				getSunatValidationPending() === true &&
				getAdvisoryValidationPending() === true && (
					<span className='bodyText'>
						Estamos validando con SUNAT que no cuentes con RUC. Asimismo, te brindaremos una asesoría personalizada
						para absolver tus dudas y acompañarte en tu proceso de decisión. Te llamaremos en un plazo máximo de{' '}
						{day} días útiles a tu celular registrado: {getPhoneAffiliate()}.
					</span>
				)}
			{getRegime() === profilingValue[0].value &&
				getRucAccepted() === true &&
				getSunatValidationPending() === true &&
				getAdvisoryValidationPending() === false && (
					<span className='bodyText'>
						Estamos validando con SUNAT que no cuentes con RUC. De estar conforme,
						<strong>
							{' '}
							el {moment(dateFinancial).format('DD/MM/YYYY')} recibirás la Constancia de Asesoría en {email}.{' '}
						</strong>
						Recibida la constancia, podrás continuar con la Etapa 2 del trámite ingresando a nuestra página web a
						"Mis Trámites Virtuales", opción: Etapa 2 - Decisión para jubilación y/o retiro 95.5%.
					</span>
				)}
		</>
	);
};
