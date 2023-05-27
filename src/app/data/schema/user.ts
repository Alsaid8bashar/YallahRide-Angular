import {TravelPreference} from "./travelPreference";
import {Role} from "./role";

export interface User{
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
}
