import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {emailExistsValidator, phoneExistsValidator} from "./emailExistence.validator";
import {AccountService} from "../../../../../data/service/account.service";
import {StorageService} from "../../../../../shared/service/storage.service";
import {Account} from "../../../../../data/schema/account";
import {UserService} from "../../../../../data/service/user.service";
import {PhoneNumberVerificationService} from "../../../../../shared/service/phone-number-verification.service";

@Component({
  selector: 'app-sign-up-1',
  templateUrl: './sign-up-one.component.html',
  styleUrls: ['./sign-up-one.component.css']
})
export class SignUpOneComponent implements OnInit{

  register: FormGroup = new FormGroup({

    phoneNumber: new FormControl('', [Validators.required,],[phoneExistsValidator(this.accountService)]),
    password: new FormControl('', [Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    confirmPassword: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email,], [emailExistsValidator(this.accountService)])
  });


  constructor(private router: Router, private accountService: AccountService, private storageService: StorageService, private userService: UserService, private phoneNumberService: PhoneNumberVerificationService) {

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

  onSubmit() {
    if (!this.checkEmailExistence(this.register.value.email) &&
      !this.checkPhoneNumberExistence(this.register.value.phoneNumber)) {
      let account = new Account(this.register.value.email, this.register.value.phoneNumber, this.register.value.password, this.storageService.getObject("user"));
      this.apiCalls(account);
      this.router.navigate(['/two-factor-authentication'])
    } else {
      this.register.markAllAsTouched();
    }
  }


  private apiCalls(account: Account) {
    this.userService.createUser(account.user);
    this.accountService.registerAccount(account);
    this.phoneNumberService.generateTOTP(account.phoneNumber).subscribe();
    this.storageService.removeObject("user");
    this.storageService.saveObject("phoneNumber", account.phoneNumber);
  }

  passwordMatchValidator(control: FormControl): { [s: string]: boolean } | null {
    if (this.register && control.value !== this.register.controls['password'].value) {
      return {'passwordMismatch': true};
    }
    return null;
  }

  ngOnInit(): void {
    this.register.controls['confirmPassword'].setValidators([Validators.required, this.passwordMatchValidator.bind(this)]);
  }
}
