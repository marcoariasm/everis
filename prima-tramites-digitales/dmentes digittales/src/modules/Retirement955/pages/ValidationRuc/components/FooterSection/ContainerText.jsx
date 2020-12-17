import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { setUnemployment } from 'redux/actions/Advisor'

import { size } from 'global/styles/Responsive'

import CheckBox from 'global/components/v2/CheckBoxV2'

const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
`
const ContainerTextBase = styled.p`
  margin: 30px 0 15px 0;
  @media only screen and (min-width: ${size.tablet}) {
    margin: 40px 0 15px 0;
  }
`
const ContainerCheckBox = styled.div`
  margin-bottom: 37px;
`
const ContainerTextFinal = styled.p`
  margin: 0 0 20px 0;
`
const ContainersText = ({ onChange }) => {
  function getCheck(e) {
    onChange(e.target.checked)
    dispatch(setUnemployment(e.target.checked))
  }

  const unemployment = useSelector((state) => state.advisor.unemployment)
  const dispatch = useDispatch()
  return (
    <ContainerText>
      <ContainerTextBase className="cardTitleLarge">
        Para continuar con el proceso acepta la siguiente declaración jurada
      </ContainerTextBase>
      <ContainerTextFinal className="bodyText">
        En caso de falsedad se incurriría en delito contra la fe pública – falsificación de documentos (art 427.
        del Código Penal).
      </ContainerTextFinal>
      <ContainerCheckBox>
        <CheckBox
          value="declaration"
          label="Declaro mi condición de desempleo por un período mínimo de doce (12) meses ininterrumpidos y consecutivos antes de esta solicitud."
          onChange={getCheck}
          checked={unemployment}
        />
      </ContainerCheckBox>
    </ContainerText>
  )
}

export default ContainersText
