import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../shared/service/auth.service";
import {Subscription, tap} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {SessionStorageService} from "../../../../shared/service/session.service";
import {Router} from "@angular/router";
import {UserService} from "../../../../data/service/user.service";
import {User} from "../../../../data/schema/user";
import {TokenService} from "../../../../shared/service/token.service";
import {FileStorageService} from "../../../../shared/service/files-storage.service";
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy, OnInit {

  private sub = new Subscription();
  errorMessage: string;
  loginForm: FormGroup;


  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private fileStorage: FileStorageService, private authService: AuthService, private spinner: NgxSpinnerService, private sessionService: SessionStorageService, private router: Router, private userService: UserService, private tokenService: TokenService) {
    this.buildForm();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.spinner.show();
      const credentials = this.loginForm.value;
      this.sub = this.authService.login(credentials)
        .pipe(
          tap(() => this.router.navigate(['/dashboard/home'])),
        )
        .subscribe(
          (response: any) => this.handleLoginSuccess(response),
          (error: any) => this.handleLoginError(error)
        );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }


  ngOnInit() {
    this.unloadScripts();
    this.loadScripts();
  }

  private buildForm():
    void {
    this.loginForm = new FormGroup({
      phoneNumber: new FormControl('', Validators.required),
      passwordHash: new FormControl('', Validators.required)
    });
  }

  private handleLoginSuccess(response: any): void {
    const authHeader = response.headers.get('Authorization');
    if (authHeader) {
      this.tokenService.setToken(authHeader);
      const userId = +this.tokenService.extractObjectFromToken('userId');
      this.fetchUserById(userId);
    } else {
      console.error('Authorization header not found in response.');
      this.spinner.hide();
    }
  }

  private fetchUserById(userId: number): void {
    this.userService.getUserById(userId)
      .subscribe(
        (user: User) => {
          this.saveUserInSession(user)
          this.userService.updateUser(user);
          this.spinner.hide();
        },
        (getUserError: any) => {
          console.error('Failed to fetch user data:', getUserError);
          this.spinner.hide();
        }
      );
  }

  private saveUserInSession(user: User): void {
    this.sessionService.setItem('user', JSON.stringify(user));
  }

  private handleLoginError(error: any): void {
    this.errorMessage = 'Failed to make the request';
    console.error('Failed to make the request:', error);
    this.spinner.hide();
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
