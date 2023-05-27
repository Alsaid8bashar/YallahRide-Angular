import {User} from "./user";
import {Data} from "@angular/router";

export default interface Rate {
  id?: number

  date?: Date

  rate?: number

  rater?: User

  subject?: User
}
