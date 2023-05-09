import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import decode from 'jwt-decode';

import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public $isAuth = new BehaviorSubject(this.isAuth());

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  createUser(data: any) {
    return this.http.post(environment.apiUrl + 'user/create', data);
  }

  updateUser(id: string, data: any) {
    return this.http.patch(environment.apiUrl + 'user/update/' + id, data);
  }

  deleteUser(id: string) {
    return this.http.delete(environment.apiUrl + 'user/delete/' + id);
  }

  findUser(id: string) {
    return this.http.get(environment.apiUrl + 'user/find/' + id);
  }

  findAllUsers() {
    return this.http.get(environment.apiUrl + 'user/all');
  }

  login(data: any) {
    return this.http.post(environment.apiUrl + 'user/login', data);
  }

  isAuth(): boolean {
    const token = this.cookieService.get("token");

    if(!token || this.jwtHelper.isTokenExpired(token)) {
      return false;
    }

    return true;
  }

  getUser() {
    const token = this.cookieService.get("token");
    const payload: any = decode(token);

    delete payload.exp;
    delete payload.iat;

    return payload;
  }

}
