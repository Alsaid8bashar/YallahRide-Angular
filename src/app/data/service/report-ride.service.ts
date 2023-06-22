import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReportRide} from "../schema/reportRide";

@Injectable({
  providedIn: 'root'
})
export class ReportRideService {

  apiURL = environment.serverUrl + 'report-user/';

  constructor(private http: HttpClient) {
  }


  getReportRide(id: number): Observable<ReportRide> {
    return this.http.get<ReportRide>(`${this.apiURL}/${id}`);
  }

  saveReportRide(reportRide: ReportRide): Observable<ReportRide> {
    return this.http.post<ReportRide>(`${this.apiURL}create`, reportRide);
  }

  deleteReportRide(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}delete/${id}`, { responseType: 'text' });
  }

  getReportRides(): Observable<ReportRide[]> {
    return this.http.get<ReportRide[]>(`${this.apiURL}all`);
  }

  deleteAllReportRides(): Observable<any> {
    return this.http.delete(`${this.apiURL}delete/all`, { responseType: 'text' });
  }

}
