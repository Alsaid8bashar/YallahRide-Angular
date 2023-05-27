import {User} from "./user";

export default interface Rate{
  id?: number

  date?: any

  rate?: number

  rater?: User

  subject?: User
}
