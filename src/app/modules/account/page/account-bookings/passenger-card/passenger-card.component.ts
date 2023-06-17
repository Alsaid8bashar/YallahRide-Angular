import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {Passenger} from "../../../../../data/schema/passenger";
import {RideStatus} from "../../../../../data/schema/Enum/RideStatus";

@Component({
  selector: 'app-passenger-card',
  templateUrl: './passenger-card.component.html',
  styleUrls: ['./passenger-card.component.css']
})
export class PassengerCardComponent {
  @Input()
  passenger: Passenger

  constructor(private router: Router) {
  }

  displayRideDetails() {
    this.router.navigate(['account', 'rides', 'details', String(this.passenger.ride.id)]);
  }

  displayRideRequests() {
    this.router.navigate(['account/rides/requests'], {
      queryParams: {
        id: this.passenger.ride.id,
        from: this.passenger.ride.from,
        to: this.passenger.ride.to,
        date: this.passenger.ride.departureDate
      }
    });
  }

  protected readonly RideStatus = RideStatus;
}
