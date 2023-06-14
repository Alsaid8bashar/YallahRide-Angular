import {User} from "./user";
import {Ride} from "./ride";

export class Passenger {
  user?: User

  ride?: Ride

  id?: number

  isAccepted?: boolean


  constructor(user: User, ride: Ride) {
    this.user = user;
    this.ride = ride;
  }
}
