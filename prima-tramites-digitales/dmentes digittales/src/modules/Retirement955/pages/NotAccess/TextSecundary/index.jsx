import React from 'react'
import { textNotAccess } from 'modules/Retirement955/constants/ConstantNotAccess'
import { Content, TextoAditional, NavLink } from './style'

export const TextSecundary = ({ text, id }) => {  

  return (
    <Content>
      <TextoAditional className="bodyText">{text}
        <NavLink className='informationFooterText link' to={`/nueva-solicitud/tramite/${id}`}>{' clic aquí'} </NavLink>
      </TextoAditional>
    </Content>
  )
}
