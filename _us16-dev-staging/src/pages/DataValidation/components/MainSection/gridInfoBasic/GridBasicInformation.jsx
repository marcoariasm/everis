import React, { Fragment } from 'react'
import moment from 'moment'

import { toCamelCase } from 'shared/helpers/HelperForm'

import { textDataValidation } from 'shared/constant/ConstantDataValidation'

import GridTable from './GridTable'
import CardData from 'pages/DataValidation/components/MainSection/CardData'

function GridBasicInformation({ infoBasic }) {
  let object = {}
  let data = []

  function transfData(data) {
    data.forEach((element) => {
      if (element.name === textDataValidation.beneficiary[6].value) {
        element.value = moment(element.value).format('DD/MM/YYYY')
      }
      if (element.name === textDataValidation.beneficiary[7].value) {
        element.value = element.value === 'FEMALE' ? 'Femenino' : 'Masculino'
      }
    })
  }
  if (infoBasic) {
    textDataValidation.beneficiary.forEach((constante) => {
      for (let keyData in infoBasic) {
        if (keyData == constante.name) {
          object['name'] = constante.value
          object['value'] = infoBasic[keyData]
          data.push(JSON.parse(JSON.stringify(object)))
        }
      }
    })
    transfData(data)
  }
  return (
    <>
      <GridTable>
        {data &&
          data.map((element, j) => {
            return (
              <Fragment key={j}>
                {data.length === j + 1 ? (
                  <CardData
                    title={element?.name}
                    value={
                      element?.value ? toCamelCase(element?.value) : textDataValidation.infoBeneficiary.noInfo
                    }
                    doNotDisplayLine={true}
                  />
                ) : (
                  <CardData
                    title={element?.name}
                    value={
                      element?.value
                        ? element?.name === 'Tipo de documento'
                          ? element?.value
                          : toCamelCase(element?.value)
                        : textDataValidation.infoBeneficiary.noInfo
                    }
                    doNotDisplayLine={false}
                  />
                )}
              </Fragment>
            )
          })}
      </GridTable>
    </>
  )
}
export default GridBasicInformation
