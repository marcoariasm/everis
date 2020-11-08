import SharedModule from 'modules/shared/index'
const {
  libs: { ServiceFetcher },
} = SharedModule

export const addBeneficiaryService = (beneficiary) =>
  ServiceFetcher('/affiliate/beneficiaries', {
    method: 'POST',
    body: {
      ...formatBeneficiary(beneficiary),
    },
  })

const formatBeneficiary = (beneficiary) => {
  return {
    birthDate: beneficiary.birthdate,
    documentNumber: beneficiary.documentNumber,
    documentType: beneficiary.documentType,
    firstName: beneficiary.firstName,
    gender: beneficiary.gender,
    hasDisability: beneficiary.hasDisability.toUpperCase() === 'TRUE' ? true : false,
    motherSurname: beneficiary.motherSurname,
    relationship: beneficiary.relationship,
    secondName: beneficiary.secondName,
    surname: beneficiary.surname,
  }
}
