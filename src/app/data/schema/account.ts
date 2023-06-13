import {User} from "./user";

export class Account {
  id?: number

  email?: string

  phoneNumber?: string

  passwordHash?: string

  date?: string

  user?: User

  isActive?: boolean



  constructor(email: string, phoneNumber: string, passwordHash: string) {
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.passwordHash = passwordHash;
  }

}
