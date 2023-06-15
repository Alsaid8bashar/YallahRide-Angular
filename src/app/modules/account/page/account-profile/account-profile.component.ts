import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Account } from '../../../../data/schema/account';
import { User } from '../../../../data/schema/user';
import { AccountService } from '../../../../data/service/account.service';
import { UserService } from '../../../../data/service/user.service';
import { CustomValidators } from '../../../auth/page/register/sign-up-1/customValidators';
import { TokenService } from '../../../../shared/service/token.service';
import { SessionStorageService } from '../../../../shared/service/session.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css'],
})
export class AccountProfileComponent implements OnInit, OnDestroy {
  accountObject: Account;
  userObject: User;
  accountCreationDate: string;
  userForm: FormGroup;
  emailForm: FormGroup;
  phoneNumberForm: FormGroup;
  passwordForm: FormGroup;
  accountId: number;
  private sub = new Subscription();

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private accountService: AccountService,
    private sessionService: SessionStorageService,
    private customValidators: CustomValidators
  ) {}

  ngOnInit(): void {
    this.setUserObject();
    this.setAccountObject();
    this.buildUserForm();
    this.buildPhoneNumberForm();
    this.buildEmailForm();
    this.buildPasswordForm();
    this.passwordForm.controls['confirmPassword'].setValidators([
      Validators.required,
      this.passwordMatchValidator.bind(this),
    ]);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // Public methods

  onUserChangesSubmit(): void {
    const formValues = this.userForm.value;
    this.userObject.firstName = formValues.firstName;
    this.userObject.lastName = formValues.lastName;
    this.userObject.gender = formValues.gender;
    this.userObject.about = formValues.about;

    this.sub = this.userService.createUser(this.userObject).subscribe();
  }

  onPhoneNumberChangesSubmit(): void {
    this.accountObject.phoneNumber = this.phoneNumberForm.value.phoneNumber;
    this.sub = this.accountService.updateAccount(this.accountObject).subscribe();
  }

  onEmailChangesSubmit(): void {
    const formValues = this.emailForm.value;
    this.accountObject.email = formValues.email;
    this.sub = this.accountService.updateAccount(this.accountObject).subscribe();
  }

  onPasswordChangesSubmit(): void {
    if (this.passwordForm.valid) {
      const formValues = this.passwordForm.value;
      this.sub = this.accountService.updatePassword(formValues.newPassword,this.accountObject.id).subscribe();
      this.passwordForm.reset();
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  // Private methods

  private setUserObject(): void {
    this.userObject = JSON.parse(this.sessionService.getItem('user')) as User;
    this.sub = this.userService.getUserById(this.userObject.id).subscribe(
      (data) => {
        console.log(data);
        this.userObject = data;
        this.buildUserForm();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private setAccountObject(): void {
    this.sub = this.accountService.getAccountByID(+this.tokenService.extractObjectFromToken('accountId')).subscribe(
      (data) => {
        this.accountObject = data;
        this.accountCreationDate = this.dateFormatter(this.accountObject.date);
        this.buildUserForm();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private buildUserForm(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]),
      about: new FormControl(''),
      gender: new FormControl(''),
    });

    this.userForm.patchValue({
      firstName: this.userObject.firstName,
      lastName: this.userObject.lastName,
      about: this.userObject.about,
      gender: this.userObject.gender,
    });
  }

  private buildEmailForm(): void {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email], [this.customValidators.emailExistsValidator()]),
    });
  }

  private buildPhoneNumberForm(): void {
    this.phoneNumberForm = new FormGroup({
      phoneNumber: new FormControl('', [Validators.required], [this.customValidators.phoneExistsValidator()]),
    });
  }

  private buildPasswordForm(): void {
    this.passwordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required], [this.customValidators.confirmPasswordValidator()]),
      newPassword: new FormControl(
        '',
        [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]
      ),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.root.get('newPassword');
    const confirmPassword = control.value;
    if (newPassword && confirmPassword !== newPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  private dateFormatter(inputDate: string): string {
    const date = new Date(inputDate);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const dateFormatter = new Intl.DateTimeFormat('en-US', options);
    return dateFormatter.format(date);
  }
}
