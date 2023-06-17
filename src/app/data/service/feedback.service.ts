import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Feedback} from "../schema/feedback";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  apiURL = environment.serverUrl + 'feedback/';
  constructor(private http: HttpClient) {

  }

  saveFeedback(feedback:Feedback){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Feedback>(`${this.apiURL}save`, feedback, {headers});
  }

  findFeedbackById(id:number){
    return this.http.get<Feedback>(`${this.apiURL}/find/${id}`);
  }

  findFeedbackByUserId(id:number){
    return this.http.get<Feedback>(`${this.apiURL}find-user/${id}`);
  }
}
