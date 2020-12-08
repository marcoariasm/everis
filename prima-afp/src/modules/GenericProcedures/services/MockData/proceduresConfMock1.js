export const proceduresConfMock1 = {
  typeRequestId: 1,
  name: "Asesoria 95.5%",
  idCategory: 1,
  nameCategory: 1,
  descriptionLarge:
    "Asesoría para retirar hasta el 95.5% de tus fondos de pensión.",
  description: "",
  informationImportant:
    "Ten en cuenta que el pago se abonará a la persona que incurrió el gasto y que su nombre figura en las boletas o facturas. Si tu iniciaste el trámite, entonces tu nombre debe figurar en las boletas o facturas y además tus datos deben coincidir con la cuenta bancaria que indiques.",
  inBeneficiary: "0",
  inComplexity: "1",
  dateRegister: "2010-10-10",
  requirements: [
    {
      idRequirement: 1,
      nameRequirement:
        "Seleccionar el tipo de  fondo permitido de acuerdo a tu edad",
    },
  ],
  stages: ["Solicita el trámite del sepelio", "Recibir el reembolso"],
  documents: [
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
