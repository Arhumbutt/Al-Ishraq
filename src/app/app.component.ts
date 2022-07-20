import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Alishraaq';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    if (!window.location.href.includes('auth')) {
      const token = this.authenticationService.get('token');
      if (!token) {
        this.router.navigate(['auth', 'login']);
      }
    }

    this.activatedRoute.queryParams.subscribe(params => {
      if (params.tag) {
      }
    });
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(event => {
        if (
          event.id === 1 &&
          event.url.includes('tag')
        ) {
          this.router.navigate(['/']);

        }
      });
  }

}
