import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    if (this.authenticationService.getValidUser()) {
      const authToken = this.authenticationService.get('token');
      if (!authToken) {
        this.authenticationService.loginNavigate();
      } else {
        const authReq = req.clone({
          headers: req.headers.set('Authorization', "Bearer " + authToken)
        });
        return next.handle(authReq);
      }
    }

    // send cloned request with header to the next handler.
    return next.handle(req);
  }
}
