import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from '@app/shared/services';
import { environment } from '@env/environment';
import { forkJoin, Observable } from 'rxjs';
import { concatMap, map, mergeMap } from 'rxjs/operators';
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
  keyword = 'Text';
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
    private formBuilder: FormBuilder
  ) { }
  array1:any=[]
  array2:any=[]
  array3:any=[]
  searchForm: FormGroup = this.formBuilder.group({
    searchText: ['', Validators.required]
  });
    ngOnInit(): void {
    window.scrollTo(0, 0);
  
        this.homeService.getAllQuranArabic(this.config).subscribe(async data=>{
      // debugger
      this.array1= await data.data
      this.array1.forEach((list, index) => {
        // debugger
        this.dataCollection[index].arabic = list.verseText
  
      });
    })
      //  this.homeService.getAllQuranEng(this.config).subscribe(data=>{
      //   this.array2=data.data

      //   this.array2.forEach((data, index) => {

      //     this.dataCollection[index].eng = data?.verseText
    
      //   });
      //  })
      //  this.homeService.getAllQuranEng(this.config).subscribe(data=>{
      //   this.array3=data.data

      //   this.array3.forEach((data, index) => {
      //     this.dataCollection[index].trans = data?.verseText
    
      //   });
      //  })
      

      

      
     console.log('collection',this.dataCollection)
    // observable.subscribe({
    //   next: (value) => 
    //   {
    //     arabic: value.arabic.data.map(d=>{d.verseText})
    //     eng: value.eng.data.map(d=>{d.verseText})
    //     arabic: value.trans.data.map(d=>{d.verseText})
    //   },
    //   complete: () => console.log('Completes with Success!'),
    // });
    // this.homeService.getAllQuranArabic(this.config).subscribe(data=>{
    //   this.array1=data.data
    // })
    // this.homeService.getAllQuranEng(this.config).subscribe(data=>{
    //   this.array2=data.data
    // })
    // this.homeService.getAllQuranEng(this.config).subscribe(data=>{
    //   this.array3=data.data
    // })
    // forkJoin([this.array1, this.array2, this.array3])
    // .pipe(map(([data1, data2 , data3]) => 
    // {
    //   console.log(data1)
    //   console.log(data2)
    //   console.log(data3)
    // }))
  }
  getAllVerseTypes(): void {
    this.allVerseTypes = this.constantService.verseTypesData;
  }
  getQuranList()
  {
    
   
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

  navigateToDetailPage(id , index)
  {
    this.router.navigate(['quran/quran-detail'] , {queryParams:{id:id , recordNo: index +1 , currentPage: this.config.currentPage , totalItems:this.config.totalItems}})
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

      this.config.currentPage = event;
      // if(this.id == this.bayaan_type && !this.isSearchText){
        this.getQuranList();
      // }else
      // if(this.id != this.bayaan_type || this.isSearchText){
      //   this.getAllTranslationTexts();
      // }
    }


}
