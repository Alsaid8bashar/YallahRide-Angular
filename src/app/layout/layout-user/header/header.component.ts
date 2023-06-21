import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../data/service/user.service";
import {FileStorageService} from "../../../shared/service/file-storage.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  protected imageUrl: string;


  constructor(private userService: UserService) {
    this.imageUrl=userService.getUserSubject().imagePath
  }




}
