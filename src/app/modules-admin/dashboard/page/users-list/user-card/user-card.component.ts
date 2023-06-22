import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../../../data/schema/user";
import {Router} from "@angular/router";
import {RateService} from "../../../../../data/service/rate.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit, OnDestroy {

  @Input()
  user: User;
  protected userRate: number;
  private sub:Subscription;

  constructor(private router: Router, private rateService: RateService, private spinner: NgxSpinnerService) {
  }
  ngOnInit(): void {
    this.sub = this.rateService.getUserRate(this.user.id).subscribe( data => {
      this.userRate = data;
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
