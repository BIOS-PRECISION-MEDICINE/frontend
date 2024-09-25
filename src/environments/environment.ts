// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  pagination_size: 10,
  client_id_google:'521818877411-nqqjaghippoeicsl68udp19eppo1m4na.apps.googleusercontent.com',
  url_main_backend:"http://10.0.80.43",
  url_base:"http://localhost:4200/login",
  url_login:"http://localhost:4200/login",
  // Apis propias para hacer el canal de comunicación con back-end.
  url_base_api:'http://localhost:3333',
  url_auth: 'http://localhost:3333/login-fake',
  //API permissions
  url_api_permissions: 'http://10.0.80.43/permissions',
  //API rols
  url_api_roles: 'http://10.0.80.43/roles',
  //API users
  url_api_users: 'http://10.0.80.43/users',
  //API process
  url_api_processes: 'http://10.0.80.43/processes',
  //API tasks
  url_api_tasks: 'http://10.0.80.43/tasks',
  //API sub-tasks
  url_api_subtasks: 'http://10.0.80.43/subtasks',
  //API sub-tasks-EXAM
  url_api_subtask_exam: 'http://10.0.80.43/subtasks-exam',
  //API parameters
  url_api_parameters: 'http://10.0.80.43/params',
  //API patients
  url_api_patient: 'http://10.0.80.43/patients',
  //API data
  url_api_data: 'http://10.0.80.43/data',
  //API exam
  url_api_exam: 'http://10.0.80.43/exams',
  //API data
  url_api_data_subtask_exam: 'http://10.0.80.43/datum_sub_task_exam',
  //API process pipeline
  url_api_process_pipeline: 'http://10.0.80.43/xx',
  //API get exams by id_process
  url_api_get_exams_by_idprocess: 'http://10.0.80.43/xx',
  //secret_google: "468010351371-uuakplj3cnqjbhu0n11b7rvucop0dcse.apps.googleusercontent.com"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
