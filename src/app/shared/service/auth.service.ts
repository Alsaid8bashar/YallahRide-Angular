import {Injectable} from '@angular/core';
import {UserService} from "../../data/service/user.service";
import {AccountService} from "../../data/service/account.service";
import {Observable} from "rxjs";
import {User} from "../../data/schema/user";
import {Account} from "../../data/schema/account";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = environment.serverUrl;

  constructor(private http: HttpClient, private storageService: StorageService) {
  }


  login(phoneNumber: string, password: string) {
    debugger;
    const url = this.apiURL + 'authenticate';
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    const requestBody = {
      "phoneNumber": phoneNumber,
      "passwordHash": password
    }

    this.http.post<any>(url, JSON.stringify(requestBody), {headers, observe: 'response'})
      .subscribe((response: any) => {
          let header: HttpHeaders = response.headers;
          this.storageService.saveObject('token', header.get('Authorization'));
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getAuthToken(): string {
    return this.storageService.getObject('token')
  }

}
