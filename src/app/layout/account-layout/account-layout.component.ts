import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {DynamicScriptLoaderService} from "../../shared/service/dynamic-script-loader-service.service";

@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.css']
})
export class AccountLayoutComponent implements OnInit, AfterViewInit {
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
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'flatpickr', 'glightbox', 'functions', 'aos', 'bs-stepper', 'quill', 'dropzone').then(data => {
      console.log(data)
    }).catch(error => console.log(error));
  }

  private unloadScripts() {
    this.dynamicScriptLoader.unload('bootstrap.bundle.min', 'choices', 'flatpickr', 'glightbox', 'functions', 'aos', 'bs-stepper', 'quill', 'dropzone').then(data => {
      console.log(data)
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
