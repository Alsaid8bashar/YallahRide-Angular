import {Component, Input} from '@angular/core';
import {Rate} from "../../../../data/schema/rate";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-user-rates-card',
  templateUrl: './user-rates-card.component.html',
  styleUrls: ['./user-rates-card.component.css']
})
export class UserRatesCardComponent {
  @Input()
  rates: Rate[];
  @Input()
  userRate: number;

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
}
