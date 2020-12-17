import React from 'react';
import ExitImage from 'modules/App/assets/images/cerrarsesion.svg';
import SharedModule from 'modules/shared';

const { AppSession } = SharedModule.libs;

function CloseSession() {
  const handleCloseSession = () => {
    AppSession.destroy();
    window.location.reload();
  };

  return (
    <div className="cerrar-sesion" onClick={handleCloseSession}>
      <img src={ExitImage} alt="Cerrar Session" />
      <p>Cerrar sesión</p>
    </div>
  );
}

export default CloseSession;
