import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomeEndPoints } from '@app/shared/endpoints/home';
import { ApiService } from '@app/shared/services';
import { BaseService } from '@app/shared/services/base.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FooterService extends BaseService<any> {

  constructor(
    httpClient: HttpClient,
    private apiService: ApiService,
    private homeEndPoints: HomeEndPoints,
  ) {
    super(
      httpClient,
      environment.api_uri);
  }
}
