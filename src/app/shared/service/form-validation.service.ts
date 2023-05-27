import { Injectable } from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }
  validateForm(form: FormGroup): boolean {
    if (form.valid) {
      return true;
    } else {
      Object.keys(form.controls).forEach((field) => {
        const control = form.get(field);
        if (control) {
          control.markAsTouched({ onlySelf: true });
        }
      });
      return false;
    }
  }
  public static getValidationErrorMessage(validatorName: string, validatorValue?: any, labelName?: string): any {
    const config: { [key: string]: string } = {
      required: `Field is required.`,
      invalidPassword:
        'Invalid password. Password must be at least 6 characters long, and contain a number.',
      maxlength: `The field can't contain more than ${validatorValue.requiredLength} characters.`,
      minlength: `The field must contain at least ${validatorValue.requiredLength} characters.`,
    };
    return config[validatorName];
  }

  public static passwordValidator(control: AbstractControl): any {
    if (!control.value) {
      return;
    }
    return control.value.match(
      /^(?=.*\d)(?=.*[a-zA-Z!@#$%^&*])(?!.*\s).{6,100}$/
    )
      ? ''
      : { invalidPassword: true };
  }

}
