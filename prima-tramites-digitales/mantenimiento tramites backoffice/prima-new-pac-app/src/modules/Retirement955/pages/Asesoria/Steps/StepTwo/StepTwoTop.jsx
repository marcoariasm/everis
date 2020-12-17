import React from 'react';
import loading from 'shared/images/loading.svg';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';

const StepTwoTop = ({ accumulatedFund }) => {
  let mount95 = null;

  if (isEmpty(accumulatedFund) === false) {
    mount95 = accumulatedFund * 0.955;
  }

  return (
    <>
      <div className="step-two-top">
        <div className="title-box">
          <h2 className="sub-title">Fondos Prima</h2>
        </div>
        <div className="monto-box">
          <div className="label retiro">% retiro:</div>
          <div className="value porcentaje">95.5%</div>
          <div className="label text-balance">Monto de entrega:</div>
          <div className="value balance">
            {mount95 && <>{mount95.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</>}
            {mount95 === null && <img src={loading} alt="Loading" />}
          </div>
        </div>
      </div>
    </>
  );
};

StepTwoTop.propTypes = {
  accumulatedFund: PropTypes.number,
};

StepTwoTop.defaultProps = {
  accumulatedFund: null,
};

export default StepTwoTop;
