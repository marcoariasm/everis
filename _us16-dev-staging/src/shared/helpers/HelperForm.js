export const validateText = (e, datos) => {
  //let count = 0
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

export const toCamelCase = (values) => {
  for (let datakey in values) {
    let newWord = ''
    if (datakey === 'surname' || datakey === 'motherSurname' || datakey === 'firstName' || datakey === 'secondName') {
      values[datakey] = values[datakey].toLowerCase()
      let listText = values[datakey].split(' ')
      for (let i = 0; i < listText.length; i++) {
        listText[i] = listText[i].charAt(0).toUpperCase() + listText[i].slice(1)
        newWord = newWord.concat(listText[i] + ' ')
        values[datakey] = newWord
      }
    }
  }
  return values
}
