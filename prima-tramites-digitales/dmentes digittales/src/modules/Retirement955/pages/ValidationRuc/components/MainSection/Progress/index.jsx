import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { size } from 'global/styles/Responsive'

import AddFile from 'shared/images/documento.svg'

import Bar from './Bar'

const Content = styled.div`
  display: grid;
  grid-template-columns: 26px 1fr;
  grid-column-gap: 10px;
  justify-content: center;
  align-self: center;
  width: 100%;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 50px 1fr;
    grid-column-gap: 20px;
  }
`
const ContentBar = styled.div`
  align-self: center;
`
const ContentImage = styled.div`
  text-align: left;
  & > img {
    width: 25px;
  }
  @media only screen and (min-width: ${size.tablet}) {
    text-align: center;
    & > img {
      width: 45px;
    }
  }
`

function Progress(props) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((oldValue) => {
        const newValue = oldValue + 10

        if (newValue === 100) {
          clearInterval(interval)
        }
        return newValue
      })
    }, 100)
  }, [])

  return (
    <Content>
      <ContentImage>
        <img src={AddFile} alt="AddFile" />
      </ContentImage>
      <ContentBar>
        <Bar fileName={props} color={'#00A499'} value={value} max={100} />
      </ContentBar>
    </Content>
  )
}

export default Progress
