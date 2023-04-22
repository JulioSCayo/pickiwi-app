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
  public details: Boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private recordService: RecordService
  ) { 
    this.formCalculator = this.formBuilder.group({
      company:        ['', []],
      type_of_kiwi:   ['', []],
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

  detailsToggle() {
    this.details = !this.details;
    let detailsContainter = document.getElementById("details") as HTMLElement;

    if(this.details) detailsContainter.classList.add("active");
    else detailsContainter.classList.remove("active");
  }

  calculate() {
    this.formCtrl['payment'].setValue(
      this.formCtrl['bins'].value *
      this.formCtrl['bin_payment'].value /
      this.formCtrl['members'].value
    );

    this.recordService.createRecord(this.formCalculator.value).subscribe({
      next: (result) => alert("Expected payment " + this.formCtrl['payment'].value),
      error: (error) => console.log(error)      
    });
  }

}
