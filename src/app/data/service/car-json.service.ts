import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CarJSON} from "../schema/carJSON";
import {Observable} from "rxjs";


interface Car {
  id: number;
  name: string;
  model_series: ModelSeries[];
}

interface ModelSeries {
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class CarJSONService {




  constructor(private http: HttpClient) {
  }

  fetchCarData() {
    return this.http.get<CarJSON[]>('/assets/cars.json');
  }

}
