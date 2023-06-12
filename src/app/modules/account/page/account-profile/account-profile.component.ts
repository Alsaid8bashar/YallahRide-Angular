import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../../../shared/service/session.service";
import {Router} from "@angular/router";
import {UserService} from "../../../../data/service/user.service";
import {User} from "../../../../data/schema/user";
import {HttpClient} from "@angular/common/http";
import {Account} from "../../../../data/schema/account";
import {AccountService} from "../../../../data/service/account.service";
import {TokenService} from "../../../../shared/service/token.service";

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit{

  private accountObject: Account;

  constructor(private tokenService:TokenService, http: HttpClient, private accountService:AccountService){
  }

  ngOnInit(): void {

  }
}
