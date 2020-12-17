import React from 'react';
import styled from 'styled-components';

import CheckBox from 'global/components/v1/CheckBox/CheckBox';
import PropTypes from 'prop-types';

const StepOne = ({ validacionRENIEC, setcheckValidation }) => (
  <>
    <div className="asesoria-stepone">
      <h2 className="sub-title">Validación de identidad con RENIEC</h2>
      <div className="card-box">
        <p className="note">
          Antes de continuar con la asesoría, es necesario
          validar la
          identidad del afiliado en RENIEC.
        </p>
        <ContentCheck>
          <CheckBox
            width={800}
            type="checkbox"
            radius="true"
            label="La identidad del cliente ha sido validada con RENIEC"
            id="checkboxAsistio"
            name="checkboxAsistio"
            checked={validacionRENIEC}
            onChange={setcheckValidation}
          />
        </ContentCheck>
      </div>
    </div>
  </>
);

StepOne.propTypes = {
  validacionRENIEC: PropTypes.bool,
  setcheckValidation: PropTypes.func,
};

StepOne.defaultProps = {
  validacionRENIEC: false,
  setcheckValidation: () => {},
};

export default StepOne;

const ContentCheck = styled.div`
  width: 600px;
  padding-top: 15px;
`;
