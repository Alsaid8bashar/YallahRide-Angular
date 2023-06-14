import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Passenger} from "../schema/passenger";
import {Ride} from "../schema/ride";
import {User} from "../schema/user";

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  apiURL = environment.serverUrl + 'passenger/';

  constructor(private http: HttpClient) {
  }


  getPassengerById(id: number): Observable<Passenger> {
    return this.http.get<Passenger>(`${this.apiURL}${id}`);
  }

  savePassenger(passenger: Passenger): Observable<Passenger> {
    return this.http.post<Passenger>(`${this.apiURL}create`, passenger);
  }

  update(passenger: Passenger): Observable<Passenger> {
    return this.http.put<Passenger>(`${this.apiURL}update`, passenger);
  }

  acceptPassenger(id:number): Observable<Passenger> {
    return this.http.put<Passenger>(`${this.apiURL}accept/${id}`, Passenger);
  }
  rejectPassenger(id:number): Observable<Passenger> {
    return this.http.put<Passenger>(`${this.apiURL}reject/${id}`, Passenger);
  }
  deletePassenger(id: number) {
    return this.http.delete(`${this.apiURL}delete/${id}`);
  }

  getRidePassenger(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}ride-passengers/${id}`);
  }

  getRideRequests(id: number): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(`${this.apiURL}ride-requests/${id}`);
  }

  getUserRide(id: number): Observable<Ride[]> {
    return this.http.get<Ride[]>(`${this.apiURL}user-rides/${id}`);
  }

}
