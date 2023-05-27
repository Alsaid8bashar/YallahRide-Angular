import {User} from "./user";
import {Ride} from "./ride";

export default interface Passenger{
  user?: User

  ride?: Ride

  id?: number

  isAccepted?: boolean
}
