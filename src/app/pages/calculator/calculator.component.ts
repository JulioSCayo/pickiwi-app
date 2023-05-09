import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RecordService } from 'src/app/services/record/record.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

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
    private recordService: RecordService,
    private translate: TranslateService,
    private userService: UserService,
  ) { 
    this.formCalculator = this.formBuilder.group({
      user_id:          ['', []],
      company:          ['', []],
      type_of_kiwi:     ['', []],
      smoko_time:       ['', []],
      lunch_time:       ['', []],
      hours:            ['', []],
      bins:             ['', [Validators.required]],
      hourly_payment:   ['', []],
      bin_payment:      ['', [Validators.required]],
      members:          ['', [Validators.required]],
      payment:          ['', []],
      payment_day:      ['', []],
      paid_flag:        ['false', []],
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
    this.formCalculator.markAllAsTouched();

    // Early return if data missing
    if(this.formCalculator.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.translate.instant('missing_data'),
        confirmButtonColor: '#BFD87B'
      })
      return;
    }

    // Set payment
    this.formCtrl['payment'].setValue(
      this.formCtrl['bins'].value *
      this.formCtrl['bin_payment'].value /
      this.formCtrl['members'].value
    );

    if(this.formCtrl['hours'].value && this.formCtrl['hourly_payment'].value) {
      const workHours = this.formCtrl['hours'].value - (this.formCtrl['smoko_time'].value + this.formCtrl['lunch_time'].value) / 60;

      if(this.formCtrl['payment'].value / workHours < this.formCtrl['hourly_payment'].value) {
        this.formCtrl['payment'].setValue(workHours * this.formCtrl['hourly_payment'].value)
      }
      
    }
    
    // If user is authenticated the calculator is saved, including user's id
    if(this.userService.isAuth()) {
      this.formCtrl['user_id'].setValue(this.userService.getUser()._id);

      this.recordService.createRecord(this.formCalculator.value).subscribe({
        next: (result: any) => {
          Swal.fire({
            icon: 'success',
            title: this.translate.instant('expected_payment') + ': $' + this.formCtrl['payment'].value.toFixed(0),
            confirmButtonColor: '#BFD87B'
          })

          this.formCalculator.reset();
        },
        error: (error) => console.log(error)      
      });
    }
    // If not, only shows the result
    else {
      Swal.fire({
        icon: 'success',
        title: this.translate.instant('expected_payment') + ': $' + this.formCtrl['payment'].value.toFixed(0),
        confirmButtonColor: '#BFD87B'
      })
    }
  }

}
