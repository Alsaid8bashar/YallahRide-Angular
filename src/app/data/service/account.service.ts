import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
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
    const url = 'http://localhost:8080/account/is-phoneNumber-exist';
    return this.http.get<boolean>(url, {params: {phone: phoneNumber}});
  }

  checkEmailExistence(email: string) {
    const url = this.apiURL + 'is-email-exist';
    return this.http.get<boolean>(url, {params: {email: email}});
  }

  getAccountByID(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiURL}/${id}`);
    //   .subscribe(
    //   (account: Account) => {
    //     this._accountSubject.next(account);
    //   },
    //   (error) => {
    //     console.log('Error:', error);
    //   }
    // );
    // return this._accountSubject.asObservable();
  }

  registerAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${this.apiURL}register`, account);
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

  ngOnDestroy(): void {

  }
}
