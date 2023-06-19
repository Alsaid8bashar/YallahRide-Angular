import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Rate} from "../schema/rate";

@Injectable({
  providedIn: 'root'
})
export class RateService {
  apiURL = environment.serverUrl + 'rate/';

  constructor(private http: HttpClient) {
  }


  getRateById(id: number): Observable<Rate> {
    return this.http.get<Rate>(`${this.apiURL}${id}`);
  }

  createRate(Rate: Rate): Observable<Rate> {
    return this.http.post<Rate>(`${this.apiURL}create`, Rate);
  }

  deleteRate(id: number) {
    return this.http.delete(`${this.apiURL}delete/${id}`);
  }

  deleteAllRate() {
    return this.http.delete(`${this.apiURL}delete/all`);
  }

  getRates(): Observable<Rate []> {
    return this.http.get<Rate[]>(`${this.apiURL}all`);
  }

  getUserRates(id: number): Observable<Rate []> {
    return this.http.get<Rate[]>(`${this.apiURL}user-rates/${id}`);
  }

  getUserRate(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiURL}user-rate/${id}`);
  }

  getNumberOfRate(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}statistics`);
  }

}
