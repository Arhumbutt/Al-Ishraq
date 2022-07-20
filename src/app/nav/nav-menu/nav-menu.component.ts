import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '@app/home/shared';
import { ConstantService } from '@app/shared/services';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  allVerseTypes: any;
  id: any;
  isActive: boolean;
  
  constructor(
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private constantService: ConstantService,
  ) { }

  ngOnInit(): void {
    this.getAllVerseTypes();
  }

  getAllVerseTypes(): void {
    this.homeService.getAllVerseTypes().subscribe(
      data => {
        this.allVerseTypes = data.Data;
      },
      error => {
      });
  }

  homePage() {
    this.router.navigate(['app', 'home']);
    if (this.router.url == '/app/home') {
      this.constantService.homeInitEvent.emit();
    }
  }
}
