import React from 'react'
import styled from 'styled-components'
import MediaQuery from 'react-responsive'

import { size } from 'shared/styles/Responsive'

import Paginator from 'global/components/Paginator/Paginator'

const Container = styled.div`
  margin: 10px 0 30px 0;
  ${
    '' /* @media screen and (min-width: ${size.tablet}) and (max-width: ${size.laptop}) {
    margin-top: 20px;
    margin-bottom: 100px;
  } */
  }
  @media screen and (min-width: ${size.laptop}) and (max-width: ${size.laptopL}) {
    margin-top: 50px;
    padding-bottom: 100px;
  }
  @media screen and (min-width: ${size.laptopL}) and (max-width: ${size.laptopM}) {
    margin-top: -30px;
    padding-bottom: 120px;
  }
  @media screen and (min-width: ${size.laptopM}) {
    margin-left: 0;
    margin-right: 0;
    padding-bottom: 130px;
  }
`
const ContainerPaginator = ({ step, setStep, save, next, disabled, backTo, nextTo, onClick, validation }) => {
  return (
    <Container>
      <MediaQuery maxDeviceWidth={375}>
        <Paginator
          widthB="120px"
          heightB="45px"
          backTo={backTo}
          nextTo={nextTo}
          step={step}
          next={next}
          setStep={setStep}
          validation={validation}
          onClick={onClick}
        />
      </MediaQuery>
      <MediaQuery minDeviceWidth={376}>
        <Paginator
          widthB="138px"
          heightB="45px"
          backTo={backTo}
          nextTo={nextTo}
          step={step}
          next={next}
          setStep={setStep}
          validation={validation}
          onClick={onClick}
        />
      </MediaQuery>
    </Container>
  )
}
export default ContainerPaginator
