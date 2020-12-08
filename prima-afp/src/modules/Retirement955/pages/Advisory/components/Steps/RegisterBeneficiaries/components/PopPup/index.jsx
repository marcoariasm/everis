import React from 'react'

import { textModalBenef } from 'modules/Retirement955/constants/ConstantRegisterBeneficiaries'

import { Content, ContentDetails, Footer } from './styles'
import Modal from 'global/components/v1/Modal'

const PopPup = ({
  onClose,
  show,
  widthB,
  hidden,
  hideButtonCancel,
  heightB,
  marginT,
  marginB,
  justifyContent,
  onClick,
  nameButton,
}) => (
  <Modal
    onClose={onClose}
    show={show}
    widthB={widthB}
    hidden={hidden}
    heightB={heightB}
    hideButtonCancel={hideButtonCancel}
    marginT={marginT}
    marginB={marginB}
    justifyContent={justifyContent}
    onClick={onClick}
    nameButton={nameButton}
  >
    <Content>
      <h1 className="informativeTitleSmall">{textModalBenef.title}</h1>
      <ContentDetails className="bodyText">
        <li>{textModalBenef.text1}</li>
        <li>{textModalBenef.text2}</li>
        <li>{textModalBenef.text3}</li>
      </ContentDetails>
      <Footer className="bodyText">{textModalBenef.textFooter}</Footer>
    </Content>
  </Modal>
)

export default PopPup
