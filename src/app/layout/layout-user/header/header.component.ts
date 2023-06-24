import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../data/service/user.service";
import {User} from "../../../data/schema/user";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }


}
