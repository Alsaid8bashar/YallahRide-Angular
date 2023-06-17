import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarJSON} from "../../../../../data/schema/carJSON";
import {TokenService} from "../../../../../shared/service/token.service";
import {UserService} from "../../../../../data/service/user.service";
import {AccountService} from "../../../../../data/service/account.service";
import {SessionStorageService} from "../../../../../shared/service/session.service";
import {CustomValidators} from "../../../../auth/page/register/sign-up-1/customValidators";
import {NgxSpinnerService} from "ngx-spinner";
import {CarJSONService} from "../../../../../data/service/car-json.service";
import {Observable, Subscription} from "rxjs";
import {ModelSeries} from "../../../../../data/schema/modelJSON";
import {map} from "rxjs/operators";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Car} from "../../../../../data/schema/car";
import Choices from "choices.js";

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit, OnDestroy {


  private sub = new Subscription();
  cars: CarJSON[] = [];
  modelSeries: ModelSeries[] = [];
  selectedMake: string | null = null;
  filteredModels: ModelSeries[] = [];
  selectedModel: number | null = null;
  selectedCarId: number | null = null;
  carForm: FormGroup;
  modelChoices:Choices;


  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private accountService: AccountService,
    private sessionService: SessionStorageService,
    private spinner: NgxSpinnerService,
    private carJSON: CarJSONService
  ) {

  }

  ngOnInit(): void {
    this.modelChoices = new Choices(document.getElementById('mySelect'));
    this.buildCarForm();
    this.carJSON.fetchCarData().subscribe(data => {
      this.cars = data;
    });
  }





  private buildCarForm() {
    this.carForm = new FormGroup({
      make: new FormControl(''),
      model: new FormControl(''),
      year: new FormControl(''),
      color: new FormControl(''),
    });
  }

  private filterCarModel(id: number) {
    this.carJSON.fetchCarData().subscribe(data => {
      this.cars = data;
      console.log(this.cars);

      const car = this.cars.find(c => c.id == id);
      if (car) {
        this.filteredModels = car.model_series;
        this.setChoices();
      }
    });
  }

  private setChoices() {
    this.modelChoices.clearChoices();
    const choicesArray = this.filteredModels.map((modelSeries: ModelSeries) => ({
      value: modelSeries.name,
      label: modelSeries.name
    }));
    this.modelChoices.setChoices(choicesArray, 'value', 'label', true);
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  onMakeSelection(): void {
    this.filterCarModel(this.carForm.value.make);
  }

  onAddCarSubmit() {
    console.log("Submitted")
  }
}
