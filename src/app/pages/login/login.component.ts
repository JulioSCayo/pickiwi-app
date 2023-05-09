import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private translate: TranslateService,
    private router: Router
  ) {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    
  }

  login() {
    this.formLogin.markAllAsTouched();
    
    // Early return if data missing
    if(this.formLogin.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.translate.instant('missing_data'),
        confirmButtonColor: '#BFD87B'
      })
      return;
    }

    this.userService.login(this.formLogin.value).subscribe({
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
  }

}
