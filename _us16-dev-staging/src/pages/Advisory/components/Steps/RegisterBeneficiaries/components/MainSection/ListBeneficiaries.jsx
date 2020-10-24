import React, { useEffect } from 'react'
import styled from 'styled-components'
import moment from 'moment'

import useTransfDataBenef from 'modules/Retirement955/customHooks/useTransfDataBenef'

import { transfData } from 'shared/helpers/HelperEditBenef'

import { textRegBeneficiaries } from 'shared/constant/ConstantRegisterBeneficiaries'
import { textDataValidation } from 'shared/constant/ConstantDataValidation'

import GridInfoBeneficiaries from 'pages/Advisory/components/Steps/RegisterBeneficiaries/components/MainSection/GridInfoBeneficiaries'
import CardDataBeneficiarie from './CardDataBeneficiarie'
import Card from 'shared/components/Card/Card'


const ListBeneficiaries = ({ beneficiaries, length, setEditBenef, setListBeneficiaries }) => {
  let info = useTransfDataBenef(beneficiaries)
  

  return (
    <>
      {info &&
        info.map((element, i) => {
          return (
            <ContentCards key={i}>
              <Card
                onClick={() => setEditBenef(() => {
                  return {
                    ...element,
                    index:i
                  };
                })}
                onDelete={setListBeneficiaries}
                item={element}
                title={`Beneficiario ${i + 1}`}
                options
                optionBlock={element.beneficiaryId}
                blocked={i < length ? true : false}
                type="beneficiaries"
                cardOpen={i === info.length - 1} 
              >
                <GridInfoBeneficiaries>
                  <CardDataBeneficiarie
                    title={textRegBeneficiaries.beneficiary[0].value}
                    value={`${element?.surname}` ? `${element?.surname}` : textDataValidation.infoBeneficiary.noInfo}
                    doNotDisplayLine={false}
                  />
                  <CardDataBeneficiarie
                    title={textRegBeneficiaries.beneficiary[1].value}
                    value={
                      `${element?.motherSurname}`
                        ? `${element?.motherSurname}`
                        : textDataValidation.infoBeneficiary.noInfo
                    }
                    doNotDisplayLine={false}
                  />
                  <CardDataBeneficiarie
                    title={textRegBeneficiaries.beneficiary[2].value}
                    value={
                      `${element?.firstName}` ? `${element?.firstName}` : textDataValidation.infoBeneficiary.noInfo
                    }
                    doNotDisplayLine={false}
                  />
                  <CardDataBeneficiarie
                    title={textRegBeneficiaries.beneficiary[3].value}
                    value={
                      `${element?.secondName}` ? `${element?.secondName}` : textDataValidation.infoBeneficiary.noInfo
                    }
                    doNotDisplayLine={false}
                  />
                  <CardDataBeneficiarie
                    title={textRegBeneficiaries.beneficiary[4].value}
                    value={
                      `${element?.documentType}`
                        ? `${element?.documentType}`
                        : textDataValidation.infoBeneficiary.noInfo
                    }
                    doNotDisplayLine={false}
                  />
                  <CardDataBeneficiarie
                    title={textRegBeneficiaries.beneficiary[5].value}
                    value={
                      `${element?.documentNumber}`
                        ? `${element?.documentNumber}`
                        : textDataValidation.infoBeneficiary.noInfo
                    }
                    doNotDisplayLine={false}
                  />
                  <CardDataBeneficiarie
                    title={textRegBeneficiaries.beneficiary[6].value}
                    value={
                      `${element?.birthdate}`
                        ? moment(`${element?.birthdate}`, 'YYYY-MM-DD').format('DD/MM/YYYY')
                        : textDataValidation.infoBeneficiary.noInfo
                    }
                    doNotDisplayLine={false}
                  />
                  <CardDataBeneficiarie
                    title={textRegBeneficiaries.beneficiary[7].value}
                    value={`${element?.gender}` ? `${element?.gender}` : textDataValidation.infoBeneficiary.noInfo}
                    doNotDisplayLine={false}
                  />
                  <CardDataBeneficiarie
                    title={textRegBeneficiaries.beneficiary[8].value}
                    value={
                      `${element?.relationShip}`
                        ? `${element?.relationShip}`
                        : textDataValidation.infoBeneficiary.noInfo
                    }
                    doNotDisplayLine={false}
                  />
                  <CardDataBeneficiarie
                    title={textRegBeneficiaries.beneficiary[9].value}
                    value={`${element?.hasDisability}` === 'false' ? 'Sano' : 'Inválido'}
                    doNotDisplayLine={true}
                  />
                </GridInfoBeneficiaries>
              </Card>
            </ContentCards>
          )
        })}
    </>
  )
}
export default ListBeneficiaries

const ContentCards = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 14px;
  margin-bottom: 30px;
`
