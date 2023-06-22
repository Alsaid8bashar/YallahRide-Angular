import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ride} from "../../../../data/schema/ride";
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";
import {UserService} from "../../../../data/service/user.service";
import {RideService} from "../../../../data/service/ride.service";
import {AdminDtoService} from "../../../../data/service/admin-dto.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Subscription} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {User} from "../../../../data/schema/user";

@Component({
  selector: 'app-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.css']
})
export class AdminUsersListComponent implements OnInit, OnDestroy {

  userList: User[];
  sub: Subscription;
  isLoaded: boolean = false;

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private userService: UserService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.load();
    this.sub = this.userService.findAllUsers().subscribe(data => {
      this.userList = data;
      this.isLoaded = true;
    }, error => {
      console.log(error);
    })
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'overlayscrollbars', 'choices', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

  private unloadScripts() {
    this.dynamicScriptLoader.unload('bootstrap.bundle.min', 'overlayscrollbars', 'choices', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

  private load() {
    this.unloadScripts();
    this.loadScripts();
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
