import {Account} from "./account";
import {User} from "./user";
import {Rate} from "./rate";

export class UserDto{
  private _account:Account;
  private _user:User;

  private _rates:Rate[];

  private _userRate:number;


  get account(): Account {
    return this._account;
  }

  set account(value: Account) {
    this._account = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get rates(): Rate[] {
    return this._rates;
  }

  set rates(value: Rate[]) {
    this._rates = value;
  }

  get userRate(): number {
    return this._userRate;
  }

  set userRate(value: number) {
    this._userRate = value;
  }
}
