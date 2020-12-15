import React from 'react';
import loading from 'shared/images/loading.svg';
import classNames from 'classnames';
import moment from 'moment';
import Button from 'global/components/v1/Button/Button';
import PropTypes from 'prop-types';

const DatosTramite = ({ FAD, FADLoading, isLegal }) => {
  let currentFAD = { state: '', date: '' };

  if (FADLoading === false) {
    currentFAD = FAD.states[FAD.states.length - 1];
  }
  return (
    <div className="datos-tramite">
      <h2 className="sub-title">Detalles del trámite</h2>
      {FADLoading && <img src={loading} alt="Loading" />}
      {FAD
        && (
        <div className="card-box">
          <div className="card-item">
            <div className="label">Trámite</div>
            <div className="value">
              Etapa 1 - Asesoría
            </div>
          </div>
          <div className="card-item">
            <div className="label">Canal de registro</div>
            <div className="value">{FAD.channelCode}</div>
          </div>
          <div className="card-item">
            <div className="label">Estado</div>
            <div className={classNames('value', {
              green: currentFAD.state === 'ACCEPTED',
              orange: currentFAD.state === 'OBSERVED'
                      || currentFAD.state === 'REJECTED',
            })}
            >
              {currentFAD.stateName}
            </div>
          </div>
          <div className="card-item">
            <div className="label">
              Fecha de último estado
            </div>
            <div className="value">
              {
                    moment(currentFAD.date).format('DD/MM/yyyy')
                  }
            </div>
            <div className="button-container">
              {(currentFAD.state !== 'REGISTERED' && currentFAD.state !== 'IN_PROCESS') && isLegal === false
                  && (
                  <Button className="green small">
                    Reenviar correo
                  </Button>
                  )}
            </div>
          </div>
        </div>
        )}
    </div>
  );
};

export default DatosTramite;

DatosTramite.propTypes = {
  isLegal: PropTypes.bool,
  FAD: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  FADLoading: PropTypes.bool,
};

DatosTramite.defaultProps = {
  isLegal: false,
  FAD: {},
  FADLoading: true,
};
