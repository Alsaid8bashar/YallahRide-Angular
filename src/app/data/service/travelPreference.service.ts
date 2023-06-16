import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TravelPreference} from "../schema/travelPreference";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TravelPreferenceService {


  apiURL = environment.serverUrl + 'travel-preference/';

  constructor(private http: HttpClient){

  }

  findAllChattinessTravelPreferences(): Observable<TravelPreference[]> {
    return this.http.get<TravelPreference[]>(`${this.apiURL}find/chattiness`);
  }

  findAllMusicTravelPreferences(): Observable<TravelPreference[]> {
    return this.http.get<TravelPreference[]>(`${this.apiURL}find/music`);
  }

  findAllSmokingTravelPreferences(): Observable<TravelPreference[]> {
    return this.http.get<TravelPreference[]>(`${this.apiURL}find/smoking`);
  }

  findAllPetsTravelPreferences(): Observable<TravelPreference[]> {
    return this.http.get<TravelPreference[]>(`${this.apiURL}find/pets`);
  }

}
