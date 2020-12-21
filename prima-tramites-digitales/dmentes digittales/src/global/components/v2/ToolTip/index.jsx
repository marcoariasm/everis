import React, { useState, useEffect } from 'react';
import "./styles.scss";

// Agregar manejo de posición en la pantalla con coordinadas

const Tooltip = (props) => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 100);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  useEffect(() => {
     if (props.show) return showTip();
     hideTip();
  }, [props.show]);

  return (
    <div
      className={`Tooltip-Wrapper`}
    >
      {props.children}
      {active && (
        <div className={`Tooltip-Tip ${props.type === 'dark' ? 'dark-bubble' : 'light-bubble'} ${props.direction || "top"}`}>
          {props.content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;