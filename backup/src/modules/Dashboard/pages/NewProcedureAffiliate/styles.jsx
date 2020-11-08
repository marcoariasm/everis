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
  title: "Solicitud de trámite del afiliado",
  content: "Nueva solicitud de trámite",
  subtitle1: "Trámites destacados",
  content1: "Los más solicitados",
  subtitle2: "Todos los trámites",
  content2: "Más de 50 trámites 100% digitales",
  title1: "Asesoría 95.5%",
  title2: "Retiro 95.5%",
  title3: "Jubilación Anticipada Ordinaria",
  text1: "",
  text2: "",
  text3: "",
  description1: "(breve descripción)",
  description2: "(breve descripción)",
  description3: "Pensión que puedes obtener antes de los 65 años",
  src1: asesoria2,
  src2: retiro2,
  src3: jubilacion
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
  description1: "Devolución de los gastos incurridos en el entierro del afiliado",
  description2: "Pensión que se otorga a los beneficiarios del afiliado fallecido",
  description3: "Si no estas de acuerdo con la resolución otorgada por la ONP",
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
