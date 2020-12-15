import React, { useState } from 'react';
import Card from 'global/components/v1/Card/Card';
import ButtonValidation
  from 'global/components/v1/ButtonValidation/ButtonValidation';
import EditIcon from 'shared/images/iconos/editar.svg';
import TrashIcon from 'shared/images/iconos/borrar2.svg';
import FileIcon from 'shared/images/iconos/file.svg';
import ButtonImage
  from 'global/components/v1/ButtonImagen/ButtonImage';
import styled from 'styled-components';
import Select from 'global/components/v1/SelectMaterial';
import Input from 'global/components/v1/InputMaterial';
import ButtonFileUpload
  from 'global/components/v1/ButtonFileUpload/ButtonFileUpload';

const EvidenciaBody = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

const EvidenciaBlock = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  align-items: center;
  padding: 20px 0;
`;

const EvidenciaFileContainer = styled.div`

`;
const EvidenciaFile = styled.div`
  display:flex;
  align-items: center;
  padding-left: 70px;
  border: 0.7px solid rgba(143, 143, 143, 0.7);
  border-radius: 5px;
  width: 320px;
  height: 60px;
  position: relative;
  background: url(${FileIcon}) no-repeat 20px;
  font-family: Calibri;
  font-style: normal;
  font-weight: normal;
  color: #696158;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  
  & .name{
    font-size: 18px;
    line-height: 22px;
  }
  
  & .size{
    font-size: 15px;
    line-height: 18px;
    opacity: 0.7;
  }
  
  & .close{
    position: absolute;
    top: 5px;
    right: 5px;
    background: #E8E8E8;
    border-radius: 20px;
    padding: 0 5px;
    cursor: pointer;
  }
`;

const StepTwoTwo = () => {
  const [bank, setBankState] = useState('BCP');
  const [accountNumber, setAccountNumber] = useState('365498715-0-92');
  const [tmpFile, setTmpFile] = useState({ name: 'Voucher', size: '5MB' });
  const [readOnly, setReadOnly] = useState(true);

  const banks = [
    {
      value: 'BCP',
      label: 'Banco de Crédito del Perú',
    }, {
      value: 'BBVA',
      label: 'Banco Continental - BBVA',
    }];

  const setBankValue = ({ value }) => {
    setBankState(value);
    setAccountNumber('');
  };

  const setAccountNumberValue = (value) => {
    setAccountNumber(value);
  };

  const deleteFile = () => {
    setTmpFile(null);
  };

  const addFile = () => {
    setTmpFile({ name: 'Voucher', size: '5MB' });
  };

  const deleteAccountInfo = () => {
    setBankState('');
    setAccountNumber('');
    setTmpFile(null);
    setReadOnly(false);
  };

  return (
    <Card title="2. Forma de pago">
      <div className="paso2-block with-border-bottom">
        <div className="paso2-left">
          Forma de Pago :
        </div>
        <div className="paso2-right">
          Abono en Cuenta
        </div>
      </div>
      <div className="paso2-block">
        <div className="paso2-left">
          Monto a Abonar:
        </div>
        <div className="paso2-right">
          S/ 91,645.31
        </div>
      </div>
      <Card className="no-padding">
        <div className="paso2-block  with-border-bottom">
          <div className="paso2-left">
            Evidencia de cuenta Bancaria
          </div>
          <div className="paso2-right align-right">
            <ButtonImage
              bcolor="#fff"
              color="#00A499"
              onClick={() => setReadOnly(false)}
              width="35px"
              icon={EditIcon}
            />
            <ButtonImage
              bcolor="#fff"
              color="#00A499"
              width="35px"
              onClick={deleteAccountInfo}
              icon={TrashIcon}
            />
          </div>
        </div>
        <EvidenciaBody>
          <EvidenciaBlock>
            <label>Entidad financiera:</label>
          </EvidenciaBlock>
          <EvidenciaBlock>
            <Select
              options={banks}
              value={bank}
              placeholder="Seleccionar banco"
              disabled={readOnly}
              onChange={(event) => setBankValue(event.target.value)}
            />
          </EvidenciaBlock>
          <EvidenciaBlock>Nº de cuenta en soles:</EvidenciaBlock>
          <EvidenciaBlock>
            <Input
              value={accountNumber}
              disabled={readOnly}
              onChange={(event) => setAccountNumberValue(
                event.target.value,
              )}
            />
          </EvidenciaBlock>
        </EvidenciaBody>
      </Card>
      <EvidenciaFileContainer>
        {tmpFile.name ? (
          <EvidenciaFile>
            <div className="name">{tmpFile.name}</div>
            <div className="size">{tmpFile.size}</div>
            <div className="close" onClick={deleteFile}>&times;</div>
          </EvidenciaFile>
        ) : (
          <ButtonFileUpload
            handleFile={addFile}
          />

        )}
      </EvidenciaFileContainer>
      <ButtonValidation text="Validado por el asesor" />
    </Card>
  );
};

export default StepTwoTwo;
