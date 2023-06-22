import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ride} from "../../../../../data/schema/ride";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {RideService} from "../../../../../data/service/ride.service";
import {NgxSpinnerService} from "ngx-spinner";
import {PassengerService} from "../../../../../data/service/passenger.service";
import {UserService} from "../../../../../data/service/user.service";
import {Passenger} from "../../../../../data/schema/passenger";
import {RideStatus} from "../../../../../data/schema/Enum/RideStatus";

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css']
})
export class RideDetailsComponent implements OnInit, OnDestroy {
  ride: Ride;
  passengers: Passenger [];
  protected ridesSubscription: Subscription;
  protected passengerSubscription: Subscription;
  protected isDeleteChecked: boolean = false;
  protected isCanselChecked: boolean = false;
  protected isDriver: boolean;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private rideService: RideService, private passengerService: PassengerService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.spinner.show();
      this.getRide(id);
      this.getRidePassenger(id);
    });
  }

  checkDriver() {
    this.isDriver = this.ride.driver.id == this.userService.getUserSubject().id;
  }

  getPassengerIdByUserId(id: number) {
    const passenger = this.passengers.find(passenger => passenger.user.id == id);
    return passenger ? passenger.id : null;
  }

  private hideSpinner() {
    this.spinner.hide();
  }

  private getRide(id: number) {
    this.ridesSubscription = this.rideService.findRideById(id).subscribe(
      ride => {
        this.ride = ride;
        this.checkDriver();
        this.checkSpinner();
      },
      error => {
        console.log(error);
        this.checkSpinner();
      }
    );
  }

  private getRidePassenger(id: number) {
    this.passengerSubscription = this.passengerService.getRidePassenger(id).subscribe(
      passengers => {
        this.passengers = passengers;
        this.checkSpinner();
      },
      error => {
        console.log(error);
        this.checkSpinner();
      }
    );
  }

  private checkSpinner() {
    if (!this.ridesSubscription || this.ridesSubscription.closed) {
      this.hideSpinner();
    }
    if (!this.passengerSubscription || this.passengerSubscription.closed) {
      this.hideSpinner();
    }
  }

  ngOnDestroy(): void {
    this.ridesSubscription.unsubscribe();
    this.passengerSubscription.unsubscribe();
  }

  deleteRide() {
    this.spinner.show();
    this.rideService.deleteRideById(this.ride.id).subscribe(
      () => {
        this.spinner.hide();
        this.router.navigate(['account', 'rides',]);
      },
      error => {
        console.log('Error deleting ride:', error);
        this.spinner.hide();

      }
    );
  }

  cancelRide() {
    this.spinner.show();
    this.passengerService.changeBookingStatus(this.getPassengerIdByUserId(this.userService.getUserSubject().id), RideStatus.Canceled).subscribe(
      () => {
        this.spinner.hide();
        this.router.navigate(['account', 'bookings',]);
      },
      error => {
        console.log('Error canceling ride:', error);
        this.spinner.hide();
      }
    );
  }
}