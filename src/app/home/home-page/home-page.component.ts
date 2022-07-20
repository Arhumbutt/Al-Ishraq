import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '@app/shared/validators';
import { HomeService } from '@app/home/shared';
import { ConstantService, VerserTypeIdEnum } from '@app/shared/services';
import { environment } from '@env/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedBackComponent } from '../feed-back/feed-back.component';


declare var $;
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  homeForm: FormGroup;
  verserTypeIdEnum: typeof VerserTypeIdEnum;
  translations: any;
  translationData: any;
  aciveIndex: number;
  keyword = 'Text';
  config = {
    itemsPerPage: this.constantService.defaultItemPerPage,
    currentPage: this.constantService.defaultPage,
    totalItems: 0,
    id: 'custom'
  };
  autoData: any;
  allVerseTypes: any;
  isValidUser: boolean;
  toHighlight: any;
  results: any;
  data: any;
  isTranslationLoaded: boolean;
  isSearchText: boolean;
  isNotFound: boolean;
  dataCount: any;
  dataOfTheDay: any = [];
  verseTypeArray: any = [];
  searchedText: any;
  qType: "HomeScreen";
  footerForm: FormGroup;
  verseTypeId: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private validationService: ValidationService,
    private homeService: HomeService,
    public constantService: ConstantService,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private ngbModal: NgbModal

  ) {
  }

  ngOnInit(): void {
  
    this.verserTypeIdEnum = VerserTypeIdEnum;
    this.bindForm();
    this.config.currentPage = this.constantService.defaultPage;
    this.config.itemsPerPage = this.constantService.defaultItemPerPage;
    this.getAllVerseTypes();
    this.isValidUser = this.authenticationService.getValidUser();

    this.activatedRoute.queryParams.subscribe(params => {
      if (params.tag) {
        this.homeForm.controls.searchText.patchValue(params.tag);
        this.getAllTranslationTexts();
      };
    });
    this.homeInit();
  }
  

  homePage() {
    this.router.navigate(['']);
    if (this.router.url == '') {
      this.constantService.homeInitEvent.emit();
    }
  }
  homeInit() {
    this.constantService.homeInitEvent.subscribe(
      () => {
        this.isSearchText = false;
        this.translationData = [];
        this.translations = [];
        this.verseTypeArray = [];
        this.config.currentPage = this.constantService.defaultPage;
        this.config.itemsPerPage = this.constantService.defaultItemPerPage;
        this.isTranslationLoaded = false;
        this.homeForm.controls.searchText.setValue(null);
        this.homeForm.controls.verseType.setValue([]);
        this.allVerseTypes.forEach(element => {
          element.isActive = false;
        });
      }
    )
  }

  slider() {
    $('.slick-content-slider').slick({
      // autoplay: 8000,
      dots: true,
      infinite: true,
      loop: true,
      speed: 1500,
      arrows: false
    });
  }

  private bindForm(): void {
    this.homeForm = this.formBuilder.group({
      searchText: [null],
      verseType: [[]],
      verseTypeId : 0
    });
    this.footerForm = this.formBuilder.group({
      email: [null, Validators.pattern(this.validationService.regEmail)],
      timezone: [0],
    });
  }

  subscribeEmail(): void {
    if (this.footerForm.controls.email.value) {
      const timeZone = this.constantService.timezone();
      this.footerForm.controls.timezone.setValue(timeZone);
      this.homeService.subscribeEmail(this.footerForm.value).subscribe(
        data => {
          this.footerForm.controls.email.setValue(null);
          this.footerForm.controls.email.markAsUntouched();
          if (data.Data == false) {
            this.toastrService.info(data.Message);
            return;
          }
          this.toastrService.success(data.Message);
        });
    }
  }

  getAllVerseTypes(): void {
    this.allVerseTypes = this.constantService.verseTypesData;
  }

  getDataOfTheDay(): void {
    const timeZone = this.constantService.timezone();
    this.homeService.getDataOfTheDay(timeZone).subscribe(
      data => {
        this.dataOfTheDay = data.Data;
        let bayanOfTheDay = this.dataOfTheDay.find(x=>x.VerseTypeDescription == 'Bayaan').GujratiText;
        let linesOfBayan = bayanOfTheDay.split('؛،');
        let randomNumber = Math.floor(Math.random() * linesOfBayan.length);
        let followUpLineNo = randomNumber < linesOfBayan.length && randomNumber > 0 ? randomNumber - 1 : randomNumber + 1;

        if(followUpLineNo > randomNumber){
          followUpLineNo--;
          randomNumber++;
        }

        this.dataOfTheDay.find(x=>x.VerseTypeDescription == 'Bayaan').GujratiText = linesOfBayan[followUpLineNo] + '؛،' + linesOfBayan[randomNumber];
        //this.dataOfTheDay.find(x=>x.VerseTypeDescription == 'Bayaan').Title = this.dataOfTheDay.find(x=>x.VerseTypeDescription == 'Bayaan').InBookReference;

        setTimeout(() => {
          this.slider();
        }, 100);

      },
      error => {
      });
  }


  tabChange(allVerseType?): void {
    const id = allVerseType.Id;
    if (this.verseTypeArray.includes(id)) {
      const index = this.verseTypeArray.indexOf(id);
      if (index > -1) {
        this.verseTypeArray.splice(index, 1);
      }
      allVerseType.isActive = false;
    } else {
      allVerseType.isActive = true;
      this.verseTypeArray.push(id);
    }
    this.getAllTranslationTexts();

  }

  checkTabActive(id) {
    if (this.verseTypeArray.includes(id)) {
      return true;
    }
    return false
  }

  searchWithText(): void {
    this.config.currentPage = this.constantService.defaultPage;
    this.config.itemsPerPage = this.constantService.defaultItemPerPage;
    if (this.homeForm.value.searchText != null && this.homeForm.value.searchText !== '') {
      this.isSearchText = true;
      this.getAllTranslationTexts();
    }

  }

  onChangeSearch(text): void {
    if (text.length < 3) {
      this.isNotFound = false;
      return;
    }
    this.isNotFound = true;
    this.getAllAutoCompleteSearch(text);
  }

  getAllAutoCompleteSearch(text): void {
    this.homeService.getAllAutoCompleteSearch(text).subscribe(
      data => {
        this.autoData = data.Data;
      },
      error => {
      });
  }

  getAllTranslationTexts(): void {
    if (this.homeForm.value.searchText?.length < 3) {
      return;
    }
    this.searchedText = this.homeForm.value.searchText;
    this.verseTypeId = this.homeForm.value.verseTypeId;
    this.homeService.getAllTranslationTexts(this.verseTypeId > 0 ? this.verseTypeId :this.verseTypeArray.toString(), this.config, this.homeForm.value.searchText).subscribe(
      data => {
        this.isSearchText = true;
        this.translationData = data.Data;
        this.data = data.Data.Data;
        this.translations = data.Data.Data;
        this.setTags();
        this.config.totalItems = data.Data.TotalRecords;
        this.config.currentPage = data.Data.PageNumber;
        console.log(data.Data);
        this.isTranslationLoaded = true;
      });
  }
  setTags(): void {
    this.translations.forEach(translation => {
      let tags = [];
      tags = translation?.Tags?.split('#');
      tags = this.constantService.removeEmptyValues(tags);
      translation.tagList = tags;
    });
  }

  closed(): void {
    this.translations = [];
    this.isTranslationLoaded = false;
    this.toHighlight = '';
    this.isSearchText = false;
    this.autoData = [];
  }
  searchByCategory()
  {
    this.searchedText = this.homeForm.value.searchText;
    this.verseTypeId = this.homeForm.value.verseType;
    
    // if(this.searchedText !== "" && this.verseTypeId !== '' )
    // {
      this.homeService.searchByCategory(this.verseTypeId, this.config, this.homeForm.value.searchText).subscribe(
        data => {
          this.isSearchText = true;
          this.translationData = data.data;
          this.translations = data.data;
          // this.setTags();
          this.config.totalItems = data.total;
          // this.config.currentPage = data.;
        
          this.isTranslationLoaded = true;
        });
    // }
    
  }

  search(event): void {
    if (event) {
      this.toHighlight = event;
    }
  }

  activeIndexFunc(indx): void {
    this.aciveIndex = indx;
  }

  onPageChange(event): void {
    this.config.currentPage = event;
    this.getAllTranslationTexts();
  }

  selectEvent(val, index?): void {
    let totalItem = this.config.totalItems;
    let recordNo;
    if (index != null) {
      recordNo = (index + 1) + ((this.config.currentPage - 1) * this.config.itemsPerPage);
    } else {
      recordNo = 1;
      totalItem = this.autoData.length;
    }
    this.router.navigate(['app', 'home', 'tranlation-detail', val.Id],
      {
        queryParams: {
          recordNo: recordNo, currentPage: this.config.currentPage,
          verseType: this.verseTypeArray.toString(), searchText: this.homeForm.value.searchText
          , totalItem: totalItem
        }
      });
  }

  edit(id): void {
    this.router.navigate(['app', 'home', 'question', id]);
  }

  addTranslation(): void {
    this.router.navigate(['app', 'home', 'question']);
  }

  checkcolor(i): number {
    return i % 3;
  }

  tagClick(tagName): void {
    this.router.navigate(['/'], { queryParams: { tag: tagName } });
  }


  openFeedBack() {
    const modalRef = this.ngbModal.open(FeedBackComponent, {
      size: 'md',
      windowClass: 'gateway-modal',
      backdrop: true,
      keyboard: false,
    });
    modalRef.result.then((result) => {
      if (result) {
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  navigateToAqwaalDetailPage(id , index)
  {
    this.router.navigate(['aqwal/aqwal-detail'] , {queryParams:{id:id , Hdno: index +1}})
  }
  navigateToHadeethDetailPage(id , index)
  {
    this.router.navigate(['hadith/hadith-detail'] , {queryParams:{id:id , Hdno: index +1 , currentPage: this.config.currentPage , totalItems:this.config.totalItems}})
  }
  navigateToKalaamDetailPage(id , index)
  {
    this.router.navigate(['kalam/kalam-detail'] , {queryParams:{id:id , Hdno: index +1}})
  }
  navigateToQasidaDetailPage(id)
  {
    this.router.navigate(['qasida/qasida-detail'] , {queryParams:{id:id}})
  }
  navigateToDetailPage(id)
  {
    this.router.navigate(['bayan/bayan-detail'] , {queryParams:{id:id , verseType: this.verseTypeId ,currentPage: this.config.currentPage , totalItems:this.config.totalItems}})
  }

  
}
