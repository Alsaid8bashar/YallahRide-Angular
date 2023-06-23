import {Component, Input} from '@angular/core';
import {Ride} from "../../../../../data/schema/ride";
import {RideStatus} from "../../../../../data/schema/Enum/RideStatus";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-account-ride-card',
  templateUrl: './ride-card.component.html',
  styleUrls: ['./ride-card.component.css']
})
export class RideCardComponent {
  @Input()
  isDriver: boolean;
  @Input()
  ride: Ride
  @Input()
  passengerStatus: RideStatus;
  protected readonly RideStatus = RideStatus;

  constructor(private router: Router, private datePipe: DatePipe) {
  }

  displayRideDetails() {
    this.router.navigate(['account', 'rides', 'details', String(this.ride.id)]);
  }

  get formattedDate(): string {
    return this.datePipe.transform(this.ride.departureDate, 'dd MMM yyyy');
  }

  displayRideRequests() {
    this.router.navigate(['account/rides/requests'], {
      queryParams: {
        id: this.ride.id,
        from: this.ride.from,
        to: this.ride.to,
        date: this.ride.departureDate
      }
    });
  }


}
