import {Component, Input, OnInit} from '@angular/core';
import {Rate} from "../../../../data/schema/rate";
import {DatePipe} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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

  rateForm: FormGroup;


  constructor(private datePipe: DatePipe) {
  }

  getFormattedDate(date: Date): string {
    return this.datePipe.transform(date, 'dd MMM yyyy');
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

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit() {

  }
}
