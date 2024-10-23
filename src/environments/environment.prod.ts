// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  pagination_size: 10,
  client_id_google:'468010351371-m4ag72ad3mhp261bvp9ko3rhgctq6ef3.apps.googleusercontent.com',
  url_main_backend:"https://origen.bios-io.co/api",
  url_base:"https://origen.bios-io.co/login",
  url_login:"https://origen.bios-io.co/login",
  // Apis propias para hacer el canal de comunicación con back-end.
  url_base_api:'https://origen.bios-io.co/api',
  url_auth: 'https://origen.bios-io.co/api/login-fake',
  //API permissions
  url_api_permissions: 'https://origen.bios-io.co/api/permissions',
  //API rols
  url_api_roles: 'https://origen.bios-io.co/api/roles',
  //API users
  url_api_users: 'https://origen.bios-io.co/api/users',
  //API process
  url_api_processes: 'https://origen.bios-io.co/api/processes',
  //API tasks
  url_api_tasks: 'https://origen.bios-io.co/api/tasks',
  //API sub-tasks
  url_api_subtasks: 'https://origen.bios-io.co/api/subtasks',
  //API sub-tasks-EXAM
  url_api_subtask_exam: 'https://origen.bios-io.co/api/subtasks-exam',
  //API parameters
  url_api_parameters: 'https://origen.bios-io.co/api/params',
  //API patients
  url_api_patient: 'https://origen.bios-io.co/api/patients',
  //API data
  url_api_data: 'https://origen.bios-io.co/api/data',
  //API exam
  url_api_exam: 'https://origen.bios-io.co/api/exams',
  //API data
  url_api_data_subtask_exam: 'https://origen.bios-io.co/api/datum_sub_task_exam',
  //API process pipeline
  url_api_process_pipeline: 'https://origen.bios-io.co/api/xx',
  //API get exams by id_process
  url_api_get_exams_by_idprocess: 'https://origen.bios-io.co/api/xx',
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
