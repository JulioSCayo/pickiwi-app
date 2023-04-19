import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Record } from 'src/app/models/record/record.model';
import { RecordService } from 'src/app/services/record/record.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit{

  public records$: Observable<Record[]> = this.recordService.findAllRecords().pipe(map((res: any) => res));

  constructor(
    private recordService: RecordService
  ) { }

  ngOnInit(): void {

  }

}
