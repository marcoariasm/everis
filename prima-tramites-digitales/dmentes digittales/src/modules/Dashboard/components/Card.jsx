import React from 'react';
import styled from 'styled-components';

import { size } from '../../../global/styles/Responsive';
import { allColors } from '../../../global/styles/index';

const StyleCard = styled.div`
  padding: 70px 15%;
  background: ${allColors.colorWhiteBase};
  border-radius: 14px;
  box-shadow: 0px 2px 40px rgba(0, 0, 0, 0.1);
  @media only screen and (max-width: ${size.tabletM}) {
    margin: 5% 3%;
  }
  @media only screen and (max-width: ${size.mobileL}) {
    margin: 25px 3% 8% 3%;
    padding: 4.5% 8% 6% 8%;
  }
  @media only screen 
    and (min-width: 1000px) 
    and (min-height: 1000px) 
    and (orientation: portrait) 
    and (-webkit-min-device-pixel-ratio: 1.5) {
        width: 65%;
        margin: -50% 18% 5% 3%;
        padding: 10% 8%;
  }
`

const Card = ({ children, width }) => {
  return (
    <>
      <StyleCard width={width}>{children}</StyleCard>
    </>
  )
}
export default Card;
