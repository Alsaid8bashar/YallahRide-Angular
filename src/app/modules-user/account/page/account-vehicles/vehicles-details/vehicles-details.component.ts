import {Component, ElementRef, ViewChild} from '@angular/core';
import {DynamicScriptLoaderService} from "../../../../../shared/service/dynamic-script-loader-service.service";
import {UserService} from "../../../../../data/service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RideService} from "../../../../../data/service/ride.service";
import {PassengerService} from "../../../../../data/service/passenger.service";
import {NgxSpinnerService} from "ngx-spinner";
import {CarService} from "../../../../../data/service/car.service";
import {Subscription} from "rxjs";
import {Car} from "../../../../../data/schema/car";
import Choices from "choices.js";

@Component({
  selector: 'app-vehicles-details',
  templateUrl: './vehicles-details.component.html',
  styleUrls: ['./vehicles-details.component.css']
})
export class VehiclesDetailsComponent {
  protected carSubscription: Subscription;
  car: Car;


  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private carService: CarService, private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.getCar(id);
    });
  }

  getCar(id: number) {
    this.spinner.show();
    this.carSubscription = this.carService.getCarByID(id).subscribe(
      car => {
        this.car = car;
        this.spinner.hide();
      },
      error => {
        console.error(error);
        this.spinner.hide();
      }
    )
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'tiny-slider', 'flatpickr', 'glightbox', 'functions', 'sticky').then(data => {
    }).catch(error => console.log(error));
  }

  private unloadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'tiny-slider', 'flatpickr', 'glightbox', 'functions', 'sticky').then(data => {
    }).catch(error => console.log(error));
  }

  private load(){
    this.unloadScripts();
    this.load();
  }



}
