import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../schema/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userSubject: BehaviorSubject<User>;
  apiURL = environment.serverUrl + 'user/';

  constructor(private http: HttpClient) {
    this._userSubject = new BehaviorSubject<User>(null);
  }


  get userSubject(): BehaviorSubject<User> {
    return this._userSubject;
  }

  set userSubject(value: BehaviorSubject<User>) {
    this._userSubject = value;
  }

  getUserByID(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/${id}`);
    //   .subscribe(
    //   (user: User) => {
    //     this._userSubject.next(user);
    //   },
    //   (error) => {
    //     console.log('Error:', error);
    //   }
    // );
    // return this._userSubject.asObservable();
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
    //   .subscribe(
    //   (response: User) => {
    //     this._userSubject.next(response);
    //   },
    //   (error) => {
    //     console.log('Error:', error);
    //   }
    // );
    // return this._userSubject.asObservable();
  }

  deactivateUserById(id: number): Observable<User> {
    return this.http.delete(`${this.apiURL}deactivate/${id}`)

    //   .subscribe(
    //   (response: User) => {
    //     this._userSubject.next(response);
    //   },
    //   (error) => {
    //     console.log('Error:', error);
    //   }
    // );
    // return this._userSubject.asObservable();
  }
}
