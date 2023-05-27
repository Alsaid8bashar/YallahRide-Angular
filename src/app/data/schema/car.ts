import {CarImage} from "./carImage";

export interface Car{
  id?: number

  color?: string

  make?: string

  model?: string

  licensePlate: string

  modelYear?: number

  user?: User

  carImages?: CarImage[]
}
