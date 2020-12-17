import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import useAdvisor from '../../../../api/useAdvisor';
import loading from '../../../../../../shared/images/loading.svg';

const Validacionadvisor = ({ number, asesor, limitDate }) => {
  const {
    advisor,
    isLoading: advisorLoading,
  } = useAdvisor(asesor.advisorId);
  const {
    advisor: advisorValidator,
    isLoading: advisorValidatorLoading,
  } = useAdvisor(asesor.validatorId);

  return (
    <div className="validacion-advisorData">
      {advisorLoading && <img src={loading} alt="Loading" />}
      {!advisorLoading && (
        <>
          <div className="header-green">
            {number}
            . Validación de Asesoría
          </div>
          <div className="body-gray card-box">
            <div className="card-item">
              <div className="card-item-content">
                <div className="label">Estado</div>
                <div className={classNames('value', {
                  green: asesor.status === 'Aceptado',
                  orange: asesor.status === 'Pendiente',
                })}
                >
                  {asesor.status}
                </div>
              </div>
            </div>
            <div className="card-item">
              <div className="card-item-content">
                <div className="label">Plazo de validación</div>
                <div className="value">{moment(limitDate).format('DD/MM/YYYY') || '- -'}</div>
              </div>
            </div>
            <div className="card-item">
              <div className="card-item-content">
                <div className="label">Asesor asignado</div>
                <div className="value">
                  {advisorLoading === false && advisor.names
                    ? `${advisor.fatherLastName} ${advisor.motherLastName}, ${advisor.names}`
                    : '- -'}
                </div>
                {advisorLoading && <img src={loading} alt="Loading" />}
              </div>
            </div>
            <div className="card-item">
              <div className="card-item-content">
                <div className="label">Validador</div>
                <div className="value">
                  {advisorValidatorLoading === false && advisorValidator.names
                    ? `${advisorValidator.fatherLastName} ${advisorValidator.motherLastName}, ${advisorValidator.names}`
                    : '- -'}
                </div>
              </div>
            </div>
            <div className="card-item">
              <div className="card-item-content">
                <div className="label">Fecha de validación</div>
                <div className="value">
                  {asesor.fecVal}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>

  );
};

Validacionadvisor.propTypes = {
  number: PropTypes.number,
  asesor: PropTypes.objectOf(PropTypes.string),
  limitDate: PropTypes.string,
};

Validacionadvisor.defaultProps = {
  number: 1,
  asesor: { advisorID: null, status: null },
  limitDate: null,
};

export default Validacionadvisor;
