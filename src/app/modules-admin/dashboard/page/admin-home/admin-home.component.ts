import {Component, OnInit} from '@angular/core';
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit{


  // totalRide:number;
  // totalRide:number;
  // totalRide:number;
  // totalRide:number;

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) {
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
