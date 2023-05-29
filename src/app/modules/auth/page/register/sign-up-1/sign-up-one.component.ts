import {Component, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../../data/service/account.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {emailExistsValidator} from "./emailExistence.validator";

@Component({
  selector: 'app-sign-up-1',
  templateUrl: './sign-up-one.component.html',
  styleUrls: ['./sign-up-one.component.css']
})
export class SignUpOneComponent {

  register: FormGroup = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required,]),
    password: new FormControl('', [Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    confirmPassword: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email, ],[emailExistsValidator(this.authService)] )
  });

  

  constructor(private router: Router, private http:HttpClient, private authService: AuthService) {

  }

  private checkPhoneNumberExistence(phoneNumber:string) : boolean{
    this.authService.checkPhoneNumberExistence(this.register.value.phoneNumber)
      .subscribe(
        (response: boolean) => {
          return response;
        }
      );
    return false;
  }

  private checkEmailExistence(email:string) : boolean{
    this.authService.checkEmailExistence(this.register.value.email)
      .subscribe(
        (response: boolean) => {
          return response;
        }
      );
    return false;
  }

  onSubmit() {
    if(!this.checkEmailExistence(this.register.value.email) &&
       !this.checkPhoneNumberExistence(this.register.value.phoneNumber)){
      this.router.navigate(['/two-factor-authentication'])
    }
    else
    {

    }
  }
}
