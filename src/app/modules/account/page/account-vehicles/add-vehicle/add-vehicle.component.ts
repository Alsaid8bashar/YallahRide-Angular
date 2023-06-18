import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CarJSON} from "../../../../../data/schema/carJSON";
import {TokenService} from "../../../../../shared/service/token.service";
import {UserService} from "../../../../../data/service/user.service";
import {AccountService} from "../../../../../data/service/account.service";
import {SessionStorageService} from "../../../../../shared/service/session.service";
import {NgxSpinnerService} from "ngx-spinner";
import {CarJSONService} from "../../../../../data/service/car-json.service";
import {Subscription} from "rxjs";
import {ModelSeries} from "../../../../../data/schema/modelJSON";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Choices from "choices.js";
import * as Dropzone from 'dropzone';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit, OnDestroy {


  private sub = new Subscription();
  cars: CarJSON[] = [];
  filteredModels: ModelSeries[] = [];
  selectedCarId: number | null = null;
  carForm: FormGroup;
  modelChoices: Choices;

  files: File[] = [];
  dropzone: Dropzone;
  @ViewChild('imageGallery') imageGalleryRef: ElementRef;


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
      make: new FormControl('',[Validators.required]),
      model: new FormControl('',[Validators.required]),
      year: new FormControl('',[Validators.required]),
      color: new FormControl('',[Validators.required]),
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
    this.modelChoices.clearChoices();
    this.modelChoices._addChoice({value:'default',label:'Select your car model',isSelected:true, isDisabled:true});
    this.filterCarModel(this.carForm.value.make);
  }

  onAddCarSubmit() {
    console.log(this.carForm.valid)
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
