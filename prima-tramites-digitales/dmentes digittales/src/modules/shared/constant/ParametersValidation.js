export const fieldValidationConstraint = {
	firstName: {
		value: '',
		validation: [],
		required: true,
		isInLength: true,
		minLength: 3,
		maxLength: 25,
	},
	secondName: {
		value: '',
		validation: [],
		required: false,
		isInLength: true,
		minLength: 3,
		maxLength: 25,
	},
	surname: {
		value: '',
		validation: [],
		required: true,
		isInLength: true,
		minLength: 3,
		maxLength: 25,
	},
	motherSurname: {
		value: '',
		validation: [],
		required: true,
		isInLength: true,
		minLength: 3,
		maxLength: 25,
	},
	numberDocument: {
		value: '',
		validation: [],
		required: true,
		isInLength: true,
		minLength: 3,
		maxLength: 15,
	},
	birthDate: {
		value: '',
		validation: [],
		required: true,
		isInLength: true,
		minLength: 3,
		maxLength: 15,
	},
	password: {
		value: '',
		validation: [],
		required: true,
		isInLength: true,
		minLength: 3,
		maxLength: 4,
	},
};

export const typeDocument = [
	{ idParameter: '1' },
	{ idParameter: '2' },
	{ idParameter: '4' },
	{ idParameter: '3' },
	{ idParameter: '5' },
	{ idParameter: '6' },
	{ idParameter: '7' },
	{ idParameter: '8' },
];

export const typeDocumentLogin = [
	{ type: 'DNI' },
	{ type: 'FOREIGN_CARD' },
	{ type: 'PASSPORT' },
	{ type: 'TEENAGER_WORKING_CARD' },
	{ type: 'TEMPORARY_WORKING_PERMIT_CARD' },
	{ type: 'FOREIGN_RELATIONS_IDENTITY_CARD' },
	{ type: 'FOREIGN_IDENTITY_CARD' },
	{ type: 'REFUGEE_APPLICANT_CARD' },
];
