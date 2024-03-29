import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {DynamicScriptLoaderService} from "../../../shared/service/dynamic-script-loader-service.service";
import {UserService} from "../../../data/service/user.service";
import {User} from "../../../data/schema/user";

@Component({
  selector: 'app-account-layout-user',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.css']
})
export class AccountLayoutComponent implements OnInit, AfterViewInit {
  user: User;

  constructor(private router: Router, private dynamicScriptLoader: DynamicScriptLoaderService, private userService: UserService) {

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

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }
}
