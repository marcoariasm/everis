// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  env: '',
  url: 'http://localhost:3000',
  urlLanding: 'http://localhost:4200',
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
    }
  },
  apiSubscriptionKey: '961e1aed1fb14e8bb23f8852dac6d2fa',
  captchaKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  keystorage: '9j788mt97tcPKjj8J9He7t8WB8p5H4tH',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
