import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ride} from "../../../../data/schema/ride";
import {RideService} from "../../../../data/service/ride.service";
import {ActivatedRoute} from "@angular/router";
import {finalize, Subscription, tap} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RideFilterService} from "../../../../shared/service/ride-filter.service";
import {PipeTransform} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {NouiFormatter} from "ng2-nouislider";


@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css'],
  providers: [DecimalPipe],

})



export class RideListComponent implements OnInit, OnDestroy {
  rides: Ride[];
  tempRides: Ride[];


  from: string;
  to: string;
  date: string;
  availableRide: number;
  ridesSubscription: Subscription;
  searchForRideForm: FormGroup;
  filterForm: FormGroup;

  lowestPrice: boolean;

  constructor(private decimalPipe: DecimalPipe
    , private rideService: RideService, private route: ActivatedRoute, private spinner: NgxSpinnerService, private dynamicScriptLoader: DynamicScriptLoaderService, private rideFilterService: RideFilterService) {
  }

  ngOnInit() {
    this.unloadScripts();
    this.loadScripts();

    this.route.queryParams.subscribe(params => {
      this.to = params['drop'];
      this.date = params['date'];
      this.from = params['pickup'];
    });

    this.buildForm();
    this.buildFilterForm();
    this.loadFilteredRides();
  }


  loadFilteredRides() {
    this.spinner.show();
    this.ridesSubscription = this.rideService.searchRidesByFromAndToAndDate(this.from, this.to, this.date)
      .pipe(tap(rides => {
          this.rides = rides;
          this.tempRides = rides;
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

  filterRides() {
    console.error(this.filterForm.value)
    this.tempRides = this.rideFilterService.applyFilters(this.filterForm.value, this.rides);
  }

  onSubmit() {
    if (this.searchForRideForm.valid) {
      this.from = this.searchForRideForm.value.from;
      this.to = this.searchForRideForm.value.to;
      this.date = this.searchForRideForm.value.date;
      this.loadFilteredRides();
    }
  }

  buildForm(): void {
    this.searchForRideForm = new FormGroup({
      to: new FormControl(this.to, Validators.required),
      from: new FormControl(this.from, Validators.required),
      date: new FormControl(this.date.toString(), Validators.required),
    });
  }



  buildFilterForm(): void {
    this.filterForm = new FormGroup({
      maxPrice: new FormControl(),
      minPrice: new FormControl(),
      earliestDeparture: new FormControl(),
      lowestPrice: new FormControl(),
      before: new FormControl(),
      morning: new FormControl(),
      afternoon: new FormControl(),
      evening: new FormControl(),
      Verified: new FormControl(),
      Max2: new FormControl(),
      InstantBooking: new FormControl(),
      Smokingallowed: new FormControl(),
      Petsallowed: new FormControl(),
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

