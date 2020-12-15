import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'modules/Retirement955/components/Header/Header';
import Card from 'global/components/v1/Card/Card';
import Select from 'global/components/v1/SelectMaterial';
import CheckBox from 'global/components/v1/CheckBox/CheckBox';
import TabFooterSlots
  from 'modules/Retirement955/components/TabFooter/TabFooterSlots';
import Button from 'global/components/v1/Button/Button';
import prevIcon from 'shared/images/iconos/prev.svg';
import Modal from 'global/components/v1/Modal/Modal';

import AttachmentDocumentModal from './AttachmentModal';

class Detalle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      withoutRUC: {
        noruc: {
          label: 'Si tiene RUC',
          checked: true,
        },
      },
      reasonsChecked: {
        noattachment: {
          label: 'No adjunta reporte tributario',
          checked: false,
        },
        qrwrong: {
          label: 'Código QR no lee',
          checked: false,
        },
        qrexpiry: {
          label: 'Código QR no está disponible por expiración de vigencia',
          checked: false,
        },
        uitexceeded: {
          label: 'Excede el monto UIT establecido',
          checked: false,
        },
      },
      attachedFileName: 'Ningún archivo seleccionado',
      AttachmentModalOpen: false,
    };

    this.check = this.check.bind(this);
    this.showAttachmentModal = this.showAttachmentModal.bind(this);
    this.hideAttachmentModal = this.hideAttachmentModal.bind(this);
  }

  check(id) {
    const reasonsCheckedTmp = this.state.reasonsChecked;
    reasonsCheckedTmp[id].checked = !reasonsCheckedTmp[id].checked;

    this.setState({ reasonsChecked: reasonsCheckedTmp });
  }

  handleNextStep() {
    return true;
  }

  showAttachmentModal() {
    this.setState({ AttachmentModalOpen: true });
  }

  hideAttachmentModal() {
    this.setState({ AttachmentModalOpen: false });
  }

  saveAttachmentModal(data) {
    this.setState({ attachedFileName: data.name });
  }

  render() {
    const ResultOptions = [
      { value: 'Registrado', label: 'Registrado' },
      { value: 'Aceptado', label: 'Aceptado' },
      { value: 'Observado', label: 'Observado' },
      { value: 'Rechazado', label: 'Rechazado' },
    ];
    const { match: { params }, history } = this.props;

    const ReasonChecksToShow = params.ruc
      ? this.state.reasonsChecked
      : this.state.withoutRUC;

    return (
      <ConsultaPage>
        <Header title="Detalles de trámite" />
        <Card className="consulta-page">
          <ConsultaBlock style={{ width: '45%' }} className="right-border">
            <h3>Revisión de Documentos Adjuntos</h3>
            <PrincipalData>
              <dl>
                <dt>
                  <strong>Nro. de Solicitud:</strong>
                </dt>
                <dd>122501</dd>
                <dt>
                  <strong>CUSPP:</strong>
                </dt>
                <dd>220830MCTI6</dd>
                <dt>
                  <strong>Tipo DOI:</strong>
                </dt>
                <dd>DNI</dd>
                <dt>
                  <strong>Nro DOI:</strong>
                </dt>
                <dd>23698741</dd>
                <dt>
                  <strong>Nombre Afiliado:</strong>
                </dt>
                <dd>CORNEJO TEZEN MARIA</dd>
                <dt>
                  <strong>Fecha de Solicitud:</strong>
                </dt>
                <dd>20/04/2020</dd>
                <dt>
                  <strong>Modalidad Aplicación:</strong>
                </dt>
                <dd>REJA</dd>
                <dt>
                  <strong>Fecha de última RRLL:</strong>
                </dt>
                <dd>30/10/2018</dd>
              </dl>
            </PrincipalData>
            <AttachmentDocuments>
              <h3>Documentos Adjuntos:</h3>
              <ul>
                <li>Reporte tributario de rentas de cuarta categoría</li>
                <li>DJ por desempleo</li>
                <li>Constancia de Asesoría y Estimaciones</li>
                <li>Determinación de acceso al REJA</li>
              </ul>
            </AttachmentDocuments>
            <Result>
              <p>Resultado de revisión:</p>
              <Select
                width="350"
                options={ResultOptions}
                placeholder="Seleccione estado"
              />
            </Result>
            <ReasonState>
              <strong>Motivo del estado:</strong>
              <ReasonChecks>
                {Object.keys(ReasonChecksToShow).map((key) => (
                  <Reason>
                    <CheckBox
                      id={key}
                      key={key}
                      width={330}
                      checked={ReasonChecksToShow[key].checked}
                      onChange={() => {
                        this.check(key);
                      }}
                      name={key}
                      label={ReasonChecksToShow[key].label}
                    />
                  </Reason>
                ))}
              </ReasonChecks>
            </ReasonState>
            {params.hasOwnProperty('ruc') === false
              && (
              <AttachEvidence>
                <p><strong>Adjuntar evidencia:</strong></p>
                <div>
                  <Button
                    customStyle={{
                      backgroundColor: '#00AE99',
                      fontSize: '16px',
                      padding: 0,
                    }}
                    onClick={this.showAttachmentModal}
                  >
                    Añadir archivo
                  </Button>
                  <p className="file-name">{this.state.attachedFileName}</p>
                </div>
              </AttachEvidence>
              )}
          </ConsultaBlock>
          <ConsultaBlock style={{ width: '55%' }}>
            <DocumentContainer>
              <DocumentFrame />
              <FileData>
                <dl>
                  <dt>
                    <strong>Resultado de Validaciones:</strong>
                  </dt>
                  <dd>OBSERVADO</dd>
                  <dt>
                    <strong>Motivo de Observación:</strong>
                  </dt>
                  <dd>Ingreso Mayor a 7 UIT</dd>
                  <dt>
                    <strong>Última modificación:</strong>
                  </dt>
                  <dd>00/00/0000 00:00AM</dd>
                  <dt />
                  <dd>
                    <Button
                      size="19"
                      classButton="btn-actualizar"
                      customStyle={{
                        fontSize: '17px',
                        padding: 0,
                        width: 215,
                      }}
                    >
                      Modificar Documento
                    </Button>
                  </dd>
                </dl>
              </FileData>
            </DocumentContainer>
          </ConsultaBlock>
        </Card>
        <TabFooterSlots
          nextButtonText="Finalizar Asesoría"
          nextButtonSize={25}
          next={this.handleNextStep}
        >
          <TabFooterSlots.LeftSide>
            <Button
              onClick={() => {
                history.push('/proceso95-5/tramites');
              }}
              leftIcon={prevIcon}
              className="secondary"
            >
              Anterior
            </Button>
          </TabFooterSlots.LeftSide>
          <TabFooterSlots.RightSide>
            <Button>
              Confirmar
            </Button>
          </TabFooterSlots.RightSide>
        </TabFooterSlots>
        <Modal
          show={this.state.AttachmentModalOpen}
          hideFooter
          onClose={this.hideAttachmentModal}
          onClick={this.saveAttachmentModal.bind(this)}
          width="840px"
          padding="50px"
          className="modal-attach-document"
        >
          <AttachmentDocumentModal />
        </Modal>
      </ConsultaPage>
    );
  }
}

const ConsultaPage = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Calibri;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  color: #696158;
  
  .consulta-page > .card-body{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
`;

const ConsultaBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  
  .right-border{
    border: 0.5px solid #9B9B9B;
  }
  
  h3{
    font-family: FS Emeric;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 0.02em;
    color: #00A499;
    margin-bottom: 15px;
  }
`;

const PrincipalData = styled.div`
  display: flex;
  margin-bottom: 30px;
  
  dl {
    display: flex;
    flex-wrap: wrap;
  }
  dt {
    font-weight: bold;
    width: 40%;
    padding: 5px 0;
  }
  dd {
    width: 60%;
    padding: 5px 0;
  }
`;

const AttachmentDocuments = styled.div`
  display: flex;
  margin-bottom: 30px;
  flex-direction: column;
  border-bottom: 2px dashed rgba(0, 0, 0, 0.15);
  padding-bottom: 30px;
  
  ul{
    margin-left: 35px;
    list-style: none;
    
    li {
      padding: 5px 0;
    }
    
    li::before {
      content: "\\2022";
      color: #FF4F00;
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
      font-size: 25px;
    }
  }
 `;

const Result = styled.div`
  display: flex;
  margin-bottom: 30px;
  flex-direction: row;
  align-items: center;
  
  & > p, & > div{
    display: flex;
  }
  
  & p{
    margin-right: 20px;
  }
  
  `;

const ReasonState = styled.div`
  display: flex;
  margin-bottom: 30px;
  flex-direction: column;
`;

const ReasonChecks = styled.div`
  max-height: 240px;
  overflow-y: auto;
  margin-top: 15px;
  padding-left: 10px
`;

const Reason = styled.div`
  display: flex;
`;

const DocumentContainer = styled.div`
  display: flex;
  border: 1px solid #C0C0C0;
  height: 825px;
  flex-direction: column;
`;
const DocumentFrame = styled.div`
  display: flex;
  height: 630px;
  overflow-y: auto;
`;

const FileData = styled.div`
  display: flex;
  margin-bottom: 30px;
  width: 80%;
  margin: 0 auto;
  
  dl {
    display: flex;
    flex-wrap: wrap;
  }
  dt {
    font-weight: bold;
    width: 50%;
    padding: 5px 0;
  }
  dd {
    width: 50%;
    padding: 5px 0;
    
    button{
      margin-top: 15px;
    }
  }
`;

const AttachEvidence = styled.div`
  display: flex;
  flex-direction: column;
  
  div{
    flex-direction: row;
    display: flex;
    align-items: center;
    margin-top: 20px;
    justify-content: space-between;
  }
  
  p{
    font-size: 18px;
  }
  
  button{
    width: 160px;
  }
  
  .file-name{
    color: rgba(101, 101, 101, 0.62);
    font-size: 16px;
  }
`;

export default withRouter(Detalle);
