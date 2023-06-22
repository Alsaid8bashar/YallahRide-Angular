import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Ride} from "../../../../data/schema/ride";
import {ActivatedRoute, Router} from "@angular/router";
import {RideService} from "../../../../data/service/ride.service";
import {NgxSpinnerService} from "ngx-spinner";
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";
import {DatePipe} from "@angular/common";
import {RateService} from "../../../../data/service/rate.service";
import {Subscription} from "rxjs";
import {FileStorageService} from "../../../../shared/service/files-storage.service";

@Component({
  selector: 'app-ride-details-card',
  templateUrl: './ride-details-card.component.html',
  styleUrls: ['./ride-details-card.component.css']
})
export class RideDetailsCardComponent implements OnInit {
  @Input()
  ride: Ride;
  @Input()
  driverId: number;
  protected userRate: number;
  private rateSub: Subscription;

  constructor(private fileStorage: FileStorageService, private rateService: RateService, private router: Router, private route: ActivatedRoute, private rideService: RideService, private spinner: NgxSpinnerService, private dynamicScriptLoader: DynamicScriptLoaderService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getUserRate();
  }

  private getUserRate() {
    this.rateSub = this.rateService.getUserRate(this.driverId).subscribe(
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



  getRideTime(): string {
    if (!this.ride.arrivalDate || !this.ride.departureDate || !this.ride.arrivalTime || !this.ride.departureTime) {
      return "Incomplete ride information";
    }

    const arrivalDateTime = new Date(`${this.ride.arrivalDate}T${this.ride.arrivalTime}`);
    const departureDateTime = new Date(`${this.ride.departureDate}T${this.ride.departureTime}`);

    if (departureDateTime < arrivalDateTime) {
      return "Invalid datetime range";
    }

    const rideTimeInMinutes = Math.floor((departureDateTime.getTime() - arrivalDateTime.getTime()) / (1000 * 60));

    const hours = Math.floor(rideTimeInMinutes / 60);
    const minutes = rideTimeInMinutes % 60;
    return `${hours}hr ${minutes}min`;
  }


  get formattedDate(): string {
    return this.datePipe.transform(this.ride.departureDate, 'dd MMM yyyy');
  }


  displayDriverDetails() {
    this.router.navigate(['/user/UserDetails/41']);
  }
}
