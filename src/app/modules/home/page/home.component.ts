import {Component, OnInit} from '@angular/core';
import {DynamicScriptLoaderService} from "../../../shared/service/dynamic-script-loader-service.service";
import {RideService} from "../../../data/service/ride.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../data/schema/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  searchForRideFrom: FormGroup;

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private rideService: RideService, private router: Router) {
    this.loadScripts();
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'tiny-slider', 'flatpickr', 'glightbox', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

  ngOnInit() {

    this.buildForm();
  }


  buildForm(): void {
    this.searchForRideFrom = new FormGroup({
      drop: new FormControl('', Validators.required),
      pickup: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.searchForRideFrom.valid) {
      this.router.navigate(['/rides'], {queryParams: this.searchForRideFrom.value});
    } else {
      this.searchForRideFrom.markAllAsTouched();
    }
  }


}
