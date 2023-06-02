import {TravelPreference} from "./travelPreference";
import {Role} from "./role";

export class User{
  multipartFile?: any

  id?: number

  firstName?: string

  lastName?: string

  imagePath?: string

  about?: string

  isActive?: boolean

  gender?: string

  travelPreferences?: TravelPreference[]

  roles?: Role[]


  constructor(firstName: string, lastName: string, gender: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
  }
}
