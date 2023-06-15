import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Account} from "../schema/account";
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _accountSubject: BehaviorSubject<Account>;
  apiURL = environment.serverUrl + 'account/';

  constructor(private http: HttpClient) {
    this._accountSubject = new BehaviorSubject<Account>(null);
  }

  public get accountSubject(): BehaviorSubject<Account> {
    return this._accountSubject;
  }

  public set accountSubject(value: BehaviorSubject<Account>) {
    this._accountSubject = value;
  }

  checkPhoneNumberExistence(phoneNumber: string) {
    return this.http.get<boolean>(`${this.apiURL}is-phoneNumber-exist`, {params: {phone: phoneNumber}});
  }

  checkEmailExistence(email: string) {
    return this.http.get<boolean>(`${this.apiURL}is-email-exist`, {params: {email: email}});
  }

  confirmPassword(hashPassword: string, id: number) {
    const requestBody = {
      hashPassword: hashPassword,
      id: id
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<boolean>(`${this.apiURL}confirm-password`, requestBody, httpOptions);
  }

  getAccountByID(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiURL}${id}`);
  }

  registerAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${this.apiURL}register`, account);
  }

  updateAccount(account: Account): Observable<Account> {
    console.log(JSON.stringify(account));
    return this.http.put<Account>(`${this.apiURL}update`, account);
  }

  updatePassword(hashPassword: string, id: number) {
    const requestBody = {
      hashPassword: hashPassword,
      id: id
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Account>(`${this.apiURL}update-password`, requestBody, httpOptions);
  }

  deleteAccount(id: number) {
    this.http.delete(`${this.apiURL}delete/${id}`)
      .subscribe(
        () => {
          console.log('Account deleted successfully');
        },
        (error) => {
          console.log('Error:', error);
        }
      );
  }

  getNumberOfAccounts(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}statistics`);
  }

  findAccountByPhoneNumber(phoneNumber: number) {
    const url = 'http://localhost:8080/account/find-by-phone';
    const params = {phone: phoneNumber};
    return this.http.get<Account>(url, {params});
  }

  ngOnDestroy(): void {

  }
}
