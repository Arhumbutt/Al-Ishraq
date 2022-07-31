import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from '@app/shared/services';
import { environment } from '@env/environment';
import { HomeService } from '../shared';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {
  menuForm: FormGroup;
  translations: any;
  translationData: any;
  bayanListData: any;
  subArticles:any=[]
  monthList:any=[]
  subArticleData:any={}
  content:any
  config = {
    categoryName :"Ashara Mubaraka",
    itemsPerPage: this.constantService.defaultItemPerPage,
    currentPage: this.constantService.defaultPage,
    totalItems: 0,
    id: 'custom'
  };
  id: number;
  name: string;
  autoData: any;
  isTranslationLoaded: boolean;
  toHighlight: string;
  isSearchText: boolean;
  keyword = 'definationEN';
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
  constructor(
    private homeService: HomeService,
    private constantService: ConstantService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.qType = +environment.q_type;
    this.qamoos_type = +environment.qamoos_type;
    this.bayaan_type = +environment.bayaan_type;
    this.miqaat_type = +environment.miqaat_type;
    this.qasida_type = +environment.qasida_type;

    this.bindForm();
      this.activatedRoute.paramMap.subscribe(params => {
      this.id = +params.get('id');
      this.name = params.get('name')
      this.config.totalItems = null;
      this.config.currentPage = 1;
      this.menuForm.controls.searchText.setValue('');
      if(this.id != this.bayaan_type || (this.id == this.bayaan_type && this.isSearchText)){
        this.getAllTranslationTexts();
      }
      this.closed();
    });
  }


  private bindForm(): void {
    this.menuForm = this.formBuilder.group({
      searchText: [''],
    });
  }

  getAllAutoCompleteSearch(text): void {
    this.isLoading = true;
    this.homeService.getAllAutoCompleteSearch(text, this.id).subscribe(
      data => {
        this.autoData = data.Data;
        console.log(this.autoData, 'aut0o data')
        this.isNotFound = true;
        this.isSearching = false;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      });
  }

  closed(): void {
    this.isNotFound = false;
    this.isTranslationLoaded = false;
    this.toHighlight = '';
    this.isSearchText = false;
    this.autoData = [];
    this.getAllTranslationTexts()
  }

  search(event): void {
    if (event) {
      this.toHighlight = event;
    }
  }

  onChangeSearch(text): void {
    this.isNotFound = false;
    if(text.length == 0)
    {
      this.getAllTranslationTexts()
    }
    if (text.length < 3) {
     return
    }
    this.searchQamooseData()
  }

  searchWithText(): void {
    this.config.currentPage = this.constantService.defaultPage;
    this.config.itemsPerPage = this.constantService.defaultItemPerPage;
    if (this.menuForm.value.searchText != null && this.menuForm.value.searchText !== '') {
      this.isSearchText = true;
      this.searchQamooseData();
    }

  }

  getAllTranslationTexts(): void {
    window.scrollTo(0,0)
    this.homeService.getQamoose(this.config).subscribe(
      data => {
        this.translations = data.data;
          console.log(this.translations, 'what is in translations')
        this.config.currentPage = this.config.currentPage;
        this.config.totalItems=data.total
      });
  }
  searchQamooseData()
  {
    this.isLoading = true;
    const searchText = this.menuForm.controls.searchText.value;
    this.homeService.searchQamoose(searchText).subscribe(
      data => {
        this.isLoading = false;
        this.translations = data.data;
        this.autoData = data.data;
        this.config.totalItems = data.total;
        this.config.currentPage = this.config.currentPage;
      }, err=> this.isLoading = false);
  }

  onPageChange(event): void {
    window.scrollTo(0,0)
    this.config.currentPage = event;
    this.homeService.getQamoose(this.config).subscribe(
      data => {
        this.translations = data.data;
        this.config.currentPage = this.config.currentPage;
        this.config.totalItems=data.total });
  }

  filterMiqaatMonth(monthNumber): void{
    if(monthNumber == 0){
      this.miqaatBayaanList = this.groupBy(this.translations, trans => trans.MonthArabicName);
      this.miqaatSelectedMonth = "All Months";
    }else{
      this.miqaatBayaanList = this.groupBy(this.translations.filter(x=>x.MonthNumber == monthNumber), trans => trans.MonthArabicName);
      this.miqaatSelectedMonth = this.translations.find(x=>x.MonthNumber == monthNumber).MonthEnglishName;
    }
  }
  getSubArticleDetail(val)
  {
    this.router.navigate(['', 'home', 'tranlation-detail', val],
    {
      queryParams: {
        currentPage: this.config.currentPage,
        verseType: this.id, searchText: this.menuForm.value.searchText
        , totalItem: this.config.totalItems
      }
    });
  }
  selectEvent(val, index?): void {

    if(this.id == this.bayaan_type && val.Id == null){
      this.router.navigate(['', 'home', 'tranlation-detail', val.id ? val.id : 0],
      {
        queryParams: {
          verseType: this.id, searchText: this.menuForm.value.searchText
          , totalItem: this.config.totalItems, year: val.year
        }
      });
    }
    if(val.Id){
      let recordNo;
      if (index) {
        recordNo = (index + 1) + ((this.config.currentPage - 1) * this.config.itemsPerPage);
      } else {
        recordNo = 1;
      }
      this.router.navigate(['', 'home', 'tranlation-detail', val.Id],
      {
        queryParams: {
          recordNo: recordNo, currentPage: this.config.currentPage,
          verseType: this.id, searchText: this.menuForm.value.searchText
          , totalItem: this.config.totalItems
        }
      });
    }
  }

  getAsharaList(articleId)
  {
    this.articleId=articleId
    this.homeService.getSubArticlesByArticleid(articleId).subscribe(
      data => {
        let month=''  , titleArray:any=[]
        this.subArticles=[]

        let dataList= data.sort((a, b)=>  (a.month > b.month ? 1 : -1));

        for( var i =0 ; i < dataList.length ; i++)
        {
           if(dataList[i].month != month)
           {
             if( month != '')
             {
                var obj
                obj={
                  month:month,
                  title:titleArray
                }
                this.subArticles.push(obj)
                titleArray=[]
             }
           }
           month= dataList[i].month
           obj={
            id:dataList[i].id ,
            title:dataList[i].title,
           }
           titleArray.push(obj)
           if(data.length == i+1)
           {
            var obj
            obj={
              month:month,
              title:titleArray
            }

            this.subArticles.push(obj)
           }
        }
        this.dataList= this.subArticles
        // this.getMonthList()
      })
      //  this.monthList=[]
      // this.subArticles=[]
      // this.dataList=[]
      for(let m=0 ; m < this.subArticles.length ; m++)
      {
        let  month =this.subArticles[m].month

         this.monthList.push(month)
      }
  }

  filterByMonth(month)
  {
     if(month != 0)
    {
      this.subArticles = this.dataList.filter(f=> f.month == month)
    }
    else
    {
      const articleId = this.articleId
      this.getAsharaList(articleId)

    }
  }
  getBayanList(value): void {

    this.config.itemsPerPage = 12;
    if(typeof value === "string")
    {
      this.config.categoryName = value
    }
    if(typeof value === "number")
    {
      this.config.currentPage=value
    }
    this.homeService.getArticlesByCategoryName(this.config).subscribe(data=>{
      this.config.totalItems = data.total;
      this.bayanListData = data.data
      const index=0
      let firstArticleId= data.data[index].id
      this.getAsharaList(firstArticleId)
      if (this.miqaat_year == null) {
        this.miqaat_year = this.bayanListData[0].year;
      }
    })
      // this.config.totalItems = data.Data.TotalRecords;
      // this.config.currentPage = data.Data.PageNumber;

    // this.homeService.getAsharaBayanList(this.config).subscribe(
    //   data => {
    //     // this.data = data.Data.Data;
    //     this.bayanListData = data.Data.Data;
    //     this.config.totalItems = data.Data.TotalRecords;
    //     this.config.currentPage = data.Data.PageNumber;
    //     // this.isTranslationLoaded = true;
    //   },
    //   error => {
    //   });
  }

  toArabicNumber(str) : String {
    if(str){
      return  str.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
    }else{
      return "";
    }
  }

  togglePaginationDisplay(strShowHide): void{
    if(strShowHide == "hide"){
      this.isShowPagination = false;
      if (this.menuForm.controls.searchText.value.length > 0) {
      } else {
        this.getMiqaatYearBayanCount();
      }
      this.id = this.miqaat_type;
    }else if(strShowHide == "show"){
      this.isShowPagination = true;
      this.id = this.bayaan_type;
    }
  }

  getMiqaatYearBayanCount(): void {
    this.homeService.getMiqaatBayanCount().subscribe(
      data => {
        this.miqaatCountData = data.Data;
        if (this.miqaat_year == null) {
          this.miqaat_year = this.miqaatCountData[0].YearHijri;

          if(this.miqaatBayaanList == null){
            this.getMiqaatBayanByYear(this.miqaat_year);
          }
        }
      },
      error => {
      });
  }

  getMiqaatBayanByYear(yearHijri): void {
    this.homeService.getMiqaatBayanByYear(yearHijri).subscribe(
      data => {

        this.translations = data.Data;
        this.miqaatBayaanList = this.groupBy(data.Data, trans => trans.MonthArabicName);

        var resArr = [];
          this.translations.forEach(function (item) {
            var i = resArr.findIndex(x => x.MonthNumber == item.MonthNumber);
            if (i <= -1) {
              resArr.push({ MonthNumber: item.MonthNumber, MonthName: item.MonthEnglishName });
            }
          });

          this.miqaatMonthDDL = resArr;
          this.miqaatSelectedMonth = "All Months";
      },
      error => {
      });
  }

  switchMiqaatYear(yearHijri): void{
    this.miqaat_year = yearHijri;
    this.getMiqaatBayanByYear(yearHijri);
  }

  toggleBayanSearch(searchType): void {
    if(searchType === 'Ashara Mubaraka'){
      this.id = this.bayaan_type;
      this.getAllTranslationTexts();
    }else if (searchType === 'miqaat'){
      this.id = this.miqaat_type;
      this.getAllTranslationTexts();
    }
  }

  toggleMobileMenu(): void {
    if(this.isShowMobileMenu){
      this.isShowMobileMenu = false;
    }else{
      this.isShowMobileMenu = true;
    }
  }

  groupBy(list, keyGetter): any {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
  }

  highlightSearchedText(strText): any {
    const pattern = this.toHighlight
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
      .split(' ')
      .filter(t => t.length > 0)
      .join('|');
    const regex = new RegExp(pattern, 'gi');

    return strText.replace(regex, match => `<span class="search-highlight">${match}</span>`);
  }
}
function categoryName(categoryName: any) {
  throw new Error('Function not implemented.');
}

