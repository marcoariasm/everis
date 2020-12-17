import React from 'react'
import styled from 'styled-components'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'
import MediaQuery from 'react-responsive'
import { size } from 'global/styles/Responsive'
import { allColors } from 'global/styles'
import Help from 'shared/images/help.svg'
import './styles.scss'

const Tooltiptext = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 16px;
  z-index: 500;
  padding: 30px 20px;
  border-radius: 8px;
  color: white;
  text-align: left;
  font-size: 16px;
  font-weight: 400;
  font-family: Calibri;
  background: ${allColors.colorGrayText};
  
`

export const Pensioner = () => {
  return (
    <Content>
      <MediaQuery minDeviceWidth={`${size.tablet}`}>
        <h1 className="cardTitleLarge">¿Eres Pensionista en la ONP o en otra AFP?</h1>
        <Tooltip
          trigger="click"
          arrow="true"
          position="top-start"
          arrowSize="big"
          html={(
              <div>
                <Tooltiptext>
                  <h1 className="tableBodyText" style={{ color: 'white', fontSize: '16px' }}>
                    <b>¿Por qué te preguntamos esto?</b>
                  </h1>
                  <span className="tableBodyText" style={{ color: 'white' }}>
                    Para que cuando realices la <b>Etapa 2</b> del trámite, tengas a la mano los siguientes documentos:
                  </span>
                  <span className="tableBodyText" style={{ color: 'white' }}>
                    <b>Si eres pensionista en el SNP:</b> la Resolución ONP y la última boleta de pago de pensión.
                  </span>
                  <span className="tableBodyText" style={{ color: 'white' }}>
                    <b>Si eres pensionista en otra AFP:</b> la constancia emitida por dicha AFP que acredite esta condición.
                  </span>
                  <span className="tableBodyText" style={{ color: 'white' }}>
                    Estos documentos sustentarán que ya cuentas con atención médica en EsSalud, por lo que ya no será necesario
                    que transfiramos el 4.5% de tu fondo a dicha entidad.
                  </span>
                </Tooltiptext>
              </div>
          )}
        >
          <HelpIcon src={Help} alt="tooltipPensioner" />
        </Tooltip>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={`${size.tablet}`}>
        <Tooltip
          title="Welcome to React"
          trigger="click"
          arrow="true"
          position="left-end"
          arrowSize="big"
          sticky={true}
          stickyDuration={0}
          html={(
              <div style={{ width: 240 }}>
                <Tooltiptext>
                  <h1 className="tableBodyText" style={{ color: 'white' }}>
                    <b>¿Por qué te preguntamos esto?</b>
                  </h1>
                  <span className="tableBodyText" style={{ color: 'white' }}>
                    Para que cuando realices la <b>Etapa 2</b> del trámite, tengas a la mano los siguientes documentos:
                  </span>
                  <span className="tableBodyText" style={{ color: 'white' }}>
                    <b>Si eres pensionista en el SNP:</b> la Resolución ONP y la última boleta de pago de pensión.
                  </span>
                  <span className="tableBodyText" style={{ color: 'white' }}>
                    <b>Si eres pensionista en otra AFP:</b> la constancia emitida por dicha AFP que acredite esta condición.
                  </span>
                  <span className="tableBodyText" style={{ color: 'white' }}>
                    Estos documentos sustentarán que ya cuentas con atención médica en EsSalud, por lo que ya no será necesario
                    que transfiramos el 4.5% de tu fondo a dicha entidad.
                  </span>
                </Tooltiptext>
              </div>
          )}
        >
           <h1 className="cardTitleLarge">¿Eres Pensionista en la ONP o en otra AFP?<HelpIcon src={Help} alt="tooltipPensioner" /></h1>
        </Tooltip>
      </MediaQuery>
    </Content>
  )
}

const Content = styled.div`
  display: flex;
  position: relative;
  margin-top: 42px;
`

const HelpIcon = styled.img`
  width: 20px;
  cursor: pointer;
  margin-left: 5px;
`
