import {User} from "./user";
import {Report} from "./report";
import {Car} from "./car";

export class Ride {
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

  car: Car

  arrivalTime:Date

  departureTime:Date

  constructor(from: string, to: string, seats: number, cost: number, driver: User) {
    this.from = from;
    this.to = to;
    this.seats = seats;
    this.cost = cost;
    this.driver = driver;
  }
}
