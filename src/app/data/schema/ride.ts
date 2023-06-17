import {User} from "./user";
import {Report} from "./report";
import {Car} from "./car";
import {RideStatus} from './Enum/RideStatus';

export class Ride {


  private _id?: number

  private _from?: string

  private _to?: string

  private _isMaxTwoInTheBook?: boolean

  private _isInstantBooking?: boolean


  private _seats?: number

  private _cost?: number

  private _driver?: User

  private _reports?: Report[]

  private _car: Car
  private _departureDate?: Date

  private _arrivalTime: string

  private _departureTime: string
  private _arrivalDate?: Date


  private _rideStatus: RideStatus;

  constructor(from: string, to: string, seats: number, cost: number, driver: User) {
    this._from = from;
    this._to = to;
    this._seats = seats;
    this._cost = cost;
    this._driver = driver;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get from(): string {
    return this._from;
  }

  set from(value: string) {
    this._from = value;
  }

  get to(): string {
    return this._to;
  }

  set to(value: string) {
    this._to = value;
  }

  get isMaxTwoInTheBook(): boolean {
    return this._isMaxTwoInTheBook;
  }

  set isMaxTwoInTheBook(value: boolean) {
    this._isMaxTwoInTheBook = value;
  }

  get isInstantBooking(): boolean {
    return this._isInstantBooking;
  }

  set isInstantBooking(value: boolean) {
    this._isInstantBooking = value;
  }

  get departureDate(): Date {
    return this._departureDate;
  }

  set departureDate(value: Date) {
    this._departureDate = value;
  }

  get seats(): number {
    return this._seats;
  }

  set seats(value: number) {
    this._seats = value;
  }

  get cost(): number {
    return this._cost;
  }

  set cost(value: number) {
    this._cost = value;
  }

  get driver(): User {
    return this._driver;
  }

  set driver(value: User) {
    this._driver = value;
  }

  get reports(): Report[] {
    return this._reports;
  }

  set reports(value: Report[]) {
    this._reports = value;
  }

  get car(): Car {
    return this._car;
  }

  set car(value: Car) {
    this._car = value;
  }


  get arrivalTime(): string {
    return this._arrivalTime;
  }

  set arrivalTime(value: string) {
    this._arrivalTime = value;
  }

  get departureTime(): string {
    return this._departureTime;
  }

  set departureTime(value: string) {
    this._departureTime = value;
  }

  get rideStatus(): RideStatus {
    return this._rideStatus;
  }

  set rideStatus(value: RideStatus) {
    this._rideStatus = value;
  }

  get arrivalDate(): Date {
    return this._arrivalDate;
  }

  set arrivalDate(value: Date) {
    this._arrivalDate = value;
  }

}
