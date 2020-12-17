import React, { useState } from 'react'
import MediaQuery from 'react-responsive'
import ReactDOM from 'react-dom'

import { Title, PrimaryText, List } from './styles'
import PopPup from '../PopPup'

import { textRegBeneficiaries } from 'modules/Retirement955/constants/ConstantRegisterBeneficiaries'

export const Header = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Title className="informativeTitle">Registro de beneficiarios</Title>
      <PrimaryText className="bodyText">
        {textRegBeneficiaries.textDescr}
        <a className="link" onClick={() => setShowModal(true)}>
          {textRegBeneficiaries.beneficiaries}
        </a>
        {textRegBeneficiaries.textDescr1}
      </PrimaryText>
      <List className="bodyText">
        <ul>
          <li>
            <span>
              {textRegBeneficiaries.item1}
              <div>{textRegBeneficiaries.email}</div>
            </span>
          </li>
          <li>
            <span>{textRegBeneficiaries.item2}</span>
          </li>
        </ul>
      </List>
      <MediaQuery maxDeviceWidth={767}>
        {ReactDOM.createPortal(
          <PopPup
            widthB="170px"
            heightB="45px"
            marginT="50px"
            marginB="40px"
            nameButton="Entendido"
            justifyContent="flex-end"
            hidden={false}
            hiddenCloseModal={false}
            hideButtonCancel={true}
            show={showModal}
            onClick={() => setShowModal(false)}
            onClose={() => setShowModal(false)}
          />,
          document.getElementById('modal')
        )}
      </MediaQuery>
      <MediaQuery minDeviceWidth={767}>
        {ReactDOM.createPortal(
          <PopPup
            widthB="170px"
            heightB="45px"
            marginT="50px"
            marginB="40px"
            nameButton="Entendido"
            justifyContent="flex-end"
            hiddenCloseModal={false}
            hideButtonCancel={true}
            show={showModal}
            onClick={() => setShowModal(false)}
            onClose={() => setShowModal(false)}
          />,
          document.getElementById('modal')
        )}
      </MediaQuery>
    </>
  )
}
