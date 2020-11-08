import React from 'react'
import styled from 'styled-components'

import { size } from 'global/styles/Responsive'
import { allColors } from 'global/styles'

const StyleCard = styled.div`
  margin: ${(props) => (props.marginT ? props.marginT + ' 20px 20px 20px' : '20px')};
  padding: 15px 20px 40px 20px;
  background: ${allColors.colorWhiteBase};
  border-radius: 14px;
  box-shadow: 0px 2px 40px rgba(0, 0, 0, 0.2);
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopL}) {
    margin: ${(props) => (props.marginT ? props.marginT + ' 36px 25px 36px' : '25px 36px')};
    padding: 45px 40.5px 30px 40.5px;
  }
  @media only screen and (min-width: ${size.laptopL}) and (max-width: ${size.laptopM}) {
    margin: 25px 103px 30px 103px;
    padding: 50px 92px 50px 92px;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    margin: 25px 9% 8% 9%;
    padding: 4.5% 8% 6% 8%;
  }
`

const WhiteCard = ({ children, marginT }) => {
  return (
    <>
      <StyleCard marginT={marginT}>{children}</StyleCard>
    </>
  )
}
export default WhiteCard
