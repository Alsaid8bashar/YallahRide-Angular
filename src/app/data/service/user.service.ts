import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../schema/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Ride} from "../schema/ride";
import {SessionStorageService} from "../../shared/service/session.service";
import {FileStorageService} from "../../shared/service/file-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userSubject: User;
  apiURL = environment.serverUrl + 'user/';


  constructor(private fileStorageService: FileStorageService, private http: HttpClient, private sessionService: SessionStorageService) {
    this.setUserObject();
  }

  private setUserObject() {
    this._userSubject = JSON.parse(this.sessionService.getItem('user')) as User;
    this.setUserImage();
  }

  setUserImage() {
    const fileName = this.getUserSubject().imagePath;
    this.fileStorageService.getFileUrl(fileName).subscribe(
      imageUrl => {
        this.getUserSubject().imagePath = imageUrl;
      },
      error => {
        console.error(error);
      }
    );
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
    return this.http.delete(`${this.apiURL}delete/${id}`);
  }

  getNumberOfUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}statistics`);
  }


  activateUserById(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}activate/${id}`)
  }

  // deactivateUserById(id: number): Observable<any> {
  //   return this.http.put(`${this.apiURL}deactivate/${id}`)
  // }


}
