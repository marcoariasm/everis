import { useState, useEffect } from 'react'
import { addBeneficiary } from 'shared/constant/ConstAddBeneficiary'

const useTransfDataBenef = (beneficiarios) => {
  const [beneficiary, setBeneficiary] = useState([])

  useEffect(() => {
    setBeneficiary([])
    beneficiarios.forEach((element) => {
      element.relationShip =
        element.relationShip === 'CHILD'
          ? 'Hijo(a)'
          : element.relationShip === 'PARENT'
          ? 'Padre/Madre'
          : element.relationShip === 'SPOUSE'
          ? 'Cónyuge'
          : element.relationShip === 'CONCUBINE'
          ? 'Concubina'
          : element.relationShip
      element.secondName = element.secondName === ' ' ? '---' : element.secondName
      addBeneficiary.typeDocument.forEach((item) => {
        if (element.documentType === item.value) {
          element.documentType = item.label
        }
      })
      setBeneficiary((prevArray) => [...prevArray, element])
    })
  }, [beneficiarios])

  return beneficiary
}

export default useTransfDataBenef
