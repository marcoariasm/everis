import React, {useContext} from 'react'
import styled from 'styled-components'

import { size } from 'global/styles/Responsive'
import AccountImage from 'shared/images/account.svg'
import { UserContext } from '../../pages/MainDashboardLayout';


const UsernameContent = styled.div`
  display: flex;
  align-items: center;
  font-family: FS Emeric;
  font-weight: normal;
  padding-top: 40px;
  padding-bottom: 35px;
  padding-left: 15%;
  .usernameTextBold {
    font-size: 20px;
    line-height: 22px;
  }
  .usernameText {
    font-size: 13px;
    line-height: 16px;
    padding-top: 0.5em;
  }
  @media screen and (min-width: ${size.laptopL}) {
    border-radius: 0 0 6px 0;
    padding-left: 35px;
    .usernameTextBold {
      font-size: 17px;
      line-height: 18px;
    }
    .usernameText {
      font-size: 14px;
      line-height: 15px;
    }
  }
`
const UsernameImage = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 13px;
`

const Username = () => { 
  const user = useContext(UserContext);
  return (
    <>
      <UsernameContent>
        <UsernameImage src={AccountImage} alt={AccountImage} />
        <div>
          <p className="usernameTextBold">{user.name}</p>
          {user.cuspp && <p className="usernameText">CUSPP: {user.cuspp}</p>}
        </div>
      </UsernameContent>
    </>
  )
}
export default Username
