import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../shared/service/auth.service";
import {delay, finalize, of, Subscription, tap} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {catchError} from "rxjs/operators";
import {SessionStorageService} from "../../../../shared/service/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  private sub = new Subscription();
  errorMessage: string;
  loginForm: FormGroup;


  constructor(private authService: AuthService, private spinner: NgxSpinnerService, private sessionService: SessionStorageService,private router:Router) {
    this.buildForm();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.spinner.show();
      const credentials = this.loginForm.value;
      this.sub = this.authService
        .login(credentials)
        .pipe(tap(() => this.router.navigate(['/dashboard/home'])),
          finalize(() => (this.spinner.hide())),
          catchError(error => of((this.errorMessage = 'Invalid credentials. Please try again.'))))
        .subscribe((response: any) => {
          this.sessionService.setItem('token', response.headers.get('Authorization'));
          this.spinner.hide()
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  private

  buildForm():
    void {
    this.loginForm = new FormGroup({
      phoneNumber: new FormControl('', Validators.required),
      passwordHash: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy():
    void {
    this.sub.unsubscribe();
  }
}
