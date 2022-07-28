import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from '@app/shared/services';
import { environment } from '@env/environment';
import { forkJoin, Observable } from 'rxjs';
import { concatMap, map, mergeMap, tap } from 'rxjs/operators';
import { HomeService } from '../../home/shared/home.service';
import { SharedDataService } from "./../shared-service";
@Component({
  selector: 'app-quran-listing',
  templateUrl: './quran-listing.component.html',
  styleUrls: ['./quran-listing.component.scss']
})
export class QuranListingComponent implements OnInit {


  quranDataArabic: any;
  quranDataEng: any;
  quranDataTrans: any;
  translationData: any;
  bayanListData: any;
  subArticles:any=[]
  monthList:any=[]
  subArticleData:any={}
  content:any
  id: number;
  name: string;
  autoData: any;
  isTranslationLoaded: boolean;
  toHighlight: string;
  isSearchText: boolean;
  keyword = 'verseText';
  isNotFound: boolean;
  isSearching: any;
  qType: number;
  isLoading: boolean;
  qasida_type: number;
  qamoos_type: number;
  bayaan_type: number;
  miqaat_type: number;
  miqaat_year: number;
  miqaatCountData: any;
  miqaatBayaanList: any;
  miqaatMonthDDL: any;
  miqaatBayanSearchdata: any;
  miqaatSelectedMonth: string = "All Months";
  isShowMobileMenu: boolean = false;
  isShowPagination: boolean = true;
  articleId
  dataList:any=[]
  allVerseTypes:any=[]
  searchedText: any;
  dataCollection:any=[]
  
  dataObject:any={}
  config = {
    itemsPerPage: this.constantService.defaultItemPerPage,
    currentPage: this.constantService.defaultPage,
    totalItems: 0,
    id:'custom'
  };
  constructor(
    private homeService: HomeService,
    private constantService: ConstantService,
    private activatedRoute: ActivatedRoute,
    private sharedDataService:SharedDataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ngZone:NgZone
  ) { }
  array1:any=[]
  array2:any=[]
  array3:any=[]
  searchForm: FormGroup = this.formBuilder.group({
    searchText: ['', Validators.required]
  });
    ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getQuranList()
    this.getAllVerseTypes()
  }

  getAllVerseTypes(): void {
    this.allVerseTypes = this.constantService.verseTypesData;
  }
  getQuranList()
  {
    forkJoin({
      allQuran:this.homeService.getAllQuranTrans(),
      arabic:this.homeService.getAllQuranArabic(this.config),
      trans:this.homeService.getAllQuranTrans(this.config),
      eng:this.homeService.getAllQuranEng(this.config)
    }).subscribe(({allQuran, arabic, trans, eng})=>{
      this.config.totalItems = Math.max(arabic.total, trans.total, eng.total)
      this.config.currentPage = this.config.currentPage;
      let arabicData = arabic.data;
      this.autoData = allQuran.data;
      let translatedData = trans.data;
      let engData = eng.data;
      let maxLength = Math.max(arabicData.length, translatedData.length, engData.length);
      let finalCollection = [];
      let i = 0;
      while (i<maxLength) {
        finalCollection.push({
          arabic:arabicData[i],
          trans:translatedData[i],
          eng:engData[i]
        })
        i++;
      }
      this.dataCollection = finalCollection;
    })
  }
  onChangeSearch(text): void {
    this.isNotFound = false;
    if(text.length == 0)
    {
      this.getQuranList()
    }
    if (text.length < 3) {
     return
    }

  //this.getAllAutoCompleteSearch(text);
    this.searchHadeethData();
   }
  onFocused(){
    this.ngZone.runOutsideAngular(()=>{
      setTimeout(() => {
        let overlayAutocomplete:HTMLElement = document.querySelector('.autocomplete-overlay');
        overlayAutocomplete.remove();
      }, 1000);
    })
  }
   searchHadeethData()
  {
    // const searchText = this.searchForm.controls.searchText.value;

    //   this.homeService.searchHadeeth(this.config, searchText).subscribe(
    //     data => {
    //       this.translations = data.data;
    //       this.config.totalItems=data.data.length
    //       this.config.currentPage = this.config.currentPage;

    //     });


  }
  //  selectEvent(val, index?): void {

  //   if(this.id == this.bayaan_type && val.Id == null){
  //     this.router.navigate([ 'hadith-detail', val.id ? val.id : 0],
  //     {
  //       queryParams: {
  //         verseType: this.id, searchText: this.searchForm.value('searchText')
  //         , totalItem: this.config.totalItems, year: val.year
  //       }
  //     });
  //   }
  //   if(val.Id){
  //     let recordNo;
  //     if (index) {
  //       recordNo = (index + 1) + ((this.config.currentPage - 1) * this.config.itemsPerPage);
  //     } else {
  //       recordNo = 1;
  //     }
  //     this.router.navigate(['', 'home', 'tranlation-detail', val.Id],
  //     {
  //       queryParams: {
  //         recordNo: recordNo, currentPage: this.config.currentPage,
  //         verseType: this.id, searchText: this.searchForm.value.searchText
  //         , totalItem: this.config.totalItems
  //       }
  //     });
  //   }
  //   }

  navigateToDetailPage(item )
  {
    // this.router.navigate(['quran/quran-detail'] , {queryParams:{translationId:item.trans.translationID , chapterId:item.trans.chapterID, verseId:item.trans.verseId }})
  }
    closed(): void {
      this.isNotFound = false;
      this.isTranslationLoaded = false;
      this.toHighlight = '';
      this.isSearchText = false;
      this.autoData = [];
    }

    search(event): void {
      if (event) {
        this.toHighlight = event;
      }
    }

    // searchWithText(): void {
    //   this.config.currentPage = this.constantService.defaultPage;
    //   this.config.itemsPerPage = this.constantService.defaultItemPerPage;
    //   if (this.searchForm.value.searchText != null && this.searchForm.value.searchText !== '') {
    //     this.isSearchText = true;
    //     // this.getAllTranslationTexts();
    //   }

    // }

    togglePaginationDisplay(strShowHide): void{
      if(strShowHide == "hide"){
        this.isShowPagination = false;
        // if (this.menuForm.controls.searchText.value.length > 0) {
        // } else {
        //   this.getMiqaatYearBayanCount();
        // }
        this.id = this.miqaat_type;
      }else if(strShowHide == "show"){
        this.isShowPagination = true;
        this.id = this.bayaan_type;
      }
    }

    toggleMobileMenu(): void {
      if(this.isShowMobileMenu){
        this.isShowMobileMenu = false;
      }else{
        this.isShowMobileMenu = true;
      }
    }

    toArabicNumber(str) : String {
      if(str){
        return  str.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
      }else{
        return "";
      }
    }
    onPageChange(event): void {
      window.scrollTo(0,0)
      this.config.currentPage = event;
      // if(this.id == this.bayaan_type && !this.isSearchText){
        this.getQuranList();
      // }else
      // if(this.id != this.bayaan_type || this.isSearchText){
      //   this.getAllTranslationTexts();
      // }
    }


}
