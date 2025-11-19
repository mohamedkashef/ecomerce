import { HttpInterceptorFn } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { inject, Injectable } from '@angular/core';
import { Auth } from '../services/auth';
import { SKIP_AUTH_HEADER } from '../http/http-context.tokens';


export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(Auth);
  const jwtHelper = new JwtHelperService();


  if (req.context.get(SKIP_AUTH_HEADER)) {
    return next(req);
  }

  const token = authService.getToken();


  if (token && !jwtHelper.isTokenExpired(token)) {

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authReq);
  }

  return next(req);
  
};

