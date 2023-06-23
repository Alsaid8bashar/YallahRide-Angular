import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {PhoneNumberVerificationService} from "../../../../../shared/service/phone-number-verification.service";
import {StorageService} from "../../../../../shared/service/storage.service";

@Component({
  selector: 'app-two-factor-auth',
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.css']
})
export class TwoFactorAuthComponent {
  form: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private phoneNumberService: PhoneNumberVerificationService, private storageService: StorageService) {
    this.form = this.formBuilder.group({
      codes: this.formBuilder.array(['', '', '', '', ''])
    });
  }

  get codeControls(): FormArray {
    return this.form.get('codes') as FormArray;
  }

  onSubmit() {
    const codeValues = this.codeControls.value;
    const code = codeValues.join('');
    const isVerified = this.phoneNumberService.verifyTOTP(code, this.storageService.getObject("phoneNumber"))
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.error('An error occurred:', error);
        });
    this.storageService.removeObject("phoneNumber");
    debugger;
    if (isVerified) {
      
      this.router.navigate(["auth/login"])
    }
  }
}
