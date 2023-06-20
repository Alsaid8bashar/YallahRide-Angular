import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { debounceTime, Observable, of, switchMap, take } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AccountService } from "../../../../../data/service/account.service";
import {Injectable} from "@angular/core";
import {TokenService} from "../../../../../shared/service/token.service";

@Injectable({
  providedIn: 'root'
})
export class CustomValidators {
  constructor(private authService: AccountService, private tokeService:TokenService) {}

  emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;

      return control.valueChanges.pipe(
        debounceTime(500),
        take(1),
        map(() => email),
        switchMap((emailAddress) =>
          this.authService.checkEmailExistence(emailAddress).pipe(
            map(exists => (exists ? { emailExists: true } : null)),
            catchError(() => of(null))
          )
        )
      );
    };
  }

  phoneExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const phone = control.value;

      return control.valueChanges.pipe(
        debounceTime(500),
        take(1),
        map(() => phone),
        switchMap((phoneNumber) =>
          this.authService.checkPhoneNumberExistence(phoneNumber).pipe(
            map(exists => (exists ? { phoneExists: true } : null)),
            catchError(() => of(null))
          )
        )
      );
    };
  }

  confirmPasswordValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const password = control.value;
      const accountId = this.tokeService.extractObjectFromToken('accountId');

      return control.valueChanges.pipe(
        debounceTime(500),
        take(1),
        map(() => password),
        switchMap((userPassword) =>
          this.authService.confirmPassword(userPassword, accountId).pipe(
            map(valid => (valid ? null : { confirmPassword: true })),
            catchError(() => of({ confirmPassword: true }))
          )
        )
      );
    };
  }
}
