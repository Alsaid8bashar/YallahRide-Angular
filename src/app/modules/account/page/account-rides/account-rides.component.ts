import {Component, OnDestroy, OnInit} from '@angular/core';
import {RideService} from "../../../../data/service/ride.service";
import {Ride} from "../../../../data/schema/ride";
import {Subscription, tap} from "rxjs";
import {UserService} from "../../../../data/service/user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {RideStatus} from "../../../../data/schema/Enum/RideStatus";
import {CarService} from "../../../../data/service/car.service";


@Component({
  selector: 'app-account-rides',
  templateUrl: './account-rides.component.html',
  styleUrls: ['./account-rides.component.css']
})
export class AccountRidesComponent implements OnInit, OnDestroy {

  protected rides: Ride[];
  protected ridesSubscription: Subscription;

  constructor(private rideService: RideService, private userService: UserService, private spinner: NgxSpinnerService, private carService: CarService) {
  }

  getRidesByStatus(status: string): number {
    return this.rides.filter(ride => ride.rideStatus === status).length;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getDriverRide(this.userService.getUserSubject().id);
    this.getUserCars(this.userService.getUserSubject().id);
  }

  getDriverRide(id: number) {
    this.ridesSubscription = this.rideService.findDriverRide(id)
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

  getUserCars(id: number): void {
    this.carService.getUserCars(id).subscribe(
      cars => {
        this.carService.setCars(cars);
      },
      error => {
        console.log(error);
      });
  }

  ngOnDestroy(): void {
    this.ridesSubscription.unsubscribe();
  }

  protected readonly RideStatus = RideStatus;
}
