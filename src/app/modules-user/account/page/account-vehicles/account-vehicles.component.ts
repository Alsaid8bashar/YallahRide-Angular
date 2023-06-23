import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ride} from "../../../../data/schema/ride";
import {Subscription, tap} from "rxjs";
import {RideService} from "../../../../data/service/ride.service";
import {UserService} from "../../../../data/service/user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {CarService} from "../../../../data/service/car.service";
import {Car} from "../../../../data/schema/car";

@Component({
  selector: 'app-account-vehicles',
  templateUrl: './account-vehicles.component.html',
  styleUrls: ['./account-vehicles.component.css']
})
export class AccountVehiclesComponent implements OnInit, OnDestroy {

  protected cars: Car[];
  protected carsSubscription: Subscription;

  constructor(private carService: CarService, private userService: UserService, private spinner: NgxSpinnerService) {
  }


  ngOnInit(): void {
    this.spinner.show();
    this.getDriverCar(this.userService.getUserSubject().id);
  }

  getDriverCar(id: number) {
    this.carsSubscription = this.carService.getUserCars(id)
      .pipe(tap(cars => {
          this.cars = cars;
          this.spinner.hide();
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
    this.carsSubscription.unsubscribe();
  }

}
