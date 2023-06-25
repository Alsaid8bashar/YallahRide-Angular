import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  report:Report;
  reportObj: User;
  subjectObj: User;
  categoryChoices: Choices;
  titleChoices: Choices;
  categoryReport: ReportCategory[];
  titleReport: ReportTitle[];
  sub: Subscription;
  reportForm:FormGroup;


  constructor(private spinner: NgxSpinnerService,
              private dynamicScriptLoader: DynamicScriptLoaderService,
              private reportCategoryService: ReportCategoryService,
              private titleCategoryService: ReportTitleService,
  ) {

  }

  ngOnInit() {
    this.load();
    this.categoryChoices = new Choices(document.getElementById('categoryChoices'));
    this.titleChoices = new Choices(document.getElementById('titleChoices'));
    this.setReportCategory();
    this.setReportTitleChoices();
    this.buildReportForm();
  }

  private buildReportForm(){
    this.reportForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }

  private setReporterObject() {

  }

  private setSubjectObject() {

  }

  private setReportCategory() {
    this.spinner.show();
    this.sub = this.reportCategoryService.getAllUserReportsCategories().subscribe((data) => {
      console.log(data)
      this.categoryReport = data
      this.setCategoryChoices(data);
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
    })
  }

  private async setReportTitleChoices() {
    this.spinner.show();
    try {
      const data = await this.titleCategoryService.getReportTitles().toPromise();
      this.titleReport = data;
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
    }
  }


  private setCategoryChoices(reportCategory: ReportCategory[]) {
    reportCategory.forEach((item: ReportCategory) => {
      this.categoryChoices._addChoice({value: item.id.toString(), label: `${item.category}`});
    });
  }

  private setTitleChoices(reportTitle: ReportTitle[]) {
    this.titleChoices.clearStore();
    this.titleChoices.clearChoices();
    reportTitle.forEach((item: ReportTitle) => {
      this.titleChoices._addChoice({value: item.id.toString(), label: `${item.title}`});
    });
    this.titleChoices._addChoice({value: 'default', label: 'Select an Option', isSelected:true,isDisabled:true});
  }

  public onCategorySelection() {
    console.log(+this.categoryChoices.getValue(true))
    let filteredTitleChoices = this.titleReport.filter((title) => {
      return title.reportCategory && title.reportCategory.id === +this.categoryChoices.getValue(true);
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


  onAddReportSubmit() {
    const formValues = this.reportForm.value;
    this.report = new ReportUser();
  }
}
