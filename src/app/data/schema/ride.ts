import {User} from "./user";
import {Report} from "./report";

export interface Ride{
  id?: number

  from?: string

  to?: string

  isMaxTwoInTheBook?: boolean

  isInstantBooking?: boolean

  date?: Date

  seats?: number

  cost?: number

  driver?: User

  reports?: Report[]
}
