import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../schema/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Ride} from "../schema/ride";
import {SessionStorageService} from "../../shared/service/session.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userSubject: User;
  apiURL = environment.serverUrl + 'user/';


  constructor(private http: HttpClient, private sessionService: SessionStorageService) {
    this.setUserObject();
  }

  private setUserObject() {
    this._userSubject = JSON.parse(this.sessionService.getItem('user')) as User;
  }


  getUserSubject(): User {
    return this._userSubject;
  }


  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiURL}${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiURL}create`, user);
  }

  deleteUser(id: number) {
    this.http.delete(`${this.apiURL}delete/${id}`)
      .subscribe(
        () => {
          console.log('User deleted successfully');
        },
        (error) => {
          console.log('Error:', error);
        }
      );
  }

  getNumberOfUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}statistics`);
  }


  activateUserById(id: number): Observable<User> {
    return this.http.delete(`${this.apiURL}activate/${id}`)
  }

  deactivateUserById(id: number): Observable<User> {
    return this.http.delete(`${this.apiURL}deactivate/${id}`)
  }


}
