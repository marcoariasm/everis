import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'
import { allColors } from 'shared/styles/index'

import Candado from 'shared/images/candado.svg'

const BeneficiaryData = styled.span`
  font-size: 16px;
  line-height: 18px;
  align-items: initial;
  color: ${allColors.colorGreen};
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopM}) {
    font-size: 18px;
    line-height: 20px;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 20px;
    line-height: 22px;
  }
`
const PadLook = styled.span`
  padding-left: 10px;
`

function TableHeading({ title }) {
  return (
    <div>
      <BeneficiaryData className="tableBodyTitle">{title}</BeneficiaryData>
      <PadLook>
        <img src={Candado} alt="Candado" />
      </PadLook>
    </div>
  )
}
export default TableHeading
