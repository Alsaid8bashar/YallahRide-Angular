import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Ride} from "../schema/ride";
import {RideStatus} from "../schema/Enum/RideStatus";

@Injectable({
  providedIn: 'root'
})
export class RideService {

  apiURL = environment.serverUrl + 'ride/';

  constructor(private http: HttpClient) {
  }

  createRide(ride: Ride): Observable<Ride> {
    return this.http.post<Ride>(`${this.apiURL}create`, ride);
  }

  findRideById(id: number): Observable<Ride> {
    return this.http.get<Ride>(`${this.apiURL}${id}`);
  }

  findDriverRide(driverId: number): Observable<Ride []> {
    return this.http.get<Ride[]>(`${this.apiURL}driver-rides/${driverId}`);
  }

  findAllRide(): Observable<Ride[]> {
    return this.http.get<Ride[]>(`${this.apiURL}all`);
  }

  deleteRideById(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}delete/${id}`);
  }

  deleteAllRide(): Observable<any> {
    return this.http.delete(`${this.apiURL}delete/all`);
  }

  changeRideStatus(rideId: number, rideStatus: RideStatus): Observable<any> {
    console.warn(rideId);
    console.warn(rideStatus);

    const url = `${this.apiURL}change-ride-status/${rideId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams().set('rideStatus', rideStatus)
    };
    return this.http.put(url, null, httpOptions);
  }

  searchRidesByFromAndToAndDate(from: string, to: string, date: string) {
    const formattedDate = this.formatRideDate(date);

    let params = new HttpParams()
      .set("from", from)
      .set("to", to)
      .set("date", formattedDate);

    return this.http.get<Ride[]>(`${this.apiURL}searchForRide`, {params});
  }

  formatRideDate(date: string): string {
    const dateObj = new Date(date);
    const year = String(dateObj.getFullYear());
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }


  // findAllRideReports(ride: Ride) {
  //   return this.http.get<Report[]>(`${this.apiURL}searchForRide`, ride);
  // }

}
