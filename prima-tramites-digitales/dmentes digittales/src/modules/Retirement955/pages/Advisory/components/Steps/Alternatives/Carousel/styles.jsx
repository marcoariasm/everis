import styled from 'styled-components'

import { allColors } from 'global/styles'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > div > div > .rec-dot_active {
    background-color: ${allColors.colorGrayText};
    box-shadow: 0 0 1px 3px ${allColors.colorGrayText};
  }
  & > div > div > div {
    margin: 0px;
  }
`
export const Page = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  justify-items: center;
  align-items: center;
  height: 81px;
  width: 100%;
  padding: 0 20px;
  border-radius: 5.5px;
  background-color: ${allColors.colorGreen};
  & > p {
    color: ${allColors.colorWhiteBase};
  }
  & > div > div > svg > path {
    fill: ${allColors.colorWhiteBase};
    stroke: ${allColors.colorWhiteBase};
  }
`
