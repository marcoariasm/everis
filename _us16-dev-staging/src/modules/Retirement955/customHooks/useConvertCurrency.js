import { useState, useEffect } from 'react'

const useConvertCurrency = (mount) => {
  const [balance, setBalance] = useState('')
  const [onlyBalance, setOnlyBalance] = useState(0)
  if (mount) setOnlyBalance(mount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))

  useEffect(() => {
    setBalance('S/ ' + onlyBalance)
  }, [])

  return balance
}

export default useConvertCurrency
