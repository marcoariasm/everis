export const validateText = (e, datos) => {
  let id = e.target.id

  if (id === 'surname' || id === 'motherSurname' || id === 'firstName' || id === 'secondName') {
    let value = e.target.value
    value = value.toLowerCase()
    let letters = ' abcdefghijklmnñopqrstuvwxyzáóíúó'
    if (e.target.value === '') {
      return true
    }
    if (value.charAt(0) === ' ') {
      return false
    }
    for (let i in letters) {
      if (value.charAt(value.length - 1) === letters[i]) {
        return true
      }
    }
  } else if (id === 'documentType') {
    return true
  } else if (id === 'documentNumber' && datos.documentType === 'DNI') {
    return numeric(e)
  } else if (
    (id === 'documentNumber' && datos.documentType === 'CE') ||
    (id === 'documentNumber' && datos.documentType === 'PASSPORT') ||
    (id === 'documentNumber' && datos.documentType === 'CARNET_PERMISO_TEMPORAL_PERMANENCIA') ||
    (id === 'documentNumber' && datos.documentType === 'CARNET_POLICIAL_MILITAR') ||
    (id === 'documentNumber' && datos.documentType === 'LIBRETA_ADELESCENTE_TRABAJO')
  ) {
    return alfaNumeric(e)
  } else {
    return true
  }
}

const numeric = (e) => {
  let value = e.target.value
  value = value.toLowerCase()
  let numbers = ' 0123456789'
  if (e.target.value === '') {
    return true
  }
  if (value.charAt(0) === ' ') {
    return false
  }
  for (let i in numbers) {
    if (value.charAt(value.length - 1) === numbers[i]) {
      return true
    }
  }
}
const alfaNumeric = (e) => {
  let value = e.target.value
  value = value.toLowerCase()
  let caracter = ' abcdefghijklmnñopqrstuvwxyzáóíúó0123456789'
  if (e.target.value === '') {
    return true
  }
  if (value.charAt(0) === ' ') {
    return false
  }
  for (let i in caracter) {
    if (value.charAt(value.length - 1) === caracter[i]) {
      return true
    }
  }
}

export function toCamelCase(values) {
  const newValues = values
    .toLowerCase()
    .replace(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]|\s[\u00C0-\u1FFF\u2C00-\uD7FF\w]/g, function (letter) {
      return letter.toUpperCase()
    })
  return newValues
}
