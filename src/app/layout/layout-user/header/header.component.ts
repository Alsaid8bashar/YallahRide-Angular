import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../data/service/user.service";
import {User} from "../../../data/schema/user";
import {SessionStorageService} from "../../../shared/service/session.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private sessionService: SessionStorageService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }


  signOut() {
    this.sessionService.clear();
    localStorage.clear();
    this.router.navigate(['/auth/login'])
  }
}
