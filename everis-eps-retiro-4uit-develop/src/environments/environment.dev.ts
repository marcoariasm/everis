export const environment = {
  // production: true,
  production: false,
  env: 'QA',
  // url: 'https://apigw-consultaretiroafp.azure-api.net/' --> micros
  // url: 'https://sls-wus2-dev-4ad80c-apim.azure-api.net' --> dev functions
  url: 'https://apim-retiroaafp-dev2.azure-api.net',
  urlLanding: 'https://cdne-stfrontlayerdev.azureedge.net/',
  // urlLanding: 'http://localhost:4200',
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
      start: 0, // years
      range: 130 // years
    },
  },
  apiSubscriptionKey: '961e1aed1fb14e8bb23f8852dac6d2fa',
  captchaKey: '6Ldn4N8ZAAAAAKxdXFZZfUvZU0Y8zD4IEWk4m_f2',
  keystorage: '9j788mt97tcPKjj8J9He7t8WB8p5H4tH',
};

//  Testing
// https://sls-wus2-dev-4ad80c-apim.azure-api.net/azf/v1/availability --> Funciones de Consulta
// https://sls-wus2-dev-4ad80c-apim.azure-api.net/azf/v1/request --> Funciones de Registro
// https://sls-wus2-dev-4ad80c-apim.azure-api.net/azf/v1/ubigeo --> Funciones de Localizacion
// https://apigw-consultaretiroafp.azure-api.net/query/v2/availability --> Microservicios de Consulta
// https://apigw-consultaretiroafp.azure-api.net/register/v2/request --> Microservicios de Registro
// https://apigw-consultaretiroafp.azure-api.net/location/v2/ubigeo --> Microservicio de Localizacion

