import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../schema/UserDto";
import AdminDTO from "../schema/adminDto";

@Injectable({
  providedIn: 'root'
})
export class AdminDtoService {
  apiURL = environment.serverUrl + 'admin-dto/';

  constructor(private http: HttpClient) {
  }

  getAdminDto(): Observable<AdminDTO> {
    return this.http.get<AdminDTO>(`${this.apiURL}dashboard`);
  }
}
