import React from 'react'

import './Tooltip.sass'

const Tooltip = () => {
  return (
    <a className="tooltip">
      <div className="tooltiptext">
        <h1 className="cardTitleLarge">¿Por qué te preguntamos esto?</h1>
        <span className="tableBodyText">
          Para que cuando realices la <b>Etapa 2</b> del trámite, tengas a la mano los siguientes documentos:
        </span>
        <span className="tableBodyText">
          <b>Si eres pensionista en el SNP:</b> la Resolución ONP y la última boleta de pago de pensión.
        </span>
        <span className="tableBodyText">
          <b>Si eres pensionista en otra AFP:</b> la constancia emitida por dicha AFP que acredite esta condición.
        </span>
        <span className="tableBodyText">
          Estos documentos sustentarán que ya cuentas con atención médica en EsSalud, por lo que ya no será necesario
          que transfiramos el 4.5% de tu fondo a dicha entidad.
        </span>
      </div>
    </a>
  )
}

export default Tooltip
