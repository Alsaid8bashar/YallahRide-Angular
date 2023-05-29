import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Account} from "../schema/account";

@Injectable({providedIn: "root"})
export class AuthService {

  private _accountSubject: BehaviorSubject<Account>;


  constructor(private http: HttpClient) {
    this._accountSubject = new BehaviorSubject<Account>(new Account());
  }

  public get accountSubject(): BehaviorSubject<Account> {
    return this._accountSubject;
  }

  public set accountSubject(value: BehaviorSubject<Account>) {
    this._accountSubject = value;
  }

  generateTOTP(phoneNumber: string): Observable<any> {
    const url = 'http://localhost:8080/api/phoneNumber/generateTOTP';

    // Set the request headers if required
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Set the request parameters
    const params = new HttpParams().set('PhoneNumber', phoneNumber);

    // Make the HTTP GET request
    return this.http.get(url, {headers, params});
  }

  checkPhoneNumberExistence(phoneNumber: string) {
    const url = 'http://localhost:8080/account/is-phoneNumber-exist';
    return  this.http.get<boolean>(url, { params: { phone: phoneNumber } });
  }
  checkEmailExistence(email:string){
    const url = 'http://localhost:8080/account/is-email-exist';
    return  this.http.get<boolean>(url, { params: { email: email } });
  }
}



