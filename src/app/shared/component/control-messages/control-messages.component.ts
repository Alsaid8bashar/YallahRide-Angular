import { Component, Input } from '@angular/core';
import { UntypedFormControl, AbstractControl } from '@angular/forms';
import { FormValidationService } from '../../service/form-validation.service';

@Component({
  selector: 'app-control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.scss']
})
export class ControlMessagesComponent {
  @Input() control: UntypedFormControl;
  @Input() labelName?: string;

  get errorMessage(): boolean | undefined {
    for (const propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return FormValidationService.getValidationErrorMessage(
          propertyName,
          this.control.errors[propertyName],
          this.labelName
        );
      }
    }

    return undefined;
  }
}
