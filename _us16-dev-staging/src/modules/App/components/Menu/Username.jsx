import React from 'react'
import styled from 'styled-components'
import { propOr } from 'ramda'

import { size } from 'shared/styles/Responsive'
import { toCamelCase } from 'shared/helpers/HelperForm'
import SharedModule from 'modules/shared';
import AccountImage from 'shared/images/account.svg'

const { useAffiliate } = SharedModule.api;

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
  const { affiliate } = useAffiliate()
  const getFromAffiliate = (field) => propOr('-', field, affiliate)
  const getAffiliateName = `${getFromAffiliate('firstName')} ${getFromAffiliate('surname')}`
  return (
    <>
      <UsernameContent>
        <UsernameImage src={AccountImage} alt={AccountImage} />
        <div>
          <p className="usernameTextBold">{toCamelCase(getAffiliateName)}</p>
          <p className="usernameText">CUSPP: {getFromAffiliate('cuspp')}</p>
        </div>
      </UsernameContent>
    </>
  )
}
export default Username
