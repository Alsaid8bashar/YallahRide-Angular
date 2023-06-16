import {User} from "./user";

export class Account {
  private _id?: number

  private _email?: string

  private _phoneNumber: string

  private _passwordHash?: string

  private _date?: string

  private _user?: User

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get passwordHash(): string {
    return this._passwordHash;
  }

  set passwordHash(value: string) {
    this._passwordHash = value;
  }

  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }

  private _isActive?: boolean



  constructor(email: string, phoneNumber: string, passwordHash: string) {
    this._email = email;
    this._phoneNumber = phoneNumber;
    this._passwordHash = passwordHash;
  }

}
