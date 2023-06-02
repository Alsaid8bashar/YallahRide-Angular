import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Account} from "../../data/schema/account";

@Injectable({
  providedIn: 'root'
})
export class PhoneNumberVerificationService {

  apiURL = environment.serverUrl + 'api/phoneNumber/';

  constructor(private http: HttpClient) {
  }

  generateTOTP(phoneNumber: string): Observable<any> {
    console.log("heloo otp")
    const url = this.apiURL + 'generateTOTP';
    const params = new HttpParams().set('PhoneNumber', phoneNumber);
    return this.http.get(url, {params: params});
  }

  verifyTOTP(code: string, phoneNumber: string): Observable<boolean> {
    const url = this.apiURL + 'verifyTOTP';

    const params = new HttpParams()
      .set('code', code)
      .set('phoneNumber', phoneNumber);

    return this.http.get<boolean>(url, {params: params});
  }
}
