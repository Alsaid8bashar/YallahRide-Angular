import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {emailExistsValidator} from "../sign-up-1/emailExistence.validator";
import {AccountService} from "../../../../../data/service/account.service";
import {BehaviorSubject} from "rxjs";
import {Account} from "../../../../../data/schema/account";
import {User} from "../../../../../data/schema/user";
import {StorageService} from "../../../../../shared/service/storage.service";
import {Router} from "@angular/router";
import {UserService} from "../../../../../data/service/user.service";

@Component({
  selector: 'app-sign-up-2',
  templateUrl: './sign-up-two.component.html',
  styleUrls: ['./sign-up-two.component.css']
})
export class SignUpTwoComponent{


  constructor(private storageService: StorageService, private router: Router) {
  }

  userInfoForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required,]),
    lastName: new FormControl('', [Validators.required]),
    gender: new FormControl('', Validators.required)
  });


  onSubmit() {
    if (this.userInfoForm.valid) {
      let user = new User(this.userInfoForm.value.firstName, this.userInfoForm.value.lastName, this.userInfoForm.value.gender);
      this.storageService.saveObject("user", user)
      this.router.navigate(['/sign-up'])
    } else {
      this.userInfoForm.markAllAsTouched();
    }
  }



}
