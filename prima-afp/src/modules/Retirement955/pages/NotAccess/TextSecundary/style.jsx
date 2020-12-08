import styled from 'styled-components'
import { allColors } from 'global/styles'
import { Link } from "react-router-dom"

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 20px;
`
export const TextoAditional = styled.p`
  width: 100%;
`
export const UrlStyles = styled.a`
  color: ${allColors.colorOrangeMain};
  text-decoration: underline;
  font-family: Calibri;
  font-style: normal;
  font-size: 18px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: right;
  `

  export const NavLink = styled(Link)`
    color: ${allColors.colorOrangeMain};
    text-decoration: underline;
    font-family: Calibri;
    font-style: normal;
    font-size: 18px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: right;
`;