import React from "react";
import empty from "shared/images/empty.svg";
import { ContainerEmptySection } from "./styles.jsx";

function EmptySection({ isFinished = false }) {
  return (
    <ContainerEmptySection>
      <img src={empty} alt="empty" />
      <p>
        {`Aquí podrás ver todas tus solicitudes de trámites ${
          isFinished ? "finalizadas" : "en curso"
        }.`}
        <br /> Por el momento no tienes ninguna.
      </p>
    </ContainerEmptySection>
  );
}

export default EmptySection;
