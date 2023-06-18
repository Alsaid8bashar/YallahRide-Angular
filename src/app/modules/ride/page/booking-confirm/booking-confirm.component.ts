import {Component} from '@angular/core';
import {Ride} from "../../../../data/schema/ride";
import {ActivatedRoute, Router} from "@angular/router";
import {RideService} from "../../../../data/service/ride.service";
import {NgxSpinnerService} from "ngx-spinner";
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";
import {UserService} from "../../../../data/service/user.service";
import {DatePipe} from "@angular/common";



@Component({
  selector: 'app-booking-confirm',
  templateUrl: './booking-confirm.component.html',
  styleUrls: ['./booking-confirm.component.css']
})
export class BookingConfirmComponent {
  ride: Ride;

  constructor(protected userService: UserService, private router: Router, private route: ActivatedRoute, private rideService: RideService, private spinner: NgxSpinnerService, private dynamicScriptLoader: DynamicScriptLoaderService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.spinner.show();
      this.getRide(id);
    });
    this.unloadScripts();
    this.loadScripts();
  }
  get formattedDate(): string {
    return this.datePipe.transform(this.ride.departureDate, 'dd MMM yyyy');
  }

  private getRide(id: number) {
    this.rideService.findRideById(id).subscribe(
      ride => {
        this.ride = ride;
        console.error(ride)
        this.spinner.hide();
      },
      error => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'tiny-slider', 'flatpickr', 'glightbox', 'functions', 'sticky').then(data => {
    }).catch(error => console.log(error));
  }

  private unloadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'tiny-slider', 'flatpickr', 'glightbox', 'functions', 'sticky').then(data => {
    }).catch(error => console.log(error));
  }

  ngOnDestroy() {
    this.unloadScripts();
  }


}
