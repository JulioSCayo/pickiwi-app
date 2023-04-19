import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

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
}
