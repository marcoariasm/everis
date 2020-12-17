import React from 'react';
import moment from 'moment';
import { isEmpty, isNil } from 'ramda';

import useAdvisor from 'modules/Retirement955/api/useAdvisor';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const BoxHistory = ({ history, loading }) => {
  const { advisor, isLoading } = useAdvisor();

  const showHistoryProcedures = () => {
    const loader = loading || isLoading;
    const empty = isEmpty(history) || isNil(history);
    const adviceArray = (id) => {
      if (isEmpty(advisor.advisors) || isNil(advisor.advisors)) {
        return '- -';
      }

      const result = advisor.advisors.find((a) => a.advisorId === id);

      return result
        ? `${result.names} ${result.fatherLastName || ''} ${result.motherLastName || ''}`
        : '- -';
    };

    if (loader || empty) {
      return (
        <div className="table-body" style={{ lineHeight: '70px' }}>
          {loader && <span>Cargando registros ...</span>}
          {empty && !loader && <span>No se han encontrado registros</span>}
        </div>
      );
    }

    return history.map((item) => (
      <div className="table-body" key={Math.random()}>
        <div className="table-item column1">
          <div className={classNames({
            green: item.status === 'Confirmado'
                || item.status === 'Aceptado',
            orange: item.status === 'Pendiente'
                || item.status === 'Rechazado'
                || item.status === 'Observado',
          })}
          >
            {item.stateName}
          </div>
        </div>
        <div className="table-item column2">
          <ul>
            {
            item.reasons.length > 0
              ? item.reasons.map(
                (reason) => <li>{reason}</li>,
              )
              : '- -'
          }
          </ul>
        </div>
        <div className="table-item column3">
          {item.date ? moment(item.date, 'YYYY-MM-DD').format('DD/MM/YYYY') : '- -'}
        </div>
        <div className="table-item column4">
          {item.advisorId ? adviceArray(item.advisorId) : '- -'}
        </div>
      </div>
    ));
  };

  return (
    <div className="table historial">
      <div className="table-header">
        <div className="table-header-items">
          <div className="table-item column1">
            Estado del trámite
          </div>
          <div className="table-item column2">
            Motivo del estado
          </div>
          <div className="table-item column3">
            Fecha de estado
          </div>
          <div className="table-item column4">
            Usuario
          </div>
        </div>
      </div>
      <div className="with-scroll">
        {showHistoryProcedures()}
      </div>
    </div>
  );
};

BoxHistory.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
};

BoxHistory.defaultProps = {
  history: PropTypes.arrayOf(PropTypes.object),
  loading: true,
};

export default BoxHistory;
