import React from 'react'
import styled from 'styled-components'
import MediaQuery from 'react-responsive'

import { size } from 'shared/styles/Responsive'

import Button from 'global/components/Button/ButtonNormal/Button'

const BtnAddBeneficiaries = ({ marginT, noBeneficiary, onchange, onClick, setShowModal }) => {
  return (
    <>
      {!noBeneficiary && (
        <>
          <MediaQuery maxDeviceWidth={767}>
            <ContentButton justifyContent="center" marginT={marginT}>
              <Button
                id="newBenef"
                classButton="agregar-beneficiario"
                widthB="199px"
                heightB="42px"
                hiddenCloseModal={false}
                onClick={() => setShowModal(() => true)}
                onchange={onchange}
              >
                Añadir beneficiarios
              </Button>
            </ContentButton>
          </MediaQuery>
          <MediaQuery minDeviceWidth={768}>
            <ContentButton justifyContent="flex-start" marginT={marginT}>
              <Button
                id="newBenef"
                classButton="agregar-beneficiario"
                widthB="199px"
                heightB="42px"
                hiddenCloseModal={false}
                onClick={() => setShowModal(() => true)}
                onchange={onchange}
              >
                Añadir beneficiarios
              </Button>
            </ContentButton>
          </MediaQuery>
        </>
      )}
      {noBeneficiary && (
        <ContentButton justifyContent="center" marginT={marginT}>
          <Button
            id="newBenef"
            classButton="agregar-beneficiario"
            widthB="199px"
            heightB="42px"
            hiddenCloseModal={false}
            onClick={() => setShowModal(() => true)}
            onchange={onchange}
          >
            Añadir beneficiarios
          </Button>
        </ContentButton>
      )}
    </>
  )
}

export default BtnAddBeneficiaries

const ContentButton = styled.div`
  display: flex;
  margin-top: ${({ marginT }) => (marginT ? marginT : '20px')};
  margin-bottom: 54px;
  width: 100%;
  justify-content: ${({ justifyContent }) => justifyContent || 'space-between'};
  @media only screen and (min-width: ${size.tablet}) {
    margin-bottom: 30px;
  }
`
