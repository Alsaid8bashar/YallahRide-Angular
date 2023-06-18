import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ride} from "../../../../data/schema/ride";
import {RideService} from "../../../../data/service/ride.service";
import {ActivatedRoute} from "@angular/router";
import {finalize, Subscription, tap} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import moment from 'moment';


@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css']
})
export class RideListComponent implements OnInit, OnDestroy {
  rides: Ride[];
  from: string;
  to: string;
  date: string;
  availableRide: number;
  ridesSubscription: Subscription;
  searchForRideFrom: FormGroup;


  minCapacity: number;
  maxCapacity: number;
  minPrice: number;
  maxPrice: number;
  departureTime: boolean;
  lowestPrice: boolean;


  minPassengerCapacity: number = 0;
  maxPassengerCapacity: number = 15;

  private earliestDeparture: any;
  arrivalTime: string = '';

  constructor(private rideService: RideService, private route: ActivatedRoute, private spinner: NgxSpinnerService, private dynamicScriptLoader: DynamicScriptLoaderService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.to = params['drop'];
      this.date = params['date'];
      this.from = params['pickup'];
    });
    this.unloadScripts();
    this.loadScripts();
    this.buildForm();
    this.loadFilteredRides();
  }

  filterByCapacity() {
    return this.rides.filter(item => {
      return item.seats >= this.minCapacity && item.seats <= this.maxCapacity;
    });
  }

  filterByPrice() {
   return  this.rides.filter(item => {
      return item.cost >= this.minPrice && item.cost <= this.maxPrice;
    });
  }

  filterByLowestPrice() {
    if (this.lowestPrice) {
      this.rides.sort((a, b) => {
        return a.cost - b.cost;
      });
    }
  }

  filterRides() {
    let filteredRides = this.rides;


    this.rides = filteredRides;
  }


  loadFilteredRides() {
    this.spinner.show();
    this.ridesSubscription = this.rideService.searchRidesByFromAndToAndDate(this.from, this.to, this.date)
      .pipe(tap(rides => {
          this.rides = rides;
          this.availableRide = rides.length;
        }),
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(
        () => {
        },
        error => {
          console.error(error);
        }
      );
  }

  onSubmit() {
    if (this.searchForRideFrom.valid) {
      this.from = this.searchForRideFrom.value.from;
      this.to = this.searchForRideFrom.value.to;
      this.date = this.searchForRideFrom.value.date;
      this.loadFilteredRides();
    }
  }

  buildForm(): void {
    this.searchForRideFrom = new FormGroup({
      to: new FormControl(this.to, Validators.required),
      from: new FormControl(this.from, Validators.required),
      date: new FormControl(this.date.toString(), Validators.required),
    });
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'tiny-slider', 'flatpickr', 'glightbox', 'functions', 'sticky').then(data => {
    }).catch(error => console.log(error));
  }

  private unloadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'tiny-slider', 'flatpickr', 'glightbox', 'functions', 'sticky').then(data => {
    }).catch(error => console.log(error));
  }


  ngOnDestroy() {
    if (this.ridesSubscription) {
      this.ridesSubscription.unsubscribe();
    }
    this.unloadScripts();
  }

}
