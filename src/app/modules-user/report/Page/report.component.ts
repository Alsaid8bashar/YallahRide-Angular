import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {DynamicScriptLoaderService} from "../../../shared/service/dynamic-script-loader-service.service";
import {User} from "../../../data/schema/user";
import Choices from "choices.js";
import ReportCategory from "../../../data/schema/reportCategory";
import ReportTitle from "../../../data/schema/reportTitle";
import {ReportCategoryService} from "../../../data/service/report-category.service";
import {ReportTitleService} from "../../../data/service/report-title.service";
import {Subscription} from "rxjs";
import {Report} from "../../../data/schema/report";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import ReportUser from "../../../data/schema/reportUser";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../data/service/user.service";
import {ReportUserService} from "../../../data/service/report-user.service";
import {Ride} from "../../../data/schema/ride";
import {ReportRideService} from "../../../data/service/report-ride.service";
import {RideService} from "../../../data/service/ride.service";
import {ReportRide} from "../../../data/schema/reportRide";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, OnDestroy {

  report: Report;
  reportObj: User;
  subjectObj: User;
  rideObj: Ride;
  categoryChoices: Choices;
  titleChoices: Choices;
  categoryReports: ReportCategory[];
  titleReports: ReportTitle[];
  sub: Subscription;
  reportForm: FormGroup;
  routeName: string;


  constructor(private spinner: NgxSpinnerService,
              private dynamicScriptLoader: DynamicScriptLoaderService,
              private reportCategoryService: ReportCategoryService,
              private titleCategoryService: ReportTitleService,
              private userReportService: ReportUserService,
              private rideReportService: ReportRideService,
              private userService: UserService,
              private rideService: RideService,
              private route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.load();
    this.initializeChoices();
    this.getRoutType();
    this.setReportTitleChoices().then();
    this.setReporterObject();
    this.buildReportForm();
  }

  private initializeChoices() {
    this.categoryChoices = new Choices(document.getElementById('categoryChoices'));
    this.titleChoices = new Choices(document.getElementById('titleChoices'));
  }

  private buildReportForm() {
    this.reportForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  private setReporterObject() {
    this.reportObj = this.userService.getUserSubject();
  }

  getRoutType() {
    this.spinner.show();
    this.route.data.subscribe(data => {
      this.routeName = data['routeName'];
      if (this.routeName == 'rides') {
        this.setRideObject();
      } else if (this.routeName == 'users') {
        this.setSubjectObject();
      }
      this.setReportCategory(this.routeName);
    });
  }

  private setSubjectObject() {
    this.spinner.show();
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.sub = this.userService.getUserById(id).subscribe(
        data => {
          this.subjectObj = data;
          this.report = new ReportUser(data);
          this.spinner.hide();
        },
        error => {
          console.log(error);
          this.spinner.hide();
        }
      );
    });
  }

  private setRideObject() {
    this.spinner.show();
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.sub = this.rideService.findRideById(id).subscribe(
        data => {
          this.rideObj = data;
          this.report = new ReportRide(data);
          this.spinner.hide();
        },
        error => {
          console.log(error);
          this.spinner.hide();
        }
      );
    });
  }


  private setReportCategory(routerName: string) {
    this.spinner.show();
    this.sub = this.reportCategoryService.getAllReportCategories().subscribe((data) => {
      this.categoryReports = data;
      if (routerName == 'rides') {
        this.setRideReportCategoryChoices(data);
      } else if (routerName == 'users') {
        this.setUserReportCategoryChoices(data);
      }
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
    });
  }

  private async setReportTitleChoices() {
    this.spinner.show();
    try {
      const data = await this.titleCategoryService.getReportTitles().toPromise();
      this.titleReports = data;
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
    }
  }


  private setUserReportCategoryChoices(reportCategory: ReportCategory[]) {
    reportCategory.forEach((category: ReportCategory) => {
      if (category.userReport) {
        this.categoryChoices._addChoice({value: category.id.toString(), label: `${category.category}`});
      }
    });
  }

  private setRideReportCategoryChoices(reportCategory: ReportCategory[]) {
    this.categoryReports.forEach((category: ReportCategory) => {
      if (!category.userReport) {
        this.categoryChoices._addChoice({value: category.id.toString(), label: `${category.category}`});
      }
    });
  }

  private setTitleChoices(reportTitle: ReportTitle[]) {
    this.titleChoices.clearStore();
    this.titleChoices.clearChoices();
    reportTitle.forEach((item: ReportTitle) => {
      this.titleChoices._addChoice({value: item.id.toString(), label: `${item.title}`});
    });
    this.titleChoices._addChoice({value: 'default', label: 'Select an Option', isSelected: true, isDisabled: true});
  }

  public onCategorySelection() {

    let filteredTitleChoices = this.titleReports.filter((title) => {
      return title.reportCategory && title.reportCategory.id == +this.categoryChoices.getValue(true);
    });
    this.setTitleChoices(filteredTitleChoices);
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'quill', 'flatpickr', 'bs-stepper', 'dropzone', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

  private unloadScripts() {
    this.dynamicScriptLoader.unload('bootstrap.bundle.min', 'choices', 'quill', 'flatpickr', 'bs-stepper', 'dropzone', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

  private load() {
    this.unloadScripts();
    this.loadScripts();
  }

  postReport() {
    console.log(this.report);
    if (this.routeName == 'users') {
      this.spinner.show();
      this.sub = this.userReportService.saveReportUser(this.report).subscribe((data) => {
        this.spinner.hide();
      }, error => {
        console.log(error);
        this.spinner.hide();
      })
    } else if (this.routeName == 'rides') {
      this.spinner.show();
      this.sub = this.rideReportService.saveReportRide(this.report).subscribe((data) => {
        this.spinner.hide();
      }, error => {
        console.log(error);
        this.spinner.hide();
      })
    }
  }

  onAddReportSubmit() {
    if (this.reportForm.valid) {
      const formValues = this.reportForm.value;
      this.report.report = this.reportObj;
      this.report.title = this.titleReports.find((title) => {
        return title.id == +formValues.title;
      });
      this.report.category = this.categoryReports.find((category) => {
        return category.id == +formValues.category;
      });
      this.report.description = formValues.description;
      this.postReport();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
