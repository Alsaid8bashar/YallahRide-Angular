import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import ReportUser from "../schema/reportUser";

@Injectable({
  providedIn: 'root'
})
export class ReportUserService {
  apiURL = environment.serverUrl + 'report-user/';

  constructor(private http: HttpClient) {
  }

  getReportUser(id: number): Observable<ReportUser> {
    return this.http.get<ReportUser>(`${this.apiURL}/${id}`);
  }

  saveReportUser(reportUser: ReportUser): Observable<ReportUser> {
    return this.http.post<ReportUser>(`${this.apiURL}create`, reportUser);
  }

  deleteReportUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}delete/${id}`, { responseType: 'text' });
  }

  getReportUsers(): Observable<ReportUser[]> {
    return this.http.get<ReportUser[]>(`${this.apiURL}all`);
  }

  deleteAllReportUsers(): Observable<any> {
    return this.http.delete(`${this.apiURL}delete/all`, { responseType: 'text' });
  }


}
