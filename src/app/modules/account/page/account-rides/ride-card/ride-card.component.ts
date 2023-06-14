import {Component, Input} from '@angular/core';
import {Ride} from "../../../../../data/schema/ride";
import {RideStatus} from "../../../../../data/schema/Enum/RideStatus";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ride-card',
  templateUrl: './ride-card.component.html',
  styleUrls: ['./ride-card.component.css']
})
export class RideCardComponent {

  @Input()
  ride: Ride
  protected readonly RideStatus = RideStatus;

  constructor(private router: Router) {
  }

  displayRideDetails() {
    this.router.navigate(['account', 'rides', 'details', String(this.ride.id)]);
  }

  displayRideRequests() {
    console.log("he")
    this.router.navigate(['account/rides/requests'], {
      queryParams: {
        id: this.ride.id,
        from: this.ride.from,
        to: this.ride.to,
        date: this.ride.date
      }
    });
  }
}
