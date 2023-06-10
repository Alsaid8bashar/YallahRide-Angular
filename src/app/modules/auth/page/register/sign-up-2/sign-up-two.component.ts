import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../../data/schema/user";
import {StorageService} from "../../../../../shared/service/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up-2',
  templateUrl: './sign-up-two.component.html',
  styleUrls: ['./sign-up-two.component.css']
})
export class SignUpTwoComponent {
  userInfoForm: FormGroup;

  constructor(private storageService: StorageService, private router: Router) {
    this.buildForm();
  }


  onSubmit() {
    if (this.userInfoForm.valid) {
      const user: User = this.userInfoForm.value;
      this.storageService.saveObject("user", user)
      this.router.navigate(['/sign-up'])
    } else {
      this.userInfoForm.markAllAsTouched();
    }
  }

  private buildForm(): void {
    this.userInfoForm = new FormGroup({
      firstName: new FormControl('', [Validators.required,]),
      lastName: new FormControl('', [Validators.required]),
      gender: new FormControl('', Validators.required)
    });
  }
}
