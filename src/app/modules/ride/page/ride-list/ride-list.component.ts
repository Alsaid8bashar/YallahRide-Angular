import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {Ride} from "../../../../data/schema/ride";
import {RideService} from "../../../../data/service/ride.service";
import {ActivatedRoute} from "@angular/router";
import {finalize, Subscription, tap} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";


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


  constructor(private rideService: RideService, private route: ActivatedRoute, private spinner: NgxSpinnerService, private dynamicScriptLoader: DynamicScriptLoaderService) {
  }

  ngOnInit() {
    this.loadScripts();
    this.route.queryParams.subscribe(params => {
      this.to = params['drop'];
      this.date = params['date'];
      this.from = params['pickup'];
    });
    this.loadScripts();
    this.buildForm();
    this.loadFilteredRides();
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
      date: new FormControl(this.date, Validators.required),
    });
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'tiny-slider', 'flatpickr', 'glightbox', 'functions','sticky','nouislider').then(data => {
    }).catch(error => console.log(error));
  }
  private unloadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'tiny-slider', 'flatpickr', 'glightbox', 'functions','sticky','nouislider').then(data => {
    }).catch(error => console.log(error));
  }


  ngOnDestroy() {
    if (this.ridesSubscription) {
      this.ridesSubscription.unsubscribe();
    }
      this.unloadScripts();
  }

}
