import moment from 'moment';
import { prop } from 'ramda';

import { typeDocument } from 'modules/shared/constant/ParametersValidation';
import { validarFecha } from 'modules/shared/helpers/HelperDate';

export const validateText = (e, datos) => {
	let id = e.target.id;

	if (id === 'surname' || id === 'motherSurname' || id === 'firstName' || id === 'secondName') {
		return true;
	} else if (id === 'documentType') {
		return true;
	} else if (
		id === 'documentNumber' &&
		(datos.documentType === 'DNI' ||
			datos.documentType === 'TEMPORARY_WORKING_PERMIT_CARD' ||
			datos.documentType === 'FOREIGN_RELATIONS_IDENTITY_CARD' ||
			datos.documentType === 'REFUGEE_APPLICANT_CARD')
	) {
		return numeric(e);
	} else if (
		(id === 'documentNumber' && datos.documentType === 'FOREIGN_CARD') ||
		(id === 'documentNumber' && datos.documentType === 'TEENAGER_WORKING_CARD') ||
		(id === 'documentNumber' && datos.documentType === 'PASSPORT') ||
		(id === 'documentNumber' && datos.documentType === 'FOREIGN_IDENTITY_CARD')
	) {
		return alfaNumeric(e);
	} else {
		return true;
	}
};

export const validateTextLogin = (e, type) => {
	let id = e.target.id;

	if (
		id === 'documentNumber' &&
		(type === 'DNI' ||
			type === 'TEMPORARY_WORKING_PERMIT_CARD' ||
			type === 'FOREIGN_RELATIONS_IDENTITY_CARD' ||
			type === 'REFUGEE_APPLICANT_CARD')
	) {
		return numeric(e);
	} else if (
		(id === 'documentNumber' && type === 'FOREIGN_CARD') ||
		(id === 'documentNumber' && type === 'TEENAGER_WORKING_CARD') ||
		(id === 'documentNumber' && type === 'PASSPORT') ||
		(id === 'documentNumber' && type === 'FOREIGN_IDENTITY_CARD')
	) {
		return alfaNumeric(e);
	} else {
		return true;
	}
};

const numeric = (e) => {
	let value = e.target.value;
	value = value.toLowerCase();
	let numbers = ' 0123456789';
	if (e.target.value === '') {
		return true;
	}
	if (value.charAt(0) === ' ') {
		return false;
	}
	for (let i in numbers) {
		if (value.charAt(value.length - 1) === numbers[i]) {
			return true;
		}
	}
};
const alfaNumeric = (e) => {
	let value = e.target.value;
	value = value.toLowerCase();
	let caracter = ' abcdefghijklmnñopqrstuvwxyzáóíúó0123456789-';
	if (e.target.value === '') {
		return true;
	}
	if (value.charAt(0) === ' ') {
		return false;
	}
	for (let i in caracter) {
		if (value.charAt(value.length - 1) === caracter[i]) {
			return true;
		}
	}
};

export function toCamelCase(values) {
	const newValues = values
		.toLowerCase()
		.replace(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]|\s[\u00C0-\u1FFF\u2C00-\uD7FF\w]/g, function (letter) {
			return letter.toUpperCase();
		});
	return newValues;
}

export const formValidationInput = (value) => {
	value = value
		.replace(/[^a-zA-Z'\s:\u00C0-\u00FF]/g, '')
		.replace('  ', ' ')
		.toUpperCase();

	return value;
};

export const validatedDocumentType = (id) => {
	switch (id) {
		case prop('type', typeDocument[0]):
		case prop('type', typeDocument[4]):
			return { pattern: '[0-9]', length: 8 };
		case prop('type', typeDocument[1]):
		case prop('type', typeDocument[2]):
		case prop('type', typeDocument[3]):
			return { pattern: '[a-zA-ZñÑ0-9]', length: 12 };
		case prop('type', typeDocument[4]):
		case prop('type', typeDocument[7]):
			return { pattern: '[0-9]', length: 9 };
		case prop('type', typeDocument[6]):
			return { pattern: '[0-9]', length: 13 };
		default:
			return { pattern: false, length: 8 };
	}
};

export const validateDate = (valueDate) => {
	const dateValidation = moment(valueDate).format('DD-MM-YYYY');
	let isCorrect = true;

	if (validarFecha(dateValidation)) {
		isCorrect = true;
	} else {
		isCorrect = false;
	}

	const currentDay = moment().format('DD/MM/YYYY');
	const newValueDate = moment(valueDate).format('DD/MM/YYYY');

	const dayCurrent = parseInt(currentDay.split('/')[0]);
	const monthCurrent = parseInt(currentDay.split('/')[1]);
	const yearCurrent = parseInt(currentDay.split('/')[2]);
	const day = parseInt(newValueDate.split('/')[0]);
	const month = parseInt(newValueDate.split('/')[1]);
	const year = parseInt(newValueDate.split('/')[2]);

	if (year < 1900 || year > yearCurrent) isCorrect = false;
	if (month < 1 || month > 12) isCorrect = false;
	if (newValueDate === currentDay && month > monthCurrent) isCorrect = false;
	if (newValueDate === currentDay && day > dayCurrent) isCorrect = false;
	if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) isCorrect = false;
	if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) isCorrect = false;
	if ((month === 1 || month === 3 || month === 5 || month === 10 || month === 12) && day > 30) isCorrect = false;
	if (month == 2 && day > 29) isCorrect = false;
	if (year % 4 !== 0 && month === 2 && day > 28) isCorrect = false;
	if (year % 4 === 0 && month === 2 && day > 29) isCorrect = false;

	return isCorrect;
};

export const getStringLengthPart = (value) => {
	let isError = true;
	value.startsWith('N') ? (isError = true) : (isError = false);
	return isError;
};
