import {Component, Input, OnInit} from '@angular/core';
import {ReportUserService} from "../../../../../data/service/report-user.service";
import ReportUser from "../../../../../data/schema/reportUser";
import {DatePipe} from "@angular/common";
import {ReportRide} from "../../../../../data/schema/reportRide";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css']
})
export class ReportTableComponent implements OnInit {
  @Input()
  usersReports: ReportUser [];
  @Input()
  ridesReports: ReportRide[];

  sortOption: string = '';

  sortFrom: FormGroup;

  private buildForm(): void {
    this.sortFrom = new FormGroup({
      sortOption: new FormControl(),
    });
  }

  getReportName(report: any): string {
    if (this.usersReports != null) {
      return `${report.subject.firstName} ${report.subject.lastName}`;
    } else {
      return `${report.ride.driver.firstName} ${report.ride.driver.lastName}`;
    }
  }

  constructor(private reportService: ReportUserService, private datePipe: DatePipe) {
  }

  getFormattedDate(date: Date): string {
    return this.datePipe.transform(date, 'dd MMM yyyy');
  }

  sortReports(): void {
    console.warn(this.sortFrom.value)
    if (this.sortFrom.value.sortOption == 'newest') {
      this.usersReports.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (this.sortFrom.value.sortOption == 'oldest') {
      this.usersReports.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
  }

  ngOnInit() {
    this.buildForm()
  }

}
