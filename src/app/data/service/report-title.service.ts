import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import ReportTitle from "../schema/reportTitle";

@Injectable({
  providedIn: 'root'
})
export class ReportTitleService {

  apiURL = environment.serverUrl + 'report-title/';
  constructor(private http: HttpClient) { }

  getReportTitle(id: number): Observable<ReportTitle> {
    return this.http.get<ReportTitle>(`${this.apiURL}${id}`);
  }

  saveReportTitle(reportTitle: ReportTitle): Observable<ReportTitle> {
    return this.http.post<ReportTitle>(`${this.apiURL}create`, reportTitle);
  }

  deleteReportTitle(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.apiURL}delete/${id}`, { observe: 'response' });
  }

  getReportTitles(): Observable<ReportTitle[]> {
    return this.http.get<ReportTitle[]>(`${this.apiURL}all`);
  }

  deleteAllReportTitles(): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.apiURL}delete/all`, { observe: 'response' });
  }

  getAllUserReportsTitles(): Observable<ReportTitle[]> {
    return this.http.get<ReportTitle[]>(`${this.apiURL}all/user-report`);
  }

  getAllRideReportsTitles(): Observable<ReportTitle[]> {
    return this.http.get<ReportTitle[]>(`${this.apiURL}all/ride-report`);
  }

}
