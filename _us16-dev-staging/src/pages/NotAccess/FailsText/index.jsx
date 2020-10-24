import React from 'react'

import { ContentInfoValidate } from 'pages/NotAccess/ContentInfoValidate'
import { ContentInfoFail } from 'pages/NotAccess/ContentInfoFail'
import { not_access_reja } from 'shared/constant/Parameters'

import { Content, TextoPrincipal } from './style'

import Fail from 'shared/images/fail.svg'
import Check from 'shared/images/check.svg'

export const FailsText = ({ arrayFails, texto, textError }) => {
  const arrayFailsOrder = arrayFails.sort((a, b) => a.error - b.error)
  let newArrayFails = []
  arrayFailsOrder.filter((x) => {
    for (let y of not_access_reja) {
      if (y['code'] === x['code']) {
        newArrayFails.push(Object.assign(x, y))
      }
    }
  })

  return (
    <Content>
      <TextoPrincipal className="bodyTextBold">{texto}</TextoPrincipal>
      {textError !== '' ? (
        <ContentInfoFail texto={textError}></ContentInfoFail>
      ) : (
        newArrayFails.map((data) => {
          switch (data.error) {
            case true:
              return <ContentInfoValidate key={data.code} imgValidation={Fail} texto={data.message} />
            default:
              return <ContentInfoValidate key={data.code} imgValidation={Check} texto={data.message} />
          }
        })
      )}
    </Content>
  )
}
