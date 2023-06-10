import {Component, Input, OnInit} from '@angular/core';
import {Ride} from "../../../../data/schema/ride";
import {ActivatedRoute, Router} from "@angular/router";
import {RideService} from "../../../../data/service/ride.service";
import {NgxSpinnerService} from "ngx-spinner";
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css']
})
export class RideDetailsComponent implements OnInit {

  ride: Ride;

  constructor(private router: Router, private route: ActivatedRoute, private rideService: RideService, private spinner: NgxSpinnerService, private dynamicScriptLoader: DynamicScriptLoaderService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.spinner.show();
      this.rideService.findRideById(id).subscribe(
        ride => {
          this.ride = ride;
          this.spinner.hide();
        },
        error => {
          console.log(error);
          this.spinner.hide();
        }
      );
    });
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'tiny-slider', 'flatpickr', 'glightbox', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

}
