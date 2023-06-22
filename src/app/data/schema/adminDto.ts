import {Account} from "./account";
import {Ride} from "./ride";
import ReportUser from "./reportUser";
import {ReportRide} from "./reportRide";

export default class AdminDTO {
  private _accounts?: Account[]

  private _rides?: Ride[]

  private _reportUsers?: ReportUser[]

  private _reportRides?: ReportRide[]

  get accounts(): Account[] {
    return this._accounts;
  }

  set accounts(value: Account[]) {
    this._accounts = value;
  }

  get rides(): Ride[] {
    return this._rides;
  }

  set rides(value: Ride[]) {
    this._rides = value;
  }

  get reportUsers(): ReportUser[] {
    return this._reportUsers;
  }

  set reportUsers(value: ReportUser[]) {
    this._reportUsers = value;
  }

  get reportRides(): ReportRide[] {
    return this._reportRides;
  }

  set reportRides(value: ReportRide[]) {
    this._reportRides = value;
  }
}
