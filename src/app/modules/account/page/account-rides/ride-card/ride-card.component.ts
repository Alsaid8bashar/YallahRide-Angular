import {Component, Input} from '@angular/core';
import {Ride} from "../../../../../data/schema/ride";
import {RideStatus} from "../../../../../data/schema/Enum/RideStatus";

@Component({
  selector: 'app-ride-card',
  templateUrl: './ride-card.component.html',
  styleUrls: ['./ride-card.component.css']
})
export class RideCardComponent {

  @Input()
  ride: Ride
  protected readonly RideStatus = RideStatus;
}
