import React from 'react'
import styled from 'styled-components'

import { allColors } from 'global/styles'
import loading from './images/loading2.svg'

const Container = styled.div`
  margin: 40px auto;
  text-align: center;
`

const Image = styled.div`
  margin-bottom: 5px;
  .spinner {
    -webkit-animation: 2s spin linear infinite;
    animation: 2s spin linear infinite;
  }
  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  > img {
    max-height: 25px;
    height: 100%;
  }
`
const Text = styled.span`
  font-family: Calibri;
  font-size: 12px;
  color: ${allColors.colorOrangeMain};
`
function Loading({ text, hidden }) {
  return (
    <Container>
      <div hidden={hidden}>
        <Image>
          <img className="spinner" src={loading} alt="Validando" />
        </Image>
        <Text>{text}</Text>
      </div>
    </Container>
  )
}
export default Loading
