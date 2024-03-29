import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../schema/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {SessionStorageService} from "../../shared/service/session.service";
import {Car} from "../schema/car";
import {TravelPreference} from "../schema/travelPreference";

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  private _userSubject: User;
  apiURL = environment.serverUrl + 'user/';

  private userBehaviorSubject: BehaviorSubject<User>;
  public user$: Observable<User>;

  constructor(private http: HttpClient, private sessionService: SessionStorageService) {
    this.setUserObject();
    const storedUser = localStorage.getItem('user');
    this.userBehaviorSubject =new BehaviorSubject<User>(storedUser ? JSON.parse(storedUser) : null);
    this.user$ = this.userBehaviorSubject.asObservable();
  }

  public updateUser(user: User): void {
    this.userBehaviorSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));

  }

  public setUserObject() {
    this._userSubject = JSON.parse(this.sessionService.getItem('user')) as User;
  }


  getUserSubject(): User {
    return this._userSubject;
  }


  set userSubject(value: User) {
    this._userSubject = value;
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiURL}${id}`);
  }

  createUser(user: User, image?: File): Observable<User> {
    const formData: FormData = new FormData();
    formData.append('user', new Blob([JSON.stringify(user)], {
      type: "application/json"
    }));
    if (image != null) {
      formData.append('multipartFiles', image, image.name);
    }
    return this.http.post<User>(`${this.apiURL}create`, formData);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiURL}delete/${id}`);
  }

  getNumberOfUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}statistics`);
  }


  activateUserById(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}activate/${id}`)
  }

  // Method to retrieve all users
  findAllUsers() {
    return this.http.get<User[]>(`${this.apiURL}all`);
  }

  ngOnInit(): void {
    this.setUserObject();
  }

  saveUserTravelPreferences(travelPreferences: TravelPreference[], id: number): Observable<User> {
    const body = {
      travelPreferences: travelPreferences,
      id: id
    };

    console.log(travelPreferences);
    return this.http.post<User>(`${this.apiURL}save-travel-preferences`, body);
  }


  // deactivateUserById(id: number): Observable<any> {
  //   return this.http.put(`${this.apiURL}deactivate/${id}`)
  // }


}
