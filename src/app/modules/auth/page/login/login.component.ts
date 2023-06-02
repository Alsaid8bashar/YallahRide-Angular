import {Component} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../../../../shared/service/auth.service";
import {StorageService} from "../../../../shared/service/storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login: FormGroup = new FormGroup({
    phoneNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  constructor(private authService: AuthService, private storageService: StorageService) {
  }

  onSubmit() {
    this.authService.login(this.login.value.phoneNumber, this.login.value.password);
  }
}
