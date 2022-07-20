import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services/base.service';
import { environment } from '@env/environment';
import { ApiService } from '@app/shared/services';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthEndPoints } from '@app/shared/endpoints/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<any> {

  constructor(
    httpClient: HttpClient,
    private apiService: ApiService,
    private authEndPoints: AuthEndPoints,
    private http: HttpClient,
    private httpBackend: HttpBackend,

  ) {
    super(
      httpClient,
      environment.api_uri);
  }


  unSubscribeEmail(body): Observable<any> {
    return this.post(body, this.apiService.homeApi + this.authEndPoints.unsubscribeEmailEndPoint)
      .pipe(map((data: any) => data));
  }

  signInUser(signInForm): Observable<any> {
    return this.post(signInForm, this.apiService.userApi + this.authEndPoints.postLoginEndPoint)
    .pipe(map((data: any) => data ));
  }

}
