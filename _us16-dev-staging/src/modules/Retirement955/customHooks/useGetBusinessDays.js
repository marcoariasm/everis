import { useState, useEffect } from 'react'
import { holidays } from 'shared/constant/constantWorkingDays'

const useGetBusinessDays = (currentDay, numberDays) => {
  let finalDate = new Date()
  finalDate.setDate(finalDate.getDate() + 1)
  let weekend = 0
  let holiday = 0
  const [businessDays, setBusinessDays] = useState(null)
  useEffect(() => {
    finalDate.setDate(finalDate.getDate() + numberDays)
    while (currentDay.getDate() < finalDate.getDate()) {
      if (currentDay.getDay() === 0 || currentDay.getDay() === 6) {
        weekend++
      } else {
        for (let i = 0; i <= holidays[currentDay.getMonth()].length; i++) {
          if (currentDay.getDate() === holidays[currentDay.getMonth()][i]) {
            holiday++
          }
        }
      }
      currentDay.setDate(currentDay.getDate() + 1)
    }
    currentDay.setDate(currentDay.getDate() + weekend + holiday)
    setBusinessDays(currentDay)
  }, [])
  return businessDays
}

export default useGetBusinessDays
