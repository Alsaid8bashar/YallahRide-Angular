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
import {CarImage} from "../../../../../data/schema/carImage";
import {Car} from "../../../../../data/schema/car";
import {User} from "../../../../../data/schema/user";
import {CarService} from "../../../../../data/service/car.service";

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit, OnDestroy {


  private sub = new Subscription();
  cars: CarJSON[] = [];
  userObject: User;
  filteredModels: ModelSeries[] = [];
  selectedCarId: number | null = null;
  carForm: FormGroup;
  isCarFormValid: boolean = true;
  errorMessage: string;
  modelChoices: Choices;
  files: File[] = [];
  dropzone: Dropzone;
  currentYear = new Date().getFullYear();
  startYear = 1900;
  @ViewChild('imageGallery') imageGalleryRef: ElementRef;


  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private accountService: AccountService,
    private sessionService: SessionStorageService,
    private spinner: NgxSpinnerService,
    private carJSON: CarJSONService,
    private carService: CarService
  ) {

  }


  ngOnInit(): void {
    this.setUserObject();
    this.modelChoices = new Choices(document.getElementById('mySelect'));
    this.buildCarForm();
    this.carJSON.fetchCarData().subscribe(data => {
      this.cars = data;
    });
  }

  private setUserObject() {
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


  private buildCarForm() {
    this.carForm = new FormGroup({
      make: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      modelYear: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      seats: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
    });
  }

  private filterCarModel(name: string) {
    this.carJSON.fetchCarData().subscribe(data => {
      this.cars = data;
      const car = this.cars.find(c => c.name == name);
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
    this.modelChoices._addChoice({
      value: 'default',
      label: 'Select your car model',
      isSelected: true,
      isDisabled: true
    });
    this.filterCarModel(this.carForm.value.make);
  }

  onAddCarSubmit() {
    // if (this.carFormChecker()) {
    //   const formValues = this.carForm.value;
    //   const car: Car = formValues;
    //   car.licensePlate = (formValues.code + '-' + formValues.number);
    //   car.user = this.userObject;
    //   this.sub = this.carService.saveCar(car, this.files).subscribe(() => {
    //     this.spinner.hide();
    //   }, error => {
    //     console.log(error)
    //     this.spinner.hide();
    //   });
    // }


    //TEMP
    const formValues = this.carForm.value;
    const car: Car = formValues;
    car.licensePlate = (formValues.code + '-' + formValues.number);
    debugger;
    car.user = this.userObject;
    this.spinner.show();

    this.sub = this.carService.saveCar(car, this.files).subscribe(() => {
      this.spinner.hide();
    }, error => {
      console.log(error)
      this.spinner.hide();
    });
  }

  carFormChecker(): boolean {
    if (!this.carForm.controls['make'].valid) {
      return this.errorMessageGenerator('Make can not be empty');
    } else if (!this.carForm.controls['model'].valid) {
      return this.errorMessageGenerator('Model can not be empty');
    } else if (!this.carForm.controls['modelYear'].valid) {
      return this.errorMessageGenerator('Year of manufacture can not be empty');
    } else if (!this.carForm.controls['color'].valid) {
      return this.errorMessageGenerator('Color can not be empty');
    } else if (!this.carForm.controls['seats'].valid) {
      return this.errorMessageGenerator('Number of seats can not be empty');
    } else if (this.files.length == 0) {
      return this.errorMessageGenerator('Images can not be empty');
    } else if (this.files.length != 5) {
      return this.errorMessageGenerator('5 Images must be uploaded');
    } else if (!this.carForm.controls['code'].valid) {
      if (this.carForm.controls['code'].hasError('pattern')) {
        return this.errorMessageGenerator('License plate code must be a number');
      } else {
        return this.errorMessageGenerator('License plate code must be not be empty');
      }
    } else if (!this.carForm.controls['number'].valid) {
      if (this.carForm.controls['number'].hasError('pattern')) {
        return this.errorMessageGenerator('License plate number must be a number');
      } else {
        return this.errorMessageGenerator('License plate number must be not be empty');
      }
    } else {
      this.errorMessage = '';
      return true;
    }
  }

  errorMessageGenerator(message: string): boolean {
    this.errorMessage = message;
    this.isCarFormValid = false;
    return false;
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  generateYears() {
    const years: number[] = [];
    for (let year = this.currentYear; year >= this.startYear; year--) {
      years.push(year);
    }
    return years;
  }
}
