import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MediaQuery from 'react-responsive'
import ReactDOM from 'react-dom'

//SWR
import useBeneficiaries from 'modules/Retirement955/api/Afiliado/useBeneficiaries';
import useDocumentType from 'modules/Retirement955/api/Login/useDocumentType';
import SharedModule from 'modules/shared';

//REDUX
import { setDataBeneficery } from 'redux/actions/Advisor';


import WhiteCard from 'shared/components/WhiteCard'
import PopPupWarning from 'shared/components/PopPupValidation/PopPupWarning'
import { Pensioner } from './components/Pensioner'
import Paginator from 'global/components/Paginator/Paginator'
import { Loading } from 'global/components/Loading'
import { Header } from './components/Header'
import OptionsPensioner from './components/FooterSection/OptionsPensioner'
import { initialValues } from 'shared/constant/ConstAddBeneficiary'
import Declaration from './components/Declaration/index'
import ListBeneficiaries from './components/MainSection/ListBeneficiaries'
import AddBeneficiary from './components/MainSection/AddBeneficiary'
import FormNewBeneficiary from './components/MainSection/FormNewBeneficiary'

const { useAffiliate } = SharedModule.api;
const msgInputsEmpty =
  'Por favor completa la información requerida en la pantalla para que puedas continuar con el trámite.'

function RegisterBeneficiaries({ setStep }) {
  //redux
  const { djNoBeneficiaries, pensioner, dataBeneficery } = useSelector((state) => state.advisor)

  //state
  const { beneficiario , idLoading: isLoadingBeneficiaries } = useBeneficiaries();
  const [listBeneficiaries, setListBeneficiaries] = useState([])
  const [addBeneficiary, setAddBeneficiary] = useState(false)
  const [messageValidation, setMessageValidation] = useState(null)
  const [showModalValidation, setShowModalValidation] = useState(false)
  const [editBenef, setEditBenef] = useState(initialValues)

  
  //swr
  const {documentType} = useDocumentType({
    authenticated: false,
  });
  
  const { affiliate } = useAffiliate()
  

  const dispatch = useDispatch()

  useEffect(() => {
    if(beneficiario){
      setListBeneficiaries(() => {
        const data = []
        let search = null;
        [...dataBeneficery, ...beneficiario].forEach((item) => {
          search = data.find((d) => d.beneficiaryId === item.beneficiaryId)
          if (!search) data.push(item)
        })
        return data
      });
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
        setStep((step) => step + 1)
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

  return (
    <>
      {
        ReactDOM.createPortal(
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
        )
      }
      { !beneficiario  ? (
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
            />
            <AddBeneficiary beneficiaries={listBeneficiaries} onclick={handleClic} />
            {addBeneficiary && (
              <FormNewBeneficiary
                modal={addBeneficiary}
                infoIni={editBenef}
                setAddBeneficiary={setAddBeneficiary}
                setListBeneficiaries={setListBeneficiaries}
                listBeneficiaries={listBeneficiaries}
                setEditBenef={setEditBenef}
                documentType={documentType}
                affiliateInfo={affiliate}
              />
            )}
            {listBeneficiaries.length === 0 && <Declaration />}
            <Pensioner />
            <OptionsPensioner />
          </WhiteCard>
          <MediaQuery maxDeviceWidth={375}>
            <Paginator widthB="120px" heightB="45px" setStep={setStep} next={handleNextStep} onClick={handleNextPage} />
          </MediaQuery>
          <MediaQuery minDeviceWidth={376}>
            <Paginator widthB="138px" heightB="45px" setStep={setStep} next={handleNextStep} onClick={handleNextPage} />
          </MediaQuery>
        </>
      )}
    </>
  )
}

export default RegisterBeneficiaries
