import React from 'react';

import './Tooltip.sass';

const Tooltip = ({ children, tooltip }) => (
  <div className="tooltip">
    {children}
    <span className="tooltiptext">{tooltip}</span>
  </div>
);

export default Tooltip;
