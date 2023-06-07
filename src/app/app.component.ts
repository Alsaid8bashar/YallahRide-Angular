import {Component, OnInit} from '@angular/core';
import {DynamicScriptLoaderService} from "./shared/service/dynamic-script-loader-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'YallahRide-Angular';

  ngOnInit(): void {
  }

  //
  // constructor(private dynamicScriptLoader: DynamicScriptLoaderService) {
  // }
  //
  // private loadScripts() {
  //   this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices',  'tiny-slider', 'flatpickr', 'glightbox','functions').then(data => {
  //   }).catch(error => console.log(error));
  // }
  //
  // ngOnInit() {
  //   this.loadScripts();
  // }
}
