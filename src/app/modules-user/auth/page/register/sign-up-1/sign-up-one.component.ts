import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "./customValidators";
import {AccountService} from "../../../../../data/service/account.service";
import {StorageService} from "../../../../../shared/service/storage.service";
import {Account} from "../../../../../data/schema/account";
import {UserService} from "../../../../../data/service/user.service";
import {PhoneNumberVerificationService} from "../../../../../shared/service/phone-number-verification.service";
import {NgxSpinnerService} from "ngx-spinner";
import {User} from "../../../../../data/schema/user";
import {of, Subscription, switchMap} from "rxjs";
import {catchError} from "rxjs/operators";
import {DynamicScriptLoaderService} from "../../../../../shared/service/dynamic-script-loader-service.service";

@Component({
  selector: 'app-sign-up-1',
  templateUrl: './sign-up-one.component.html',
  styleUrls: ['./sign-up-one.component.css']
})
export class SignUpOneComponent implements OnInit, OnDestroy {

  register: FormGroup;
  private sub = new Subscription();


  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private router: Router, private accountService: AccountService, private storageService: StorageService, private userService: UserService, private phoneNumberService: PhoneNumberVerificationService,
              public spinner: NgxSpinnerService, private customValidators: CustomValidators) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.unloadScripts();
    this.loadScripts();
    this.register.controls['confirmPassword'].setValidators([Validators.required, this.passwordMatchValidator.bind(this)]);
  }


  onSubmit() {
    if (!this.checkEmailExistence(this.register.value.email) && !this.checkPhoneNumberExistence(this.register.value.phoneNumber) && this.register.valid) {
      const account: Account = this.register.value;
      account.user = this.storageService.getObject("user");
      this.spinner.show();
      this.apiCalls(account);
    } else {
      this.register.markAllAsTouched();
    }
  }

  private apiCalls(account: Account) {

    this.sub = this.userService.createUser(account.user).pipe(
      switchMap((response: User) => {
        return this.accountService.registerAccount(account).pipe(
          switchMap(() => {
            // this.phoneNumberService.generateTOTP(account.phoneNumber).subscribe();
            this.storageService.removeObject('user');
            this.storageService.saveObject('phoneNumber', account.phoneNumber);
            return of(response);
          }),
          catchError((error) => {
            console.log('Error:', error);
            return of(null);
          })
        );
      })
    ).subscribe((response: User | null) => {
      this.spinner.hide();
      if (response) {
        this.router.navigate(['/auth/two-factor-authentication']);
      }
    });
  }

  private buildForm(): void {
    this.register = new FormGroup({
      phoneNumber: new FormControl('', [Validators.required,], [this.customValidators.phoneExistsValidator()]),
      passwordHash: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      confirmPassword: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email,], [this.customValidators.emailExistsValidator()])
    });
  }

  passwordMatchValidator(control: FormControl): { [s: string]: boolean } | null {
    if (this.register && control.value !== this.register.controls['passwordHash'].value) {
      return {'passwordMismatch': true};
    }
    return null;
  }

  private checkPhoneNumberExistence(phoneNumber: string): boolean {
    this.accountService.checkPhoneNumberExistence(this.register.value.phoneNumber)
      .subscribe(
        (response: boolean) => {
          return response;
        }
      );
    return false;
  }

  private checkEmailExistence(email: string): boolean {
    this.accountService.checkEmailExistence(this.register.value.email)
      .subscribe(
        (response: boolean) => {
          return response;
        }
      );
    return false;
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'tiny-slider', 'flatpickr', 'glightbox', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

  private unloadScripts() {
    this.dynamicScriptLoader.unload('bootstrap.bundle.min', 'choices', 'tiny-slider', 'flatpickr', 'glightbox', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.unloadScripts();

  }

}
