import { AbstractControl } from '@angular/forms';
import { ApiService } from '../servicios/api.service';

export const validarContrasenas = (control: AbstractControl): { [key: string]: boolean } | null => {

  const password = control.get('contrasena1');
  const confirmPassword = control.get('contrasena2');

  return password && confirmPassword && password.value !== confirmPassword.value ? { noCoincide: true } : null;
};

export const validarNombreUsuario = async (control: AbstractControl): Promise<{ [key: string]: boolean } | null> => {

  let res;
  const params = {
    var_user: control.get('alias')
  };

  await ApiService.prototype.consultarNombreUsuario(params).subscribe(msg => res = msg);

  return res ? null : { yaExiste: true };
};
