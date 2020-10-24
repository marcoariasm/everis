import React from 'react'

import { Content } from './style'

export const Loading = ({ themeExternal }) => {
  return (
    <Content>
      <div className={themeExternal === false ? 'loader themeInternal' : 'loader themeExternal'}></div>
      <div>
        <span className="subTitleOrange">Te guiamos y acompañamos en tu progreso...</span>
      </div>
    </Content>
  )
}
