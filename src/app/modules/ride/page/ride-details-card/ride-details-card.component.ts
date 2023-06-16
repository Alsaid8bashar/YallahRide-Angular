import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Ride} from "../../../../data/schema/ride";
import {ActivatedRoute, Router} from "@angular/router";
import {RideService} from "../../../../data/service/ride.service";
import {NgxSpinnerService} from "ngx-spinner";
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-ride-details-card',
  templateUrl: './ride-details-card.component.html',
  styleUrls: ['./ride-details-card.component.css']
})
export class RideDetailsCardComponent implements OnInit, OnDestroy {
  @Input()
  ride: Ride;

  constructor(private router: Router, private route: ActivatedRoute, private rideService: RideService, private spinner: NgxSpinnerService, private dynamicScriptLoader: DynamicScriptLoaderService, private datePipe: DatePipe) {
  }

  get getRideTime(): string {
    const arrivalTime = new Date();
    const arrivalTimeString = this.ride.arrivalTime.toString();
    const arrivalTimeParts = arrivalTimeString.split(":");
    arrivalTime.setHours(parseInt(arrivalTimeParts[0]));
    arrivalTime.setMinutes(parseInt(arrivalTimeParts[1]));

    const departureTime = new Date();
    const departureTimeString = this.ride.departureTime.toString();
    const departureTimeParts = departureTimeString.split(":");
    departureTime.setHours(parseInt(departureTimeParts[0]));
    departureTime.setMinutes(parseInt(departureTimeParts[1]));

    // Check if the departure time is before the arrival time
    const rideTimeInMinutes = Math.floor((departureTime.getTime() - arrivalTime.getTime()) / (1000 * 60));

    const hours = Math.abs(Math.floor(rideTimeInMinutes / 60));
    const minutes = Math.abs(rideTimeInMinutes % 60);
    return `${hours}hr ${minutes}min`;
  }

  get formattedDate(): string {
    return this.datePipe.transform(this.ride.departureDate, 'dd MMM yyyy');
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'tiny-slider', 'flatpickr', 'glightbox', 'functions', 'sticky', 'nouislider').then(data => {
    }).catch(error => console.log(error));
  }

  private unloadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'tiny-slider', 'flatpickr', 'glightbox', 'functions', 'sticky', 'nouislider').then(data => {
    }).catch(error => console.log(error));
  }

  ngOnDestroy() {
    this.unloadScripts();
  }

  ngOnInit(): void {
    this.unloadScripts();
    this.loadScripts();
  }

}
