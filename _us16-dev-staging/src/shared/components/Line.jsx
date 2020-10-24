import React from 'react'
import styled from 'styled-components'

const ContentLine = styled.div`
  margin: ${(props) => (props.marginL && props.marginR ? '0' : '0')};
`
const LineStyle = styled.div`
  background: rgba(101, 101, 101, 0.16);
  height: 2px;
`
function Line({ marginL, marginR }) {
  return (
    <ContentLine>
      <LineStyle marginL={marginL} marginR={marginR}></LineStyle>
    </ContentLine>
  )
}
export default Line
