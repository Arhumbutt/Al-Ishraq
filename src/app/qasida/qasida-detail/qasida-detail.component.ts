import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '@app/home/shared';
import { ConstantService } from '@app/shared/services';
import { environment } from '@env/environment';
@Component({
  selector: 'app-qasida-detail',
  templateUrl: './qasida-detail.component.html',
  styleUrls: ['./qasida-detail.component.scss']
})
export class QasidaDetailComponent implements OnInit {
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
  qasida_Type: number;
  miqaat_type: any;
  qasida_type: number;
  copy: string;
  bayaanYear: number;
  asharaQasida: any;
  asharaList: any=[];
  subArticles:any=[]
  QasidaIdsList: any[];
  subArticleDetailData:any
  subArticleDetailDataList:any=[]
  qasidaBaytList: any;
  selectedAsharaIndex: number;
  selectedQasidaIndex: number;
  isTranslated: boolean = false;
  isTazyeenDisplayed: boolean = false;
  isLoadNewTranslation = false;
  isShowMiqaatDetails: boolean = false;
  isMobileMenuActive: boolean = false;
  currentSubArticleId:any

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute,
    public constantService: ConstantService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      this.config.currentPage = +params.id;
      // this.config.currentPage = params.currentPage;
      if(params.id != null)
      {
        this.getQasidaSubArticleList(params.id)
      }

      this.verseType = params.verseType;
      this.searchText = params.searchText;
      this.totalItem = +params.totalItem;
      this.bayaanYear = params.year;
    });
  }
  getDetailByPage(action)
  {
   debugger
      if(action == 'next')
      {
        this.config.currentPage =  this.translation.number + 1
        if(this.config.currentPage <= this.config.totalItems)
        {
          const index=  this.config.currentPage -1
          this.translation=this.subArticleDetailDataList[index]
        }

      }
      else
      {
        this.config.currentPage =  this.subArticleDetailData.number -1
        if(this.config.currentPage <= this.config.totalItems)
        {
          const index=  this.config.currentPage -1
          this.translation=this.subArticleDetailDataList[index]
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
  getQasidaSubArticleList(id): void {

    // this.isLoadNewTranslation = true;
    this.homeService.getSubArticlesByArticleid(id).subscribe(data=>{
      this.subArticles= data
      this.currentSubArticleId= this.subArticles[0].id
      if(this.currentSubArticleId != null)
      {
        this.getQasidaContentBySubArticle(this.currentSubArticleId)
      }
    })
  }
  getQasidaContentBySubArticle(id)
  {
    // this.isLoadNewTranslation = true;
    this.homeService.getAsharaBySubArticleId(id).subscribe(data=>{
      this.subArticleDetailDataList=data.data
      this.translation= data.data[0]
      this.config.totalItems=this.subArticles.length
      this.config.currentPage=this.translation.number
      console.log(this.config)
    })
  }
  toggleDetails(): void {
    document.getElementsByClassName('qasida-detail-card pb-50 over-hddn')[0].classList.toggle('active');
    if (this.isTazyeenDisplayed)
      this.isTazyeenDisplayed = false;
    else
      this.isTazyeenDisplayed = true;
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

}
