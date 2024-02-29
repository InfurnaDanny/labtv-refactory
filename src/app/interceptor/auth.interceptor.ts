import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req.clone({headers: req.headers.set('Content-type','Application/Json')});

    if(localStorage.getItem('loggedIn')){
      let newReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('loggedIn')}`)
      })

      return next.handle(newReq)
    }

    
    return next.handle(req);
  }
}