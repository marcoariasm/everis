export const addBeneficiary = {
	typeDocument: [
		{
			value: '',
			label: 'Seleccionar tipo',
		},
		{
			value: 'DNI',
			label: 'DNI',
		},
		{
			value: 'CE',
			label: 'Carnet Extranjeria',
		},
		{
			value: 'PASSPORT',
			label: 'Pasaporte',
		},
		{
			value: 'CARNET_PERMISO_TEMPORAL_PERMANENCIA',
			label: 'Carnét del Permiso Temporal de Trabajo',
		},
		{
			value: 'CARNET_POLICIAL_MILITAR',
			label: 'Carnet Policial Militar',
		},
		{
			value: 'LIBRETA_ADELESCENTE_TRABAJO',
			label: 'Lib. Adolescente Trab.',
		},
	],

	gender: [
		{
			value: '',
			label: 'Seleccionar',
		},
		{
			value: 'Femenino',
			label: 'Femenino',
		},
		{
			value: 'Masculino',
			label: 'Masculino ',
		},
	],

	relationship: [
		{
			value: '',
			label: 'Seleccionar',
		},
		{
			value: 'CHILD',
			label: 'Hijo(a)',
		},

		{
			value: 'FATHER',
			label: 'Padre',
		},
		{
			value: 'MOTHER',
			label: 'Madre',
		},
		{
			value: 'SPOUSE',
			label: 'Cónyuge',
		},
		{
			value: 'CONCUBINE',
			label: 'Concubina',
		},
	],
	condition: [
		{
			value: '',
			label: 'Seleccionar',
		},
		{
			value: false,
			label: 'Sano',
		},
		{
			value: true,
			label: 'Inválido',
		},
	],
	validation: [
		{
			value: 'surname',
			label: 'Ingresa el apellido paterno',
		},
		{
			value: 'motherSurname',
			label: 'Ingresa el apellido materno',
		},
		{
			value: 'firstName',
			label: 'Ingresa el primer nombre',
		},
		{
			value: 'documentType',
			label: 'Selecciona tipo de documento',
		},
		{
			value: 'documentNumber',
			label: 'Ingresa el N° de documento',
		},
		{
			value: 'birthdate',
			label: 'Ingresa fecha de nacimiento',
		},
		{
			value: 'gender',
			label: 'Selecciona el sexo',
		},
		{
			value: 'relationship',
			label: 'Selecciona parentesco',
		},
		{
			value: 'hasDisability',
			label: 'Selecciona condición',
		},
	],
	customValidation: {
		samePerson: 'No puedes registrar dos veces al mismo Beneficiario, por favor verifica.',
		Children15YearsMin:
			'La edad de tu hijo(a) debe ser como mínimo 15 años menor que la tuya, por favor verifica.',
		ChildrenAgeMaxMinYearsOld: 'La edad de tu hijo(a) debe ser menor a 18 años, por favor verifica.',
		Parents15YearsOlderThan:
			'La edad de tu padre/madre debe ser al menos 15 años mayor que la tuya, por favor verifica.',
		BirthGreatherThanCurrent:
			'La fecha de nacimiento que has registrado no puede ser mayor a la fecha actual, por favor verifica.',
		hasParents: 'Ya registraste a tus padres, por favor verífica.',
		hasParentsCuople: 'Ya registraste a tu Concubino(a)/Cónyugue, por favor verífica.',
		CoupleOver15YearsOld: 'La edad de tu cónyuge/concubina(o) debe ser como mínimo 15 años, por favor verifica.',
		hasCorrectSex: 'El sexo de tu cónyuge/concubina(o) es incorrecto, verifica nuevamente por favor.',
		hasCorrectAgeForDocument:
			'La edad no puede ser igual o mayor a 18 para ese tipo de documento, verifique por favor.',
	},
};
export const initialValues = {
	surname: '',
	motherSurname: '',
	firstName: '',
	secondName: '',
	documentType: '',
	documentNumber: '',
	birthdate: '',
	gender: '',
	relationship: '',
	hasDisability: '',
	beneficiaryId: '',
};
