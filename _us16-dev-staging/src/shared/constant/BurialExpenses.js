// information: [{name, value: contenido segun el tipo , type: 'string'}]
// type puede ser : list, paragraphs, stepSections;

// type list: [ 'string', 'string']
// type paragraphs: [{text: 'string, isStrong: boolean}]
// type stepSections: [{title: 'string', text: ['string']}]

export const burialExpenses = {
  title: "Gastos de sepelio",
  description:
    "Ante el fallecimiento del afiliado, un familiar o la persona que acredite el gasto incurrido, puede solicitar la devolución de los gastos (monto variable de acuerdo a la fecha de fallecimiento). Si el afiliado tiene cobertura, este monto está cubierto por el seguro. Caso contrario, será tomado con el saldo del fondo del afiliado.",
  documentDownloadDescription: "Descarga la Cartilla informativa",
  documentDownloadIconName: "pdf_icon",
  validateUserReadInformation: "Declaro haber leído la información",
  buttonsName: {
    primary: "Necesito asesoría",
    secondary: "Iniciar trámite",
  },
  information: [
    {
      name: "Importante",
      type: "paragraphs",
      value: [
        {
          text:
            "Ten en en cuenta que el pago se abonará a la persona que incurrió en los gastos y que su nombre figura en las boletas o facturas.",
          isStrong: false,
        },
        {
          text:
            "Si tu iniciaste el trámite, entonces tu nombre debe figurar en las boletas o facturas y además tus datos deben coincidir con la cuenta bancaria que indiques.",
          isStrong: true,
        },
        {
          text: "La cuenta bancaria debe ser personal y no mancomunada.",
          isStrong: false,
        },
      ],
    },
    {
      name: "Etapas del proceso",
      type: "stepSections",
      value: [
        {
          title: "Al dar click en Iniciar trámite podrás completar esta etapa:",
          text: ["Etapa 01:", "Solicita el trámite de sepelio"],
        },
        {
          title:
            "La siguiente etapa del trámite las podrás completar con el acompañamiento de la ejecutiva asignada.",
          text: ["Etapa 02:", "Recibir el reembolso"],
        },
      ],
    },
    {
      name: "Requisitos para el trámite ",
      type: "list",
      value: [
        "Ser familiar directo o contar con su aprobación mediante una declaración jurada.",
        "Contar con los documentos que sustenten la muerte natural o por accidente.",
        "Contar con los documentos de sustento de la persona que realizó los gastos de sepelio.",
      ],
    },
    {
      name: "Documentos que necesitas tener a la mano",
      type: "list",
      value: [
        "Acta o certificado de defunción",
        "Atestado policial, solo para casos de muerte accidental",
        "Copia del documento de identidad de la persona que realizó el gasto",
        "Facturas y/o boletas de venta originales que acrediten el gasto , las cuales deben estar a nombre del solicitante",
      ],
    },
  ],
  stepOne: {
    description:
      "Para ingresar tu solicitud debes completar el formulario. Esta solicitud será analizada por el área especialista, quién te informará los resultados  e indicará, de ser aprobada.",
    formLabels: {
      dateOfDeath: "Fecha de fallecimiento",
      causeOfDeath: "Causal de fallecimiento",
    },
    buttonName: "continuar",
  },
  stepTwo: {
    firstTab: {
      title: "Persona natural",
    },
    secondTab: {
      title: "Persona jurídica",
    },
    paymentMethods: [
      {
        value:"paymentInAccount",
        label:"Abono en cuenta",
      },
      {
        value:"paymentInBankCounter",
        label:"Pago en ventanilla",
      }
    ]
  },
};
