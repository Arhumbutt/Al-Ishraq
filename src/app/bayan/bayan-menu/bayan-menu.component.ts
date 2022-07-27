import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from '../../shared/services/constant.service';
import { environment } from '../../../environments/environment';
import { HomeService } from '../../home/shared/home.service';

@Component({
  selector: 'app-bayan-menu',
  templateUrl: './bayan-menu.component.html',
  styleUrls: ['./bayan-menu.component.scss']
})
export class BayanMenuComponent implements OnInit  {
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
  allSubArticles:any=[]

  translations: any;
  translationData: any;
  bayanListData: any;
  subArticles:any=[]
  monthList:any=[]
  subArticleData:any={}



  constructor(
    private homeService: HomeService,
    private constantService: ConstantService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }
  searchForm: FormGroup = this.formBuilder.group({
    searchText: ['', Validators.required],
    verseType: ['', Validators.required],

  });
  ngOnInit(): void {
    this.getBayanList("Ashara Mubaraka");
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

      this.isShowPagination = true;
      this.isSearchText=false
      let firstArticleId= this.bayanListData[0].id
      this.getAsharaList(firstArticleId)
      this.miqaat_year = this.bayanListData[0].year;
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
  
  getAsharaList(articleId)
  {
    this.articleId=articleId
    this.homeService.getSubArticlesByArticleid(articleId).subscribe(
      data => {
        
        let month=''  , titleArray:any=[]
        this.subArticles=[]

        let allSubArticles= data.sort((a, b)=>  (a.month > b.month ? 1 : -1));

        for( var i =0 ; i < allSubArticles.length ; i++)
        {
           if(allSubArticles[i].month != month)
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
           month= allSubArticles[i].month
           obj={
            id:allSubArticles[i].id ,
            title:allSubArticles[i].title,
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
        this.allSubArticles= this.subArticles
        // this.getMonthList()
      })
      //  this.monthList=[]
      // this.subArticles=[]
      // this.allSubArticles=[]
      // for(let m=0 ; m < this.subArticles.length ; m++)
      // {
      //   let  month =this.subArticles[m].month

      //    this.monthList.push(month)
      // }
  }

  changeActiveYear(id){
    let li = document.getElementById(id);
    let allOtherli = document.querySelectorAll('li.bait-list-item')
    allOtherli.forEach((li:HTMLElement)=>{
      li.classList.remove('active')
    })
    li.classList.add('active');
  }

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
  navigateToDetailPage(id)
  {
    this.router.navigate(['bayan/bayan-detail'] , {queryParams:{id:id , verseType:this.config.categoryName ,currentPage: this.config.currentPage , totalItems:this.config.totalItems}})
  }
  toggleMobileMenu(): void {
    if(this.isShowMobileMenu){
      this.isShowMobileMenu = false;
    }else{
      this.isShowMobileMenu = true;
    }
  }

  filterByMonth(month)
  {
    
     if(month != "")
    {
      this.subArticles = this.allSubArticles.filter(f=> f.month == month)
    }
    else
    {
      const articleId = this.articleId
      this.getAsharaList(articleId)

    }
  }

  toArabicNumber(str) : String {
    if(str){
      return  str.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
    }else{
      return "";
    }
  }
  searchBayanData()
  {
    const searchText = this.searchForm.value.searchText 
      this.homeService.searchBayan(this.config, searchText).subscribe(
        data => {
          this.isSearchText = true
          this.translations = data.data;
          this.config.totalItems=data.data.length
          this.config.currentPage = this.config.currentPage;

        });
  }
  onPageChange(event): void {
    window.scrollTo(0,0)
    // this.config.currentPage = event;
    // if(this.id == this.bayaan_type && !this.isSearchText){
      this.getBayanList(event);
    // }else
    // if(this.id != this.bayaan_type || this.isSearchText){
    //   this.getAllTranslationTexts();
    // }
  }

  getSubArticleDetail(val)
  {
    
    this.router.navigate(['/bayan-detail'],
    {
      queryParams: {
        id:val
        // currentPage: this.config.currentPage,
        // verseType: this.id,
        // searchText: this.menuForm.value.searchText
        // totalItem: this.config.totalItems
      }
    });
  }

  selectEvent(val): void {
    
    this.router.navigate(['/bayan-detail'],
    {
      queryParams: {
        id:val
        // verseType: this.id,
        // searchText: this.menuForm.value.searchText
        //  totalItem: this.config.totalItems, year: val.year
      }
    });
  }

  getAllAutoCompleteSearch(text): void {
    this.isLoading = true;
    this.homeService.getAllAutoCompleteSearch(text, this.id).subscribe(
      data => {
        this.autoData = data.Data;
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
    this.getBayanList("Ashara Mubaraka");
  }

  search(event): void {
    if (event) {
      this.toHighlight = event;
    }
  }

  onChangeSearch(text): void {
      this.isNotFound = false;
      if (text.length < 3) {
      return;
    }
    const searchText = text 
      this.homeService.searchBayan(this.config, searchText).subscribe(
        data => {
          this.translations = data.data;
          this.config.totalItems=data.data.length
          this.config.currentPage = this.config.currentPage;

        });
  }

  searchWithText(): void {
    this.config.currentPage = this.constantService.defaultPage;
    this.config.itemsPerPage = this.constantService.defaultItemPerPage;
    if (this.searchForm.value.searchText != null && this.searchForm.value.searchText !== '') {
      this.isSearchText = true;
      // this.getAllTranslationTexts();
    }

  }
}
