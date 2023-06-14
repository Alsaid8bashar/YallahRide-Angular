import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {PassengerService} from "../../../../../data/service/passenger.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Passenger} from "../../../../../data/schema/passenger";

@Component({
  selector: 'app-ride-request',
  templateUrl: './ride-request.component.html',
  styleUrls: ['./ride-request.component.css']
})
export class RideRequestComponent implements OnInit, OnDestroy {
  id: number;
  from: string;
  to: string;
  date: string;
  passengersRequest: Passenger [];
  protected ridesRequestSubscription: Subscription;


  constructor(private route: ActivatedRoute, private passengerService: PassengerService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.from = params['from'];
      this.to = params['to'];
      this.date = params['date'];
    });
    this.getRidePassenger();
  }

  private getRidePassenger() {
    this.spinner.show();
    this.ridesRequestSubscription = this.passengerService.getRideRequests(this.id)
      .subscribe(
        (passengersRequest) => {
          this.passengersRequest = passengersRequest;
          this.spinner.hide();
          console.log(this.passengersRequest);
        },
        (error) => {
          console.error(error);
          this.spinner.hide();
        }
      );
  }

  acceptPassenger(id: number) {
    this.spinner.show();
    this.passengerService.acceptPassenger(id)
      .subscribe(
        (response) => {
          this.getRidePassenger();
          this.spinner.hide();
        },
        (error) => {
          console.error(error);
          this.spinner.hide();
        }
      );
  }

  rejectPassenger(id: number) {
    this.spinner.show();
    this.passengerService.deletePassenger(id)
      .subscribe(
        (response) => {
          this.getRidePassenger();
          this.spinner.hide();
        },
        (error) => {
          console.error(error);
          this.spinner.hide();
        }
      );
  }

  ngOnDestroy() {
    if (this.ridesRequestSubscription) {
      this.ridesRequestSubscription.unsubscribe();
    }
  }
}
