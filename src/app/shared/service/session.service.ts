// Import the necessary modules-user
import {Injectable} from '@angular/core';
import {UserService} from "../../data/service/user.service";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() {
  }

  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
