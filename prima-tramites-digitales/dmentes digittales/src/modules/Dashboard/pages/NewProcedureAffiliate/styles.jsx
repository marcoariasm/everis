import styled from "styled-components";
import { size } from "global/styles/Responsive";
import { allColors } from "global/styles";
import asesoria2 from "shared/images/asesoria2.svg";
import jubilacion from "shared/images/jubilacion.svg";
import retiro2 from "shared/images/retiro2.svg";
import sobrevivencia from "shared/images/retiro2.svg";
import bono from "shared/images/bono.svg";

export const CardList = styled.div`
  display: grid;
  grid-column-gap: 3%;
  grid-row-gap: 3%;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr 1fr;
  margin: 10px 0;
  min-height: 100%;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-column-gap: 3%;
    grid-row-gap: 3%;
    width: 100%;
    margin: auto;
    margin-top: 30px;
    min-height: 100%;
  }
`;

export const AffiliateName = styled.div`
  margin: 2em 0 3em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f8;
  height: 60px;
  > span:nth-child(2n) {
    color: ${allColors.colorGreenBalance};
    font-family: Calibri;
    font-size: 18px;
    font-weight: bold;
  }
`;

export const Text = styled.div`
  margin: 10px 0 0 0;
  > span {
    text-align: center;
    font-size: 14px;
    line-height: 21px;
    color: ${allColors.colorGrayText};
  }
`;

export const textTramitesPersonalesAffiliate = {
  title: "Trámites que puedes realizar",
  content: "Nueva solicitud de trámite",
  subtitle1: "Trámites destacados",
  content1: "Los más solicitados",
  subtitle2: "Todos los trámites",
  content2: "Más de 80 trámites 100% digitales",
  title1: "Etapa 1",
  title2: "Etapa 2",
  title3: "Bono de reconocimiento",
  text1: "Asesoría para jubilación y/o Retiro 95.5%",
  text2: "Decisión para jubilación y/o Retiro 95.5%",
  text3: "",
  description1: "Conoce las alternativas para tu fondo",
  description2: "Infórmanos la decisión para tu fondo",
  description3:  "Solicita los aportes realizados al Sistema Nacional de Pensiones con anterioridad a tu incorporación al SPP",
  src1: asesoria2,
  src2: retiro2,
  src3: bono,
};

export const textTramitesPersonalesApplicant = {
  title: "Solicitud de trámite del afiliado",
  content: "Nueva solicitud de trámite",
  subtitle1: "Trámites destacados",
  content1: "Los más solicitados",
  subtitle2: "Todos los trámites",
  content2: "Más de 50 trámites 100% digitales",
  title1: "Gastos de Sepelio",
  title2: "Sobrevivencia",
  title3: "Bono de reconocimiento",
  text1: "",
  text2: "",
  text3: "",
  description1:
    "Devolución de los gastos incurridos en el entierro del afiliado",
  description2:
    "Pensión que se otorga a los beneficiarios del afiliado fallecido",
  description3: "Solicita los aportes realizados al Sistema Nacional de Pensiones con anterioridad a tu incorporación al SPP",
  src1: asesoria2,
  src2: sobrevivencia,
  src3: bono
};

export const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Calibri;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  :hover {
    cursor: pointer;
  }
  .name {
    font-size: 16px;
    font-weight: bold;
  }
  .description {
    font-size: 14px;
    margin-bottom: 16px;
  }
`;
