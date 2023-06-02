import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveObject(key: string, obj: any) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  getObject(key: string): any {
    const objString = localStorage.getItem(key);
    return JSON.parse(objString);
  }

  removeObject(key: string) {
    localStorage.removeItem(key);
  }
}
