import {TravelPreference} from "./travelPreference";
import {Role} from "./role";

export class User {
  private _multipartFile?: any

  public _id?: number

  private _firstName?: string

  private _lastName?: string

  private _imagePath?: string

  private _about?: string

  private _isActive?: boolean

  private _gender?: string

  private _travelPreferences?: TravelPreference[]

  private _roles?: Role[]

  private _isVerified: boolean;

  constructor(firstName: string, lastName: string, gender: string) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._gender = gender;
  }


  get isVerified(): boolean {
    return this._isVerified;
  }

  set isVerified(value: boolean) {
    this._isVerified = value;
  }

  get multipartFile(): any {
    return this._multipartFile;
  }

  set multipartFile(value: any) {
    this._multipartFile = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get imagePath(): string {
    return this._imagePath;
  }

  set imagePath(value: string) {
    this._imagePath = value;
  }

  get about(): string {
    return this._about;
  }

  set about(value: string) {
    this._about = value;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }

  get gender(): string {
    return this._gender;
  }

  set gender(value: string) {
    this._gender = value;
  }

  get travelPreferences(): TravelPreference[] {
    return this._travelPreferences;
  }

  set travelPreferences(value: TravelPreference[]) {
    this._travelPreferences = value;
  }

  get roles(): Role[] {
    return this._roles;
  }

  set roles(value: Role[]) {
    this._roles = value;
  }


}
