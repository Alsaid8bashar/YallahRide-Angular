import {Component, Input, OnInit} from '@angular/core';
import {Ride} from "../../../../data/schema/ride";
import {Router} from "@angular/router";
import moment from 'moment';
import {RateService} from "../../../../data/service/rate.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Subscription} from "rxjs";
import {User} from "../../../../data/schema/user";
import {FileStorageService} from "../../../../shared/service/files-storage.service";

@Component({
  selector: 'app-ride-card',
  templateUrl: './ride-card.component.html',
  styleUrls: ['./ride-card.component.css']
})

export class RideCardComponent implements OnInit {
  @Input()
  ride: Ride
  time: string;
  protected userRate: number;
  private rateSub: Subscription;

  constructor(private fileStorage: FileStorageService, private router: Router, private rateService: RateService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    const rideDate = moment(this.ride.departureTime, 'h:mm a').toDate();
    this.time = rideDate.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
    this.spinner.show();
    this.getUserRate();
  }

    private getUserRate() {
      this.rateSub = this.rateService.getUserRate(this.ride.driver.id).subscribe(
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

  fetchUserImageUrl(): void {
    this.fileStorage.getObjectUrl(this.ride.driver.imagePath).subscribe(response => {
      this.ride.driver.multipartFile = response.url;
      this.spinner.hide();
    }, error => {
      console.error(error)
      this.spinner.hide();
    });
  }


  displayRideDetails() {
    this.router.navigate(['ride/details', String(this.ride.id)]);
  }
}
