import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { head, isEmpty, path, prop, toLower } from 'ramda'

import { size } from 'global/styles/Responsive'
import { allColors } from 'global/styles'

import { textDataValidation } from 'modules/Retirement955/constants/ConstantDataValidation'

import CardData from 'modules/Retirement955/pages/DataValidation/components/MainSection/CardData'

const StyleGridContactInformation = styled.div`
  display: grid;
  grid-row-gap: 14px;
  grid-template: 1fr 1fr 1fr/1fr;
  padding: 25px 20px;
  margin-top: 20px;
  margin-bottom: 40px;
  border-radius: 6px;
  background-color: ${allColors.colorGrayCard};
  @media screen and (min-width: ${size.tablet}) {
    grid-template-columns: 25% 25% 25%;
    grid-template-rows: auto;
    grid-column-gap: 12.5%;
    padding: 35px 40px;
  }
  @media screen and (min-width: ${size.laptopL}) {
    grid-template-columns: 23% 23% 23%;
    grid-template-rows: auto;
    grid-column-gap: 15.5%;
    padding: 35px 40px;
  }
`
function GridContactInformation({ dateContact }) {
  const phones = prop('phones', dateContact)
  const [cellPhones, setCellPhones] = useState(null)
  const [telePhones, setTelePhones] = useState(null)

  useEffect(() => {
    if (dateContact) {
      const arrayCellPhones = phones.filter((x) => x.type === 'MOBILE_PHONE' && x.number)
      const arrayTelePhones = phones.filter((x) => x.type === 'DIRECT_LINE' && x.number)
      setCellPhones(arrayCellPhones)
      setTelePhones(arrayTelePhones)
    }
  }, [dateContact])

  return (
    <>
      {dateContact && (
        <StyleGridContactInformation>
          <CardData
            title={textDataValidation.infoBeneficiary.mail}
            value={
              prop('email', dateContact)
                ? toLower(prop('email', dateContact))
                : textDataValidation.infoBeneficiary.noInfo
            }
            doNotDisplayLine={false}
          />
          <CardData
            title={textDataValidation.infoBeneficiary.landline}
            value={
              !isEmpty(dateContact.phones)
                ? prop('number', head(telePhones || []))
                  ? prop('number', head(telePhones || []))
                  : textDataValidation.infoBeneficiary.noInfo
                : textDataValidation.infoBeneficiary.noInfo
            }
            doNotDisplayLine={false}
          />
          <CardData
            title={textDataValidation.infoBeneficiary.mobilePhone}
            value={
              !isEmpty(dateContact.phones)
                ? prop('number', head(cellPhones || []))
                  ? prop('number', head(cellPhones || []))
                  : textDataValidation.infoBeneficiary.noInfo
                : textDataValidation.infoBeneficiary.noInfo
            }
            doNotDisplayLine={true}
          />
        </StyleGridContactInformation>
      )}
    </>
  )
}
export default GridContactInformation
