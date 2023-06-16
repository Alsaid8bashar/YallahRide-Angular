import {User} from "./user";

export class Feedback{
  id?: number

  feedback?: string

  starts?: number

  user?: User

  constructor( feedback: string, starts: number, user: User) {
    this.feedback = feedback;
    this.starts = starts;
    this.user = user;
  }
}
