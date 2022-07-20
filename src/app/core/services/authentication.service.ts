import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  token: string;
  constructor(
    private router: Router
  ) {
  }

  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  get(key: string): string {
    return localStorage.getItem(key);
  }

  getValidUser(): boolean {
    if (localStorage.getItem('validUser'))
      return JSON.parse(localStorage.getItem('validUser'));
    else return null;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  loginNavigate(): void {
    this.router.navigate(['auth', 'login']);

  }

  get userFullName(): string {
    let fullName = '';
    let user;
    user = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      fullName = user.FirstName + ' ' + user.LastName;
    }
    return fullName;
  }

  clearStorage(): void {
    localStorage.clear();
  }

}
