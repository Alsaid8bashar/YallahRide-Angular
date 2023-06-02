import {CarImage} from "./carImage";
import {User} from "./user";

export class Car{
  id?: number

  color?: string

  make?: string

  model?: string

  licensePlate: string

  modelYear?: number

  user?: User

  carImages?: CarImage[]
}
