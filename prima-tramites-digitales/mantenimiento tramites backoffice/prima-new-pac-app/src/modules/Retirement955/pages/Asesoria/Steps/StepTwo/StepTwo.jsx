import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import CheckBox from 'global/components/v1/CheckBox/CheckBox';
import StepTwoTop from './StepTwoTop';
import StepTwoTable from './StepTwoTable';

import './StepTwo.sass';

const StepTwo = ({
  afiliadoInformado, setAfiliadoInformado, comments, setComments, accumulatedFund,
}) => {
  const handleChange = (event) => {
    setComments(event.target.value);
  };

  return (
    <div id="asesoria-step-two">
      <StepTwoTop accumulatedFund={accumulatedFund} />
      <StepTwoTable />
      <hr className="separator" />
      <h2 className="sub-title info">Información acerca de los Productos Prima</h2>
      <ContentCheck>
        <CheckBox
          size="18"
          type="checkbox"
          radius="true"
          label="El afiliado fue informado acerca de los Productos Prima"
          id="checkboxInformado"
          name="checkboxInformado"
          checked={afiliadoInformado}
          width={450}
          onChange={setAfiliadoInformado}
        />
      </ContentCheck>
      {/* <div className="observaciones"> */}
      {/*  <h2 className="sub-title">Observaciones del Asesor</h2> */}
      {/*  <textarea */}
      {/*    placeholder="Escribir comentario..." */}
      {/*    value={comments} */}
      {/*    onChange={(e) => { */}
      {/*      handleChange(e); */}
      {/*    }} */}
      {/*    maxLength={5000} */}
      {/*  /> */}
      {/* </div> */}
    </div>
  );
};

StepTwo.propTypes = {
  afiliadoInformado: PropTypes.bool,
  setAfiliadoInformado: PropTypes.func,
  comments: PropTypes.string,
  setComments: PropTypes.func,
  accumulatedFund: PropTypes.number,
};

StepTwo.defaultProps = {
  afiliadoInformado: false,
  setAfiliadoInformado: () => {},
  comments: null,
  setComments: () => {},
  accumulatedFund: null,
};

export default StepTwo;

const ContentCheck = styled.div`
  width: 100%;
  padding: 10px 15px;
`;
