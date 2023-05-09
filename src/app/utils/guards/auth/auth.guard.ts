import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if(!this.userService.isAuth()) {
      console.log("Invalid or expired token");
      this.router.navigate(["home"]);
      return false;
    }
    return true;
  }
  
}
