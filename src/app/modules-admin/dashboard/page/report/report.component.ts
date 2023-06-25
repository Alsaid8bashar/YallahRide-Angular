import { Component } from '@angular/core';
import ReportUser from "../../../../data/schema/reportUser";
import {ActivatedRoute} from "@angular/router";
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";
import {ReportRideService} from "../../../../data/service/report-ride.service";
import {ReportUserService} from "../../../../data/service/report-user.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  userReports: ReportUser []=null;
  ridesReports: ReportUser []=null;

  routeName: string;

  constructor(private route: ActivatedRoute, private dynamicScriptLoader: DynamicScriptLoaderService, private rideReportService: ReportRideService, private userReportService: ReportUserService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.unloadScripts();
    this.loadScripts();
    this.spinner.show();
    this.route.data.subscribe(data => {
      this.routeName = data['routeName'];
      if (this.routeName === 'rides') {
        console.warn('rides')
        this.getRidesReports();
      } else if (this.routeName === 'users') {
        console.warn('users')
        this.getUserReports();
      }
    });
  }

  getUserReports() {
    this.userReportService.getReportUsers().subscribe(
      reports => {
        this.userReports = reports;
        console.warn(reports);
        this.spinner.hide();
      },
      error => {
        console.error(error);
        this.spinner.hide();
      }
    )
  }

  getRidesReports() {
    this.rideReportService.getReportRides().subscribe(
      reports => {
        this.ridesReports = reports;
        console.error(    this.ridesReports);
        this.spinner.hide();
      },
      error => {
        console.error(error);
        this.spinner.hide();
      }
    )

  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'overlayscrollbars', 'choices', 'glightbox', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

  private unloadScripts() {
    this.dynamicScriptLoader.unload('bootstrap.bundle.min', 'overlayscrollbars', 'choices', 'glightbox', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

  ngOnDestroy(): void {
    this.unloadScripts();

  }
}
