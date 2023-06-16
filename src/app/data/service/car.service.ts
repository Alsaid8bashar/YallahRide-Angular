import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Car} from "../schema/car";
import {CarImage} from "../schema/carImage";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiURL = environment.serverUrl + 'car/';
  private cars: Car[];


  setCars(cars: Car[]): void {
    this.cars = cars;
  }

  getCars(): Car[] {
    return this.cars;
  }
  constructor(private http: HttpClient) {
  }

  getCarByID(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiURL}${id}`);
  }

  getUserCars(id: number): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiURL}user/${id}`);
  }

  saveCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.apiURL}create`, car);
  }

  // addCarImage(carId: number, carImage: CarImage): Observable<Car> {
  //   return this.http.post<Car>(`${this.apiURL}create`, car);
  // }

  getCarImage(id: number): Observable<CarImage []> {
    return this.http.get<CarImage[]>(`${this.apiURL}all/images/${id}`);
  }

  deleteCarImage(imageId: number) {
    return this.http.delete(`${this.apiURL}delete-image/${imageId}`);
  }

  deleteCar(id: number) {
    return this.http.delete(`${this.apiURL}delete/${id}`);
  }

  getNumberOfCars(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}statistics`);
  }

}
