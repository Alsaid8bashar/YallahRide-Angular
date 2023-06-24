import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ride} from "../../../../data/schema/ride";
import {ActivatedRoute, Router} from "@angular/router";
import {RideService} from "../../../../data/service/ride.service";
import {NgxSpinnerService} from "ngx-spinner";
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";
import {PassengerService} from "../../../../data/service/passenger.service";
import {Passenger} from "../../../../data/schema/passenger";
import {UserService} from "../../../../data/service/user.service";
import {Subscription} from "rxjs";
import {RideStatus} from "../../../../data/schema/Enum/RideStatus";


@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html'
})
export class RideDetailsComponent implements OnInit, OnDestroy {

  protected ride: Ride;
  private rideSub: Subscription;
  private passengerSub: Subscription;


  constructor(private userService: UserService, private passengerService: PassengerService, private router: Router, private route: ActivatedRoute, private rideService: RideService, private spinner: NgxSpinnerService, private dynamicScriptLoader: DynamicScriptLoaderService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.spinner.show();
      this.getRide(id);
    });
    this.unloadScripts();
    this.loadScripts();
  }


  private getRide(id: number) {
    this.rideSub = this.rideService.findRideById(id).subscribe(
      ride => {
        this.ride = ride;
        this.spinner.hide();
      },
      error => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }


  bookRide() {
    let passenger: Passenger = new Passenger(this.userService.getUserSubject(), this.ride, RideStatus.Active);
    this.spinner.show();
    this.savePassenger(passenger);
    this.editRide(this.ride);
  }

  savePassenger(passenger: Passenger) {
    this.passengerSub = this.passengerService.savePassenger(passenger).subscribe(
      response => {
        this.router.navigate(['ride/booking-confirm', String(this.ride.id)]);
      },
      error => {
        console.error(error);
      }
    )
  }

  editRide(ride: Ride) {
    ride.seats--;
    this.rideService.createRide(ride).subscribe(
      response => {
        this.ride = response;
        this.spinner.hide();
      },
      error => {
        console.error(error);
        this.spinner.hide();
      }
    );
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
    this.unloadScripts();
  }
}
