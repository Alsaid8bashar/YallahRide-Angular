import {User} from "./user";

export class TravelPreference{
  private _id?: number

  private _description?: string

  private _users?: User[]

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get users(): User[] {
    return this._users;
  }

  set users(value: User[]) {
    this._users = value;
  }
}
