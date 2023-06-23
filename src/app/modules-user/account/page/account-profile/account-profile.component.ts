import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Account} from '../../../../data/schema/account';
import {User} from '../../../../data/schema/user';
import {AccountService} from '../../../../data/service/account.service';
import {UserService} from '../../../../data/service/user.service';
import {CustomValidators} from '../../../auth/page/register/sign-up-1/customValidators';
import {TokenService} from '../../../../shared/service/token.service';
import {SessionStorageService} from '../../../../shared/service/session.service';
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css'],
})
export class AccountProfileComponent implements OnInit, OnDestroy {
  accountObject: Account;
  userObject: User;
  accountCreationDate: string;
  emailForm: FormGroup;
  userForm: FormGroup;
  phoneNumberForm: FormGroup;
  passwordForm: FormGroup;
  accountId: number;
  image: File;
  private sub: Subscription;
  private userSub: Subscription;

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private accountService: AccountService,
    private sessionService: SessionStorageService,
    private customValidators: CustomValidators,
    private spinner: NgxSpinnerService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

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
    this.spinner.show();
    debugger;

    const formValues = this.userForm.value;
    this.userObject.firstName = formValues.firstName;
    this.userObject.lastName = formValues.lastName;
    this.userObject.gender = formValues.gender;
    this.userObject.about = formValues.about;
    this.userSub = this.userService.createUser(this.userObject, this.image).subscribe(
      data => {
        this.userService.userSubject = data;
        this.cdr.detectChanges();
        this.spinner.hide();
      }, error => {
        console.error(error)
        this.spinner.hide();
      });
  }

  onPhoneNumberChangesSubmit(): void {
    this.spinner.show();
    this.accountObject.phoneNumber = this.phoneNumberForm.value.phoneNumber;
    this.sub = this.accountService.updateAccount(this.accountObject).subscribe(() => {
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
    });
  }

  onEmailChangesSubmit(): void {
    this.spinner.show();
    const formValues = this.emailForm.value;
    this.accountObject.email = formValues.email;
    this.sub = this.accountService.updateAccount(this.accountObject).subscribe(() => {
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
    });
  }

  onPasswordChangesSubmit(): void {
    if (this.passwordForm.valid) {
      this.spinner.show();
      const formValues = this.passwordForm.value;
      this.sub = this.accountService.updatePassword(formValues.newPassword, this.accountObject.id).subscribe(() => {
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
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
      return {passwordMismatch: true};
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

  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }
}
