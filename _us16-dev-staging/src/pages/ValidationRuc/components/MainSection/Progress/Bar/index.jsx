import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import MediaQuery from 'react-responsive'

import { size } from 'shared/styles/Responsive'
import { allColors } from 'shared/styles/'

const Container = styled.div`
  div {
    display: grid;
    grid-template-columns: 80% 20%;
  }

  span {
    color: ${allColors.colorGreen};
    word-break: break-all;
    font-family: Calibri;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    font-feature-settings: 'pnum' on, 'lnum' on;
  }

  progress[value] {
    width: 100%;
    -webkit-appearance: none;
    appearance: none;
  }

  progress[value]::-webkit-progress-bar {
    height: 10px;
    border-radius: 20px;
    background-color: #c4c4c4;
  }

  progress[value]::-webkit-progress-value {
    height: 10px;
    border-radius: 20px;
    background-color: ${(props) => props.color};
  }

  @media only screen and (min-width: ${size.tablet}) {
    div {
      display: grid;
      grid-template-columns: 70% 30%;
    }
  }
`
const LoadingText = styled.span`
  text-align: end;
  font-weight: normal;
  font-style: normal;
`

const Bar = ({ value, max, color, fileName }) => {
  return (
    <Container color={color}>
      <div>
        <MediaQuery minDeviceWidth={767}>
          <span>{fileName.fileName}</span>
          <LoadingText>Cargando... {(value / max) * 100}%</LoadingText>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={767}>
          <span>{fileName.fileName}</span>
          <LoadingText>{(value / max) * 100}%</LoadingText>
        </MediaQuery>
      </div>
      <progress value={value} max={max} />
    </Container>
  )
}

Bar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  color: PropTypes.string,
}

Bar.defaultProps = {
  max: 100,
  color: 'lightBlue',
}

export default Bar
