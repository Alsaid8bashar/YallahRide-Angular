import ReportCategory from "./reportCategory";
import ReportTitle from "./reportTitle";
import {User} from "./user";

export class Report{
  reportPk?: number

  report?: User

  title?: ReportTitle

  category?: ReportCategory

  description?: string

  isSolved?: boolean

  date?: Date
}
