import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Record } from 'src/app/models/record/record.model';
import { RecordService } from 'src/app/services/record/record.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit{

  public records$: Observable<Record[]> = this.getRecords();

  constructor(
    private recordService: RecordService,
    private userService: UserService
  ) { }

  ngOnInit(): void {

  }

  getRecords() {
    return this.recordService.findAllUserRecords(this.userService.getUser()._id).pipe(map((res: any) => res));
  }

}
