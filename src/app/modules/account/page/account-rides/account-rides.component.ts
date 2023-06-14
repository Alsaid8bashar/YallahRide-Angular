import {Component, OnDestroy, OnInit} from '@angular/core';
import {RideService} from "../../../../data/service/ride.service";
import {Ride} from "../../../../data/schema/ride";
import {Subscription, tap} from "rxjs";
import {UserService} from "../../../../data/service/user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {RideStatus} from "../../../../data/schema/Enum/RideStatus";

@Component({
  selector: 'app-account-rides',
  templateUrl: './account-rides.component.html',
  styleUrls: ['./account-rides.component.css']
})
export class AccountRidesComponent implements OnInit, OnDestroy {

  protected rides: Ride[];
  protected ridesSubscription: Subscription;

  constructor(private rideService: RideService, private userService: UserService, private spinner: NgxSpinnerService) {
  }

  getRidesByStatus(status: string):number {
    return this.rides.filter(ride => ride.rideStatus === status).length;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.ridesSubscription = this.rideService.findDriverRide(this.userService.getUserSubject().id)
      .pipe(tap(rides => {
          this.rides = rides;
        })
      )
      .subscribe(
        () => {
          setTimeout(() => {
            this.spinner.hide();
          }, 500);
        },
        error => {
          console.error(error);
          this.spinner.hide();
        }
      );
  }


  ngOnDestroy(): void {
    this.ridesSubscription.unsubscribe();
  }


  protected readonly RideStatus = RideStatus;
}
