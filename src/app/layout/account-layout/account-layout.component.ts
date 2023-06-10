import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {DynamicScriptLoaderService} from "../../shared/service/dynamic-script-loader-service.service";

@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.css']
})
export class AccountLayoutComponent {

  // constructor(private dynamicScriptLoader: DynamicScriptLoaderService) {
  // }
  //
  //
  // private loadScripts() {
  //   this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'flatpickr', 'glightbox','functions','aos').then(data => {
  //   }).catch(error => console.log(error));
  // }
  //
  // ngOnInit(): void {
  //   this.loadScripts();
  // }
  // ngOnDestroy(): void {
  //   this.dynamicScriptLoader.unload('bootstrap.bundle.min', 'choices', 'flatpickr', 'glightbox', 'functions', 'aos');
  // }

}
