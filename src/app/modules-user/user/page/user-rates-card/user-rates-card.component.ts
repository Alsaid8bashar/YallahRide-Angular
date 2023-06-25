import {Component, Input, OnInit} from '@angular/core';
import {Rate} from "../../../../data/schema/rate";
import {DatePipe} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RateService} from "../../../../data/service/rate.service";
import {UserService} from "../../../../data/service/user.service";
import {User} from "../../../../data/schema/user";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NgxSpinnerService} from "ngx-spinner";
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";

@Component({
  selector: 'app-user-rates-card',
  templateUrl: './user-rates-card.component.html',
  styleUrls: ['./user-rates-card.component.css']
})
export class UserRatesCardComponent implements OnInit {
  @Input()
  rates: Rate[];
  @Input()
  userRate: number;
  @Input()
  subject: User;
  rateForm: FormGroup;
  flag: boolean = false;

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private datePipe: DatePipe, private rateService: RateService, private userService: UserService, private spinner: NgxSpinnerService) {
  }

  getFullStars(rate: number): number[] {
    const fullStars = Math.floor(rate);
    return Array(fullStars).fill(0);
  }

  hasHalfStar(rate: number): boolean {
    return rate - Math.floor(rate) >= 0.5;
  }

  private buildForm(): void {
    this.rateForm = new FormGroup({
      rate: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'tiny-slider', 'flatpickr', 'glightbox', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

  private unloadScripts() {
    this.dynamicScriptLoader.unload('bootstrap.bundle.min', 'choices', 'tiny-slider', 'flatpickr', 'glightbox', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

  ngOnInit() {
    this.unloadScripts();
    this.loadScripts();
    this.buildForm();
    debugger
    if (this.userService.getUserSubject().id === this.subject.id) {
      this.flag = true;
    }
  }

  onSubmit() {
    this.spinner.show();
    let rate: Rate = this.rateForm.value;
    rate.rater = this.userService.getUserSubject();
    rate.subject = this.subject;
    this.rateService.createRate(rate).subscribe(
      rate => {
        location.reload();
        this.spinner.hide();
      },
      error => {
        console.error(error);
        this.spinner.hide();
      }
    );
  }
}
