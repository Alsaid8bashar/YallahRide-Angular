import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../data/service/user.service";
import {User} from "../../../data/schema/user";
import {TokenService} from "../../../shared/service/token.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  authorities: any = [];
  hasAdminAuth:boolean = false;

  constructor(private userService: UserService, private tokenService: TokenService, private router:Router) {

  }

  ngOnInit(): void {
    this.authorities = this.tokenService.extractObjectFromToken('authorities')
    this.hasAdminAuth = this.authorities.some(obj => obj.id === 1)
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  routeToAdmin() {
    this.router.navigate([`admin/dashboard/home`]);
  }
}
