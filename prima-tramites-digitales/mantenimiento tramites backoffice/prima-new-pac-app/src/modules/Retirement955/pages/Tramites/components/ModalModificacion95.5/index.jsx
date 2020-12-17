import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropType from 'prop-types';
import { updatedStatement, reset } from 'modules/Retirement955/redux/actions/FinancialAdvice/financialAdviceStatementUpdate.actions';
import { success as successListProcedures } from 'modules/Retirement955/redux/actions/FinancialAdvice/financialAdviceListProcedures.actions';
import { ONP_PENSIONER_DECLARATION, FINANCIAL_ADVICE_STATE } from 'modules/Retirement955/constants';
import styled from 'styled-components';
import $ from 'global/styles';

import CheckBox from 'global/components/v1/CheckBox/CheckBox';
import Modal from 'global/components/v1/Modal/Modal';

const ModalModificacion95 = ({
  onClick,
  onClose,
  disabled,
  tramiteSelected: {
    statements,
    financialAdviceId,
    status,
    affiliate,
    affiliateId,
    statusName,
  },
  show,
  setChangeExoneracion,
  disabledCheck,
}) => {
  const [exoneracionTramite, setExoneracionTramite] = useState(statements[1].accepted);
  const { loading, success } = useSelector((s) => s.financialAdvice.financialAdviceStatementUpdate);

  const {
    success: listProcedures,
  } = useSelector((s) => s.financialAdvice.listProcedures);
  const dispatch = useDispatch();

  const updateListProcedures = () => {
    const newListProcedures = listProcedures.financialAdvices.map((procedure) => {
      if (procedure.financialAdviceId === financialAdviceId) {
        const newStatements = procedure.statements.map((statement) => {
          if (statement.statement === ONP_PENSIONER_DECLARATION) {
            statement.accepted = exoneracionTramite;
            return statement;
          }
          return statement;
        });
        return { ...procedure, statements: newStatements };
      }
      return procedure;
    });

    const object = {
      ...listProcedures,
      financialAdvices: newListProcedures,
    };

    dispatch(successListProcedures(object));
  };

  useEffect(() => {
    if (success) {
      updateListProcedures();
      onClick();
    }
    return () => dispatch(reset());
  }, [success, dispatch, onClick]);

  const handleChangeStatement = () => {
    const bodyRequest = {
      accepted: exoneracionTramite,
      statement: ONP_PENSIONER_DECLARATION,
    };
    dispatch(updatedStatement(financialAdviceId, bodyRequest));
  };

  const statesFinalsDisabled = useCallback(() => {
    const { ACCEPTED, REJECTED } = FINANCIAL_ADVICE_STATE;
    return status === ACCEPTED || status === REJECTED;
  }, [status]);

  return (
    <Modal
      show={show}
      onButtonClick={handleChangeStatement}
      disabledOnClick={disabled || loading || statesFinalsDisabled()}
      onClose={onClose}
      width="844px"
      padding="52px 51px 41px 51px"
      nameButton="Guardar cambios"
      justifyContent="flex-end"
    >
      <Title>Modificación de datos de Solicitud de Retiro 95.5%</Title>
      <ContentModal id="edit-tramite-95">
        <Column width="32">
          <Info>
            <div className="label">N˚ de trámite</div>
            <div className="value">{financialAdviceId}</div>
          </Info>
          <Info width="50">
            <div className="label">Afiliado</div>
            <div className="value">{affiliate}</div>
          </Info>
        </Column>
        <Column width="32">
          <Info>
            <div className="label">CUSPP</div>
            <div className="value">{affiliateId}</div>
          </Info>
        </Column>
        <Column width="35">
          <Info>
            <div className="label">Estado</div>
            <div className="value">{statusName}</div>
          </Info>
          <Info>
            <div>
              <CheckBox
                label="Ind. Exoneración 4.5%"
                id="exoneracion4.5modal"
                className="check-exoneracion"
                width="260px"
                underline
                disabled={disabledCheck || statesFinalsDisabled()}
                onChange={() => {
                  setExoneracionTramite(!exoneracionTramite);
                  setChangeExoneracion(false);
                }}
                checked={exoneracionTramite}
              />
            </div>
          </Info>
        </Column>
      </ContentModal>
    </Modal>
  );
};

export default ModalModificacion95;

const Title = styled.div`
  text-align: center;
  font-family: FS Emeric;
  font-weight: 600;
  font-size: 21px;
  line-height: 23px;
  letter-spacing: 0.02em;
  color: ${$.gris};
  padding-bottom: 39px;
`;

const Info = styled.div`
  &:first-child {
    padding-bottom: 26px;
  }
`;

const ContentModal = styled.div`
  background: #F7F7F8;
  border-radius: 11px;
  padding: 35px 40px 35px 79px;
  width: 742px;
  height: 185px;
`;

const Column = styled.div`
  width: ${({ width }) => `${width}%`};
  margin-right: ${({ mRight }) => `${mRight || 0}px`};
`;

ModalModificacion95.defaultProps = {
  onClick: () => {},
  onClose: () => {},
  disabled: false,
  tramiteSelected: {},
  show: false,
  setChangeExoneracion: () => {},
  // checked: false,
  disabledCheck: false,
};

ModalModificacion95.propTypes = {
  onClick: PropType.func,
  onClose: PropType.func,
  disabled: PropType.bool,
  tramiteSelected: PropType.node,
  show: PropType.bool,
  setChangeExoneracion: PropType.func,
  // checked: PropType.bool,
  disabledCheck: PropType.bool,
};
