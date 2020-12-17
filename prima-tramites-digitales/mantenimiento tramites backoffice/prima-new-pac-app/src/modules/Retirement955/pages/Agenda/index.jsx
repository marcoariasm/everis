import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, isNil } from 'ramda';
import styled from 'styled-components';

import { getProcedures, reset } from 'modules/Retirement955/redux/actions/FinancialAdvice/financialAdviceListProcedures.actions';

import Table from './components/Table/Table';
import Filter from 'modules/Retirement955/components/Filter/Filter';
import Select from 'global/components/v1/SelectMaterial';
import Input from 'global/components/v1/InputMaterial';
import Autocomplete from 'global/components/v1/Autocomplete/Autocomplete';
import Pagination from 'modules/Retirement955/components/Pagination/Pagination';

import Search from 'shared/images/SEARCH.svg';

import useMe from 'modules/shared/hooks/useMe';
import useAdvisor from 'modules/Retirement955/api/useAdvisor';
import useInformation from 'modules/Retirement955/api/useInformation';

import {
  formatCombo,
  DOCUMENT_TYPE,
  PROCEDURES,
  CHANNEL,
  validatedDocumentType,
} from 'modules/Retirement955/constants';
import Modules from 'modules/shared';

const { can } = Modules.libs.Roles;

const filterFront = 'queryFront.filter';
const filterAgenda = 'schelude.filter';

const Agenda = () => {
  const [idDocumento, setIdDocumento] = useState('');
  const [documento, setDocumento] = useState('');
  const [cuspp, setCuspp] = useState('');
  const [fechaSolicitud, setFechaSolicitud] = useState('');
  const [idTramite, setIdTramite] = useState('');
  const [idCanal, setIdCanal] = useState('');
  const [idAsesor, setIdAsesor] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [queryParams, setQueryParams] = useState('');

  const dispatch = useDispatch();
  const refAutoComplete = React.useRef();
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  const {
    success: listProcedures,
    loading: isLoadingProcedure,
  } = useSelector((s) => s.financialAdvice.listProcedures);
  const { advisor: listAdvisor } = useAdvisor();

  const { data: documentType } = useInformation(DOCUMENT_TYPE);
  const { data: proceduresType } = useInformation(PROCEDURES);
  const { data: channelType } = useInformation(CHANNEL);
  const { advisor, isLoading: isLoadingAdvisor } = useMe();

  const isAgenda = location.pathname === '/proceso95-5/agenda';

  const handleCleanFilter = () => {
    setIdDocumento('');
    setDocumento('');
    setCuspp('');
    setFechaSolicitud('');
    setIdTramite('');
    setIdCanal('');
    setIdAsesor('');
    if (refAutoComplete.current) {
      refAutoComplete.current.cleanInput();
    }
  };

  const resetListProcedures = () => {
    dispatch(reset());
    setPage(0);
    setQueryParams('');
    let query = 'page=0';
    if (isAgenda) {
      query += '&advisorSession=true';
    }
    dispatch(getProcedures(query));
  };

  useEffect(() => {
    let query = `page=${page}${queryParams}`;
    if (!isAgenda) {
      dispatch(getProcedures(query));
    }

    if (isAgenda && advisor.idExecutive) {
      query += '&advisorSession=true';
      dispatch(getProcedures(query));
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, advisor.idExecutive, isAgenda, queryParams, page]);

  useEffect(() => {
    if (isAgenda && listProcedures) {
      if (!isEmpty(listProcedures.financialAdvices) && !isNil(listProcedures.financialAdvices)) {
        const array = listProcedures.financialAdvices.filter((item) => {
          if (item.limitDate) {
            return item;
          }
          return false;
        });
        setData(array);
      } else {
        setData([]);
      }
    }
  }, [listProcedures, isAgenda]);

  useEffect(() => {
    if (!isAgenda && !isEmpty(listProcedures)) {
      setData(listProcedures.financialAdvices);
    }
  }, [data, isAgenda, listProcedures]);

  useEffect(() => {
    if (path !== location.pathname) {
      setPath(location.pathname);
      setData([]);
      setPage(0);
      dispatch(reset());
      handleCleanFilter();
      resetListProcedures();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, location.pathname]);

  const handleInput = (e, fn, state) => {
    const { value, validity: { valid }, type } = e.target;
    const validated = (valid || type === 'date') ? value : state;
    fn(validated);
  };

  const handleChange = (e, fn) => {
    fn(e.target.value);
  };

  const handleClickFilter = () => {
    let query = `${idDocumento ? `&documentType=${idDocumento}` : ''}`
      + `${documento ? `&documentNumber=${documento}` : ''}`
      + `${cuspp ? `&affiliateId=${cuspp}` : ''}`
      + `${idCanal ? `&sourceChanel=${idCanal}` : ''}`
      + `${fechaSolicitud ? `&startDate=${fechaSolicitud}&endDate=${fechaSolicitud}` : ''}`
      + `${idAsesor ? `&advisorId=${idAsesor}` : ''}`;

    if (isAgenda) {
      query += '&advisorSession=true';
    }
    setQueryParams(query);
    setPage(0);
  };

  const title = window.location.pathname.includes('consulta')
    ? 'Consulta Ejecutivo' : 'Agenda';

  return (
    <>
      <div className="title">{title}</div>
      <Filter
        onClickClean={() => {
          handleCleanFilter();
          resetListProcedures();
        }}
        onClickFilter={handleClickFilter}
        loading={isLoadingProcedure}
        disabled={path === '/proceso95-5/consulta'
          ? !can(filterFront) : !can(filterAgenda)}
      >
        <Column width="20" mRight="25">
          <Select
            label="Doc. de identidad"
            options={formatCombo(documentType)}
            placeholder="Seleccionar tipo"
            name="doc-identidad"
            onChange={(e) => {
              setDocumento('');
              handleChange(e, setIdDocumento);
            }}
            value={idDocumento}
          />
          <Input
            label="Buscar CUSPP"
            labelSize="15"
            placeholder="CUSPP"
            name="cuspp"
            icon={Search}
            onInput={(e) => handleInput(e, setCuspp, cuspp)}
            value={cuspp}
            pattern="[a-zA-ZñÑ0-9]"
            maxLength={12}
          />
        </Column>
        <Column width="20" mRight="20">
          <Input
            inputSize="17"
            label="Nº de documento"
            name="numero-documento"
            placeholder="Ingresar Nº de doc"
            onInput={(e) => handleInput(e, setDocumento, documento)}
            value={documento}
            maxLength={validatedDocumentType(idDocumento).length}
            pattern={validatedDocumentType(idDocumento).pattern}
            disabled={isEmpty(idDocumento)}
          />
          <Input
            type="date"
            label="Fecha de solicitud"
            name="fecha-solicitud"
            placeholder="dd-mm-aaaa"
            onChange={(e) => handleChange(e, setFechaSolicitud, fechaSolicitud)}
            value={fechaSolicitud}
            min="1900-12-31"
            max="2050-12-31"
          />
        </Column>
        <Column width="30" mRight="20">
          <Select
            label="Tipo de trámite"
            options={formatCombo(proceduresType)}
            placeholder="Seleccionar trámite"
            name="tramite"
            onChange={(e) => handleChange(e, setIdTramite, idTramite)}
            value={idTramite}
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
        <Column width="30">
          {!isAgenda && listAdvisor
            && (
            <Autocomplete
              suggestions={listAdvisor.advisors}
              onSelect={(value) => {
                setIdAsesor(value.advisorId);
              }}
              label="Asesor"
              valueName="advisorId"
              labelName={['names', 'fatherLastName', 'motherLastName']}
              ref={refAutoComplete}
              name="asesor"
            />
            )}
        </Column>
      </Filter>
      <Pagination
        data={listProcedures}
        setPage={setPage}
        loading={isLoadingProcedure || (isAgenda ? isLoadingAdvisor : false)}
      />
      <Table
        loading={isLoadingProcedure}
        isEmpty={isEmpty(data) && !isLoadingProcedure}
        frames="1fr 1fr 1.2fr 2fr 0.8fr 1fr 1fr"
        data={data}
      />
    </>
  );
};

export default Agenda;

const Column = styled.div`
  width: ${({ width }) => `${width}%`};
  margin-right: ${({ mRight }) => `${mRight || 0}px`};
`;
