import { Component } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {DynamicScriptLoaderService} from "../../../shared/service/dynamic-script-loader-service.service";
import {UserService} from "../../../data/service/user.service";

@Component({
  selector: 'app-admin-content-layout',
  templateUrl: './admin-content-layout.component.html',
  styleUrls: ['./admin-content-layout.component.css']
})
export class AdminContentLayout {


  constructor(private router: Router, private dynamicScriptLoader: DynamicScriptLoaderService) {

  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.load();
        this.updateActiveListItem(event.urlAfterRedirects)
      }
    });
  }

  updateActiveListItem(currentRoute: string) {
    console.log(currentRoute);
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'flatpickr', 'glightbox', 'functions', 'aos', 'bs-stepper', 'quill').then(data => {
    }).catch(error => console.log(error));
  }

  private unloadScripts() {
    this.dynamicScriptLoader.unload('bootstrap.bundle.min', 'choices', 'flatpickr', 'glightbox', 'functions', 'aos', 'bs-stepper', 'quill').then(data => {
    }).catch(error => console.log(error));
  }

  private load() {
    this.unloadScripts();
    this.loadScripts();
  }

}
