export const environment = {
  production: true,
  env: 'PROD',
  url: 'https://apigw.consultaretiroafp.pe',
  urlLanding: 'https://www.consultaretiroafp.pe',
  config: {
    skipCalendar: true,
    amountMax: 12900,
    amountUIT: 4400,
    time: {
      identification: 1 * 60,
      voluntaryContribution: 1 * 60,
      retiro25: 3.5 * 60
    },
    birthdate: {
      start: 0,
      range: 130
    },
  },
  apiSubscriptionKey: '961e1aed1fb14e8bb23f8852dac6d2fa',
  captchaKey: '6Ldn4N8ZAAAAAKxdXFZZfUvZU0Y8zD4IEWk4m_f2',
  keystorage: '9j788mt97tcPKjj8J9He7t8WB8p5H4tH',
};

// Produccion
// https://apigw.consultaretiroafp.pe/azf/v1/availability --> Funciones de Consulta
// https://apigw.consultaretiroafp.pe/azf/v1/request --> Funciones de Registro
// https://apigw.consultaretiroafp.pe/azf/v1/ubigeo --> Funciones de Localizacion
// https://apigw.consultaretiroafp.pe/query/v2/availability --> Microservicios de Consulta
// https://apigw.consultaretiroafp.pe/register/v2/request --> Microservicios de Registro
// https://apigw.consultaretiroafp.pe/location/v2/ubigeo --> Microservicio de Localizacion
