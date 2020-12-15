import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';

const ValidacionDocumentos = ({ state, document }) => (
  <>
    <div className="header-green">
      1. Validación de documentos
    </div>
    <div className="body-gray card-box">
      <div className="card-item">
        <div className="card-item-content">
          <div className="label">Estado</div>
          <div className={classNames('value', {
            green: document.state === 'Comprobado',
            orange: document.state === 'Pendiente',
          })}
          >
            {document.state}
          </div>
        </div>
      </div>
      <div className="card-item">
        <div className="card-item-content">
          <div className="label">Fecha de estado</div>
          <div className="value">{document.date ? moment(document.date).format('DD/MM/YYYY') : '- -'}</div>
        </div>
      </div>
      <div className="card-item">
        <div className="card-item-content">
          <div className="label">Motivo de estado</div>
          <div className="value">
            <ul>
              {state.reasons.map((reason) => <li>{reason}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </>
);

ValidacionDocumentos.propTypes = {
  state: PropTypes.objectOf(PropTypes.string),
  document: PropTypes.objectOf(PropTypes.string),
};

ValidacionDocumentos.defaultProps = {
  state: {},
  document: {},
};

export default ValidacionDocumentos;
