import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

  saveCar(car: Car, carImages:File[]): Observable<Car> {
    const formData: FormData = new FormData();
    formData.append('car', new Blob([JSON.stringify(car)], {
      type: "application/json"
    }));
    for (let i = 0; i < carImages.length; i++) {
      formData.append('carImages', carImages[i], carImages[i].name); // Include the filename
    }
    return this.http.post<Car>(`${this.apiURL}create`, formData);
  }

  uploadCarImages(files: File[]): Observable<CarImage> {
    const formData = new FormData();
    files.forEach((file: File) => {
      formData.append('carImages', file, file.name);
    });
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(`${this.apiURL}upload/carImages`, formData, {headers});
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
