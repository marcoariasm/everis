export const formatCombo = (data) => {
  if (data) {
    const options = Object.keys(data).map((key, i) => ({
      value: key,
      label: Object.values(data)[i],
    }));
    return [...options];
  }
  return [];
};

export const validatedDocumentType = (id) => {
  switch (id) {
    case '00' || '02':
      return { pattern: '[0-9]', length: 8 };
    case '01':
      return { pattern: '[a-zA-ZñÑ0-9]', length: 12 };
    case '03':
      return { pattern: '[a-zA-ZñÑ0-9]', length: 12 };
    case '04':
      return { pattern: '[a-zA-Z0-9Ññ]', length: 12 };
    default:
      return { pattern: false, length: 0 };
  }
};

export const REGISTER = 2;

export const noRegister = (item) => item.statusId !== REGISTER;

export const DOCUMENT_TYPE = 'DOCUMENT_TYPE';
export const PROCEDURES = 'PROCEDURES';
export const CHANNEL = 'CHANNEL';
export const FINANCIAL_ADVICE_STATES = 'FINANCIAL_ADVICE_STATES';
export const EXECUTIVE = 'EXECUTIVE';
export const MESSAGE_ERROR_DEFAULT = 'Lo sentimos, hubo un error inesperado. Intenta nuevamente en unos minutos.';

export const ROLE_FRONT = 'ROLE_EJECUTIVOFRONT';
export const ROLE_BACK = 'ROLE_ANALISTABACK';
export const ROLE_READ = 'ROLE_CONSULTA';
export const ROLE_ADMIN = 'ROLE_ADMINISTRADOR';
export const ROLE_SUPER = 'ROLE_SUPERVISOR';

export const ONP_PENSIONER_DECLARATION = 'ONP_PENSIONER_DECLARATION';

export const FINANCIAL_ADVICE_STATE = {
  ACCEPTED: 'ACCEPTED',
  FINISHED: 'FINISHED',
  IN_PAYMENT: 'IN_PAYMENT',
  IN_PROCESS: 'IN_PROCESS',
  OBSERVED: 'OBSERVED',
  REGISTERED: 'REGISTERED',
  REJECTED: 'REJECTED',
};

export const QUERY = 'query';
export const SCHEDULE = 'schedule';
export const QUERY_PROCEDURE = 'query_procedure';

export const cboTramiteDetalle = (placeholder = 'placeholder') => [
  {
    value: 0,
    label: placeholder,
  },
  {
    value: 1,
    label: 'Etapa 1 - Asesoría',
  },
];

export const cboAgencia = () => [
  {
    value: 101,
    label: '101 - Oficina Central PRIMA AFP',
  },
  {
    value: 102,
    label: '102 - Agencia San Isidro',
  },
  {
    value: 103,
    label: '103 - Local de Venta Lima',
  },
  {
    value: 104,
    label: '104 - Local de Venta San Miguel',
  },
  {
    value: 501,
    label: '501 - Agencia Arequipa',
  },
  {
    value: 601,
    label: '601 - Agencia Trujillo',
  },
  {
    value: 602,
    label: '602 - Agencia Chiclayo',
  },
  {
    value: 603,
    label: '603 - Agencia Piura',
  },
  {
    value: 505,
    label: '505 - Agencia Ilo',
  },
  {
    value: 605,
    label: '605 - Agencia Cajamarca',
  },
  {
    value: 701,
    label: '701 - Agencia Iquitos',
  },
  {
    value: 705,
    label: '705 - Agencia Pucallpa',
  },
  {
    value: 801,
    label: '801 - Oficina Ayacucho',
  },
  {
    value: 805,
    label: '805 - Agencia Huancayo',
  },
  {
    value: 506,
    label: '506 - Agencia Cusco',
  },
  {
    value: 107,
    label: '107 - Agencia San Borja Javier Prado',
  },
  {
    value: 502,
    label: '502 - Agencia Ica',
  },
  {
    value: 503,
    label: '503 - Agencia Tacna',
  },
  {
    value: 504,
    label: '504 - Oficina Chincha',
  },
  {
    value: 507,
    label: '507 - Agencia Puno',
  },
  {
    value: 606,
    label: '606 - Agencia Chimbote',
  },
  {
    value: 607,
    label: '607 - Oficina Huaraz',
  },
  {
    value: 608,
    label: '608 - Agencia Huacho',
  },
  {
    value: 702,
    label: '702 - Oficina Tarapoto',
  },
  {
    value: 802,
    label: '802 - Oficina Huanuco',
  },
  {
    value: 108,
    label: '108 - Agencia San Borja San Sebastian',
  },
  {
    value: 109,
    label: '109 - Agencia San Borja Ucello',
  },
  {
    value: 115,
    label: '115 - Agencia Lima',
  },
  {
    value: 604,
    label: '604 - Agencia Talara',
  },
];

export const headersAgenda = ['Trámite', 'Fecha de solicitud', 'CUSPP', 'Apellidos y nombres', 'Estado del trámite', 'Canal de atención', 'Plazo de validación'];
