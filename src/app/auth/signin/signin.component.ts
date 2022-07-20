import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '@app/shared/validators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private authService: AuthService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private validationService: ValidationService
  ) { }

  ngOnInit(): void {
    this.bindForm();
    this.authenticationService.remove('token');
  }

  private bindForm(): void {
    this.signinForm = this.formBuilder.group({
      id: [null, Validators.compose([
        Validators.required,
        Validators.pattern(this.validationService.regKey)
      ])],
      password: [null, Validators.compose([
        Validators.required
      ])],
      isRemember: [false]
    });
  }

  postLogin(search?): void {

    let allowLogin = false;
    let body;
    body = {};
    body.Username = this.signinForm.controls.id.value;
    body.Password = this.signinForm.controls.password.value;

    let authUser;
    this.authService.signInUser(body).subscribe(
      data => {
        authUser = data;

        if (authUser) {
          allowLogin = true;
        }

        if (allowLogin) {
          this.authenticationService.set('token', authUser.accessToken);
          this.authenticationService.set('refreshToken', authUser.refreshToken);
          this.authenticationService.set('validUser', JSON.stringify(authUser));
          this.router.navigate(['/']);
        } else {
          this.toastrService.error('Invalid Username/Password', 'Invalid Credential')
        }
      });
    // if (!this.signinForm.controls.id.invalid && this.signinForm.controls.password.value.length > 5) {
    //   this.authenticationService.set('validUser', 'true');
    //   allowLogin = true;
    // }

    // if (!isNaN(+this.signinForm.controls.id.value) && this.signinForm.controls.id.value.length === 8
    //   && this.signinForm.controls.password.value.length > 5) {
    //   this.authenticationService.set('validUser', 'false');
    //   allowLogin = true;
    // }
  }
}
