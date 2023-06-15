import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../shared/service/auth.service";
import {of, Subscription, tap} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {catchError} from "rxjs/operators";
import {SessionStorageService} from "../../../../shared/service/session.service";
import {Router} from "@angular/router";
import jwt_decode from "jwt-decode";
import {UserService} from "../../../../data/service/user.service";
import {User} from "../../../../data/schema/user";
import {TokenService} from "../../../../shared/service/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  private sub = new Subscription();
  errorMessage: string;
  loginForm: FormGroup;


  constructor(private authService: AuthService, private spinner: NgxSpinnerService, private sessionService: SessionStorageService, private router: Router, private userService: UserService, private tokenService: TokenService) {
    this.buildForm();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.spinner.show();
      const credentials = this.loginForm.value;
      this.sub = this.authService.login(credentials)
        .pipe(
          tap(() => this.router.navigate(['/dashboard/home'])),)
        .subscribe(
          (response: any) => {
            const authHeader = response.headers.get('Authorization');
            if (authHeader) {
              this.tokenService.setToken(authHeader);
              const userId = +this.tokenService.extractObjectFromToken('userId');
              this.userService.getUserById(userId)
                .subscribe(
                  (user: User) => {
                    this.sessionService.setItem('user', JSON.stringify(user));
                    this.spinner.hide();
                  },
                  (getUserError: any) => {
                    console.error('Failed to fetch user data:', getUserError);
                    this.spinner.hide();
                  }
                );
            } else {
              console.error('Authorization header not found in response.');
              this.spinner.hide();
            }
          },
          (error: any) => {
            this.errorMessage = "Failed to make the request";
            console.error('Failed to make the request:', error);
            this.spinner.hide();
          }
        );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }


  private buildForm():
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
