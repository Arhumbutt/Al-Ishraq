import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConstantService } from '@app/shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  allVerseTypes: any;
  id: any;
  isActive: boolean;
  constructor(
    private router: Router,
    public constantService: ConstantService) {}
  ngOnInit(): void {
    this.getAllVerseTypes()
  }
  getAllVerseTypes(): void {
    this.allVerseTypes = this.constantService.verseTypesData;
  }

  homePage() {
    this.router.navigate(['']);
    if (this.router.url == '') {
      this.constantService.homeInitEvent.emit();
    }
  }

}
