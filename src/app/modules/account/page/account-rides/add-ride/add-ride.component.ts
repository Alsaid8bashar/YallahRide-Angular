import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {RideService} from "../../../../../data/service/ride.service";
import {CarService} from "../../../../../data/service/car.service";
import {Ride} from "../../../../../data/schema/ride";
import {UserService} from "../../../../../data/service/user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {DynamicScriptLoaderService} from "../../../../../shared/service/dynamic-script-loader-service.service";
import {Car} from "../../../../../data/schema/car";
import {DatePipe} from '@angular/common';
import {Router} from "@angular/router";
import {RideStatus} from "../../../../../data/schema/Enum/RideStatus";
import Choices from "choices.js";

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css']
})
export class AddRideComponent implements OnInit, OnDestroy {
  private sub = new Subscription();
  rideFrom: FormGroup;
  userCars: Car[];
  carChoices: Choices;

  constructor(private router: Router, private datePipe: DatePipe, private cdr: ChangeDetectorRef, private elementRef: ElementRef, private http: HttpClient, private rideService: RideService, private carService: CarService, private userService: UserService, private spinner: NgxSpinnerService, private dynamicScriptLoader: DynamicScriptLoaderService) {
    this.unloadScripts();
    this.loadScripts();
  }


  ngOnInit(): void {
    this.carChoices = new Choices(document.getElementById('mySelect'));
    this.getUserCars(this.userService.getUserSubject().id);
    this.buildForm();
  }

  getUserCars(id: number): void {
    this.carService.getUserCars(id).subscribe(
      cars => {
        this.userCars = cars;
        this.setChoices(cars);
      },
      error => {
        console.log(error);
      });
  }

  getCarById(carId: number): Car {
    return this.userCars.find(car => car.id == carId);
  }

  private setChoices(cars: Car []) {
    this.carChoices.clearChoices();
    const choicesArray = cars.map((car: Car) => ({
      value: car.id,
      label: `${car.make} ${car.model}`
    }));
    this.carChoices.setChoices(choicesArray, 'value', 'label', true);
  }


  onSubmit() {
    if (this.rideFrom.valid) {
      let ride: Ride = this.rideFrom.value;
      console.error(this.rideFrom.value.car);
      ride.driver = this.userService.getUserSubject();
      ride.car = this.getCarById(this.rideFrom.value.car);
      ride.rideStatus = RideStatus.Active;
      this.createRide(ride);
    }
  }

  createRide(ride: Ride) {
    this.spinner.show();
    this.sub = this.rideService.createRide(ride).subscribe(
      data => {
        this.spinner.hide();
        this.router.navigate(['account', 'rides']);
      },
      error => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  private buildForm(): void {
    this.rideFrom = new FormGroup({
      from: new FormControl('', Validators.required),
      departureDate: new FormControl('', Validators.required),
      departureTime: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      cost: new FormControl('', Validators.required),
      isInstantBooking: new FormControl('', Validators.required),
      car: new FormControl('', Validators.required),
      arrivalDate: new FormControl('', Validators.required),
      arrivalTime: new FormControl('', Validators.required)
    });
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'quill', 'flatpickr', 'bs-stepper', 'dropzone', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

  private unloadScripts() {
    this.dynamicScriptLoader.unload('bootstrap.bundle.min', 'choices', 'quill', 'flatpickr', 'bs-stepper', 'dropzone', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.unloadScripts();
  }


}
