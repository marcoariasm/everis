import Card from 'global/components/v1/Card/Card';
import ButtonValidation
  from 'global/components/v1/ButtonValidation/ButtonValidation';
import React from 'react';

const StepTwoOne = () => (
  <Card title="1. Opciones de retiro y/o pensión">
    <div className="paso2-block with-border-bottom">
      <div className="paso2-left">
        Desición :
      </div>
      <div className="paso2-right">
        Retiro 95.5%
      </div>
    </div>
    <div className="paso2-block with-border-bottom">
      <div className="paso2-left">
        Monto referencial a retirar :
      </div>
      <div className="paso2-right">
        S/ 91,645.31
      </div>
    </div>
    <div className="paso2-block">
      <div className="paso2-left">
        Periodicidad :
      </div>
      <div className="paso2-right">
        Único pago
      </div>
    </div>
    <ButtonValidation text="Validado por el asesor" />
  </Card>
);

export default StepTwoOne;
