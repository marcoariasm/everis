import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { size } from 'global/styles/Responsive'
import { allColors } from 'global/styles'
import { setCheckNoRuc } from 'redux/actions/Advisor'

import CardRadioButton from 'modules/Retirement955/pages/ValidationRuc/components/MainSection/CardRadioButton'
import CardGray from 'modules/shared/components/CardGrey'

const Container = styled.div`
  display: grid;
  grid-row-gap: 14px;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 30px;
    margin-top: 45px;
  }
`

const CardContainer = ({ onChange }) => {
  const checkNoRuc = useSelector((state) => state.advisor.checkNoRuc)
  const dispatch = useDispatch()
  const [noRucBackGround, setNoRucBackGround] = useState(allColors.colorGrayCard)
  const [noRucBorder, setNoRucBorder] = useState(allColors.colorGrayCard)
  const [rucBackGround, setRucBackGround] = useState(allColors.colorGrayCard)
  const [rucBorder, setRucBorder] = useState(allColors.colorGrayCard)

  function getCheck(event) {
    onChange(event.target.id)
    switch (event.target.id) {
      case 'no_ruc':
        setNoRucBorder(allColors.colorGreen)
        setRucBorder(allColors.colorGrayCard)
        setNoRucBackGround(allColors.colorGreenSelectCard)
        setRucBackGround(allColors.colorGrayCard)
        dispatch(setCheckNoRuc(false))
        break
      case 'si_ruc':
        setNoRucBackGround(allColors.colorGrayCard)
        setRucBorder(allColors.colorGreen)
        setNoRucBorder(allColors.colorGrayCard)
        setRucBackGround(allColors.colorGreenSelectCard)
        dispatch(setCheckNoRuc(true))
        break
      default:
        setNoRucBackGround(allColors.colorGrayCard)
        setRucBackGround(allColors.colorGrayCard)
        setRucBorder(allColors.colorGrayCard)
        setNoRucBorder(allColors.colorGrayCard)
        dispatch(setCheckNoRuc(false))
    }
  }
  return (
    <Container>
      <CardGray classButton="card-gray" backGround={noRucBackGround} border={noRucBorder}>
        <CardRadioButton
          checked={checkNoRuc === 'no_ruc'}
          id="no_ruc"
          name="ruc"
          value="no_ruc"
          label="No tengo RUC"
          onChange={getCheck}
          type="custom"
        />
      </CardGray>
      <CardGray classButton="card-gray" backGround={rucBackGround} border={rucBorder}>
        <CardRadioButton
          id="si_ruc"
          name="ruc"
          value="si_ruc"
          label="Tengo RUC"
          checked={checkNoRuc === 'si_ruc'}
          onChange={getCheck}
          type="custom"
        />
      </CardGray>
    </Container>
  )
}

export default CardContainer
