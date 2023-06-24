import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserDto} from "../../../../data/schema/UserDto";
import {NgxSpinnerService} from "ngx-spinner";
import {UserDtoService} from "../../../../data/service/user-dto.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-user-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.css']
})
export class AdminUserDetailsComponent implements OnInit,OnDestroy{


  public userDto: UserDto;
  sub:Subscription;

  constructor(private spinner: NgxSpinnerService, private userDtoService: UserDtoService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.sub =     this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      console.error(id)
      this.spinner.show();
      this.getUserDto(id);
    });
  }

  getUserDto(id: number) {
    this.sub = this.userDtoService.getUserDto(id).subscribe(
      value => {
        this.userDto = value;
        this.spinner.hide();
      },
      error => {
        console.error(error);
        this.spinner.hide();
      }
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
