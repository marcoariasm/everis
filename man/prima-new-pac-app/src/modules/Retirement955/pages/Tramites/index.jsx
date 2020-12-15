import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, isNil } from 'ramda';
import styled from 'styled-components';

import { getProcedures, reset } from 'modules/Retirement955/redux/actions/FinancialAdvice/financialAdviceListProcedures.actions';

import Filter from 'modules/Retirement955/components/Filter/Filter';
import Select from 'global/components/v1/SelectMaterial';
import Input from 'global/components/v1/InputMaterial';
import Search from 'shared/images/SEARCH.svg';
import Arrow from 'shared/images/iconos/arrowBar.svg';
import Pagination from 'modules/Retirement955/components/Pagination/Pagination';
import useInformation from 'modules/Retirement955/api/useInformation';

import {
  cboAgencia,
  formatCombo,
  DOCUMENT_TYPE,
  PROCEDURES,
  CHANNEL,
  FINANCIAL_ADVICE_STATES,
  validatedDocumentType,
} from 'modules/Retirement955/constants';
import Modules from 'modules/shared';

import Table from './components/Table/Table';
import Footer from './components/Footer';

import ModalModificacion95 from './components/ModalModificacion95.5';

import './tramites.sass';

const { can } = Modules.libs.Roles;

const filter = 'queryBack.filter';
const executeExoneration = 'queryBack.table.execExoneration';

const Tramites = () => {
  const [showModal, setShowModal] = useState(false);
  const [cussp, setCussp] = useState('');
  const [idDocumento, setIdDocumento] = useState('');
  const [documento, setDocumento] = useState('');
  const [idTramite, setIdTramite] = useState('');
  const [idEstadoTramite, setIdEstadoTramite] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tramiteSelected, setTramiteSelected] = useState({});
  const [exoneracionTramite, setExoneracionTramite] = useState(false);
  const [changeExoneracion, setChangeExoneracion] = useState(true);
  const [idAgencia, setIdAgencia] = useState('');
  const [idCanal, setIdCanal] = useState('');
  const [table, setTable] = useState([]);
  const [page, setPage] = useState(0);
  const [queryParams, setQueryParams] = useState('');

  const dispatch = useDispatch();

  const {
    success: listProcedures,
    loading: isLoadingProcedure,
  } = useSelector((s) => s.financialAdvice.listProcedures);

  const { data: adviceState } = useInformation(FINANCIAL_ADVICE_STATES);
  const { data: documentType } = useInformation(DOCUMENT_TYPE);
  const { data: proceduresType } = useInformation(PROCEDURES);
  const { data: channelType } = useInformation(CHANNEL);

  useEffect(() => {
    dispatch(getProcedures(`page=${page}${queryParams}`));
    return () => dispatch(reset());
  }, [dispatch, page, queryParams]);

  useEffect(() => {
    if (!isEmpty(listProcedures)) {
      const data = listProcedures.financialAdvices.map((item) => {
        item.selected = isNil(item.selected) ? false : item.selected;
        item.idDefault = Math.random(1);
        return item;
      });
      setTable(data);
    }
  }, [listProcedures]);

  const handleInput = (e, fn, state) => {
    const {
      value, validity: { valid }, type, name,
    } = e.target;

    const validated = (valid || type === 'date') ? value : state;
    fn(validated);

    if (name && value === '2') {
      setIdAgencia(0);
    }
  };

  const handleChange = (e, fn) => {
    fn(e.target.value);
  };

  const handleGetSomeSelected = () => !table.some((item) => item.selected);

  const handleClickFilter = () => {
    const query = `${idDocumento ? `&documentType=${idDocumento}` : ''}`
      + `${documento ? `&documentNumber=${documento}` : ''}`
      + `${cussp ? `&affiliateId=${cussp}` : ''}`
      + `${idEstadoTramite ? `&status=${idEstadoTramite}` : ''}`
      + `${idTramite ? `&procedure=${idTramite}` : ''}`
      + `${idCanal ? `&sourceChanel=${idCanal}` : ''}`
      + `${startDate && endDate ? `&startDate=${startDate}&endDate=${endDate}` : ''}`;

    setQueryParams(query);
    setPage(0);
  };

  const handleCleanFilter = () => {
    setCussp('');
    setIdDocumento('');
    setDocumento('');
    setIdTramite('');
    setIdEstadoTramite('');
    setStartDate('');
    setEndDate('');
    setIdCanal('');
    setIdAgencia('');
    setPage(0);
    setQueryParams('');
    if (page !== 0) dispatch(reset());
  };

  const handleShowModal = (object) => {
    setShowModal(true);
    setTramiteSelected(object);
  };

  const optionsFilter = () => {
    const statesProcedure = formatCombo(adviceState);
    if (isEmpty(statesProcedure)) return [];
    const data = formatCombo(adviceState).filter((item) => {
      if (item.value === '6' || item.value === '7') {
        return false;
      }
      return item;
    });

    return data;
  };

  const handleBuildNameExcel = () => {
    const getName = (array, id) => {
      const searched = array.find((item) => String(item.value) === String(id));
      return searched.label;
    };

    const nameFile = `${idDocumento
      ? `${getName(formatCombo(documentType), idDocumento)}_` : ''}`
      + `${documento ? `${documento}_` : ''}`
      + `${cussp ? `${cussp}_` : ''}`
      + `${idTramite ? `${(getName(formatCombo(proceduresType), idTramite))}_` : ''}`
      + `${idEstadoTramite ? `${getName(formatCombo(adviceState), idEstadoTramite)}_` : ''}`
      + `${idAgencia ? `${getName(cboAgencia(), idAgencia)}_` : ''}`
      + `${idCanal ? `${getName(formatCombo(channelType), idCanal)}_` : ''}`
      + `${startDate && endDate ? `del ${startDate} al ${endDate}` : ''}`;

    return nameFile;
  };

  const disabledButtons = handleGetSomeSelected();

  return (
    <>
      <div className="title">Consulta Analista</div>
      <Filter
        onClickFilter={handleClickFilter}
        onClickClean={handleCleanFilter}
        loading={isLoadingProcedure}
        disabled={!can(filter)}
      >
        <Column width="25" mRight="14">
          <Select
            label="Doc. de identidad"
            options={formatCombo(documentType)}
            name="select-doc-identidad"
            placeholder="Seleccionar tipo"
            onChange={(e) => {
              setDocumento('');
              handleChange(e, setIdDocumento);
            }}
            value={idDocumento}
          />
          <Input
            label="Buscar CUSSP"
            placeholder="CUSSP"
            icon={Search}
            name="cuspp"
            iconPosition="right"
            marginRight="14"
            onInput={(e) => handleInput(e, setCussp, cussp)}
            value={cussp}
            pattern="[a-zA-ZñÑ0-9]"
            maxLength={12}
          />
          {idCanal === '2' && (
            <Select
              label="Agencia"
              options={cboAgencia()}
              placeholder="Seleccionar Agencia"
              onChange={(e) => handleChange(e, setIdAgencia)}
              value={idAgencia}
            />
          )}
        </Column>
        <Column width="50" mRight="14">
          <Column width="100" className="flex">
            <Input
              label="Nº de documento"
              placeholder="Ingresar Nº de doc"
              marginRight="35"
              name="documento"
              onInput={(e) => handleInput(e, setDocumento, documento)}
              value={documento}
              maxLength={validatedDocumentType(idDocumento).length}
              pattern={validatedDocumentType(idDocumento).pattern}
              disabled={isEmpty(idDocumento)}
            />

            <Select
              label="Tipo de trámite"
              name="tramite"
              options={formatCombo(proceduresType)}
              placeholder="Seleccionar trámite"
              onChange={(e) => handleChange(e, setIdTramite)}
              value={idTramite}
            />
          </Column>
          <div className="flex">
            <Input
              label="Fecha inicio trámite"
              type="date"
              name="fechaInicio"
              onChange={(e) => handleChange(e, setStartDate)}
              min="31-12-1900"
              max="31-12-2050"
              value={startDate}
            />
            <img src={Arrow} alt="arrow" style={{ margin: '0 9px' }} />
            <Input
              label="Fecha fin trámite"
              type="date"
              name="fechaFin"
              onChange={(e) => handleChange(e, setEndDate)}
              min={startDate}
              max="31-12-2050"
              value={endDate}
            />
          </div>
        </Column>
        <Column width="25">
          <Select
            label="Estado del trámite"
            options={optionsFilter()}
            placeholder="Seleccionar estado"
            name="select-estado-tramite"
            onChange={(e) => handleChange(e, setIdEstadoTramite)}
            value={idEstadoTramite}
          />
          <Select
            label="Canal de atención"
            name="canal"
            options={formatCombo(channelType)}
            placeholder="Seleccionar canal"
            onChange={(e) => handleChange(e, setIdCanal, idCanal)}
            value={idCanal}
          />
        </Column>
      </Filter>
      <Pagination
        data={listProcedures}
        setPage={setPage}
        loading={isLoadingProcedure}
      />
      <Table
        setTable={setTable}
        table={table}
        handleClickFilter={handleClickFilter}
        loading={isLoadingProcedure}
        isEmpty={isEmpty(table) && !isLoadingProcedure}
        handleShowModal={handleShowModal}
      />
      <Footer
        filterData={table}
        name={handleBuildNameExcel}
        disabledButtons={disabledButtons || isLoadingProcedure}
      />
      {showModal && (
      <ModalModificacion95
        show={showModal}
        tramiteSelected={tramiteSelected}
        disabled={
          changeExoneracion || !can(executeExoneration)
        }
        onClick={() => {
          setShowModal(false);
          setExoneracionTramite(false);
          setChangeExoneracion(true);
        }}
        onClose={() => {
          setShowModal(false);
          setExoneracionTramite(false);
          setChangeExoneracion(true);
        }}
        setChangeExoneracion={setChangeExoneracion}
      />
      )}
    </>
  );
};

export default Tramites;

const Column = styled.div`
  width: ${({ width }) => `${width}%`};
  margin-right: ${({ mRight }) => `${mRight || 0}px`};
`;
