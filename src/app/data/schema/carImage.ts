import {Car} from "./car";

export interface CarImage{
  multipartFile?: any

  id?: number

  imagePath?: string

  car?: Car
}
