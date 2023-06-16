import {Component, Input, OnInit, Output} from '@angular/core';
import {Ride} from "../../../../data/schema/ride";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-ride-card',
  templateUrl: './ride-card.component.html',
  styleUrls: ['./ride-card.component.css']
})

export class RideCardComponent implements OnInit {
  @Input()
  ride: Ride
  time: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    const rideDate = new Date(this.ride.departureDate);
    const formattedTime = rideDate.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
    this.time = formattedTime;
  }

  displayRideDetails() {
    this.router.navigate(['ride/details', String(this.ride.id)]);
  }
}
