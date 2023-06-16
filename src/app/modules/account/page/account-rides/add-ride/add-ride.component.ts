import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {RideService} from "../../../../../data/service/ride.service";
import {CarService} from "../../../../../data/service/car.service";
import {Ride} from "../../../../../data/schema/ride";
import {UserService} from "../../../../../data/service/user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {DynamicScriptLoaderService} from "../../../../../shared/service/dynamic-script-loader-service.service";
import Choices from 'src/assets/vendor/choices/js/choices.js';
import {Car} from "../../../../../data/schema/car";
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css']
})
export class AddRideComponent implements OnInit, OnDestroy {
  private sub = new Subscription();
  rideFrom: FormGroup;
  userCars: Car[];

  constructor(private datePipe: DatePipe, private cdr: ChangeDetectorRef, private elementRef: ElementRef, private http: HttpClient, private rideService: RideService, private carService: CarService, private userService: UserService, private spinner: NgxSpinnerService, private dynamicScriptLoader: DynamicScriptLoaderService) {
  }


  ngOnInit(): void {
    this.userCars = this.carService.getCars();
    this.unloadScripts();
    this.loadScripts();
    this.setChoices();
    this.buildForm();
  }

  getCarById(carId) {
    return this.userCars.find(car => car.id === carId);
  }

  private setChoices() {
    const selectElement = document.getElementById('mySelect');
    const choices = new Choices(selectElement);
    const choicesArray = this.userCars.map((car: Car) => ({
      value: car.id,
      label: `${car.make} ${car.model}`
    }));
    choices.setChoices(choicesArray, 'value', 'label', true);
  }

  onSubmit() {
    if (this.rideFrom.valid) {
      const ride: Ride = this.rideFrom.value;
      ride.car = this.getCarById(this.rideFrom.value.car);
      ride.driver = this.userService.getUserSubject();
      console.log(ride);

      this.createRide(ride);
    }
  }

  createRide(ride: Ride) {
    this.sub = this.rideService.createRide(ride).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  private buildForm(): void {
    this.rideFrom = new FormGroup({
      from: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      departureTime: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      isInstantBooking: new FormControl('', Validators.required),
      car: new FormControl('', Validators.required)
    });
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'flatpickr', 'glightbox', 'functions', 'aos', 'bs-stepper', 'quill', 'dropzone').then(data => {
      console.log(data)
    }).catch(error => console.log(error));
  }

  private unloadScripts() {
    this.dynamicScriptLoader.unload('bootstrap.bundle.min', 'choices', 'flatpickr', 'glightbox', 'functions', 'aos', 'bs-stepper', 'quill', 'dropzone').then(data => {
      console.log(data)
    }).catch(error => console.log(error));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.unloadScripts();
  }


}
