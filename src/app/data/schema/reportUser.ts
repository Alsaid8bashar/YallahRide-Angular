import {User} from "./user";
import {Report} from "./report";

export default class ReportUser extends Report{
  subject?: User

  constructor(subject: User) {
    super();
    this.subject = subject;
  }
}
