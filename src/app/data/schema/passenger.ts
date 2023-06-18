import {User} from "./user";
import {Ride} from "./ride";
import {RideStatus} from "./Enum/RideStatus";

export class Passenger {
  public _user?: User

  public _ride?: Ride

  private _id?: number

  private _isAccepted?: boolean

  private _rideStatus: RideStatus;


  constructor(_user: User, _ride: Ride, rideStatus: RideStatus) {
    this.user = _user;
    this.ride = _ride;
    this.rideStatus = rideStatus;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get ride(): Ride {
    return this._ride;
  }

  set ride(value: Ride) {
    this._ride = value;
  }

  get rideStatus(): RideStatus {
    return this._rideStatus;
  }

  set rideStatus(value: RideStatus) {
    this._rideStatus = value;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get isAccepted(): boolean {
    return this._isAccepted;
  }

  set isAccepted(value: boolean) {
    this._isAccepted = value;
  }
}
