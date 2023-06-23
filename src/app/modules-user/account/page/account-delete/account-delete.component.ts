import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {TokenService} from "../../../../shared/service/token.service";
import {UserService} from "../../../../data/service/user.service";
import {AccountService} from "../../../../data/service/account.service";
import {SessionStorageService} from "../../../../shared/service/session.service";
import {CustomValidators} from "../../../auth/page/register/sign-up-1/customValidators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.css']
})
export class AccountDeleteComponent implements OnDestroy {
  deleteAccountChecked = false;
  private sub = new Subscription();


  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router
  ) {
  }

  onDelete() {
    this.sub = this.userService.deleteUser(this.tokenService.extractObjectFromToken("userId")).subscribe(next => {
      this.router.navigate(['auth', 'login',]);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
