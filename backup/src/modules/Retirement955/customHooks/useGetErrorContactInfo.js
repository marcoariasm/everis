import { useState, useEffect } from 'react'
import { isEmpty, prop } from 'ramda'

const useGetErrorContactInfo = (contactInfo) => {
  const phones = prop('phones', contactInfo)
  const email = prop('email', contactInfo)
  var noCellphone = false
  var noEmail = false
  const [error, setError] = useState(null)

  useEffect(() => {
    if (contactInfo) {
      const phonesFiltered = phones.filter((x) => x.type === 'MOBILE_PHONE' && x.number)
      if (isEmpty(phonesFiltered)) {
        noCellphone = true
        setError('Por favor registra tu número de celular, da clic en el enlace "Actualizar datos"')
      } else {
        noCellphone = false
      }

      if (!email) {
        noEmail = true
        setError('Por favor registra tu correo electrónico, da clic en el enlace "Actualizar datos"')
      } else {
        noEmail = false
      }

      if (noEmail && noCellphone) {
        setError(
          'Por favor registra tu correo electrónico y tu número de celular, da clic en el enlace "Actualizar datos'
        )
      }
      if (!noEmail && !noCellphone) {
        setError(null)
      }
    }
  }, [contactInfo])
  return error
}

export default useGetErrorContactInfo
