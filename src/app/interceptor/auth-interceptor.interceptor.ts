import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  if(localStorage.getItem('token')){
    let newReq = req.clone({
        headers: req.headers
        .set('Content-type','Application/Json')
        .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    })

    return next(newReq)
  } else return next(req);
};
