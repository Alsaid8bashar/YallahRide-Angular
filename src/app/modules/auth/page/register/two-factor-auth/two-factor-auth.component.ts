import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-two-factor-auth',
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.css']
})
export class TwoFactorAuthComponent {


  constructor(private router: Router) {
  }

  onSubmit() {
    this.router.navigate(["/user-info"])
  }
}
