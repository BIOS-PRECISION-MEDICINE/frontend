// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  client_id_google:'521818877411-nqqjaghippoeicsl68udp19eppo1m4na.apps.googleusercontent.com',
  url_base:"http://localhost:4200/login",
  url_login:"http://localhost:4200/login",
  // Apis propias para hacer el canal de comunicación con back-end.
  url_base_api:'https://devapps.origen.com/ApiRestOrigen/api/v1/',
  url_auth: 'https://devapps.origen.com/ApiRestAutenticacion/api/',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
