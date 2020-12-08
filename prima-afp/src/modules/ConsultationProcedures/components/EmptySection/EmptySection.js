import React from "react";
import empty from "shared/images/empty.svg";
import { ContainerEmptySection } from "./styles.jsx";
import { useRouteMatch } from "react-router-dom";

function EmptySection({ isFinished = false }) {
  const { url } = useRouteMatch();

  const MessageEmpty = (routeIsRepresentative) => {
    if (routeIsRepresentative && isFinished)
      return "Aquí podrás ver todos los trámites finalizados, solicitados por un apoderado.";
    if (routeIsRepresentative && !isFinished)
      return "Aquí podrás ver todos los trámites en curso, solicitados por un apoderado.";
    if (!routeIsRepresentative && isFinished)
      return "Aquí podrás ver todas tus solicitudes de trámites finalizadas.";
    if (!routeIsRepresentative && !isFinished)
      return "Aquí podrás ver todas tus solicitudes de trámites en curso.";
  };

  return (
    <ContainerEmptySection>
      <img src={empty} alt="empty" />
      <p>
        {MessageEmpty(url.includes("apoderados"))}
        <br />
        {`Por el momento ${
          url.includes("apoderados") ? "no hay ninguno." : "no tienes ninguna."
        }`}
      </p>
    </ContainerEmptySection>
  );
}

export default EmptySection;
