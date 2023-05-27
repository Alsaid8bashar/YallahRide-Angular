import {User} from "./user";
import {Ride} from "./ride";

export interface Report{
  id?: number

  title?: string

  description?: string

  date?: Date

  ride?: Ride

  user?: User
}
