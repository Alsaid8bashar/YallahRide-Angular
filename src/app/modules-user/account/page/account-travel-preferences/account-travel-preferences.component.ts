import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TravelPreference} from "../../../../data/schema/travelPreference";
import {User} from "../../../../data/schema/user";
import {Subscription} from "rxjs";
import {UserService} from "../../../../data/service/user.service";
import {SessionStorageService} from "../../../../shared/service/session.service";
import {TravelPreferenceService} from "../../../../data/service/travelPreference.service";
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";

@Component({
  selector: 'app-account-travel-preferences',
  templateUrl: './account-travel-preferences.component.html',
  styleUrls: ['./account-travel-preferences.component.css']
})
export class AccountTravelPreferencesComponent implements OnInit{
  public musicTravelPreferences: TravelPreference[];
  public chattinessTravelPreferences: TravelPreference[];
  public smokingTravelPreferences: TravelPreference[];
  public petTravelPreferences: TravelPreference[];
  userObject: User;
  private sub = new Subscription();



  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private userService: UserService, private sessionService: SessionStorageService, private travelPreferencesService: TravelPreferenceService) {
    this.setMusicTravelPreferences();
    this.setChattinessTravelPreferences();
    this.setSmokingTravelPreferences();
    this.setPetTravelPreferences();
  }



  ngOnInit(): void {

  }

  private setUserObject(): void {
    this.userObject = JSON.parse(this.sessionService.getItem('user')) as User;
    this.sub = this.userService.getUserById(this.userObject.id).subscribe(
      (data) => {
        this.userObject = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  private async setMusicTravelPreferences() {
    try {
      const data = await this.travelPreferencesService.findAllMusicTravelPreferences().toPromise();
      this.musicTravelPreferences = data;
    } catch (error) {
      console.error(error);
    }
  }

  private async setChattinessTravelPreferences() {
    try {
      const data = await this.travelPreferencesService.findAllChattinessTravelPreferences().toPromise();
      this.chattinessTravelPreferences = data;
      await this.travelPreferencesService.findAllChattinessTravelPreferences().toPromise();
    } catch (error) {
      console.error(error);
    }
  }

  private async setSmokingTravelPreferences() {
    try {
      const data = await this.travelPreferencesService.findAllSmokingTravelPreferences().toPromise();
      this.smokingTravelPreferences = data;
    } catch (error) {
      console.error(error);
    }
  }

  private async setPetTravelPreferences() {
    try {
      const data = await this.travelPreferencesService.findAllPetsTravelPreferences().toPromise();
      this.petTravelPreferences = data;
    } catch (error) {
      console.error(error);
    }
  }

}
