import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

const Content = styled.div`
  flex-direction: column;
  text-align: center;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptop}) {
    flex-direction: row;
  }
`
const UserName = styled.p`
  font-size: 18px;
  line-height: 20px;
  margin: 30px 0 30px 0;
  & > span {
    font-weight: bold;
  }
  & > label {
    font-weight: normal;
  }
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopM}) {
    margin: 15px 0 20px 0;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 24px;
    line-height: 26px;
    margin: 25px 0 30px 0;
  }
`

function ContentUsername({ user, text }) {
  return (
    <Content>
      <UserName>
        <span className="bodyText">{user}</span>
        <label className="bodyText">{text}</label>
      </UserName>
    </Content>
  )
}

export default ContentUsername
