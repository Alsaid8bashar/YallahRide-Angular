import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToastrNotificationService {

  constructor(private toastr: ToastrService) {
  }

  showSuccess(message) {
    this.toastr.success(message);
  }

  showError(message) {
    this.toastr.error(message, '', {
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-center',
    });
  }
}
