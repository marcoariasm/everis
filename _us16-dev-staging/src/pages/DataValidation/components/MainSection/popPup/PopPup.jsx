import React from 'react'

import { textDataValidation } from 'shared/constant/ConstantDataValidation'

import TextModal from './TextModal'
import Modal from 'global/components/Modal/index'

import CloseModalImg from 'shared/images/closeModal.svg'
import CloseModal from './CloseModal'

function PopPup({
  heightB,
  justifyContent,
  hideButtonCancel,
  marginB,
  marginT,
  nameButton,
  onClick,
  onClose,
  show,
  widthB,
}) {
  return (
    <>
      <Modal
        heightB={heightB}
        justifyContent={justifyContent}
        hideButtonCancel={hideButtonCancel}
        marginT={marginT}
        marginB={marginB}
        nameButton={nameButton}
        onClick={onClick}
        onClose={onClose}
        show={show}
        widthB={widthB}
      >
        <div className="content">
          <CloseModal>
            <img src={CloseModalImg} onClick={onClose} alt="Cerrar Modal" />
          </CloseModal>
          <TextModal>
            {' '}
            <span>{textDataValidation.modalUpdate.title}</span>
            <span>
              {textDataValidation.modalUpdate.text}
              <span>“Jubilación y/o retiro de hasta el 95.5%”</span>, {textDataValidation.modalUpdate.text1}
            </span>
          </TextModal>
        </div>
      </Modal>
    </>
  )
}

export default PopPup
