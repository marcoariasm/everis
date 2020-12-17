import React from 'react';
import styled from 'styled-components';

import Button from 'global/components/v1/Button/Button';
import nextIcon from 'shared/images/iconos/next.svg';
import prevIcon from 'shared/images/iconos/prev.svg';

const TabFooter = ({
  showBackButton = true, step, setStep, save, next, disabled,
}) => (
  <Footer>
    {showBackButton
      ? (
        <Button
          className="secondary"
          leftIcon={prevIcon}
          disabled={disabled}
          onClick={() => setStep(() => step - 1)}
        >
          Anterior
        </Button>
      )
      : <span />}
    {step !== 'last'
      ? (
        <div>
          <Button
            className="action"
            onClick={save}
          >
            Guardar cambios
          </Button>
          <Button
            rightIcon={nextIcon}
            disabled={disabled}
            onClick={() => (next() ? setStep(() => step + 1) : () => {})}
          >
            Siguiente
          </Button>
        </div>
      )
      : <span />}
  </Footer>
);

export default TabFooter;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 44px 20px 44px 50px;
  & > div {
    display: flex;
    justify-content: space-evenly;
    width: 380px;
  }
`;
