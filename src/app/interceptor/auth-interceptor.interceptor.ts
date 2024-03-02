import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';
import { AlertService } from '../shared/components/alert.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const alertService = inject(AlertService);

  if(localStorage.getItem('token')){
    let newReq = req.clone({
        headers: req.headers
        .set('Content-type','Application/Json')
        .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    })

    return next(newReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) router.navigate(['/login']);

        return throwError(()=> {
          alertService.showAlert('error', error.status + ' - ' +  error.name);
          new Error(error.message)
        });
      })
    );
  } else return next(req);
};
