import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-unsubscribe-email',
  templateUrl: './unsubscribe-email.component.html',
  styleUrls: ['./unsubscribe-email.component.scss']
})
export class UnsubscribeEmailComponent implements OnInit {
  email: string;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.email = this.activatedRoute.snapshot.params.email;
    this.unSubscribeEmail();
  }

  unSubscribeEmail(): void {
    let body;
    body = {};
    body.email = this.email;
    this.authService.unSubscribeEmail(body).subscribe(
      data => {
        if (data.Data == false) {
          this.toastrService.error(data.Message);
          this.router.navigate(['auth', 'login']);
          return;
        }
        this.toastrService.success(data.Message);
        this.router.navigate(['auth', 'login']);
      },
      error => {
      });
  }

}
