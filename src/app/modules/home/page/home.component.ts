import { Component } from '@angular/core';
import {DynamicScriptLoaderService} from "../../../shared/service/dynamic-script-loader-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {


  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) {
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices',  'tiny-slider', 'flatpickr', 'glightbox','functions').then(data => {
    }).catch(error => console.log(error));
  }

  ngOnInit() {
    this.loadScripts();
  }

}
