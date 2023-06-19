import {CarImage} from "./carImage";
import {User} from "./user";

export class Car {
  private _id?: number

  private _color?: string

  private _make?: string

  private _model?: string

  private _licensePlate: string

  private _modelYear?: number

  private _user?: User

  private _carImages?: CarImage[]
  private _seats: number;


  get seats(): number {
    return this._seats;
  }

  set seats(value: number) {
    this._seats = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  get make(): string {
    return this._make;
  }

  set make(value: string) {
    this._make = value;
  }

  get model(): string {
    return this._model;
  }

  set model(value: string) {
    this._model = value;
  }

  get licensePlate(): string {
    return this._licensePlate;
  }

  set licensePlate(value: string) {
    this._licensePlate = value;
  }

  get modelYear(): number {
    return this._modelYear;
  }

  set modelYear(value: number) {
    this._modelYear = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get carImages(): CarImage[] {
    return this._carImages;
  }

  set carImages(value: CarImage[]) {
    this._carImages = value;
  }
}
