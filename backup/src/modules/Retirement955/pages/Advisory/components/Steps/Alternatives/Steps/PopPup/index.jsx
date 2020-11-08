import React from 'react'

import useBond from 'modules/Retirement955/api/Globales/useBond'

import { textAlternatives } from 'modules/Retirement955/constants/ConstantAlternatives'

import { CharacterList, CharacteristicsText, Content, TitleModal } from './styles'
import Modal from 'global/components/v1/Modal'
import { currencyFormat } from '../Header'
import moment from "moment";


function PopPup({
  onClose,
  show,
  hidden,
  justifyContent,
  nameButton,
  heightB,
  hideButtonCancel,
  hiddenCloseModal,
  widthB,
}) {
  const { bond } = useBond()
  const date =  moment(new Date()).format("DD/MM/YYYY")
  return (
    <>
      <Modal
        width="53%"
        heightB={heightB}
        hidden={hidden}
        justifyContent={justifyContent}
        onClose={onClose}
        nameButton={nameButton}
        show={show}
        onClick={onClose}
        hideButtonCancel={hideButtonCancel}
        hiddenCloseModal={hiddenCloseModal}
        widthB={widthB}
      >
        <Content>
          <TitleModal className="tableBodyTitle">
            {textAlternatives.popUpText1}
            <a>{date}</a>
          </TitleModal>
          <CharacterList>
            <CharacteristicsText className="bodyText">- {textAlternatives.popUpText2}</CharacteristicsText>
            <CharacteristicsText className="bodyText">- {textAlternatives.popUpText3}</CharacteristicsText>
            <CharacteristicsText className="bodyText">- {textAlternatives.popUpText4}</CharacteristicsText>
            {bond && (
              <CharacteristicsText className="bodyText">
                - Para el cálculo se ha tomado en cuenta el valor actualizado de tu Bono de Reconocimiento: S/
                {currencyFormat(bond.updatedValue)}
              </CharacteristicsText>
            )}
          </CharacterList>
        </Content>
      </Modal>
    </>
  )
}

export default PopPup
