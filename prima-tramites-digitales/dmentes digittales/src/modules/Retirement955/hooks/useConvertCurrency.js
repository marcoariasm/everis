import { isNil } from 'ramda'
import { useState, useEffect } from 'react'

export const useConvertCurrency = (mount) => {
  if (isNil(mount)) {
    return 'Loading...'
  }

  return 'S/ ' + mount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

export default useConvertCurrency
