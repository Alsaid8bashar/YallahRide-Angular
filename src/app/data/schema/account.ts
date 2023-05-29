import {User} from "./user";

export class Account {
  id?: number

  email?: string

  phoneNumber?: string

  passwordHash?: string

  date?: Date

  user?: User

  isActive?: boolean
}
