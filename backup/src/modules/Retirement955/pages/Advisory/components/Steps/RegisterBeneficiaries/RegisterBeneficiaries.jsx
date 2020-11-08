import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MediaQuery from 'react-responsive'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { useAffiliate } from '../../../../../api'
//SWR
import useBeneficiaries from 'modules/Retirement955/api/Afiliado/useBeneficiaries'
import useDocumentType from 'modules/Retirement955/api/Login/useDocumentType'
import useInformation from 'modules/Retirement955/api/Globales/useInformation'
import { BENEFICIARY_RELATIONSHIP, GENDER } from 'modules/Retirement955/constants/Parameters'

//REDUX
import { setDataBeneficery, AdvisorActions, Advisor_ResetStore } from 'redux/actions/Advisor'

//Components
import GlobalModule from 'global'

import WhiteCard from 'modules/shared/components/WhiteCard'
import PopPupWarning from 'modules/shared/components/PopPupValidation/PopPupWarning'
import { Pensioner } from './components/Pensioner'
import Paginator from 'global/components/v1/Paginator/Paginator'
import { Loading } from 'global/components/v1/Loading'
import { Header } from './components/Header'
import OptionsPensioner from './components/FooterSection/OptionsPensioner'
import { initialValues } from 'modules/Retirement955/constants/ConstAddBeneficiary'
import Declaration from './components/Declaration'
import ListBeneficiaries from './components/MainSection/ListBeneficiaries'
import AddBeneficiary from './components/MainSection/AddBeneficiary'
import FormNewBeneficiary from './components/MainSection/FormNewBeneficiary'

//import { useLocation } from "react-router-dom";


const {
  modal: { ModalV2, ModalBody, ModalFooter },
  layouts: { Col, Row },
} = GlobalModule.components.v2
const { NButton } = GlobalModule.components.v1

const msgInputsEmpty =
  'Por favor completa la información requerida en la pantalla para que puedas continuar con el trámite.'

const ButtonGroup = styled.div`
  @media only screen and (max-width: 49.9em) {
    div {
      button {
        width: 80%auto;
      }
      div {
        display: flex;
        justify-content: center;
        order: 1;
        margin-top: 1rem;
      }
      div:last-child {
        display: flex;
        justify-content: center;
        order: 0;
      }
    }
  }
`

function RegisterBeneficiaries({ setStep, step }) {
  //redux
  const {
    djNoBeneficiaries,
    pensioner,
    dataBeneficery,
    beneficiariesRegErrorMessage,
    beneficiariesRegSuccessMessage,
  } = useSelector((state) => state.advisor)

  //state
  const [modalConfirm, setModalConfirm] = useState(false)
  const [initRegisterBeneficiaries, setInitRegisterBeneficiaries] = useState(false)
  const { beneficiario, idLoading: isLoadingBeneficiaries, mutate: mutateBeneficiaries } = useBeneficiaries()
  const [listBeneficiaries, setListBeneficiaries] = useState([])
  const [addBeneficiary, setAddBeneficiary] = useState(false)
  const [messageValidation, setMessageValidation] = useState(null)
  const [showModalValidation, setShowModalValidation] = useState(false)
  const [editBenef, setEditBenef] = useState(initialValues)

  const { information: genders } = useInformation('GENDER')
  const { information: relationships } = useInformation('BENEFICIARY_RELATIONSHIP')
  const {
    documentType: { data: listDocumentsTypes },
  } = useDocumentType()

  const contentRef = useRef(null)

  const { affiliate } = useAffiliate()

  const dispatch = useDispatch()


  useEffect(() => {
    if (beneficiariesRegErrorMessage) {
      handleShowModalValidation()
      setMessageValidation('Hubo un error al registrar uno o más beneficiarios, vuelva a intentarlo.')
      setInitRegisterBeneficiaries(false)
      mutateBeneficiaries(beneficiario, true)
    }
    if (beneficiariesRegSuccessMessage) {
      setStep((step) => step + 1)
      mutateBeneficiaries(beneficiario, true)
    }

    return () => { dispatch(Advisor_ResetStore()) }
  }, [beneficiariesRegErrorMessage, beneficiariesRegSuccessMessage])

  useEffect(() => {
    if (beneficiario) {
      setListBeneficiaries(() => {
        const data = []
        let search = null
        ;[...dataBeneficery, ...beneficiario].forEach((item) => {
          search = data.find((d) => d.beneficiaryId === item.beneficiaryId)
          if (!search) data.push(item)
        })
        return data
      })
    }
  }, [beneficiario])

  useEffect(() => {
    if (JSON.stringify(listBeneficiaries) !== JSON.stringify(dataBeneficery)) {
      dispatch(setDataBeneficery([...listBeneficiaries]))
    }
  }, [listBeneficiaries])

  useEffect(() => {
    if (JSON.stringify(editBenef) !== JSON.stringify(initialValues)) setAddBeneficiary(true)
    setEditBenef(editBenef)
  }, [editBenef])

  const handleShowModalValidation = () => {
    setShowModalValidation(true)
  }

  const handleCloseModalValidation = () => {
    setShowModalValidation(false)
  }

  const handleNextPage = (e) => {
    setMessageValidation(msgInputsEmpty)
    if (e === 'next') {
      if (
        (!pensioner && listBeneficiaries.length === 0 && !djNoBeneficiaries) ||
        (pensioner && listBeneficiaries.length === 0 && !djNoBeneficiaries) ||
        (!pensioner && (!djNoBeneficiaries || listBeneficiaries.length === 0)) ||
        !pensioner
      ) {
        handleShowModalValidation()
      } else {
        if (step === 1 && djNoBeneficiaries === false) {
          //Register Beneficiaries
          openModalConfirm()
        } else {
          setStep((step) => step + 1)
        }
      }
    } else if (e === 'return') {
      setStep((step) => step - 1)
    }
  }

  const handleNextStep = () => {
    return true
  }

  const handleClic = (e) => {
    if (djNoBeneficiaries) {
      setMessageValidation('Debes desmarcar la declaración jurada donde señalas no contar con beneficiarios.')
      handleShowModalValidation()
    } else {
      setEditBenef(initialValues)
      setAddBeneficiary(e)
    }
  }

  //Modal Confirm
  const openModalConfirm = () => {
    setModalConfirm(true)
  }
  const closeModalConfirm = () => {
    setModalConfirm(false)
  }
  const confirmRegister = () => {
    setModalConfirm(false)
    setInitRegisterBeneficiaries(true)

    dispatch(AdvisorActions.SendBeneficiaryReg())
  }

  return (
    <>
      {ReactDOM.createPortal(
        <PopPupWarning
          widthB="170px"
          heightB="45px"
          marginT="50px"
          marginB="40px"
          justifyContent="center"
          nameButton="Entendido"
          hideButtonCancel={true}
          show={showModalValidation}
          onClose={handleCloseModalValidation}
          onClick={handleCloseModalValidation}
          texto={messageValidation}
        />,
        document.getElementById('modal')
      )}
      {!beneficiario ? (
        <Loading />
      ) : (
        <>
          <WhiteCard>
            <Header />
            <ListBeneficiaries
              beneficiaries={listBeneficiaries}
              length={0}
              setEditBenef={setEditBenef}
              setAddBeneficiary={setAddBeneficiary}
              setListBeneficiaries={setListBeneficiaries}
              listDocumentsTypes={listDocumentsTypes}
              genders={genders}
              relationShips={relationships}
              disabledOptions={initRegisterBeneficiaries}
            />
            {!initRegisterBeneficiaries && (
              <AddBeneficiary beneficiaries={listBeneficiaries} onclick={handleClic} />
            )}
            {addBeneficiary && (
              <FormNewBeneficiary
                modal={addBeneficiary}
                infoIni={editBenef}
                setAddBeneficiary={setAddBeneficiary}
                setListBeneficiaries={setListBeneficiaries}
                listBeneficiaries={listBeneficiaries}
                setEditBenef={setEditBenef}
                listDocumentsTypes={listDocumentsTypes}
                genders={genders}
                relationShips={relationships}
                affiliateInfo={affiliate}
              />
            )}
            {listBeneficiaries.length === 0 && <Declaration />}
            <Pensioner />
            <OptionsPensioner disabledRadios={initRegisterBeneficiaries} />
          </WhiteCard>
          <MediaQuery maxDeviceWidth={375}>
            <Paginator
              widthB="120px"
              heightB="45px"
              disabledBackButton={initRegisterBeneficiaries}
              setStep={setStep}
              next={handleNextStep}
              onClick={handleNextPage}
              loadingContinueButton={initRegisterBeneficiaries}
            />
          </MediaQuery>
          <MediaQuery minDeviceWidth={376}>
            <Paginator
              widthB="138px"
              heightB="45px"
              disabledBackButton={initRegisterBeneficiaries}
              setStep={setStep}
              next={handleNextStep}
              onClick={handleNextPage}
              loadingContinueButton={initRegisterBeneficiaries}
            />
          </MediaQuery>
        </>
      )}

      <ModalV2 show={modalConfirm} centered borderRadius="1rem" padding="1rem">
        <ModalBody>
          <span className="bodyText">¿Deseas registrar a tus beneficiarios declarados?</span>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Row center autoFlex>
              <Col xs={12}>
                <NButton className="white" onClick={closeModalConfirm}>
                  No
                </NButton>
              </Col>
              <Col xs={12}>
                <NButton onClick={confirmRegister}>Sí</NButton>
              </Col>
            </Row>
          </ButtonGroup>
        </ModalFooter>
      </ModalV2>
    </>
  )
}

export default RegisterBeneficiaries
