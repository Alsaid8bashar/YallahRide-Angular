import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../data/schema/user";
import {RateService} from "../../../../data/service/rate.service";
import {Subscription} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input()
  user: User;
  protected userRate: number;
  private rateSub: Subscription;

  constructor(private rateService: RateService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getUserRate();
  }

  private getUserRate() {
    this.rateSub = this.rateService.getUserRate(this.user.id).subscribe(
      rate => {
        this.userRate = rate;
        this.spinner.hide();
      },
      error => {
        console.error(error);
        this.spinner.hide();
      }
    )
  }

  getFullStars(): number[] {
    const fullStars = Math.floor(this.userRate);
    return Array(fullStars).fill(0);
  }

  hasHalfStar(): boolean {
    return this.userRate - Math.floor(this.userRate) >= 0.5;
  }


}
