import {Component, OnDestroy, OnInit} from '@angular/core';
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";

@Component({
  selector: 'app-account-feedback',
  templateUrl: './account-feedback.component.html',
  styleUrls: []
})
export class AccountFeedbackComponent implements OnInit,OnDestroy{

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) {
  }


  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'flatpickr', 'glightbox','functions','aos').then(data => {console.log(data)
    }).catch(error => console.log(error));
  }

  ngOnInit(): void {
    this.loadScripts();
  }
  ngOnDestroy(): void {
    this.dynamicScriptLoader.unload('bootstrap.bundle.min', 'choices', 'flatpickr', 'glightbox', 'functions', 'aos').then(r => console.log(r));
  }
}

