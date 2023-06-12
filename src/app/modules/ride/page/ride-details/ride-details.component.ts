import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Ride} from "../../../../data/schema/ride";
import {ActivatedRoute, Router} from "@angular/router";
import {RideService} from "../../../../data/service/ride.service";
import {NgxSpinnerService} from "ngx-spinner";
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";
import { DatePipe } from '@angular/common';





@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html'
})
export class RideDetailsComponent implements OnInit, OnDestroy {

  ride: Ride;

  constructor(private router: Router, private route: ActivatedRoute, private rideService: RideService, private spinner: NgxSpinnerService, private dynamicScriptLoader: DynamicScriptLoaderService,private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.unloadScripts();
    this.loadScripts();
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
  get formattedDate(): string {
    return this.datePipe.transform(this.ride.date, 'dd MMM yyyy');
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'tiny-slider', 'flatpickr', 'glightbox', 'functions', 'sticky').then(data => {
    }).catch(error => console.log(error));
  }

  private unloadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'tiny-slider', 'flatpickr', 'glightbox', 'functions', 'sticky').then(data => {
        }).catch(error => console.log(error));
    }

    ngOnDestroy()
    {
      this.unloadScripts();
    }
  }
