import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public formSignup: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formSignup = this.formBuilder.group({
      username:         ['', [Validators.required]],
      email:            ['', [Validators.required]],
      password:         ['', [Validators.required]],
      confirm_password:  ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

  }

  signup() {
    console.log(this.formSignup.value);
    
  }

}
