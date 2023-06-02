import {AbstractControl, ValidationErrors, AsyncValidatorFn} from '@angular/forms';
import {debounceTime, Observable, of, switchMap, take} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {AccountService} from "../../../../../data/service/account.service";

export function emailExistsValidator(authService: AccountService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value;

    return control.valueChanges.pipe(
      debounceTime(500),
      take(1),
      map(() => email),
      switchMap((emailAddress) =>
        authService.checkEmailExistence(emailAddress).pipe(
          map(exists => (exists ? {emailExists: true} : null)),
          catchError(() => of(null))
        )
      )
    );
  };
}

export function phoneExistsValidator(authService: AccountService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const phone = control.value;

    return control.valueChanges.pipe(
      debounceTime(500),
      take(1),
      map(() => phone),
      switchMap((phoneNumber) =>
        authService.checkPhoneNumberExistence(phoneNumber).pipe(
          map(exists => (exists ? {phoneExists: true} : null)),
          catchError(() => of(null))
        )
      )
    );
  };
}
