import {Component, OnInit} from '@angular/core';
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";
import {UserService} from "../../../../data/service/user.service";
import {RideService} from "../../../../data/service/ride.service";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit{


  totalRides:number;
  totalUsers:number;
  totalReports:number;

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private userService:UserService, private rideService:RideService) {
  }
  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'overlayscrollbars', 'apexcharts', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

  private unloadScripts() {
    this.dynamicScriptLoader.unload('bootstrap.bundle.min', 'overlayscrollbars', 'apexcharts', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

  private load() {
    this.unloadScripts();
    this.loadScripts();
  }

  ngOnInit() {
    this.load();
  }
}
