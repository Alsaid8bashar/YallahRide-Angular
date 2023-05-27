export default interface Account {
  id?: number

  email?: string

  phoneNumber?: string

  passwordHash?: string

  date?: any

  user?: User

  isActive?: boolean
}
