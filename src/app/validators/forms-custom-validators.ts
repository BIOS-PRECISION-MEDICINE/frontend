import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ValidatorDateGreaterTo(currentDate: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    currentDate.setHours(0, 0, 0, 0);
    if (new Date(control.value + 'T00:00:00') >= currentDate) {
      return { invalidDate: true };
    }
    else {
      return null;
    };
  };
}