import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {
  private apiURL = environment.serverUrl+'storage';


  constructor(private http: HttpClient) {
  }

  getFile(key: string): Observable<HttpResponse<Blob>> {
    const url = `${this.apiURL}/${key}`;
    return this.http.get(url, {observe: 'response', responseType: 'blob'});
  }

  uploadFile(file: File): Observable<HttpResponse<string>> {
    const url = `${this.apiURL}/upload`;
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<string>(url, formData, { observe: 'response' });
  }
  deleteFile(key: string): Observable<HttpResponse<any>> {
    const url = `${this.apiURL}/delete`;
    const params = {key};

    return this.http.delete(url, {observe: 'response', params});
  }
}
