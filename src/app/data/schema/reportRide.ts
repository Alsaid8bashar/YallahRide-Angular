import {Ride} from "./ride";
import {User} from "./user";
import {Report} from "./report";

export  class ReportRide extends Report{
  ride?: Ride

  constructor(ride: Ride) {
    super();
    this.ride = ride;
  }
}
