import {User} from "./user";
import {Ride} from "./ride";

export class Report {
  id?: number

  title?: string

  description?: string

  date?: Date

  ride?: Ride

  user?: User
}
