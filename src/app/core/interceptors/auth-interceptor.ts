import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
const Auth = inject(AuthService);
const token = Auth.gettokenfromlocalstorage

if(token){const cloned= req.clone({
  setHeaders:{authorization:`bearer${token}`}
 })
return next(cloned)}
return next(req);
};
