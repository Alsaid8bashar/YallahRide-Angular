import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {DynamicScriptLoaderService} from "../../shared/service/dynamic-script-loader-service.service";

@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.css']
})
export class AccountLayoutComponent implements AfterViewInit {
  constructor(private router: Router,private dynamicScriptLoader: DynamicScriptLoaderService) {

  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.unloadScripts();
        this.loadScripts();
      }
    });
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'flatpickr', 'glightbox','functions','aos').then(data => {console.log(data)
    }).catch(error => console.log(error));
  }
  private unloadScripts() {
    this.dynamicScriptLoader.unload('bootstrap.bundle.min', 'choices', 'flatpickr', 'glightbox','functions','aos').then(data => {console.log(data)
    }).catch(error => console.log(error));
    console.log("Hasan")
  }
}
