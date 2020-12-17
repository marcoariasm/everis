import React from 'react';

import classNames from 'classnames';
import moment from 'moment';
import loading from 'shared/images/loading.svg';
import useAdvisor from 'modules/Retirement955/api/useAdvisor';
import PropTypes from 'prop-types';

const ValidacionAsesoria = ({
  asesoria, limitDate,
}) => {
  const { advisor, isLoading: advisorLoading } = useAdvisor(asesoria.advisorId);
  const {
    advisor: advisorValidator,
    isLoading: advisorValidatorLoading,
  } = useAdvisor(asesoria.validatorId);
  return (
    <div className="validacion-asesoria">
      <h2 className="sub-title">
        <span className="number-id">2. </span>
        Validación de Asesoría
      </h2>
      <div className="card-box">
        <div className="card-item">
          <div className="label">Estado</div>
          <div className={classNames('value', {
            green: asesoria.status === 'Aceptado',
            orange: asesoria.status === 'Pendiente',
          })}
          >
            {asesoria.status}
          </div>
        </div>
        <div className="card-item">
          <div className="label">Plazo de validación:</div>
          <div className="value">
            {limitDate
              ? moment(limitDate, 'yyyy/MM/DD').format('DD/MM/yyyy')
              : '- -'}
          </div>
        </div>
        <div className="card-item">
          <div className="label">Asesor asignado:</div>
          <div className="value asesor-value">
            {advisorLoading === false && advisor.names
              ? `${advisor.fatherLastName} ${advisor.motherLastName}, ${advisor.names}`
              : '- -'}
          </div>
          {advisorLoading && <img src={loading} alt="Loading" />}
        </div>
        <div className="card-item">
          <div className="label">Validador</div>
          <div className="value asesor-value">
            {advisorValidatorLoading === false && advisorValidator.names
              ? `${advisorValidator.fatherLastName} ${advisorValidator.motherLastName}, ${advisorValidator.names}`
              : '- -'}
          </div>
        </div>
        <div className="card-item">
          <div className="label">Fecha de validación</div>
          <div className="value">
            {asesoria.fecVal !== '' ? asesoria.fecVal : '- -'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidacionAsesoria;

ValidacionAsesoria.propTypes = {
  asesoria: PropTypes.objectOf([PropTypes.string, PropTypes.number]),
  limitDate: PropTypes.string,
};

ValidacionAsesoria.defaultProps = {
  asesoria: {},
  limitDate: moment(),
};
