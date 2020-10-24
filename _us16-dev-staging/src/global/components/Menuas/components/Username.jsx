import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

import AccountImage from 'shared/images/account.svg'

const UsernameContent = styled.div`
  display: flex;
  align-items: center;
  font-family: FS Emeric;
  padding-top: 40px;
  padding-bottom: 35px;
  padding-left: 15%;
  .usernameTextBold {
    font-size: 22px;
    font-weight: bold;
    line-height: 27px;
  }
  .usernameText {
    font-size: 16px;
    font-weight: normal;
    line-height: 20px;
  }
  @media screen and (min-width: ${size.laptopL}) {
    border-radius: 0 0 6px 0;
    padding-left: 35px;
    .usernameTextBold {
      font-size: 18px;
      line-height: 22px;
    }
    .usernameText {
      font-size: 14px;
      line-height: 17px;
    }
  }
`
const UsernameImage = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 15px;
`

const Username = ({ usuario, cuspp }) => {
  return (
    <>
      <UsernameContent>
        <UsernameImage src={AccountImage} alt={AccountImage} />
        <div>
          <p className="usernameTextBold">{usuario}</p>
          <p className="usernameText">CUSPP:{cuspp}</p>
        </div>
      </UsernameContent>
    </>
  )
}
export default Username
