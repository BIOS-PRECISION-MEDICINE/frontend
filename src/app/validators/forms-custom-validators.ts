import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

function validatorEqualsPasswords(control: FormGroup){
  const password = control.value.password;
  const rePassword = control.value.rePassword;

  return password === rePassword ? null : { PasswordNoMatch: true };
};

export { validatorEqualsPasswords }
