import SharedModule from 'modules/shared/index';
const {
	libs: { ServiceFetcher },
} = SharedModule;

export const listBeneficiaryService = () => {
	return ServiceFetcher('/affiliate/beneficiaries', {
		method: 'GET',
	});
};

export const addBeneficiaryService = (beneficiary) =>
	ServiceFetcher('/affiliate/beneficiaries', {
		method: 'POST',
		body: {
			...formatBeneficiary(beneficiary),
		},
	});

const formatBeneficiary = (beneficiary) => {
	return {
		documentType: beneficiary.documentType,
		documentNumber: beneficiary.documentNumber,
		firstName: beneficiary.firstName,
		secondName: beneficiary.secondName,
		surname: beneficiary.surname,
		motherSurname: beneficiary.motherSurname,
		birthDate: beneficiary.birthdate,
		gender: parseInt(beneficiary.gender),
		disability: parseInt(beneficiary.disability),
		relationship: parseInt(beneficiary.relationship),
	};
};
