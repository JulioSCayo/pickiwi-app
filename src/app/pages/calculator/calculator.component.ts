import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecordService } from 'src/app/services/record/record.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit{
  
  public formCalculator: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private recordService: RecordService
  ) { 
    this.formCalculator = this.formBuilder.group({
      company:        ['', []],
      kiwi_type:      ['', []],
      smoko_time:     ['', []],
      lunch_time:     ['', []],
      hours:          ['', []],
      bins:           ['', [Validators.required]],
      hour_payment:   ['', []],
      bin_payment:    ['', [Validators.required]],
      members:        ['', [Validators.required]],
      payment:        ['', [Validators.required]],
      payment_day:    ['', []],
      paid_flag:      ['false', []],
    });
  }  

  ngOnInit(): void {
    
  }

  get formCtrl() {
    return this.formCalculator.controls;
  }

  calculate() {
    this.formCtrl['payment'].setValue(
      this.formCtrl['bins'].value *
      this.formCtrl['bin_payment'].value /
      this.formCtrl['members'].value
    );

    console.log(this.formCalculator.value.payment.toFixed(3));
    

    this.recordService.createRecord(this.formCalculator.value).subscribe({
      next: (result) => console.log("Done"),
      error: (error) => console.log(error)      
    });
  }

}
