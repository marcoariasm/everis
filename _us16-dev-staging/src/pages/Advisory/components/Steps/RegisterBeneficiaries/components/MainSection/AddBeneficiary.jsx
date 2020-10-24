import React from 'react'
import styled from 'styled-components'
import { textRegBeneficiaries } from 'shared/constant/ConstantRegisterBeneficiaries'
import BtnAddBeneficiaries from './BtnAddBeneficiaries'
import { allColors } from 'shared/styles/index'

const Content = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 30px;
  padding-top: 54px;
  border-radius: 11px;
  box-sizing: border-box;
  border: 3px dashed ${allColors.colorGrayCardDashed};
  background: ${allColors.colorGrayCard};
`
const Title = styled.div`
  text-align: center;
  align-items: center;
  margin: 0px 20px;
`
const ContentButton = styled.div`
  margin-top: 30px;
  margin-bottom: 54px;
  width: 100%;
`
const AddBeneficiary = ({ beneficiaries, onclick }) => {
  return (
    <>
      {beneficiaries && beneficiaries.length > 0 ? (
        <BtnAddBeneficiaries onChange={onchange} setShowModal={onclick} />
      ) : (
        <Content>
          <Title className="cardTitleLarge">{textRegBeneficiaries.noBeneficiaries.text}</Title>
          <ContentButton>
            <BtnAddBeneficiaries noBeneficiary marginT="19px" onChange={onchange} setShowModal={onclick} />
          </ContentButton>
        </Content>
      )}
    </>
  )
}

export default AddBeneficiary
