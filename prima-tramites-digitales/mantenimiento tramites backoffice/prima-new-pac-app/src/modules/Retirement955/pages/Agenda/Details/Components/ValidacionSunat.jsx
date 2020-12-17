import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const ValidacionSunat = ({ validationData }) => (
  <div className="validacion-sunat">
    <h2 className="sub-title">
      <span className="number-id">1. </span>
      Validación de
      {' '}
      {validationData.title}
    </h2>
    <div className="card-box">
      <div className="card-item">
        <div className="label">Estado</div>
        <div className={classNames('value', {
          green: validationData.state === 'Comprobado',
          orange: validationData.state === 'Pendiente',
        })}
        >
          {validationData.state}
        </div>
      </div>
      <div className="card-item">
        <div className="label">
          Fecha de validación
        </div>
        <div className="value">
          {validationData.fecVal ? validationData.fecVal : '- -'}
        </div>
      </div>
    </div>
  </div>
);

export default ValidacionSunat;

ValidacionSunat.propTypes = {
  validationData: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
};

ValidacionSunat.defaultProps = {
  validationData: {},
};
