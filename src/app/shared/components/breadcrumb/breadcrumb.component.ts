import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { IBreadCrumb } from './breadcrumb.interface';
import { filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  public breadcrumbs: IBreadCrumb[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    setTimeout(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);

    }, 10);
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe(() => {
      setTimeout(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      }, 10);

    });
  }



  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadCrumb[] = []): IBreadCrumb[] {

    //If no routeConfig is avalailable we are on the root path
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb ? route.routeConfig.data.breadcrumbName ? this.getBreadCrumbName(route) : route.routeConfig.data.breadcrumb : route.routeConfig.data.breadcrumb : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    // If the route is dynamic route such as ':id', remove it
    // const lastRoutePart = path.split('/').pop();
    // const isDynamicRoute = lastRoutePart.startsWith(':');
    // if (isDynamicRoute && !!route.snapshot) {
    //   const paramName = lastRoutePart.split(':')[1];
    //   path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
    //   label = route.snapshot.params[paramName];
    // }

    //In the routeConfig the complete path is not available,
    //so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: IBreadCrumb = {
      label: label,
      url: nextUrl,
    };
    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      //If we are not on our current path yet,
      //there will be more children to look after, to build our breadcumb
      return this.createBreadcrumbs(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }

  getBreadCrumbName(route) {
    return route.snapshot.params.breadcrumbName;
  }

  home(): void{
    this.router.navigate(['/']);
  }
  
}
