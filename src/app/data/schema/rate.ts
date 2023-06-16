import {User} from "./user";
import {Data} from "@angular/router";

export class Rate {
  private _id?: number

  private _date?: Date

  private _rate?: number

  private _rater?: User

  private _subject?: User

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get rate(): number {
    return this._rate;
  }

  set rate(value: number) {
    this._rate = value;
  }

  get rater(): User {
    return this._rater;
  }

  set rater(value: User) {
    this._rater = value;
  }

  get subject(): User {
    return this._subject;
  }

  set subject(value: User) {
    this._subject = value;
  }
}
