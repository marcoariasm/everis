import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formatCombo, formatComboDocumentType, formatComboExecutiveList } from 'modules/procedures/constants/formatCombo';

import {
  ModalReassignment, TableListProcedures, BtnExport, Pagination,
} from 'modules/procedures/pages/procedure-list/components/index';
import {
  Filter,
  Btn,
  MaterialInput,
  MaterialSelect,
  OutlinedSelectContainer,
  DropdownInput,
} from 'modules/procedures/shared/components/index';

import {
  getDocumentList, getExecutiveList, getProcedureTypeList, getStatusList,
} from 'modules/procedures/pages/procedure-list/services/settingsFilterService';
import procedureTrayService from 'modules/procedures/pages/procedure-list/services/proceduresTrayService';
import { ROLE_ADMIN, ROLE_SUPERVISOR } from 'modules/procedures/constants/roles';
import orderItems from 'modules/procedures/constants/orderItems';

import loading from 'shared/images/loading.svg';
import { Column, Title } from './procedureListStyles';
import './procedureList.scss';

const arrayProcedures = [];

const ListProcedures = () => {
  const { register, handleSubmit, setValue } = useForm({
    mode: 'onChange',
    defaultValues: { },
  });
  const rolesUser = JSON.parse(sessionStorage.getItem('roles')).roles;

  const [showModal, setShowModal] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [idDocument, setIdDocument] = useState('');
  const [document, setDocument] = useState('');
  const [reasonList, setReasonList] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageOfItemsInProcess, setPageOfItemsInProcess] = useState([]);
  const [procedureSelected, setProcedureSelected] = useState([]);
  const [resetSelect, setResetSelect] = useState(false);
  const [documentList, setDocumentList] = useState([]);
  const [executiveList, setExecutiveList] = useState([]);
  const [proceduresList, setProceduresList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [proceduresInfoResponse, setProceduresInfoResponse] = useState({});
  const [pager, setPager] = useState(0);
  const [updateListProcedures, setUpdateListProcedures] = useState(false);

  const requestProceduresTray = {
    cuspp: null,
    idTypeRequest: null,
    idTypeTask: null,
    idStatus: null,
    idExecutive: null,
    dateFrom: null,
    dateTo: null,
    idTypeDocument: null,
    numberDocument: null,
    idReason: null,
    size: 2000,
  };

  useEffect(() => {
    getDocumentList()
      .then((response) => {
        setDocumentList(response);
      })
      .catch((error) => {
        console.log(error);
      });

    getExecutiveList()
      .then((response) => {
        const executive = orderItems(response, 'login');
        setExecutiveList(executive);
      })
      .catch((error) => {
        console.log(error);
      });

    getProcedureTypeList()
      .then((response) => {
        const procedures = orderItems(response, 'name');
        setProceduresList(procedures);
      })
      .catch((error) => {
        console.log(error);
      });

    getStatusList()
      .then((response) => {
        setStatusList(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    procedureTrayService({
      ...requestProceduresTray,
      page: 0,
    })
      .then((response) => {
        if (response) {
          procedureTray(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updateListProcedures]);

  useEffect(() => {
    if (pageNumber > 0) {
      let arrayDatos = [];
      procedureTrayService({
        ...requestProceduresTray,
        page: pageNumber,
      })
        .then((response) => {
          if (response) {
            const data = response.requests.map((item) => {
              item.selected = false;
              return item;
            });

            arrayDatos = [...dataTable, ...data];

            setDataTable(arrayDatos);
            setPageOfItemsInProcess(arrayDatos.slice(pager.startIndex, pager.endIndex + 1));
            setProceduresInfoResponse({
              numberOfElements: response.numberItems,
              pageNumber: response.page,
              size: response.size,
              totalElements: response.totalItems,
              totalPages: response.totalPages,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [pager]);

  const procedureTray = (response) => {
    const data = response.requests.map((item) => {
      item.selected = false;
      return item;
    });

    setDataTable(data);
    setFilterData(data);
    setPageOfItemsInProcess(data.slice(0, 10));
    setProceduresInfoResponse({
      numberOfElements: response.numberItems,
      pageNumber: response.page,
      size: response.size,
      totalElements: response.totalItems,
      totalPages: response.totalPages,
    });
  };

  const onChangePageInTable = (pageOfItems) => setPageOfItemsInProcess(pageOfItems);

  const handleGetSomeSelected = () => !filterData.some((item) => item.selected);

  const handleFormatDate = (date) => {
    const newDate = date.split('/');
    return `${newDate[2]
    }/${newDate[1]}/${
      newDate[0]}`;
  };

  const handleClickFilter = (value) => {
    setFilterData([]);
    setPageOfItemsInProcess([]);
    const executive = executiveList.filter((item) => item.login === value.idExecutive)[0];
    const body = {
      cuspp: value.cuspp ? value.cuspp : null,
      dateFrom: value.dateFrom ? handleFormatDate(value.dateFrom) : null,
      dateTo: value.dateTo ? handleFormatDate(value.dateTo) : null,
      idExecutive: value.idExecutive ? executive.idExecutive : null,
      idReason: value.idReason ? value.idReason : null,
      idStatus: value.idStatus ? value.idStatus : null,
      idTypeDocument: value.numberDocument ? value.idTypeDocument : null,
      idTypeRequest: value.idTypeRequest ? value.idTypeRequest : null,
      numberDocument: value.numberDocument ? value.numberDocument : null,
      created: value.dateFrom !== '' && value.dateTo !== '' ? 1 : null,
      idTypeTask: null,
      size: 2000,
      page: 0,
    };

    procedureTrayService(body)
      .then((response) => {
        if (response) {
          const data = response.requests.map((item) => {
            item.selected = false;
            return item;
          });

          setDataTable(data);
          setFilterData(data);
          setPageOfItemsInProcess(data.slice(0, 10));
          setProceduresInfoResponse({
            numberOfElements: response.numberItems,
            pageNumber: response.page,
            size: response.size,
            totalElements: response.totalItems,
            totalPages: response.totalPages,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setResetSelect(false);
  };

  const handleBuildNameExcel = () => 'exportFileFilter';

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleDocumentChange = (value) => {
    setDocument(value.inputValue);
    if (value.selectValue) setIdDocument(value.selectValue.value);
  };

  const handleGetReason = (itemSelected) => {
    if (itemSelected) {
      const result = statusList.find((item) => item.idStatus === itemSelected.value);

      setReasonList(formatCombo(result.reasons));
    }
  };

  const handleCleanFilter = () => {
    setValue('cuspp', '');
    setValue('idTypeRequest', '');
    setValue('idStatus', '');
    setValue('idExecutive', '');
    setValue('dateFrom', '');
    setValue('dateTo', '');
    setValue('idTypeDocument', '');
    setValue('numberDocument', '');
    setValue('idReason', '');

    setResetSelect(true);
    procedureTrayService({
      ...requestProceduresTray,
      page: 0,
    })
      .then((response) => {
        if (response) {
          procedureTray(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const disabledButtons = handleGetSomeSelected();

  const handleRoles = (role) => {
    const isRole = rolesUser.filter((item) => item === role)[0];
    return !!isRole;
  };

  return (
    <div className="card-body">
      <Title>Todos los trámites</Title>
      <Filter
        onClickFilter={handleSubmit(handleClickFilter)}
        onClickClean={handleCleanFilter}
      >
        {
          (executiveList.length > 0
            && documentList.length > 0
            && proceduresList.length > 0
            && statusList.length > 0
          )
            ? (
              <>
                <Column width="25" mRight="14">
                  <MaterialInput
                    register={register}
                    className="inputRegularResponsiveM"
                    name="cuspp"
                    placeholder="CUSSP"
                  />
                  <OutlinedSelectContainer className="mt">
                    <MaterialSelect
                      fontFamily="FS Emeric"
                      selectWidth="100%"
                      register={register}
                      selectOptions={formatComboExecutiveList(executiveList)}
                      placeholder="Ejecutivo(a)"
                      name="idExecutive"
                      reset={resetSelect}
                    />
                  </OutlinedSelectContainer>
                </Column>
                <Column width="25" mRight="14">
                  <DropdownInput
                    className="inputRegularResponsiveM"
                    resetInputWhenSelectChange
                    onChange={handleDocumentChange}
                    capitalizeInput={idDocument === '01'}
                    registerSelect={register}
                    registerInput={register}
                    name="numberDocument"
                    selectName="idTypeDocument"
                    selectOptions={formatComboDocumentType(documentList)}
                    placeholder="Nro de documento"
                    noPadding
                    reset={resetSelect}
                    selectWidth="7em"
                  />
                  <MaterialInput
                    className="mt"
                    register={register}
                    name="dateFrom"
                    inputRealPlaceholder="MM/DD/YYYY"
                    showDateMask
                    placeholder="Fecha de registro desde"
                  />
                </Column>
                <Column width="25" mRight="14">
                  <OutlinedSelectContainer>
                    <MaterialSelect
                      fontFamily="FS Emeric"
                      selectWidth="100%"
                      register={register}
                      selectOptions={formatCombo(proceduresList)}
                      placeholder="Trámite"
                      name="idTypeRequest"
                      reset={resetSelect}
                      optionsContainerStyles={
                      {
                        width: '23em',
                      }
                    }
                    />
                  </OutlinedSelectContainer>
                  <MaterialInput
                    className="mt"
                    register={register}
                    name="dateTo"
                    inputRealPlaceholder="MM/DD/YYYY"
                    showDateMask
                    placeholder="Fecha de registro hasta"
                  />
                </Column>
                <Column width="25" mRight="14">
                  <OutlinedSelectContainer>
                    <MaterialSelect
                      fontFamily="FS Emeric"
                      selectWidth="100%"
                      register={register}
                      selectOptions={formatCombo(statusList)}
                      placeholder="Estado del trámite"
                      name="idStatus"
                      reset={resetSelect}
                      onChange={handleGetReason}
                    />
                  </OutlinedSelectContainer>
                  <OutlinedSelectContainer className="mt">
                    <MaterialSelect
                      fontFamily="FS Emeric"
                      selectWidth="100%"
                      register={register}
                      selectOptions={reasonList}
                      placeholder="Motivo de estado"
                      name="idReason"
                      reset={resetSelect}
                    />
                  </OutlinedSelectContainer>
                </Column>
              </>
            )
            : (
              <div className="flex container-loading">
                <img
                  src={loading}
                  alt="Loading"
                  style={{ margin: ' 0 auto', display: 'block' }}
                />
              </div>
            )
        }
      </Filter>

      <div className="flex menu-buttons">
        <Column width="40">
          {
            handleRoles(ROLE_ADMIN) || handleRoles(ROLE_SUPERVISOR) ? (
              <div className="flex sb">
                <BtnExport filterData={dataTable} name={handleBuildNameExcel} />
                <Btn
                  textBtn="Reasignar"
                  disabled={disabledButtons}
                  onClickButton={handleShowModal}
                />
              </div>
            ) : <></>
          }
        </Column>
        <Column width="60">
          <Pagination
            items={dataTable}
            onChangePage={onChangePageInTable}
            itemsInfo={proceduresInfoResponse}
            setPagerInfo={setPager}
            setNumberPage={setPageNumber}
          />
        </Column>
      </div>
      <TableListProcedures
        setFilterData={setFilterData}
        table={dataTable}
        isLoading={pageOfItemsInProcess.length === 0 && proceduresInfoResponse.totalElements !== 0}
        isEmpty={proceduresInfoResponse.totalElements === 0}
        filterData={pageOfItemsInProcess}
        setProcedureSelected={setProcedureSelected}
        updateList={updateListProcedures}
      />

      <ModalReassignment
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        dataSelected={procedureSelected}
        executiveList={executiveList}
        updateList={setUpdateListProcedures}
      />
      <div className="flex menu-buttons">
        <Column width="35">
          {
            handleRoles(ROLE_ADMIN) || handleRoles(ROLE_SUPERVISOR) ? (
              <Btn
                textBtn="Reasignar"
                disabled={disabledButtons}
                onClickButton={handleShowModal}
              />
            ) : <></>
          }
        </Column>
        <Column width="75">
          <Pagination
            items={dataTable}
            onChangePage={onChangePageInTable}
            itemsInfo={proceduresInfoResponse}
            setPagerInfo={setPager}
            setNumberPage={setPageNumber}
          />
        </Column>
      </div>
    </div>
  );
};

export default ListProcedures;
