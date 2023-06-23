import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Passenger} from "../schema/passenger";
import {RideStatus} from "../schema/Enum/RideStatus";

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

  acceptPassenger(id: number): Observable<Passenger> {
    return this.http.put<Passenger>(`${this.apiURL}accept/${id}`, Passenger);
  }

  rejectPassenger(id: number): Observable<Passenger> {
    return this.http.put<Passenger>(`${this.apiURL}reject/${id}`, Passenger);
  }

  deletePassenger(id: number) {
    return this.http.delete(`${this.apiURL}delete/${id}`);
  }

  getRidePassenger(id: number): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(`${this.apiURL}ride-passengers/${id}`);
  }

  changeBookingStatus(passengerId: number, rideId: number, rideStatus: RideStatus): Observable<any> {
    const url = `${this.apiURL}change-booking-status/${passengerId}/${rideId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams().set('rideStatus', rideStatus)
    };
    return this.http.put(url, null, httpOptions);
  }


  getRideRequests(id: number): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(`${this.apiURL}ride-requests/${id}`);
  }

  getPassengerByUserId(id: number): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(`${this.apiURL}user-rides/${id}`);
  }

}
