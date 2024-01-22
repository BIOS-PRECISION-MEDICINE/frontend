// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment_dev = {
  production: false,
  pagination_size: 10,  
  client_id_google:'521818877411-nqqjaghippoeicsl68udp19eppo1m4na.apps.googleusercontent.com',
  url_base:"http://localhost:4200/login",
  url_login:"http://localhost:4200/login",
  // Apis propias para hacer el canal de comunicación con back-end.
  url_base_api:'https://devapps.origen.com/ApiRestOrigen/api/v1/',
  url_auth: 'https://devapps.origen.com/ApiRestAutenticacion/api/',
  //API permissions
  url_api_permissions: 'http://127.0.0.1:3333/permissions',
  //API rols
  url_api_roles: 'http://127.0.0.1:3333/roles',
  //API users
  url_api_users: 'http://127.0.0.1:3333/users',
  //API process
  url_api_processes: 'http://127.0.0.1:3333/processes',
  //API tasks
  url_api_tasks: 'http://127.0.0.1:3333/tasks',
  //API sub-tasks
  url_api_subtasks: 'http://127.0.0.1:3333/subtasks',
  //API parameters
  url_api_parameters: 'http://127.0.0.1:3333/params',
  //API patients
  url_api_patient: 'http://127.0.0.1:3333/patients',
  //API data
  url_api_data: 'http://127.0.0.1:3333/data',
  //API exam
  url_api_exam: 'http://127.0.0.1:3333/exams',
  //API data
  url_api_data_subtask_exam: 'http://127.0.0.1:3333/data',

};

export const environment = {
  production: false,
  pagination_size: 10,  
  client_id_google:'521818877411-nqqjaghippoeicsl68udp19eppo1m4na.apps.googleusercontent.com',
  url_base:"10.0.80.84/login",
  url_login:"10.0.80.84/login",
  // Apis propias para hacer el canal de comunicación con back-end.
  url_base_api:'http://10.0.80.150/docs/index.html',
  url_auth: 'http://10.0.80.150/docs/index.html',
  //API permissions
  url_api_permissions: '10.0.80.150/permissions',
  //API rols
  url_api_roles: '10.0.80.150/roles',
  //API users
  url_api_users: '10.0.80.150/users',
  //API process
  url_api_processes: '10.0.80.150/processes',
  //API tasks
  url_api_tasks: '10.0.80.150/tasks',
  //API sub-tasks
  url_api_subtasks: '10.0.80.150/subtasks',
  //API parameters
  url_api_parameters: '10.0.80.150/params',
  //API patients
  url_api_patient: '10.0.80.150/patients',
  //API data
  url_api_data: '10.0.80.150/data',
  //API exam
  url_api_exam: '10.0.80.150/exams',
  //API data
  url_api_data_subtask_exam: '10.0.80.150/data',

};