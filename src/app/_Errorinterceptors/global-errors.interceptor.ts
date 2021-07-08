import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class GlobalErrorsInterceptor implements HttpInterceptor {

  constructor(private toastr:ToastrService, private route: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error =>{
        if(error){
          switch (error.status) {
            case 400:
              if(error.error.errors){
                const ModelStateError = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    ModelStateError.push(error.error.errors[key]);
                  }
                }
                throw ModelStateError.flat();
              }else if(typeof(error.error)==='object'){
                this.toastr.error(error.status,error.statusText === 'OK' ? 'Bad Request' : error.statusText, error.status);
              }else{
                this.toastr.error(error.error, error.status);
              }             
              break;
            case 401:
                this.toastr.error(error.status,error.statusText === 'OK' ? 'Unauthorized' : error.statusText, error.status);
              break;
            case 500:
                const navigationextras: NavigationExtras = {state: {error: error.error}};
                this.route.navigateByUrl('/server-error', navigationextras);
                  this.toastr.error(error.status,error.statusText === 'OK' ? 'Server Error' : error.statusText, error.status);
              break;
            case 404:
                this.route.navigateByUrl('/not-found');
              break;                      
            default:
                this.toastr.error('Something went totally wrong!');
                console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
