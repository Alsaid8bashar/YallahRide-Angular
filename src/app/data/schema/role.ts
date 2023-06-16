import {User} from "./user";

export class Role{
  private _id?: number

  private _roleName?: string

  private _users?: User[]


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get roleName(): string {
    return this._roleName;
  }

  set roleName(value: string) {
    this._roleName = value;
  }

  get users(): User[] {
    return this._users;
  }

  set users(value: User[]) {
    this._users = value;
  }
}
