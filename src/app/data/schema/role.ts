import {User} from "./user";

export interface Role{
  id?: number

  roleName?: string

  users?: User[]
}
