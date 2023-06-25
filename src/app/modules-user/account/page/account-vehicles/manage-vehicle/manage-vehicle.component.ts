import {Component, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {CarJSON} from "../../../../../data/schema/carJSON";
import {User} from "../../../../../data/schema/user";
import {ModelSeries} from "../../../../../data/schema/modelJSON";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Choices from "choices.js";
import * as Dropzone from 'dropzone';
import {TokenService} from "../../../../../shared/service/token.service";
import {UserService} from "../../../../../data/service/user.service";
import {AccountService} from "../../../../../data/service/account.service";
import {SessionStorageService} from "../../../../../shared/service/session.service";
import {NgxSpinnerService} from "ngx-spinner";
import {CarJSONService} from "../../../../../data/service/car-json.service";
import {CarService} from "../../../../../data/service/car.service";
import {Car} from "../../../../../data/schema/car";
import {ActivatedRoute, Router} from "@angular/router";
import {CarImage} from "../../../../../data/schema/carImage";
import items from "choices.js/public/types/src/scripts/reducers/items";
import {HttpClient} from "@angular/common/http";
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {error} from "@angular/compiler-cli/src/transformers/util";


@Component({
  selector: 'app-manage-vehicle',
  templateUrl: './manage-vehicle.component.html',
  styleUrls: ['./manage-vehicle.component.css']
})
export class ManageVehicleComponent {
  @ViewChild('dropzone', {static: false}) dropzoneComponent: Dropzone;

  private sub = new Subscription();
  cars: CarJSON[] = [];
  userObject: User;
  filteredModels: ModelSeries[] = [];
  selectedCarId: number | null = null;
  carForm: FormGroup;
  isCarFormValid: boolean = true;
  errorMessage: string;
  modelChoices: Choices;
  makeChoices: Choices;
  colorChoices: Choices;
  yearChoices: Choices;
  seatsChoices: Choices;
  files: File[] = [];
  dropzone: Dropzone;
  currentYear = new Date().getFullYear();
  startYear = 1900;
  carObject: Car;
  isDeleteCarChecked = false;

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private accountService: AccountService,
    private sessionService: SessionStorageService,
    private spinner: NgxSpinnerService,
    private carJSON: CarJSONService,
    private carService: CarService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private _sanitizer: DomSanitizer,
    private router: Router
  ) {

  }

  ngOnInit(): void {

    this.getCarsList()
    this.setUserObject();
    this.initializeChoices();
    this.setYearsChoices();
    this.setCarObject();
    this.buildCarForm();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  initializeChoices() {
    this.modelChoices = new Choices(document.getElementById('modelChoices'));
    this.makeChoices = new Choices(document.getElementById('makeChoices'));
    this.yearChoices = new Choices(document.getElementById('yearChoices'));
    this.colorChoices = new Choices(document.getElementById('colorChoices'));
    this.seatsChoices = new Choices(document.getElementById('seatChoices'));
  }

  private getCarsList() {
    this.carJSON.fetchCarData().subscribe(data => {
      this.cars = data;
      this.setMakeChoices(data);
    });
  }

  private setMakeChoices(cars: CarJSON[]) {
    cars.forEach((car: CarJSON) => {
      this.makeChoices._addChoice({value: car.name, label: `${car.name}`});
    });
  }

  private setModelChoices() {
    const choicesArray = this.filteredModels.map((modelSeries: ModelSeries) => ({
      value: modelSeries.name,
      label: modelSeries.name
    }));
    this.modelChoices.setChoices(choicesArray, 'value', 'label', true);
  }

  private setYearsChoices() {
    for (let year = this.startYear; year <= this.currentYear; year++) {
      this.yearChoices._addChoice({value: year.toString(), label: year.toString(), isSelected: true})
    }
  }

  private setUserObject() {
    this.userObject = this.userService.getUserSubject();
  }

  setFiles(carImages: CarImage[]) {
    carImages.forEach(item => {
      this.getImageFile(item.imagePath)
        .subscribe(file => {
          this.files.push(file);
        });
    });
    // carImages.forEach(item => {
    //   this.files.push(item.multipartFile)
    // })
  }

  getImageFile(url: string): Observable<File> {
    return this.http.get(url, {responseType: 'blob'})
      .pipe(
        map((blob: Blob) => {
          return new File([blob], 'image');
        })
      );
  }


  setCarObject(): void {
    const carId = +this.route.snapshot.paramMap.get('id');
    this.spinner.show();
    this.carService.getCarByID(carId).subscribe(
      data => {
        this.carObject = data;
        this.setDefaultChoices();
        this.setFiles(data.carImages);
        this.spinner.hide();
      },
      error => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }


  private setDefaultChoices() {
    this.makeChoices._findAndSelectChoiceByValue(this.carObject.make);
    this.filterCarModel(this.carObject.make);
    this.yearChoices._findAndSelectChoiceByValue(this.carObject.modelYear.toString())
    this.colorChoices._findAndSelectChoiceByValue(this.carObject.color);
    this.seatsChoices._findAndSelectChoiceByValue(this.carObject.seats.toString());
    this.setDefaultFormValues();
  }

  private setDefaultFormValues() {
    this.carForm.get('make').setValue(this.makeChoices.getValue(true));
    this.carForm.get('model').setValue(this.modelChoices.getValue(true));
    this.carForm.get('modelYear').setValue(this.yearChoices.getValue(true));
    this.carForm.get('color').setValue(this.colorChoices.getValue(true));
    this.carForm.get('seats').setValue(this.seatsChoices.getValue(true));
    this.carForm.get('code').setValue(this.carObject.licensePlate.substring(0, 2));
    this.carForm.get('number').setValue(this.carObject.licensePlate.split('-')[1]);
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

  onAddCarSubmit() {
    const formValues = this.carForm.value;
    console.log(formValues);
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

  private filterCarModel(name: string) {
    this.carJSON.fetchCarData().subscribe(data => {
      this.cars = data;
      const car = this.cars.find(c => c.name == name);
      if (car) {
        this.filteredModels = car.model_series;
        this.setModelChoices();
      }
      this.modelChoices._findAndSelectChoiceByValue(this.carObject.model);
      this.carForm.get('model').setValue(this.modelChoices.getValue(true));
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

  deleteCar() {
    this.spinner.show();
    this.carService.deleteCar(this.carObject.id).subscribe(
      data => {
        this.spinner.hide()
        this.router.navigate(['account', 'vehicles',]);
      },
      error => {
        console.error(error);
        this.spinner.hide()
      }
    )
  }
}
