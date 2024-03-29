import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(
    private cookieService: CookieService
  ) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieService.get("token");
    
    const tokenHeader = req.clone({
      setHeaders: {
        Authorization: "Bearer " + token
      }
    });

    return next.handle(tokenHeader);
  }
}
