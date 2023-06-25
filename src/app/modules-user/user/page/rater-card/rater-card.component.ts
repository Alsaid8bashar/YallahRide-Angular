import {Component, Input} from '@angular/core';
import {Rate} from "../../../../data/schema/rate";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-rater-card',
  templateUrl: './rater-card.component.html',
  styleUrls: ['./rater-card.component.css']
})
export class RaterCardComponent {
  @Input()
  rate: Rate;

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
