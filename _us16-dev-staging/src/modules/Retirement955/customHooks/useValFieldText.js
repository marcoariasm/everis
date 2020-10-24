import { useState, useEffect } from 'react'
import { holidays } from 'shared/constant/constantWorkingDays'

const useValFieldText = (e) => {
  const [validate, setValidate] = useState(false)
  let key = e.keycode || e.whitch
  let keyboard = String.fromCharCode(key).toLoerCase()
  let letters = ' abcdefghijklmnñopqrstuvwxyzáóí'
  let special = '8-37-38-46-164'

  useEffect(() => {
    for (let i in special) {
      if (key === special[i]) {
        setValidate(true)
        break
      }
    }
    if (letters.indexOf(keyboard) === -1 && !validate) {
      return false
    }
  }, [])
  return validate
}

export default useValFieldText
