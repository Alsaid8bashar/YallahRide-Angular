import {Component, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from "@angular/forms";

@Component({
  selector: 'app-sign-up-1',
  templateUrl: './sign-up-one.component.html',
  styleUrls: ['./sign-up-one.component.css']
})
export class SignUpOneComponent {

  loginForm: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,
              private router: Router) {
    this.loginForm = this.buildForm();
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.router.navigate(['/two-factor-authentication'])
  }

  private buildForm() {
    this.loginForm = new UntypedFormGroup({
      phoneNumber: new UntypedFormControl(''),
      email: new UntypedFormControl(''),
      password: new UntypedFormControl(''),
      confirmPassword: new UntypedFormControl(''),
    });
    return this.loginForm;
  }
}
