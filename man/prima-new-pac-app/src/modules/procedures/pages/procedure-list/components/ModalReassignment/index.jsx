import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import $ from 'global/styles';

import Button from 'global/components/v1/Button/Button';
import {
  OutlinedSelectContainer, SelectWithSearch, ModalBase, AlertMessage,
} from 'modules/procedures/shared/components/index';
import IconValidated from 'shared/images/iconos/icon-validated.svg';
import reassignService from 'modules/procedures/pages/procedure-list/services/reassignService';
import { formatComboExecutiveList } from 'modules/procedures/constants/formatCombo';
import './modalReassignment.scss';
import {type} from "ramda";

const ModalReassignment = ({
  show, onClose, dataSelected = [], executiveList = [], updateList
}) => {
  const { register, handleSubmit, formState } = useForm();
  const history = useHistory();
  const [isReassignment, setIsReassignment] = useState(false);
  const [resetSelect, setResetSelect] = useState(false);
  const [executive, setExecutive] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (!show) {
      setResetSelect(true);
      setError('');
    }
  }, [show]);

  const handleOnChangeSearch = () => {
    if (error !== '') {
      setError('');
    }
  };

  const handleExecutive = (data) => {
    const result = executiveList.find((element) => element.login === data.idExecutive);
    setExecutive(result);
  };

  const handleReassignment = (value) => {
    const idExecutive = executiveList.filter((item) => item.login === value.idExecutive)[0];
    const arrayIdRequest = dataSelected.map((data) => ({
      idRequest: data.idRequest,
    }));
    const body = {
      idExecutive: idExecutive.idExecutive,
      requests: arrayIdRequest,
    };

    handleExecutive(value);
    setError('');
    reassignService(body)
      .then((response) => {
        if (response) {
          setIsReassignment(true);
          updateList(true);
        }
      })
      .catch((onError) => setError(onError.errorMessage));
  };

  const handleReturnHome = () => {
    history.push('/tramites/detalles-tramites');
    setIsReassignment(false);
    setResetSelect(true);
    onClose();
  };

  return (
    <ModalBase
      show={show}
      onClose={onClose}
      width="844px"
    >
      {
        !isReassignment
          ? (
            <>
              <Title className="modal-title">Reasignar trámites</Title>
              <ContentModal>
                <div className="box-table">
                  <Column width="100">
                    <div className="box-title flex">
                      <Column width="40">
                        <div className="label">Ejecutivo(a)</div>
                      </Column>
                      <Column width="60">
                        <div className="label">Trámite</div>
                      </Column>
                    </div>
                  </Column>
                  <Column width="100">
                    <div className="scrollbar">
                      {dataSelected.map((item) => (
                        <div className="box-body flex" key={item.idRequest * Math.random()}>
                          <Column width="40">
                            <div className="label">{item.namesExecutive}</div>
                          </Column>
                          <Column width="60">
                            <div className="label">{item.typeRequest}</div>
                          </Column>
                        </div>
                      ))}
                    </div>
                  </Column>
                </div>
                <Column width="100" className="mr-top">
                  <div className="px">
                    <p className="color-green">Asignar trámites a:</p>
                    <div className="flex sp box-search">
                      <OutlinedSelectContainer>
                        <SelectWithSearch
                          fontFamily="FS Emeric"
                          selectWidth="100%"
                          register={register({
                            required: true,
                          })}
                          selectOptions={formatComboExecutiveList(executiveList)}
                          placeholder="Buscar Ejecutivo(a)"
                          name="idExecutive"
                          reset={resetSelect}
                          onChange={handleOnChangeSearch}
                        />
                      </OutlinedSelectContainer>
                      <Button
                        onClick={handleSubmit(handleReassignment)}
                        disabled={formState.isSubmitting}
                      >
                        Reasignar
                      </Button>
                    </div>
                  </div>
                </Column>
                {
                  error !== ''
                    ? (
                      <Column width="100" className="mr-top">
                        <AlertMessage message={error} show />
                      </Column>
                    )
                    : <></>
                }
              </ContentModal>
            </>
          )
          : (
            <ContentModal>
              <div className="flex jc-center">
                <Column width={60}>
                  <div className="flex jc-center">
                    <Image
                      src={IconValidated}
                      alt="Validado"
                    />
                  </div>
                  <Title className="modal-title">Los trámites se reasignaron con éxito</Title>
                  <div className="card-is-reassignment">
                    <p className="label">Ejecutivo(a)</p>
                    <Title>{`${executive.names} ${executive.lastNames}`}</Title>
                  </div>
                  <div className="flex jc-center button-to-home">
                    <Button
                      onClick={handleReturnHome}
                    >
                      Volver a inicio
                    </Button>
                  </div>
                </Column>
              </div>
            </ContentModal>
          )
      }
    </ModalBase>
  );
};

export default ModalReassignment;

const Title = styled.div`
  color: ${$.verde}; 
`;

const ContentModal = styled.div`
  padding: 35px 25px;
`;

const Column = styled.div`
  width: ${({ width }) => `${width}%`};
  margin-right: ${({ mRight }) => `${mRight || 0}px`};
`;

const Image = styled.img`
  text-align: center;
  margin: 0 2px;
  &:nth-child(2) {
    margin: 0 15px;
    @media(max-width : 1366px){
      margin: 0 5px;
    }
  }
`;
