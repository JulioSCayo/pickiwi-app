import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) { }

  createRecord(data: any) {
    return this.http.post(environment.apiUrl + 'record/create', data);
  }

  updateRecord(id: string, data: any) {
    return this.http.patch(environment.apiUrl + 'record/update/' + id, data);
  }

  deleteRecord(id: string) {
    return this.http.delete(environment.apiUrl + 'record/delete/' + id);
  }

  findRecord(id: string) {
    return this.http.get(environment.apiUrl + 'record/find/' + id);
  }

  findAllRecords() {
    return this.http.get(environment.apiUrl + 'record/all');
  }
}
