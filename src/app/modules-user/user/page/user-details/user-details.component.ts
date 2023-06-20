import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {UserDto} from "../../../../data/schema/UserDto";
import {UserDtoService} from "../../../../data/service/user-dto.service";
import {Subscription} from "rxjs";
import {DatePipe} from "@angular/common";
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  private userSub: Subscription;

  protected userDto: UserDto;

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private route: ActivatedRoute, private spinner: NgxSpinnerService, private userDtoService: UserDtoService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.unloadScripts();
    this.loadScripts();
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      console.error(id)
      this.spinner.show();
      this.getUserDto(id);
    });
  }

  getFormattedDate(date: Date): string {
    return this.datePipe.transform(date, 'dd MMM yyyy');
  }

  getFullStars(rate: number): number[] {
    const fullStars = Math.floor(rate);
    return Array(fullStars).fill(0);
  }

  hasHalfStar(rate: number): boolean {
    return rate - Math.floor(rate) >= 0.5;
  }

  getUserDto(id: number) {
    this.userSub = this.userDtoService.getUserDto(id).subscribe(
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

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'overlayscrollbars').then(data => {
    }).catch(error => console.log(error));
  }

  private unloadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'overlayscrollbars').then(data => {
    }).catch(error => console.log(error));
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.unloadScripts();
  }

}
