import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '@app/home/shared';
import { ConstantService  } from '@app/shared/services';
@Component({
  selector: 'app-bayan-detail',
  templateUrl: './bayan-detail.component.html',
  styleUrls: ['./bayan-detail.component.scss']
})
export class BayanDetailComponent implements OnInit {
  
  translationForm: FormGroup;
  allBookNameTypes: any;
  allVerseTypes: any;
  allSpeakerAuthorTypes: any;
  id: number;
  translation: any;
  isLoadForm: boolean;
  tags: any[];
  clickText: any;
  verseType: any;
  searchText: any;
  config = {
    itemsPerPage: 1,
    currentPage: 1,
    totalItems: 0,
    id: 'custom'
  };
  totalItem: number;
  isNextDisabled: boolean;
  isPreviousDisabled: boolean;
  qType: number;
  bayan_Type: number;
  miqaat_type: any;
  qasida_type: number;
  copy: string;
  bayaanYear: number;
  asharaBayan: any;
  asharaList: any=[];
  subArticles:any=[]
  bayanIdsList: any[];
  subArticleDetailData:any
  subArticleDetailDataList:any=[]
  content:any
  defaultContent:any
  qasidaBaytList: any;
  selectedAsharaIndex: number;
  selectedBayanIndex: number;
  isTranslated: boolean = false;
  isTazyeenDisplayed: boolean = false;
  isLoadNewTranslation = false;
  isShowMiqaatDetails: boolean = false;
  isMobileMenuActive: boolean = false;
  activeId:any

  constructor(
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute,
    public constantService: ConstantService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      this.config.currentPage = +params.recordNo;
      this.verseType = params.verseType;
      this.searchText = params.searchText;
      this.totalItem = +params.totalItem;
      this.bayaanYear = params.year;
      if(params.id != null && this.verseType == "Ashara Mubaraka")
      {
        this.getAsharaDetails(params.id)
      }
      if(params.id != null && this.verseType == "Miqaat Mubarak")
      {
        this.getContentById(params.id)
      }

     
    });
  }
  
  getMiqaatDetailByPage(action)
  {
    
    window.scrollTo(0,0)
      if(action == 'next')
      {
        this.config.currentPage =  this.defaultContent.number + 1
        if(this.config.currentPage <= this.config.totalItems)
        {
          const index=  this.config.currentPage -1
          this.defaultContent = this.content[index]
        }
        
      }
      else
      {
      
        this.config.currentPage =  this.defaultContent.number - 1
        if(this.config.currentPage <= this.config.totalItems)
        {
          const index=  this.config.currentPage -1
          this.defaultContent = this.content[index]
        }
      }
  }

  toggleMobileAsharaMenu(): void{
    if(this.isMobileMenuActive){
        this.isMobileMenuActive = false;
    }else{
        this.isMobileMenuActive = true;
    }
  }
  getAsharaDetails(id): void {
    window.scrollTo(0,0)
    this.isLoadNewTranslation = true;
    this.homeService.getSubArticlesByArticleid(id).subscribe(data=>{
      this.subArticleDetailDataList= data
      this.subArticles= data
      const  defaultId= this.subArticles[0]?.id
      if(defaultId != null)
      {
        this.getContentById(defaultId)
      }
     
    })
  }
  getContentById(id)
  {
    this.activeId=id
    window.scrollTo(0,0)
    this.homeService.getAsharaBySubArticleId(id).subscribe(data=>{
      this.content= data?.data
      this.defaultContent=data?.data[0]
      this.config.totalItems= data?.data?.length
      this.config.currentPage= data?.data[0]?.number
      this.isTranslated=false
    })
  }
  toggleDetails(): void {
    document.getElementsByClassName('qasida-detail-card pb-50 over-hddn')[0].classList.toggle('active');
    if (this.isTazyeenDisplayed)
      this.isTazyeenDisplayed = false;
    else
      this.isTazyeenDisplayed = true;
  }
  toggleMiqaatDetails(): void {
    if (this.isShowMiqaatDetails) {
      this.isShowMiqaatDetails = false;
    } else {
      this.isShowMiqaatDetails = true;
    }
  }
  toggleTranslation(): void {
    if (this.isTranslated)
      this.isTranslated = false;
    else
      this.isTranslated = true;
  }
  toArabicNumber(str) : String {
    if (str != null && isNaN(str)){
      str = str.toString().match(/[0-9]+/g);
    }
    if(str){
      return  str.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
    }else{
      return "";
    }
  }

  getAsharaDetailByPage(index)
  {
    // if(index)
    this.subArticleDetailData=this.subArticleDetailDataList[index]

  }
   TextSplitPipe (value :any) {
      const splitBy = '-'
      const splittedText = value.split(splitBy);
      return `${ splittedText[0] }`;
   
  }
 

}
