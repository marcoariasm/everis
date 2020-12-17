export const proceduresConfMock2 = {
  typeRequestId: 2,
  name: "Jubilación Anticipada Ordinaria",
  idCategory: 1,
  nameCategory: 1,
  description: "Jubílate antes de tiempo",
  descriptionLarge: "",
  informationImportant:
    "En el sistema privado de pensiones (SPP) puedes jubilarte antes de cumplir los 65 años.",
  inBeneficiary: "1",
  inComplexity: "1",
  dateRegister: "2010-10-10",
  requirements: [
    "Si eres hombre puedes acceder a partir de los 55 años, si eres mujer a partir de los 50.",
    "Que tu fondo te permita acceder a una pensión igual o mayor al 40% de tu remuneración mensual promedio",
    "Demostrar 72 aportes mensuales en los últimos 120 meses anteriores a tu solicitud. Puedes regularizar hasta un máximo de 24 aportes",
  ],
  stages: ["Escoge una modalidad", "Recibe tu pensión"],
  documents: [
    "Documento de identidad que acredite tu vínculo con los beneficiarios",
  ],
  documentsBeneficiary: [
    "Acta o certificado de defunción ",
    "Atestado policial, sólo para casos de muerte accidental",
    "Copia del documento de identidad de la persona que realizó el gasto",
    "Facturas y/o boletas de venta originales que acrediten el gasto, las cuales deben estar a nombre del solicitante",
  ],
  status: [
    {
      idStatus: 1,
      nameStatus: "ACCEPTED",
      duration: 2,
    },
    {
      idStatus: 2,
      nameStatus: "REGISTERED",
      duration: 5,
    },
  ],
};
