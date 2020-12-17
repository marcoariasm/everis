import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { allColors } from "global/styles/index";
import lupa from "shared/images/lupa.svg";
// import List from "./List/List";

import { personalProcedures } from "../pages/NewProcedureAffiliate/mockData"

const Container = styled.div`
  margin: 30px auto;
  border: solid 1px ${allColors.colorGrayBorder};
  border-radius: 8px;
  display: flex;
  align-items: center;
  > input {
    margin: 4px 0 0 4px;
    padding: 9px 0px 9px 22px;
    font-size: 14px;
    height: 40px;
    width: 95%;
    position: relative;
    border: none;
    outline: none;
    color: ${allColors.colorGrayText};
  }
  > img {
    align-items: center;
    max-height: 25px;
    margin-right: 22px;
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

    li {
      padding: 3px 0;
      cursor: pointer;
    }
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

const ListResults = ({ list, found = false, children, selectItem }) => {
  return (
    <div hidden={false}>
      {found ? (
        <Card>
          <ul>
            {list.map((element, i) => (
              <li key={i} onClick={() => selectItem(element)}>{element.name}</li>
            ))}
          </ul>
        </Card>
      ) :
        children
      }
    </div>
  );
};

const SearchBox = ({ children }) => {
  const [word, setWord] = useState("");
  const [filterDisplay, setFilterDisplay] = useState([]);
  const history = useHistory();

  const makeList = (object) => {
    let list = [];
    object.filter(_ => _.typeRequests.length > 0).forEach(_ => {
      list = [...list, ..._.typeRequests];
    });
    return list;
  }

  const lista = makeList(personalProcedures);

  const [list] = useState(lista)

  // const [list] = useState([
  //   "Actualización de datos",
  //   "Actualización de datos de beneficiarios",
  //   "Actualización del Vínculo Laboral",
  //   "Apertura de cuentas de Aportes Voluntarios",
  //   "Aviso de Siniestro",
  //   "Cancelación de Plan Flexible",
  //   "Cambio de fondo",
  //   "Cambio de forma de pago",
  //   "Cambio de modalidad",
  //   "Cargo en cuenta para tu aporte de independiente",
  //   "Carta para la ONP",
  //   "Convenio Perú-España, Ibero 1-CM ISS",
  //   "Certificado de Afiliación",
  //   "Certificado de Pensionista",
  //   "Certificado de Supervivencia",
  //   "Constancia de 4.5% - ESSALUD",
  //   "Constancia de 95.5%",
  //   "Contrato de Afiliación",
  //   "Desafiliación",
  //   "Denuncia al promotor",
  //   "Devolución de Aportes de Afiliados",
  //   "Devolución de Aportes de Jubilados en otro regimen (Circular 040-2004)",
  //   "Devolución de Aportes por DU 037-94",
  //   "Envío de Boletas de Pago",
  //   "Estado de Cuenta",
  //   "Evaluación y Calificación de Invalidez",
  //   "Exclusión de beneficiarios",
  //   "Fondo Complementario de Jubilación Minera, Metalúrgica y Siderúrgica",
  //   "Gastos de Sepelio",
  //   "Herencia",
  //   "Inclusión de beneficiarios",
  //   "Inicio de Cobranza",
  //   "Multiafiliación",
  //   "Nulidad",
  //   "Pensión Complementaria de Pensión Mínima",
  //   "Pensión de Invalidez",
  //   "Pensión de Jubilación Anticipada por Enfermedad Terminal o Cancer",
  //   "Pensión de Jubilación Anticipada Ordinaria",
  //   "Pensión de Jubilación Anticipada por desempleo",
  //   "Pensión de Jubilación Labores de Riesgo Genérico",
  //   "Pensión de Jubilación Legal",
  //   "Pensión de Jubilación por Labores de Riesgo Extraordinario",
  //   "Pensión de Sobrevivencia",
  //   "Pensión Mínima de Jubilación",
  //   "Pensión por recupero de aportes en cobranza",
  //   "Reconsideraciones y/o Apelaciones",
  //   "Regimen Pesquero",
  //   "Repacto de pensión",
  //   "Retiro de hasta 50% de tu fondo por Enfermedad Terminal o Cancer",
  //   "Retiro 25% Hipotecario",
  //   "Retiro Aportes Voluntarios Sin Fin Previsional",
  //   "Retiro de hasta el 100%",
  //   "Revisión y/o Apelación de dictámenes",
  //   "Trámite de Bono de Reconocmiento",
  //   "Transferencias de Fondos al Exterior",
  // ]);


  const handleChange = (e) => {
    setWord(e);
    const auxList = Object.assign([], list);
    setFilterDisplay(word ? auxList.filter(_ => _.name.toLowerCase().indexOf(word.toLowerCase()) !== -1) : list);
  };

  return (
    <>
      <Filter value={word} handleChange={(e) => handleChange(e.target.value)} />
      <ListResults
        list={word.length === 0 ? list : filterDisplay}
        found={word.length}
        children={children}
        selectItem={(e) => history.push(`/nueva-solicitud/tramite/${e.idTypeRequest}`)}
      />
    </>
  );
};

export default SearchBox;
