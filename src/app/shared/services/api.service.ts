import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly authApi: string = 'Auth/';
  readonly homeApi: string = 'api/';
  readonly userApi: string = 'api/User/'

  constructor() { }


}
