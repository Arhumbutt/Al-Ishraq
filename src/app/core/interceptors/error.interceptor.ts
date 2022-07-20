import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    public toastrService: ToastrService,
    private router: Router,
    // private authenticationService: AuthenticationService,

  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403 ) {
            let errors = '';
            if (error.error.errors && error.error.errors.$values && error.error.errors.$values.length > 0) {
              error.error.errors.$values.forEach(element => {
                errors += element.ErrorMessage + ' </br>';
              });
            }
            this.toastrService.error(errors, '', { enableHtml: true });
          } else if (error.status === 409) {
            this.toastrService.error( error.error.Message);
          } else if (error.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('validUser');
            this.toastrService.error('Please contact to administrator', 'Unauthorized');
            // const token = this.authenticationService.remove('token');
            this.router.navigate(['auth', 'login']);
          } else {
            this.toastrService.error('Try again after some time.', 'Server is not Responding');
          }
          return throwError(error);
        })
      );
  }
}
