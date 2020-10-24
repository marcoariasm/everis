import React from 'react'
import styled from 'styled-components'
import { isEmpty, prop, toLower } from 'ramda'

import { size } from 'shared/styles/Responsive'
import { allColors } from 'shared/styles/index'

import { textDataValidation } from 'shared/constant/ConstantDataValidation'

import CardData from 'pages/DataValidation/components/MainSection/CardData'

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
function GridContactInformation({ contactInfo }) {
  const cellphones = contactInfo.phones.reduce(
    (acc, el) => ({
      ...acc,
      [(el.type = 'MOBILE_PHONE')]: el,
    }),
    {}
  )

  const telephones = contactInfo.phones.reduce(
    (acc, el) => ({
      ...acc,
      [(el.type = 'TELEPHONE_EXCHANGE')]: el,
    }),
    {}
  )

  return (
    <>
      {contactInfo && (
        <StyleGridContactInformation>
          <CardData
            title={textDataValidation.infoBeneficiary.mail}
            value={
              prop('email', contactInfo)
                ? toLower(prop('email', contactInfo))
                : textDataValidation.infoBeneficiary.noInfo
            }
            doNotDisplayLine={false}
          />
          <CardData
            title={textDataValidation.infoBeneficiary.landline}
            value={
              !isEmpty(contactInfo.phones)
                ? `${prop('TELEPHONE_EXCHANGE', telephones).number}`
                  ? `${prop('TELEPHONE_EXCHANGE', telephones).number}`
                  : textDataValidation.infoBeneficiary.noInfo
                : textDataValidation.infoBeneficiary.noInfo
            }
            doNotDisplayLine={false}
          />
          <CardData
            title={textDataValidation.infoBeneficiary.mobilePhone}
            value={
              !isEmpty(contactInfo.phones)
                ? `${prop('MOBILE_PHONE', cellphones).number}`
                  ? `${prop('MOBILE_PHONE', cellphones).number}`
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
