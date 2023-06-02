import {User} from "./user";

export class Account {
  id?: number

  email?: string

  phoneNumber?: string

  passwordHash?: string

  date?: Date

  user?: User

  isActive?: boolean



  constructor(email: string, phoneNumber: string, passwordHash: string, user: User) {
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.passwordHash = passwordHash;
    this.user = user;
  }

}
