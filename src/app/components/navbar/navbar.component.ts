import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  public $isAuth: boolean = false;

  constructor(
    private translate: TranslateService,
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.$isAuth.subscribe({
      next: (res) => this.$isAuth = res,
      error: (error) => console.log(error)
    });
  }

  logout() {
    Swal.fire({
      title: this.translate.instant('logout_sure'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#BFD87B',
      cancelButtonColor: '#D6C991',
      confirmButtonText: this.translate.instant('yes_logout'),
      cancelButtonText: this.translate.instant('cancel')
    }).then((result) => {
      if(result.isConfirmed) {
        this.cookieService.delete("token");
        this.userService.$isAuth.next(false);
        this.router.navigate(['home']);
      }
    });
  }

}
