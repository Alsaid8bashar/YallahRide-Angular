import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {AuthService} from "../../../../../data/service/account.service";

export function emailExistsValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value;

    return authService.checkEmailExistence(email).pipe(
      map(exists => (exists ? { emailExists: true } : null)),
      catchError(() => of(null))
    );
  };
}
