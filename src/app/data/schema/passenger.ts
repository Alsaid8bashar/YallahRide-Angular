import {User} from "./user";
import {Ride} from "./ride";

export class Passenger {
  private _user?: User

  private _ride?: Ride

  private _id?: number

  private _isAccepted?: boolean


  constructor(user: User, ride: Ride) {
    this._user = user;
    this._ride = ride;
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
