import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DynamicScriptLoaderService} from "../../../../shared/service/dynamic-script-loader-service.service";
import {UserService} from "../../../../data/service/user.service";
import {RideService} from "../../../../data/service/ride.service";
import {AdminDtoService} from "../../../../data/service/admin-dto.service";
import {Account} from "../../../../data/schema/account";
import {Ride} from "../../../../data/schema/ride";
import ReportUser from "../../../../data/schema/reportUser";
import {ReportRide} from "../../../../data/schema/reportRide";
import {Subscription} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import ApexCharts from 'apexcharts';
import {RideStatus} from "../../../../data/schema/Enum/RideStatus";
import {cricleChart} from  "../../../../../assets/js/trafficRoomChart.js"

declare function trafficRoomChart(seriesData: number[]):any;

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  public _accounts?: Account[]

  public _rides?: Ride[]

  public _reportUsers?: ReportUser[]

  public _reportRides?: ReportRide[]

  protected sub: Subscription;
  accountChartLabels = ['Active','Deleted','Inactive'];
  rideChartLabels = ['Canceled', 'Completed', 'Upcoming']
  @ViewChild('ChartTrafficRooms', { static: false }) chartTrafficRooms: ElementRef;



  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private userService: UserService, private rideService: RideService, private adminDto: AdminDtoService, private spinner: NgxSpinnerService) {
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'overlayscrollbars', 'apexcharts', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

  private unloadScripts() {
    this.dynamicScriptLoader.unload('bootstrap.bundle.min', 'overlayscrollbars', 'apexcharts', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

  private load() {
    this.unloadScripts();
    this.loadScripts();
  }

  ngOnInit() {

    this.load();

    this.spinner.show();
    this.sub = this.adminDto.getAdminDto().subscribe(data => {
        this._accounts = data.accounts;
        this._rides = data.rides;
        this._reportUsers = data.reportUsers;
        this._reportRides = data.reportRides;
        cricleChart('#ChartTrafficRooms1',[this.getCountOfCanceledRides(),this.getCountOfCompletedRides(),this.getCountOfUpcomingRides()],this.rideChartLabels)
        cricleChart('#ChartTrafficRooms2',[this.getCountOfActiveAccount(),this.getCountOfDeletedAccount(),this.getCountOfInactiveAccount()],this.accountChartLabels)
        this.spinner.hide();
      },
      error => {
        console.log(error)
        this.spinner.hide();
      }
    )
  }

  getCountOfUpcomingRides()  {
    return this._rides.filter((ride) => ride.rideStatus === RideStatus.Active).length;
  }

  getCountOfCanceledRides()  {
    return this._rides.filter((ride) => ride.rideStatus === RideStatus.Canceled).length;
  }

  getCountOfCompletedRides()  {
    return this._rides.filter((ride) => ride.rideStatus === RideStatus.Completed).length;
  }

  getCountOfActiveAccount() {
    return this._accounts.filter((account) => account.isActive === true).length;
  }

  getCountOfInactiveAccount() {
    return this._accounts.filter((account) => account.isActive === false).length;
  }

  getCountOfDeletedAccount() {
    return this._accounts.filter((account) => account.isDeleted === true).length;
  }

}

