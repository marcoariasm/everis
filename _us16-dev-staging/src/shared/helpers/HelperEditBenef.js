import moment from 'moment'

export const transfData = (beneficiary, index) => {
  beneficiary.documentType =
    beneficiary.documentType === 'DNI'
      ? 'DNI'
      : beneficiary.documentType === 'Carnet Extranjeria'
      ? 'CE'
      : beneficiary.documentType === 'Pasaporte'
      ? 'PASSPORT'
      : beneficiary.documentType === 'Carnét del Permiso Temporal de Trabajo'
      ? 'CARNET_PERMISO_TEMPORAL_PERMANENCIA'
      : beneficiary.documentType === 'Carnet Policial Militar'
      ? 'CARNET_POLICIAL_MILITAR'
      : beneficiary.documentType === 'Lib. Adolescente Trab.'
      ? 'LIBRETA_ADELESCENTE_TRABAJO'
      : ''
  beneficiary.birthdate = moment(beneficiary.birthdate, 'YYYY-MM-DD').format('DD/MM/YYYY')
  beneficiary.gender = beneficiary.gender === 'Femenino' ? 'FEMALE' : beneficiary.gender === 'Masculino' ? 'MALE' : ''
  beneficiary.relationShip =
    beneficiary.relationShip === 'Hijo(a)'
      ? 'CHILD'
      : beneficiary.relationShip === 'Padre/Madre'
      ? 'PARENT'
      : beneficiary.relationShip === 'Cónyuge'
      ? 'SPOUSE'
      : beneficiary.relationShip === 'Concubina'
      ? 'CONCUBINE'
      : ''
  beneficiary.hasDisability = beneficiary.hasDisability === 'Sano' ? false : true
  beneficiary.index = index
  return beneficiary
}
