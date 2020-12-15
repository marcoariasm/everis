import React, { useState, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import $ from 'global/styles';

import NewTable from 'modules/Retirement955/components/NewTable';
import Filter from 'modules/Retirement955/components/Filter/Filter';
import Select from 'global/components/v1/SelectMaterial';
import Input from 'global/components/v1/InputMaterial';

import ArrowLeft from 'shared/images/iconos/arrowLeft.svg';
import ArrowRight from 'shared/images/iconos/arrowRight.svg';
import Search from 'shared/images/SEARCH.svg';

import useAdvisor from 'modules/Retirement955/api/useAdvisor';
import useProcedure from 'modules/Retirement955/api/useProcedure';
import useInformation from 'modules/Retirement955/api/useInformation';

import { formatDate } from 'modules/shared/utils';
import {
  headersAgenda,
  formatCombo,
  DOCUMENT_TYPE,
  PROCEDURES,
  CHANNEL,
  validatedDocumentType,
} from 'modules/Retirement955/constants';
import TabFooterSlots from 'modules/Retirement955/components/TabFooter/TabFooterSlots';
import Button from 'global/components/v1/Button/Button';

const Agenda = () => {
  const [idDocumento, setIdDocumento] = useState('');
  const [documento, setDocumento] = useState('');
  const [cuspp, setCuspp] = useState('');
  const [fechaSolicitud, setFechaSolicitud] = useState('');
  const [idTramite, setIdTramite] = useState('');
  const [asesor, setAsesor] = useState('');
  const [idCanal, setIdCanal] = useState('');
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const history = useHistory();
  const params = useParams();
  const location = useLocation();

  const { procedures, isLoadingProcedure } = useProcedure();
  const { advisor } = useAdvisor();

  const { data: documentType } = useInformation(DOCUMENT_TYPE);
  const { data: proceduresType } = useInformation(PROCEDURES);
  const { data: channelType } = useInformation(CHANNEL);

  useEffect(() => {
    if (procedures && Object.values(procedures) && data.length === 0) {
      const searched = procedures.procedures.filter((p) => {
        if (p.CUSPP === params.id) {
          p.ETAPA = 'Etapa 1 - Asesoria';
          return p;
        }
        return false;
      });
      setData(searched);
      setFilterData(searched);
    }
  }, [data, procedures, params.id]);

  const handleChange = (e, fn, state) => {
    const { value, validity: { valid }, type } = e.target;
    const validated = (valid || type === 'date') ? value : state;
    fn(validated);
  };

  const redirectAgenda = (id) => {
    history.push(`${location.pathname}/detalle/${id}`);
  };

  const handleClickFilter = () => {
    const dataCopy = [...data];

    const arrayIdDocumento = idDocumento ? dataCopy.filter((item) => item.IDDOC === idDocumento) : dataCopy;
    const arrayDocumento = documento ? arrayIdDocumento.filter((item) => item.DOC === documento) : arrayIdDocumento;
    const arrayCuspp = cuspp ? arrayDocumento.filter((item) => item.CUSPP === cuspp) : arrayDocumento;
    const arrayFechaSolicitud = fechaSolicitud ? arrayCuspp.filter((item) => item.FEC_SOL === fechaSolicitud) : arrayCuspp;
    const arrayIdTramite = idTramite ? arrayFechaSolicitud.filter((item) => item.IDPROCEDURE === idTramite) : arrayFechaSolicitud;
    const arrayCanal = idCanal ? arrayIdTramite.filter((item) => item.IDCHANEL === idCanal) : arrayIdTramite;
    const arrayAsesor = asesor ? arrayCanal.filter((item) => {
      const nameAdvisor = `${advisor.names} ${advisor.fatherLastName} ${advisor.motherLastName}`;
      if (nameAdvisor.toLowerCase().indexOf(asesor.toLowerCase()) !== -1) {
        return item;
      }
      return false;
    }) : arrayCanal;

    setFilterData([...arrayAsesor]);
  };

  const handleCleanFilter = () => {
    setIdDocumento('');
    setDocumento('');
    setCuspp('');
    setFechaSolicitud('');
    setIdTramite('');
    setAsesor('');
    setIdCanal('');
    setFilterData([...data]);
  };

  return (
    <>
      <div className="title">Consulta</div>
      <Filter
        onClickClean={handleCleanFilter}
        onClickFilter={handleClickFilter}
      >
        <Column width="20" mRight="25">
          <Select
            label="Doc. de identidad"
            options={formatCombo(documentType)}
            placeholder="Seleccionar tipo"
            onChange={(e) => handleChange(e, setIdDocumento)}
            value={idDocumento}
          />
          <Input
            label="CUSPP"
            placeholder="Buscar CUSPP"
            icon={Search}
            iconPosition="right"
            onInput={(e) => handleChange(e, setCuspp, cuspp)}
            value={cuspp}
            pattern="[a-zA-ZñÑ0-9]"
            maxLength={12}
          />
        </Column>
        <Column width="20" mRight="20">
          <Input
            inputSize="17"
            label="Nº de documento"
            placeholder="Ingresar Nº de doc"
            onInput={(e) => handleChange(e, setDocumento, documento)}
            value={documento}
            maxLength={validatedDocumentType(idDocumento).length}
            pattern={validatedDocumentType(idDocumento).pattern}
          />
          <Input
            type="date"
            label="Fecha de solicitud"
            placeholder="dd-mm-aaaa"
            onChange={(e) => handleChange(e, setFechaSolicitud)}
            value={fechaSolicitud}
            min="1900-12-31"
            max="2050-12-31"
          />
        </Column>
        <Column width="30" mRight="20">
          <Select
            label="Trámite"
            options={formatCombo(proceduresType)}
            placeholder="Seleccionar trámite"
            onChange={(e) => handleChange(e, setIdTramite)}
            value={idTramite}
          />
          <Select
            label="Canal de atención"
            options={formatCombo(channelType)}
            placeholder="Seleccionar canal"
            onChange={(e) => handleChange(e, setIdCanal)}
            value={idCanal}
          />
        </Column>
        <Column width="30">
          <Input
            label="Asesor"
            labelSize="14"
            placeholder="Ingresar nombre y apellidos"
            onChange={(e) => handleChange(e, setAsesor)}
            value={asesor}
          />
        </Column>
      </Filter>
      <Pagination>
        <p>1-10 de 80</p>
        <div>
          <img src={ArrowLeft} alt="ArrowLeft" />
          <img src={ArrowRight} alt="ArrowRight" />
        </div>
      </Pagination>
      <NewTable
        headers={headersAgenda}
        isEmpty={filterData.length === 0 && !isLoadingProcedure}
        frames="1fr 1fr 1.2fr 2fr 0.8fr 1fr 1fr"
      >
        {filterData.map((item, i) => (
          <div className="t-row" key={i}>
            <div className="key" onClick={() => redirectAgenda(item.CUSPP)}>{item.ETAPA}</div>
            <div>{formatDate(item.FEC_SOL)}</div>
            <div>{item.CUSPP}</div>
            <div className="left">{item.NAME}</div>
            <div>{item.STATUS}</div>
            <div className="capitalize">
              <span>{item.CHANEL}</span>
            </div>
            <div>{item.FEC_VAL ? formatDate(item.FEC_VAL) : '- -'}</div>
          </div>
        ))}
      </NewTable>
      <TabFooterSlots
        id="tab-footers"
        showSaveButton={false}
        nextButtonSize={25}
      >
        <TabFooterSlots.LeftSide>
          <Button
            className="white"
            onClick={() => history.push('/proceso95-5/consulta')}
          >
            Regresar
          </Button>
        </TabFooterSlots.LeftSide>
        <TabFooterSlots.RightSide />
      </TabFooterSlots>
    </>
  );
};

export default Agenda;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 24px;
  margin-top: 30px;
  margin-bottom: 20px;
  & > p {
    font-family: FS Emeric;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.02em;
    color: ${$.gris};
    margin-right: 20px;
  }
  & > div {
    display: flex;
    justify-content: space-between;
    width: 50px;
    & > img {
      height: 14px;
      width: 7.5px;
      cursor: pointer;
    }
  }
`;

const Column = styled.div`
  width: ${({ width }) => `${width}%`};
  margin-right: ${({ mRight }) => `${mRight || 0}px`};
`;
