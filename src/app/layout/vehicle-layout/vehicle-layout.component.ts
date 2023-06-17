import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {DynamicScriptLoaderService} from "../../shared/service/dynamic-script-loader-service.service";

@Component({
  selector: 'app-vehicle-layout',
  templateUrl: './vehicle-layout.component.html',
  styleUrls: ['./vehicle-layout.component.css']
})
export class VehicleLayoutComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private dynamicScriptLoader: DynamicScriptLoaderService) {

  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.load();
      }
    });
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'flatpickr', 'glightbox', 'functions', 'aos', 'bs-stepper', 'quill', 'dropzone').then(data => {
    }).catch(error => console.log(error));
  }

  private unloadScripts() {
    this.dynamicScriptLoader.unload('bootstrap.bundle.min', 'choices', 'flatpickr', 'glightbox', 'functions', 'aos', 'bs-stepper', 'quill', 'dropzone').then(data => {
    }).catch(error => console.log(error));
  }

  private load() {
    this.unloadScripts();
    this.loadScripts();
  }

  ngOnInit(): void {
    this.load();
  }

}
