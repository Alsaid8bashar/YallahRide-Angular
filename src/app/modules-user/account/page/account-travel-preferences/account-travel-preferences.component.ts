import {Component, OnDestroy, OnInit} from '@angular/core';
import {TravelPreference} from "../../../../data/schema/travelPreference";
import {User} from "../../../../data/schema/user";
import {Subscription} from "rxjs";
import {UserService} from "../../../../data/service/user.service";
import {SessionStorageService} from "../../../../shared/service/session.service";
import {TravelPreferenceService} from "../../../../data/service/travelPreference.service";
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";
import {NgxSpinnerService} from "ngx-spinner";
import Choices from "choices.js";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-account-travel-preferences',
  templateUrl: './account-travel-preferences.component.html',
  styleUrls: ['./account-travel-preferences.component.css']
})
export class AccountTravelPreferencesComponent implements OnInit, OnDestroy {
  public musicTravelPreferences: TravelPreference[];
  public chattinessTravelPreferences: TravelPreference[];
  public smokingTravelPreferences: TravelPreference[];
  public petTravelPreferences: TravelPreference[];
  musicTravelPreferencesChoices: Choices;
  chattinessTravelPreferencesChoices: Choices;
  smokingTravelPreferencesChoices: Choices;
  petTravelPreferencesChoices: Choices;
  userObject: User;
  travelPreferencesFrom: FormGroup;
  hasError: boolean = false;
  private sub = new Subscription();


  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private userService: UserService, private sessionService: SessionStorageService, private travelPreferencesService: TravelPreferenceService, private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    console.log("RELOAD")
    this.musicTravelPreferencesChoices = new Choices(document.getElementById('Music'));
    this.chattinessTravelPreferencesChoices = new Choices(document.getElementById('Chattiness'));
    this.smokingTravelPreferencesChoices = new Choices(document.getElementById('Smoking'));
    this.petTravelPreferencesChoices = new Choices(document.getElementById('Pets'));
    this.spinner.show();
    this.buildTravelPreferencesForm();
    this.setUserObject();
    this.setMusicTravelPreferences();
    this.setChattinessTravelPreferences();
    this.setSmokingTravelPreferences();
    this.setPetTravelPreferences();
    this.spinner.hide();
  }

  private buildTravelPreferencesForm() {
    this.travelPreferencesFrom = new FormGroup({
      musicTravelPreferencesChoice: new FormControl('', [Validators.required]),
      chattinessTravelPreferencesChoice: new FormControl('', [Validators.required]),
      smokingTravelPreferencesChoice: new FormControl('', [Validators.required]),
      petTravelPreferencesChoice: new FormControl('', [Validators.required])
    });
  }

  private findTravelPreferenceById(travelPreferences: TravelPreference [], id: number) {
    return travelPreferences.find(preference => preference.id == id);
  }

  onSubmit() {
    const travelPreferences = [];
    const formValues = this.travelPreferencesFrom.value;
    travelPreferences.push(this.findTravelPreferenceById(this.petTravelPreferences, formValues.petTravelPreferencesChoice));
    travelPreferences.push(this.findTravelPreferenceById(this.smokingTravelPreferences, formValues.smokingTravelPreferencesChoice));
    travelPreferences.push(this.findTravelPreferenceById(this.musicTravelPreferences, formValues.musicTravelPreferencesChoice));
    travelPreferences.push(this.findTravelPreferenceById(this.chattinessTravelPreferences, formValues.chattinessTravelPreferencesChoice));
    this.sub = this.userService.saveUserTravelPreferences(travelPreferences, this.userObject.id).subscribe(
      data => {
        location.reload();
      }, error => {
        console.log(error);
      }
    );
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


  private setMusicTravelPreferences() {
    this.sub = this.travelPreferencesService.findAllMusicTravelPreferences().subscribe(data => {
      this.musicTravelPreferences = data;
      this.setTravelPreferencesChoices(this.musicTravelPreferences, this.musicTravelPreferencesChoices);
    }, error => {
      console.log(error);
    })
  }

  private setChattinessTravelPreferences() {
    this.sub = this.travelPreferencesService.findAllChattinessTravelPreferences().subscribe(data => {
      this.chattinessTravelPreferences = data;
      this.setTravelPreferencesChoices(this.chattinessTravelPreferences, this.chattinessTravelPreferencesChoices);
    }, error => {
      console.log(error);
    })
  }

  private setSmokingTravelPreferences() {
    this.sub = this.travelPreferencesService.findAllSmokingTravelPreferences().subscribe(data => {
      this.smokingTravelPreferences = data;
      this.setTravelPreferencesChoices(this.smokingTravelPreferences, this.smokingTravelPreferencesChoices);
    }, error => {
      console.log(error);
    })
  }

  private setPetTravelPreferences() {
    this.sub = this.travelPreferencesService.findAllPetsTravelPreferences().subscribe(data => {
      this.petTravelPreferences = data;
      this.setTravelPreferencesChoices(this.petTravelPreferences, this.petTravelPreferencesChoices);
    }, error => {
      console.log(error);
    })
  }

  private setTravelPreferencesChoices(travelPreferences: TravelPreference [], choice: Choices) {
    travelPreferences.forEach((preference: TravelPreference) => {
      if (this.userObject.travelPreferences.find(data => data.id === preference.id)) {
        choice._addChoice({value: preference.id.toString(), label: `${preference.description}`, isSelected: true});
        this.updateFormValue(travelPreferences, preference);
      } else {
        choice._addChoice({value: preference.id.toString(), label: `${preference.description}`});
      }
    });
  }

  updateFormValue(travelPreferences: TravelPreference [], preference: TravelPreference) {
    if (travelPreferences === this.musicTravelPreferences) {
      this.travelPreferencesFrom.get('musicTravelPreferencesChoice').setValue(preference.id.toString());
    } else if (travelPreferences === this.petTravelPreferences) {
      this.travelPreferencesFrom.get('petTravelPreferencesChoice').setValue(preference.id.toString());
    } else if (travelPreferences === this.smokingTravelPreferences) {
      this.travelPreferencesFrom.get('smokingTravelPreferencesChoice').setValue(preference.id.toString());
    } else if (travelPreferences === this.chattinessTravelPreferences) {
      this.travelPreferencesFrom.get('chattinessTravelPreferencesChoice').setValue(preference.id.toString());
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
