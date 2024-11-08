import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function validValuePattern(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const regex = /^\d*\.?\d{0,2}$/; // Somente dígitos, opcionalmente um ponto e até duas casas decimais
    const valid = regex.test(value);
    return valid ? null : { invalidValue: true };
  };
}
