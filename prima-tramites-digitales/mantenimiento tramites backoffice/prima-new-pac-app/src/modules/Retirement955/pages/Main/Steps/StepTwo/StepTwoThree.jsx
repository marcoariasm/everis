import React, { useState } from 'react';
import styled from 'styled-components';

import ButtonFileUpload from 'global/components/v1/ButtonFileUpload/ButtonFileUpload';
import ButtonValidation from 'global/components/v1/ButtonValidation/ButtonValidation';
import CheckBox from 'global/components/v1/CheckBox/CheckBox';
import Card from 'global/components/v1/Card/Card';
import FileIcon from 'shared/images/iconos/file.svg';

const StepTwoThree = () => {
  const [tmpFile, setTmpFile] = useState({ name: 'Voucher', size: '5MB' });

  const deleteFile = () => {
    setTmpFile(null);
  };

  const addFile = () => {
    setTmpFile({ name: 'Voucher', size: '5MB' });
  };

  return (
    <Card title="3. Cobertura de EsSalud">
      <ContentCheck>
        <CheckBox id="test" label="Pensionista SPP o SNP viudez/orfandad" />
      </ContentCheck>
      <SubTitle>Evidencia de cuenta Bancaria</SubTitle>
      <div>
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
      </div>
      <ButtonValidation text="Validado por el asesor" />
    </Card>
  );
};

export default StepTwoThree;

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

const ContentCheck = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  padding-left: 12px;
  border-bottom: 0.757098px dashed #9B9B9B;
`;

const SubTitle = styled.div`
  font-family: FS Emeric;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.02em;
  color: #00AE99;
  padding: 25px 0 15px 0;
`;
