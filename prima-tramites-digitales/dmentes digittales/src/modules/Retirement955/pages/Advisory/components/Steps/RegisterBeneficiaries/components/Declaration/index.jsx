import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setDjNoBeneficiary } from 'redux/actions/Advisor'
import { SubTitle, Line } from './styles'
import CheckBox from 'global/components/v2/CheckBoxV2'

import { textRegBeneficiaries } from 'modules/Retirement955/constants/ConstantRegisterBeneficiaries'

const Declaration = () => {
  const djNoBeneficiaries = useSelector((state) => state.advisor.djNoBeneficiaries)
  const dispatch = useDispatch()

  return (
    <>
      <SubTitle className="cardTitleLarge">Declaración de no beneficiarios</SubTitle>
      <div>
        <CheckBox
          value="declaration"
          label={textRegBeneficiaries.textDeclaration}
          onChange={(e) => dispatch(setDjNoBeneficiary(e.target.checked))}
          checked={djNoBeneficiaries}
        />
      </div>
      <Line />
    </>
  )
}

export default Declaration
