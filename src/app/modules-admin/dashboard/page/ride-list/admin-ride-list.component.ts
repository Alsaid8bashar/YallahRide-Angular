import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ride} from "../../../../data/schema/ride";
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";
import {RideService} from "../../../../data/service/ride.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-ride-list',
  templateUrl: './admin-ride-list.component.html',
  styleUrls: ['./admin-ride-list.component.css']
})
export class AdminRideListComponent implements OnInit, OnDestroy {

  public _rides?: Ride[]
  sub: Subscription;

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private rideService: RideService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.sub = this.rideService.findAllRide().subscribe(data => {
        this._rides = data;
      },
      error => {
        console.log(error);
        this.spinner.hide();
      })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  currentPage: number = 1;
  pageSize: number = 8;
  totalEntries: number = 20;

  get totalPages(): number {
    return Math.ceil(this.totalEntries / this.pageSize);
  }

  setPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

}
