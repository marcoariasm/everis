import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { size } from 'shared/styles/Responsive'
import { setDjPensioner } from 'redux/actions/Advisor'
import RadioButton from 'global/components/RadioButton/RadioButton'

const OptionsPensioner = () => {
  const djPensioner = useSelector((state) => state.advisor.pensioner)
  const dispatch = useDispatch()

  const handlerChange = (e) => {
    const { value } = e.target
    dispatch(setDjPensioner(value))
  }

  return (
    <Content>
      <ContentRadio>
        <RadioButton
          id="si"
          name="pensionista"
          value="si"
          label="Si"
          type="radioG"
          onChange={handlerChange}
          checked={djPensioner === 'si'}
        />
        <RadioButton
          id="no"
          name="pensionista"
          value="no"
          label="No"
          type="radioG"
          onChange={handlerChange}
          checked={djPensioner === 'no'}
        />
      </ContentRadio>
    </Content>
  )
}

export default OptionsPensioner

const Content = styled.div`
  display: grid;
  flex-direction: column;
  gap: 30px;
  margin-top: 40px;

  @media only screen and (min-width: ${size.tablet}) {
    display: flex;
    flex-direction: row;
  }
`
const ContentRadio = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  width: auto;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`
