import React from 'react';

import Button from 'global/components/v1/Button/Button';

const StepTwoTable = () => (
  <>
    <div className="step-two-table">
      <div className="table-header">
        <h2 className="table-header-item green column1">Producto</h2>
        <h2 className="table-header-item green column2">Objetivo</h2>
        <h2 className="table-header-item green column3">Características</h2>
        <h2 className="table-header-item green column4">Material de soporte</h2>
      </div>
      <div className="table-body">
        <div className="table-body-row">
          <div className="table-column column1">
            <h3>Aporte voluntario sin fin previsional</h3>
            <p>
              - Es una cuenta que te da la alternativa de ahorrar e invertir,
              durante el plazo que desees con una rentabilidad promedio
              competitiva respecto a otros productos financieros.
            </p>
          </div>
          <div className="table-column column2">
            <p>
              Cuenta de ahorro/inversión
              <strong>a mediano plazo.</strong>
            </p>
          </div>
          <div className="table-column column3">
            <ul>
              <li>Retiros ilimitados sin penalidades.</li>
              <li>El afiliado elige cuánto juntar.</li>
              <li>Puede escoger hasta 7 metas.</li>
            </ul>
          </div>
          <div className="table-column column4 buttons">
            <Button
              className="white-green small voluntary-contribution"
              onClick={() => {
                window.open('https://www.prima.com.pe/wcm/portal/primaafp/ayuda/ayuda-para-personas/herramientas/simuladores_de_ahorro_e_inversion');
              }}
            >
              Aporte voluntario sin fin previsional
            </Button>
            <Button
              className="green small send-1"
              onClick={() => {
              }}
            >
              Enviar Cartilla
            </Button>
          </div>
        </div>
      </div>
      <div className="table-body">
        <div className="table-body-row">
          <div className="table-column column1">
            <h3>Plan flexible</h3>
            <p>
              - Es un producto que te permite, mientras tu dinero rentabiliza,
              elegir entre el monto mensual que deseas recibir o la cantidad de
              años en la que quieres que recibir tu plata.
            </p>
          </div>
          <div className="table-column column2">
            <p>
              Recibir mensualmente
              <strong>
                <br />
                tu dinero,
                rentabilizandose
              </strong>
            </p>
          </div>
          <div className="table-column column3">
            <ul>
              <li>
                El afiliado elige la cantidad de años en las que recibe su
                dinero.
              </li>
              <li>Saldo del fondo heredable.</li>
              <li>Retiros en cualquier movimiento y sin penalidades.</li>
              <li>
                Depósitos todos los meses (BCP, BBVA, Scotiabank,
                Interbank).
              </li>
            </ul>
          </div>
          <div className="table-column column4 buttons">
            <Button
              className="white-green small plan-flex"
              onClick={() => {
              }}
            >
              Plan flexible
            </Button>
            <Button
              className="green small send-2"
              onClick={() => {
              }}
            >
              Enviar Cartilla
            </Button>
          </div>
        </div>
      </div>
    </div>
  </>
);
export default StepTwoTable;
