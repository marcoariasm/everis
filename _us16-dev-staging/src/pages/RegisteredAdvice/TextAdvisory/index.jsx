import React from 'react'

import { MountMin100K } from '../MountMin100K'
import { MountMax100K } from '../MountMax100K'
import { Content } from './style'

export const TextAdvisory = ({ affiliate, contactInfo, day, financialAdviceDetail, dataCoorporation }) => {
  return (
    <>
      <Content>
        {financialAdviceDetail?.accumulatedFund <= 100000 && (
          <MountMin100K
            affiliate={affiliate}
            contactInfo={contactInfo}
            day={day}
            financialAdviceDetail={financialAdviceDetail}
            dataCoorporation={dataCoorporation}
          />
        )}
        {financialAdviceDetail?.accumulatedFund > 100000 && (
          <MountMax100K
            affiliate={affiliate}
            contactInfo={contactInfo}
            day={day}
            financialAdviceDetail={financialAdviceDetail}
            dataCoorporation={dataCoorporation}
          />
        )}
      </Content>
    </>
  )
}
