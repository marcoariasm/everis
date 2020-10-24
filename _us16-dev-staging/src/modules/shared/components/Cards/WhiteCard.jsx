import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'
import { allColors } from 'shared/styles/index'

const StyleCard = styled.div`
  margin: 89px 16px 42px 16px;
  padding: 22px 20px 22px 20px;
  background: ${allColors.colorWhiteBase};
  border-radius: 14px;
  box-shadow: 0px 2px 40px rgba(0, 0, 0, 0.2);
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopL}) {
    margin: 96px 36px 40px 36px;
    padding: 45px 40.5px 50px 40.5px;
  }
  @media only screen and (min-width: ${size.laptopL}) and (max-width: ${size.laptopM}) {
    margin: 33px 103px 55px 103px;
    padding: 60px 100px 60px 100px;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    margin: 33px 9% 8% 9%;
    padding: 4.5% 8% 6% 8%;
    & > img .hideOnTablet {
      display: block;
    }
  }
`
const WhiteCard = ({ children }) => {
  return (
    <>
      <StyleCard>{children}</StyleCard>
    </>
  )
}
export default WhiteCard
