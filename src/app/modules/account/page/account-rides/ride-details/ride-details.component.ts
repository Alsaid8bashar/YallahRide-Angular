import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ride} from "../../../../../data/schema/ride";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {RideService} from "../../../../../data/service/ride.service";
import {NgxSpinnerService} from "ngx-spinner";
import {PassengerService} from "../../../../../data/service/passenger.service";
import {User} from "../../../../../data/schema/user";

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css']
})
export class RideDetailsComponent implements OnInit, OnDestroy {
  ride: Ride;
  passengers: User [];
  protected ridesSubscription: Subscription;
  protected passengerSubscription: Subscription;
  protected isChecked: boolean = false;


  constructor(private router: Router, private route: ActivatedRoute, private rideService: RideService, private passengerService: PassengerService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.spinner.show();
      this.getRide(id);
      this.getRidePassenger(id);
    });

  }

  private hideSpinner() {
    this.spinner.hide();
  }

  private getRide(id: number) {
    this.ridesSubscription = this.rideService.findRideById(id).subscribe(
      ride => {
        this.ride = ride;
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
    if (this.isChecked) {
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
  }

}
