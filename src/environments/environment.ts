// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //  uri: 'https://devapi.alishraaq.com/',
  //  api_uri: 'https://devapi.alishraaq.com/api',
  uri: window['uri'],
  api_uri: window['api_uri'],
  infiniteValue: '100000000000000000000000000',
  qasida_type: '6',
  q_type: '46',
  qamoos_type: '50',
  bayaan_type : '51',
  miqaat_type : '57'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
