import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import ReportCategory from "../schema/reportCategory";

@Injectable({
  providedIn: 'root'
})
export class ReportCategoryService {

  apiURL = environment.serverUrl + 'report-category/';

  constructor(private http: HttpClient) {
  }

  getReportCategory(id: number): Observable<ReportCategory> {
    return this.http.get<ReportCategory>(`${this.apiURL}${id}`);
  }

  saveReportCategory(reportCategory: ReportCategory): Observable<ReportCategory> {
    return this.http.post<ReportCategory>(`${this.apiURL}create`, reportCategory);
  }

  deleteReportCategory(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.apiURL}delete/${id}`, { observe: 'response' });
  }

  getReportCategories(): Observable<ReportCategory[]> {
    return this.http.get<ReportCategory[]>(`${this.apiURL}all`);
  }

  deleteAllReportCategories(): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.apiURL}delete/all`, { observe: 'response' });
  }

  getAllUserReportsCategories(): Observable<ReportCategory[]> {
    const url = 'http://your-api-url/all/user-report';
    return this.http.get<ReportCategory[]>(`${this.apiURL}all/user-report`);
  }

  getAllRideReportsCategories(): Observable<ReportCategory[]> {
    return this.http.get<ReportCategory[]>(`${this.apiURL}all/user-report`);
  }

  getAllReportCategories() : Observable<ReportCategory[]>{
     return this.http.get<ReportCategory[]>(`${this.apiURL}all`);
  }


}
