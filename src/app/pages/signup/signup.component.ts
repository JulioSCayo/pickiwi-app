import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user/user.service';
import { confirmPassword } from 'src/app/utils/validators/confirm-password.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public formSignup: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private translate: TranslateService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.formSignup = this.formBuilder.group({
      username:           ['', [Validators.required]],
      email:              ['', [Validators.required, Validators.email]],
      password:           ['', [Validators.required]],
      confirm_password:   ['', [Validators.required]],
    },
    { 
      validator: [confirmPassword('password', 'confirm_password')]
    });
  }

  ngOnInit(): void {

  }

  signup() {
    this.formSignup.markAllAsTouched();

    // Early return if data missing
    if(this.formSignup.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.translate.instant('missing_data'),
        confirmButtonColor: '#BFD87B'
      })
      return;
    }

    this.userService.createUser(this.formSignup.value).subscribe({
      next: (res) => {
        this.userService.login(this.formSignup.value).subscribe({
          next: (res: any) => {
            this.cookieService.set("token", res.token, 1);
            this.userService.$isAuth.next(true);
            this.router.navigate(['calculator']);
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: this.translate.instant('there_was_a_problem'),
              text: this.translate.instant(error.error.message),
              confirmButtonColor: '#BFD87B'
            })
            console.log(error);
          }
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: this.translate.instant('there_was_a_problem'),
          text: this.translate.instant(error.error.message),
          confirmButtonColor: '#BFD87B'
        })
        console.log(error);
      }
    });
  }

}
