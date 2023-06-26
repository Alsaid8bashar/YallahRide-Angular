import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute} from "@angular/router";
import {DynamicScriptLoaderService} from "../../../../../shared/service/dynamic-script-loader-service.service";
import {ReportRideService} from "../../../../../data/service/report-ride.service";
import {ReportUserService} from "../../../../../data/service/report-user.service";
import {Report} from "../../../../../data/schema/report";
import {User} from "../../../../../data/schema/user";
import {RateService} from "../../../../../data/service/rate.service";
import {UserService} from "../../../../../data/service/user.service";
import {AccountService} from "../../../../../data/service/account.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-admin-report-details',
  templateUrl: './admin-report-details.component.html',
  styleUrls: ['./admin-report-details.component.css']
})
export class AdminReportDetailsComponent implements OnInit {
  sub: Subscription;
  id: number;
  routeName: string;
  report: Report;
  subject: User;
  reporterRate: number;
  subjectRate: number;

  constructor(private datePipe: DatePipe, private accountService: AccountService, private userService: UserService, private rateService: RateService, private route: ActivatedRoute, private dynamicScriptLoader: DynamicScriptLoaderService, private rideReportService: ReportRideService, private userReportService: ReportUserService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.getRoutType(id);
    });
  }

  getFormattedDate(date: Date): string {
    return this.datePipe.transform(date, 'dd MMM yyyy');
  }

  getRoutType(id: number) {
    this.spinner.show();
    this.route.data.subscribe(data => {
      this.routeName = data['routeName'];
      if (this.routeName === 'rides') {
        this.getRidesReport(id);
      } else if (this.routeName === 'users') {
        this.getUserReport(id);
      }
    });
  }

  getUserReport(id: number) {
    this.userReportService.getReportUser(id).subscribe(
      report => {
        this.report = report;
        this.subject = report.subject;
        this.callUserRateTwice(report.report.id, report.subject.id);
        this.spinner.hide();
      },
      error => {
        console.error(error);
        this.spinner.hide();
      }
    )
  }


  async callUserRateTwice(reporterId: number, subjectId: number) {
    try {
      this.reporterRate = await this.getUserRate(reporterId) as number;
      this.subjectRate = await this.getUserRate(subjectId) as number;
    } catch (error) {
      console.error(error);
    }
  }


  async getUserRate(id) {
    return new Promise((resolve, reject) => {
      this.rateService.getUserRate(id).subscribe(
        rate => {
          resolve(rate);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  getRidesReport(id: number) {
    this.rideReportService.getReportRide(id).subscribe(
      report => {
        this.report = report;
        this.subject = report.ride.driver;
        console.log(report.ride.driver);
        this.callUserRateTwice(report.report.id, report.ride.driver.id);

        this.spinner.hide();
      },
      error => {
        console.error(error);
        this.spinner.hide();
      }
    )
  }


  warnUser() {
    this.spinner.show();
    this.subject.warnings++;
    this.userService.createUser(this.subject, null).subscribe(
      data => {
        this.spinner.hide();
        location.reload();
      },
      error => {
        console.error(error);
        this.spinner.hide();
      }
    )
  }

  terminateUser() {
    this.accountService.deactivateUserById(this.subject.id).subscribe(
      data => {
        this.spinner.hide();
        location.reload();
      },
      error => {
        console.error(error);
        this.spinner.hide();
      }
    )
  }
}
