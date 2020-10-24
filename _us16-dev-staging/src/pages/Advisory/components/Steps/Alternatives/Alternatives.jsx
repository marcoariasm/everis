import React, { useState, useEffect, useReducer } from 'react'
import MediaQuery from 'react-responsive'
import { Redirect } from 'react-router-dom'

import useTotalBalance from 'modules/Retirement955/api/Globales/useTotalBalance'
import usePension from 'modules/Retirement955/api/Globales/usePension'
import { alternativerService0 } from 'redux/services/alternatives.service'
import {finaliceProcessService} from 'redux/services/finalize.process.service'
import { AlternativeContext } from './context.js'

import WhiteCard from 'shared/components/WhiteCard'
import Tabs from 'global/components/Tabs/Tabs'

import { WithdrawFund } from './Steps/WithdrawFund'
import { SlideView } from './Carousel'
import { RetirementPension } from './Steps/RetirementPension'
import PopPupWarning from 'shared/components/PopPupValidation/PopPupWarning'
import { PercentageFund } from './Steps/PercentageFund'
import Paginator from 'global/components/Paginator/Paginator'
import { Loading } from 'global/components/Loading'
import { Header } from './Header'

import Retiro from 'shared/images/retiro.svg'
import Porcentaje from 'shared/images/porcentaje.svg'
import Pension from 'shared/images/pension.svg'

import alternativeReducer from 'redux/reducers/Alternatives/alternative.reducer'


const initialState = {
  alternatives: {
      retirementPension: {
              "deferredLifeAnnuity": 0,
              "deliveryAmount": 0,
              "familyLifeAnnuity": 0,
              "pensionAmount": 0,
              "scheduledWithdrawal": 0,
              "temporaryRent": 0
      },
      retirementPercent: {
          25: {
              "deferredLifeAnnuity": 0,
              "deliveryAmount": 0,
              "familyLifeAnnuity": 0,
              "pensionAmount": 0,
              "scheduledWithdrawal": 0,
              "temporaryRent": 0
          },
          50: {
              "deferredLifeAnnuity": 0,
              "deliveryAmount": 0,
              "familyLifeAnnuity": 0,
              "pensionAmount": 0,
              "scheduledWithdrawal": 0,
              "temporaryRent": 0
          },
          75: {
              "deferredLifeAnnuity": 0,
              "deliveryAmount": 0,
              "familyLifeAnnuity": 0,
              "pensionAmount": 0,
              "scheduledWithdrawal": 0,
              "temporaryRent": 0
          }
      },
      retirement955: {
              "deferredLifeAnnuity": 0,
              "deliveryAmount": 0,
              "familyLifeAnnuity": 0,
              "pensionAmount": 0,
              "scheduledWithdrawal": 0,
              "temporaryRent": 0
      }
  }
}


export default function Alternatives({ setStep }) {
  const { totalBalance, isLoading: isLoadingTotalBalance } = useTotalBalance()

  const [state, dispatch] = useReducer(alternativeReducer, initialState)
  const { pension, isLoading: isLoadingPension } = usePension()

  const [validation, setValidation] = useState(false)
  const [messageValidation, setMessageValidation] = useState(null)
  const [showModalValidation, setShowModalValidation] = useState(false)
  const [visibility, setVibility] = useState(0)
  const [redirection, setRedirection] = useState(false)
  const [numStep, setNumStep] = useState(0)
  const [percentage45, setPercentage45] = useState(false)

  const resource = [
    { name: Retiro, nameShort: 'Retiro', label: 'Recibir una pensión de jubilación' },
    {
      name: Porcentaje,
      nameShort: 'Porcentaje',
      label: 'Retirar un porcentaje de tu fondo y recibir una pensión del saldo',
    },
    { name: Pension, nameShort: 'Pension', label: 'Retirar el 95.5% de tu fondo' },
  ]

  const handleOnChange = (e) => {
    setVibility(e)
    setNumStep(e + 1)
  }

  function getCheck(event) {
    setValidation(event)
  }

  const componentArray = [
    <RetirementPension totalBalance={totalBalance} pension={pension} />,
    <WithdrawFund totalBalance={totalBalance} pension={pension} />,
    <PercentageFund onChange={getCheck} totalBalance={totalBalance} />,
  ]

  const handleNextStep = () => {
    return true
  }

  const handleShowModalValidation = () => {
    setShowModalValidation(true)
  }

  const handleCloseModalValidation = () => {
    setShowModalValidation(false)
  }

  function getSteps(event) {
    const stateStep = event.filter((el, index) => event.indexOf(el) === index)
    setNumStep(stateStep.length)
  }

  const handleNextPage = (e) => {
    
    if (numStep < 3) {
      setMessageValidation('Aún no has terminado de ver todas las alternativas que hemos preparado para ti')
    } else {
      if (!validation) {
        setMessageValidation('Debes aceptar la Declaración Jurada de conformidad de la asesoría recibida.')
      }
    }
    if (e === 'next') {
      if (numStep < 3 || !validation) {
        handleShowModalValidation()
      } else {
        setRedirection(true)
        window.scrollTo(0, 0)
      }
    } else if (e === 'return') {
      setStep((step) => step - 1)
      window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    alternativerService0().then(response => {
      dispatch({type: 'CHANGE_PERCENTAGE', response })
    })
      setPercentage45('4.5')

      //finaliceProcessService()
    
  }, [])

  return (
    <AlternativeContext.Provider value={state}>
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
        onClick={handleShowModalValidation}
        texto={messageValidation}
      />
      {isLoadingTotalBalance || isLoadingPension ? (
        <Loading />
      ) : (
        <>
          <MediaQuery maxDeviceWidth={767}>
            <WhiteCard>
              <Header />
              <SlideView src={resource} funct={handleOnChange} />
              {componentArray[visibility]}
            </WhiteCard>
          </MediaQuery>
          <MediaQuery minDeviceWidth={767}>
            <WhiteCard>
              <Header />
              <Tabs onSteps={getSteps}>
                <div label="Recibir una pensión de jubilación" src={Retiro}>
                  <RetirementPension percentages={state} totalBalance={totalBalance} pension={pension} />
                </div>
                <div label="Retirar un porcentaje de tu fondo y recibir una pensión del saldo" src={Porcentaje}>
                  <WithdrawFund balance45={percentage45} totalBalance={totalBalance} pension={pension} />
                </div>
                <div label="Retirar el 95.5% de tu fondo" src={Pension}>
                  <PercentageFund percentages={state} onChange={getCheck} totalBalance={totalBalance} />
                </div>
              </Tabs>
            </WhiteCard>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={375}>
            <Paginator
              nameButton="Finalizar"
              widthB="120px"
              heightB="45px"
              setStep={setStep}
              next={handleNextStep}
              onClick={handleNextPage}
            />
          </MediaQuery>
          <MediaQuery minDeviceWidth={376}>
            <Paginator
              nameButton="Finalizar"
              widthB="138px"
              heightB="45px"
              setStep={setStep}
              next={handleNextStep}
              onClick={handleNextPage}
            />
          </MediaQuery>
        </>
      )}
      {redirection && <Redirect to="/proceso95-5/CompletionOfAdvisory"></Redirect>}
    </AlternativeContext.Provider>
  )
}
