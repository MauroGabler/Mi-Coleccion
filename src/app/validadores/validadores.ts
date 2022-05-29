import { AbstractControl } from '@angular/forms';

export const validarContrasenas = (control: AbstractControl): { [key: string]: boolean } | null => {

  const password = control.get('contrasena1');
  const confirmPassword = control.get('contrasena2');

  return password && confirmPassword && password.value !== confirmPassword.value ? { noCoincide: true } : null;
};
