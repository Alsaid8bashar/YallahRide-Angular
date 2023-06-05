import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../shared/service/auth.service";
import {delay, finalize, of, Subscription, tap} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {catchError} from "rxjs/operators";
import {SessionStorageService} from "../../../../shared/service/session.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  private sub = new Subscription();
  errorMessage: string;
  loginForm: FormGroup;


  constructor(private authService: AuthService, private spinner: NgxSpinnerService, private sessionService: SessionStorageService) {
    this.buildForm();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      debugger;
      this.spinner.show();
      const credentials = this.loginForm.value;
      this.sub = this.authService
        .login(credentials)
        .pipe(// tap(() => this.router.navigate(['/dashboard/home'])),
          finalize(() => (this.spinner.hide())),
          catchError(error => of((this.errorMessage = 'An error occurred. Please try again later.'))))
        .subscribe((response: any) => {
          if (response.status == 404) {
            this.errorMessage = 'Invalid credentials. Please try again.'
          } else {
            this.sessionService.setItem('token', response.headers.get('Authorization'));
            this.spinner.hide()
          }
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  private buildForm(): void {

    this.loginForm = new FormGroup({
      phoneNumber: new FormControl('', Validators.required),
      passwordHash: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
