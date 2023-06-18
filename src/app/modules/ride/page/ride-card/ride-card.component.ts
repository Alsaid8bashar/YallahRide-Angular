import {Component, Input, OnInit} from '@angular/core';
import {Ride} from "../../../../data/schema/ride";
import {Router} from "@angular/router";
import moment from 'moment';

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
    const rideDate = moment(this.ride.departureTime, 'h:mm a').toDate();
    this.time = rideDate.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
  }


  displayRideDetails() {
    this.router.navigate(['ride/details', String(this.ride.id)]);
  }
}
