import React, { useEffect, useState } from 'react'
import { isNil } from 'ramda'

import { ContentInfoValidate } from 'modules/Retirement955/pages/NotAccess/ContentInfoValidate'
import { ContentInfoFail } from 'modules/Retirement955/pages/NotAccess/ContentInfoFail'
import { not_access_reja } from 'modules/Retirement955/constants/Parameters'

import { Loading } from 'global/components/v1/Loading'
import { Content, TextoPrincipal } from './style'

import Fail from 'shared/images/fail.svg'
import Check from 'shared/images/check.svg'

export const FailsText = ({ arrayFails, texto, textError }) => {
  const [arrayNewFails, setArrayNewFails] = useState([])

  useEffect(() => {
    if (!isNil(arrayFails)) {
      const tempArrayFails = []
      const arrayFailsOrder = arrayFails.sort((a, b) => a.error - b.error)
      arrayFailsOrder.filter((x) => {
        for (let y of not_access_reja) {
          if (y['code'] === x['code']) {
            tempArrayFails.push(Object.assign(x, y))
          }
        }
      })
      setArrayNewFails(tempArrayFails)
    }
  }, [arrayFails])

  if (textError === '' && arrayFails === null) {
    return <Loading />
  }

  return (
    <Content>
      <TextoPrincipal className="bodyTextBold">{texto}</TextoPrincipal>
      {textError !== '' ? (
        <ContentInfoFail texto={textError}></ContentInfoFail>
      ) : (
        arrayNewFails !== null &&
        arrayNewFails.map((data) => {
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
