import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { allColors } from "shared/styles/index";
import lupa from "../images/lupa.svg";
import List from "./List/List";

const Container = styled.div`
  margin: 30px auto;
  border: solid 1px ${allColors.colorGrayBorder};
  border-radius: 8px;
  height: 40px;
  > input {
    margin: 4px 0 0 4px;
    padding: 9px 9px;
    font-size: 14px;
    height: 30px;
    width: 95%;
    position: relative;
    border: none;
    outline: none;
    color: ${allColors.colorGrayText};
  }
  > img {
    align-items: center;
    max-height: 25px;
    float: right;
  }
`;

const Card = styled.div`
  border-radius: 6px;
  box-shadow: 0 4px 8px 1px rgba(53, 53, 53, 0.12);
  border: solid 1px #e8e8e8;
  background-color: ${allColors.colorWhiteBase};
  margin-bottom: 15px;
  color: ${allColors.colorGrayText};
  font-family: calibri;
  font-size: 14px;
  > ul {
    padding: 10px 10px;
  }
`;

const Filter = ({ value, handleChange }) => {
  return (
    <Container>
      <input
        type="text"
        placeholder={"Buscar trámites"}
        value={value}
        onChange={handleChange}
      />
      <img src={lupa} alt="Buscar" />
    </Container>
  );
};

const ListResults = ({ list, found, children, isEmpty }) => {
  return (
    <div hidden={true}>
      {/* {found ? ( */}
        <Card>
          <ul>
            {list.map((element, i) => (
              <li key={i}>{element}</li>
            ))}
          </ul>
        </Card>
      {/* ) : 
        children
      } */}
    </div>
  );
};

const SearchBox = ({ children }) => {

  const [found, setFound] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const [word, setWord] = useState("");
  const [filterDisplay, setFilterDisplay] = useState([]);

  const [list] = useState([
    "Actualización de datos",
    "Actualización de datos de beneficiarios",
    "Actualización del Vínculo Laboral",
    "Apertura de cuentas de Aportes Voluntarios",
    "Aviso de Siniestro",
    "Cancelación de Plan Flexible",
    "Cambio de fondo",
    "Cambio de forma de pago",
    "Cambio de modalidad",
    "Cargo en cuenta para tu aporte de independiente",
    "Carta para la ONP",
    "Convenio Perú-España, Ibero 1-CM ISS",
    "Certificado de Afiliación",
    "Certificado de Pensionista",
    "Certificado de Supervivencia",
    "Constancia de 4.5% - ESSALUD",
    "Constancia de 95.5%",
    "Contrato de Afiliación",
    "Desafiliación",
    "Denuncia al promotor",
    "Devolución de Aportes de Afiliados",
    "Devolución de Aportes de Jubilados en otro regimen (Circular 040-2004)",
    "Devolución de Aportes por DU 037-94",
    "Envío de Boletas de Pago",
    "Estado de Cuenta",
    "Evaluación y Calificación de Invalidez",
    "Exclusión de beneficiarios",
    "Fondo Complementario de Jubilación Minera, Metalúrgica y Siderúrgica",
    "Gastos de Sepelio",
    "Herencia",
    "Inclusión de beneficiarios",
    "Inicio de Cobranza",
    "Multiafiliación",
    "Nulidad",
    "Pensión Complementaria de Pensión Mínima",
    "Pensión de Invalidez",
    "Pensión de Jubilación Anticipada por Enfermedad Terminal o Cancer",
    "Pensión de Jubilación Anticipada Ordinaria",
    "Pensión de Jubilación Anticipada por desempleo",
    "Pensión de Jubilación Labores de Riesgo Genérico",
    "Pensión de Jubilación Legal",
    "Pensión de Jubilación por Labores de Riesgo Extraordinario",
    "Pensión de Sobrevivencia",
    "Pensión Mínima de Jubilación",
    "Pensión por recupero de aportes en cobranza",
    "Reconsideraciones y/o Apelaciones",
    "Regimen Pesquero",
    "Repacto de pensión",
    "Retiro de hasta 50% de tu fondo por Enfermedad Terminal o Cancer",
    "Retiro 25% Hipotecario",
    "Retiro Aportes Voluntarios Sin Fin Previsional",
    "Retiro de hasta el 100%",
    "Revisión y/o Apelación de dictámenes",
    "Trámite de Bono de Reconocmiento",
    "Transferencias de Fondos al Exterior",
  ]);


  const handleChange = (e) => {
    setWord(e);
    let oldList = list.map((elem) => elem.toLowerCase());
    if (word !== "") {
      let newList = [];
      newList = oldList.filter((elem) => elem.includes(word.toLowerCase()));
      setFilterDisplay(newList);
      setFound(true);
    } else {
      setFilterDisplay(list);
      setFound(false);
      if (word === "") {
          setIsEmpty(true);
          setFound(false);
        }
    }
  };

  return (
    <>
      <Filter value={word} handleChange={(e) => handleChange(e.target.value)} />
      <ListResults
        list={word.length < 1 ? list : filterDisplay}
        found={found}
        isEmpty={isEmpty}
        children={children}
      />
    </>
  );
};

export default SearchBox;
