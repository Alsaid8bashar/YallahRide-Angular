import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Car} from "../schema/car";
import {UserDto} from "../schema/UserDto";

@Injectable({
  providedIn: 'root'
})
export class UserDtoService {
  apiURL = environment.serverUrl + 'user-dto/';

  constructor(private http: HttpClient) {
  }

  getUserDto(userId: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiURL}${userId}`);
  }
}
