import {User} from "./user";
import {Ride} from "./ride";

export class Report {
  private _id?: number

  private _title?: string

  private _description?: string

  private _date?: Date

  private _ride?: Ride

  private _user?: User


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get ride(): Ride {
    return this._ride;
  }

  set ride(value: Ride) {
    this._ride = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }
}
