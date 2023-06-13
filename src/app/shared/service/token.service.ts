import {Injectable} from '@angular/core';
import {SessionStorageService} from "./session.service";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private sessionService: SessionStorageService) {
  }

  private tokenKey = 'token';

  getToken(): string | null {
    return this.sessionService.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    this.sessionService.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    this.sessionService.removeItem(this.tokenKey);
  }

  extractObjectFromToken(key: string) {
    const tokenWithoutBearer = this.getToken().split('Bearer ')[1];
    const decodedToken: Record<string, any> = jwt_decode(tokenWithoutBearer);
    return decodedToken[key];
  }
}
