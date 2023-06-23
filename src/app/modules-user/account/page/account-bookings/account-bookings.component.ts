import {Component} from '@angular/core';
import {Subscription, tap} from "rxjs";
import {UserService} from "../../../../data/service/user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {CarService} from "../../../../data/service/car.service";
import {PassengerService} from "../../../../data/service/passenger.service";
import {RideStatus} from "../../../../data/schema/Enum/RideStatus";
import {Passenger} from "../../../../data/schema/passenger";

@Component({
  selector: 'app-account-bookings',
  templateUrl: './account-bookings.component.html',
  styleUrls: ['./account-bookings.component.css']
})
export class AccountBookingsComponent {

  protected passengerRide: Passenger[];
  protected bookingSubscription: Subscription;

  constructor(private passengerService: PassengerService, private userService: UserService, private spinner: NgxSpinnerService, private carService: CarService) {
  }

  getRideByStatus(status: string): Passenger[] {
    let passengers = this.passengerRide.filter(passenger => passenger._rideStatus == status);
    return passengers;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getUserBooks(this.userService.getUserSubject().id);
  }

  getUserBooks(id: number) {
    this.spinner.show();
    this.bookingSubscription = this.passengerService.getPassengerByUserId(id)
      .subscribe(
        data => {
          this.passengerRide = data;
          console.warn(data);
          this.spinner.hide();
        },
        error => {
          console.error(error);
          this.spinner.hide();
        }
      );
  }

  ngOnDestroy(): void {
    this.bookingSubscription.unsubscribe();
  }

  protected readonly RideStatus = RideStatus;
  protected readonly length = length;
}
