import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Car} from "../schema/car";
import {CarImage} from "../schema/carImage";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private _CarSubject: BehaviorSubject<Car>;
  apiURL = environment.serverUrl + '/Car/';
  private _carImageSubject = new BehaviorSubject<CarImage>(null);

  constructor(private http: HttpClient) {
    this._CarSubject = new BehaviorSubject<Car>(new Car());
  }

  getCarByID(id: number): Observable<Car> {
    this.http.get<Car>(`${this.apiURL}/${id}`).subscribe(
      (car: Car) => {
        this._CarSubject.next(car);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
    return this._CarSubject.asObservable();
  }

  deleteCar(id: number) {
    this.http.delete(`${this.apiURL}/delete/${id}`).subscribe(
      () => {
        console.log('Car deleted successfully');
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  getNumberOfCars(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/statistics`);
  }

}
