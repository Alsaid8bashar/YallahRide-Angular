import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {SessionStorageService} from "./session.service";
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrNotificationService} from "./toastr-notification.service";
import {User} from "../../data/schema/user";
import {Observable} from "rxjs";
import {Account} from "../../data/schema/account";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = environment.serverUrl;

  constructor(private http: HttpClient, private sessionService: SessionStorageService, private toastr: ToastrNotificationService, public spinner: NgxSpinnerService) {
  }


  login(account: Account): Observable<any> {
    const url = this.apiURL + 'authenticate';
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    const requestBody = {"phoneNumber": account.phoneNumber, "passwordHash": account.passwordHash}
    return this.http.post<any>(url, JSON.stringify(requestBody), {headers, observe: 'response'});
  }

  getAuthToken(): string {
    return this.sessionService.getItem('token')
  }

}
