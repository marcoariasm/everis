import React from 'react';
import PropTypes from 'prop-types';
import { MESSAGE_ERROR_DEFAULT } from '../../../../constants';
import loading from '../../../../../../shared/images/loading.svg';

const DatosAfiliado = ({
  afiliado, isLoading, isError, acceso, cuspp,
}) => (
  <div className="datos-afiliado">
    {isLoading && <img src={loading} alt="Loading" />}
    {isError && (
    <div className="card-box no-data">
      <div className="has-error">{MESSAGE_ERROR_DEFAULT}</div>
    </div>
    )}
    {isLoading === false && afiliado && isError === false && (
    <div className="card-box">
      <div className="card-item name-lastname">
        <div className="card-item-content">
          <div className="label">Apellidos y nombres</div>
          <div className="value">
            {afiliado.surname}
            {' '}
            {afiliado.motherSurname}
            {' '}
            {afiliado.firstName}
            {' '}
            {afiliado.secondName}
          </div>
        </div>
      </div>
      <div className="card-item cuspp">
        <div className="card-item-content">
          <div className="label">CUSPP</div>
          <div className="value">{cuspp}</div>
        </div>
      </div>
      <div className="card-item birthdate">
        <div className="card-item-content">
          <div className="label">Fecha de Nacimiento</div>
          <div className="value">{afiliado.birthDate}</div>
        </div>
      </div>
      <div className="card-item document-type">
        <div className="card-item-content">
          <div className="label">Tipo de documento</div>
          <div
            className="value"
          >
            {afiliado.documentTypeName}
          </div>
        </div>
      </div>
      <div className="card-item document-number">
        <div className="card-item-content">
          <div className="label">Nº de documento</div>
          <div
            className="value"
          >
            {afiliado.documentNumber}
          </div>
        </div>
      </div>
      <div className="card-item access">
        <div className="card-item-content">
          <div className="label">Acceso</div>
          <div className="value">
            {acceso ? acceso.toUpperCase() : '- -'}
          </div>
        </div>
      </div>
    </div>
    )}
  </div>
);

DatosAfiliado.propTypes = {
  afiliado: PropTypes.objectOf(PropTypes.string),
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  acceso: PropTypes.string,
  cuspp: PropTypes.string,
};

DatosAfiliado.defaultProps = {
  afiliado: {},
  isLoading: true,
  isError: false,
  acceso: 'reja',
  cuspp: '',
};

export default DatosAfiliado;
