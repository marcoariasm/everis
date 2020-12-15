import React from 'react';
import PropTypes from 'prop-types';
import { MESSAGE_ERROR_DEFAULT } from 'modules/Retirement955/constants';
import useAfiliadoInformacion from '../../../../api/useAfiliadoInformacion';
import useAfiliadoContact from '../../../../api/useAfiliadoContact';
import loading from '../../../../../../shared/images/loading.svg';

const DatosAfiliado = ({ cuspp, FAD, FADLoading }) => {
  const {
    afiliadoInformacion,
    isLoading: afiliadoInformacionLoading,
    isError: afiliadoInformacionError,
  } = useAfiliadoInformacion(cuspp);

  let phones = { mobile: '- -', direct: '- -' };

  const {
    afiliadoContact,
    isLoading: afiliadoContactLoading,
    isError: afiliadoContactError,
  } = useAfiliadoContact(cuspp);

  if (afiliadoContact) {
    const newPhone = {};
    afiliadoContact.phones.forEach((phone) => {
      if (phone.type === 'MOBILE_PHONE') {
        newPhone.mobile = phone.number;
      }
      if (phone.type === 'DIRECT_LINE') {
        newPhone.direct = phone.number;
      }
    });

    if (afiliadoContact.email && afiliadoContact.email !== '@') {
      if (afiliadoContact.email.length > 20) {
        afiliadoContact.email = afiliadoContact.email.toLowerCase().split('@');
        afiliadoContact.email[2] = `@${afiliadoContact.email[1]}`;
        afiliadoContact.email[1] = <br />;
      }
    } else {
      afiliadoContact.email = '- -';
    }

    phones = { ...phones, ...newPhone };
  }

  return (
    <div className="datos-afiliado">
      <h2 className="sub-title">Datos del afiliado</h2>
      {(afiliadoInformacionLoading || afiliadoContactLoading || FADLoading)
            && <img src={loading} alt="Loading" />}
      {(afiliadoInformacionError || afiliadoContactError) && (
        <div className="card-box no-data">
          <p className="has-error">{MESSAGE_ERROR_DEFAULT}</p>
        </div>
      )}
      {afiliadoInformacion && afiliadoContact && FAD && (
      <div className="card-box">
        <div className="card-item">
          <div className="label">Apellidos y nombres</div>
          <div className="value">
            {afiliadoInformacion.surname}
            {' '}
            {afiliadoInformacion.motherSurname}
            {' '}
            {afiliadoInformacion.firstName}
            {' '}
            {afiliadoInformacion.secondName}
          </div>
        </div>
        <div className="card-item">
          <div className="label">CUSPP</div>
          <div className="value">{cuspp}</div>
        </div>
        <div className="card-item">
          <div className="label">Fecha de Nacimiento</div>
          <div className="value">{afiliadoInformacion.birthDate}</div>
        </div>
        <div className="card-item">
          <div className="label">Tipo de documento</div>
          <div className="value">{afiliadoInformacion.documentTypeName}</div>
        </div>
        <div className="card-item">
          <div className="label">Nº de documento</div>
          <div className="value">{afiliadoInformacion.documentNumber}</div>
        </div>
        <div className="card-item">
          <div className="label">Edad</div>
          <div className="value">{afiliadoInformacion.age}</div>
        </div>
        <div className="card-item">
          <div className="label">Estado civil</div>
          <div
            className="value"
          >
            {afiliadoInformacion.maritalStatusName}
          </div>
        </div>
        <div className="card-item">
          <div className="label">Teléfono fijo</div>
          <div
            className="value"
          >
            {phones.direct}
          </div>
        </div>
        <div className="card-item">
          <div className="label">Teléfono móvil</div>
          <div
            className="value"
          >
            {phones.mobile}
          </div>
        </div>
        <div className="card-item">
          <div className="label">Correo electrónico</div>
          <div className="value">
            {afiliadoContact.email}
          </div>
        </div>
        <div className="card-item">
          <div className="label">Capital para pensión</div>
          <div
            className="value"
          >
            S/
            {' '}
            {FAD.accumulatedFund && FAD.accumulatedFund.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </div>
        </div>
        <div className="card-item">
          <div className="label">Acceso:</div>
          <div className="value">
            {FAD.regimeName && FAD.regimeName.toUpperCase()}
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

DatosAfiliado.propTypes = {
  cuspp: PropTypes.string,
  FAD: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  FADLoading: PropTypes.bool,
};

DatosAfiliado.defaultProps = {
  cuspp: PropTypes.string,
  FAD: {
    accumulatedFund: 0,
    regimeName: 'reja',
  },
  FADLoading: true,
};

export default DatosAfiliado;
