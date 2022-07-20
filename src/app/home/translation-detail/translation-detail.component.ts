import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '@app/home/shared';
import { ConstantService } from '@app/shared/services';
import { environment } from '@env/environment';

@Component({
  selector: 'app-translation-detail',
  templateUrl: './translation-detail.component.html',
  styleUrls: ['./translation-detail.component.scss']
})
export class TranslationDetailComponent implements OnInit {

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
  qasidaBaytList: any;
  selectedAsharaIndex: number;
  selectedBayanIndex: number;
  isTranslated: boolean = false;
  isTazyeenDisplayed: boolean = false;
  isLoadNewTranslation = false;
  isShowMiqaatDetails: boolean = false;
  isMobileMenuActive: boolean = false;

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute,
    public constantService: ConstantService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.qType = +environment.q_type;
    this.bayan_Type = +environment.bayaan_type;
    this.miqaat_type = +environment.miqaat_type;
    this.qasida_type = +environment.qasida_type;
    this.id = +this.activatedRoute.snapshot.params.id;
    this.activatedRoute.queryParams.subscribe(params => {
      this.config.currentPage = +params.recordNo;
      // this.config.currentPage = params.currentPage;
      if(params.id != null)
      {
        this.getAsharaDetails(params.id)
      }

      this.verseType = params.verseType;
      this.searchText = params.searchText;
      this.totalItem = +params.totalItem;
      this.bayaanYear = params.year;
    });
    if (this.verseType == this.bayan_Type && this.id == 0 && this.bayaanYear != null) {
      this.getAsharaListByYear(this.bayaanYear);
    } else {
      this.getTranslationTextById(this.id);
    }

    this.copy = "Copy";
  }

  getAllTranslationTexts(type): void {
    this.config.currentPage = (type === 'next' ? +this.config.currentPage + 1 : +this.config.currentPage - 1);
    this.homeService.getAllTranslationTexts(this.verseType.toString(), this.config, this.searchText).subscribe(
      data => {

        this.translation = data.Data.Data[0];
        this.isLoadForm = true;
        this.setTags(data?.Data?.Data[0].Tags);
        if(data.Data.NextPage == null){
          this.isNextDisabled = true;
        }
        // if(data.Data.PreviousPage == null){
        //   this.isPreviousDisabled = true;
        // }
      },
      error => {
      });
  }

  getTranslationTextById(id): void {
    this.homeService.getTranslationTextById(id).subscribe(
      data => {
        window.scrollTo(0, 0);
        this.isLoadNewTranslation = false;
        this.translation = data.data[0];
        this.isLoadForm = true;
        if(this.id != null)
        {
          const articleId = this.id
          this.getAsharaList(articleId)

        }
        // if (data.Data[0].Tags != null) {
        //   this.setTags(data.Data[0].Tags);
        // }

        // if(this.translation.VerseType == this.qasida_type){
        //   this.getTranslationRelatedPageIds(this.translation.VerseType, this.translation.ChapterNumber);
        //   this.getBaytListByChapterNumber(this.translation.ChapterNumber, this.translation.VerseType)
        // }

        // if (this.translation.VerseType == this.bayan_Type) {
        //   if (this.asharaList == null) {
        //     this.getAsharaListByYear(this.translation.article.year);
        //   }
        //   this.getAsharaBayanIds(this.translation.YearHijri, this.translation.InBookReference);
        // }

        // if(this.translation.VerseType == this.miqaat_type){
        //   this.getMiqaatBayanPagesIds(this.translation.YearHijri, this.translation.MonthNumber, this.translation.ChapterNumber);
        // }

        // if (this.verseType == null || this.verseType === "") {
        //   this.verseType = this.translation.VerseType;
        // }

        // if (this.bayaanYear == null){
        //   this.bayaanYear = this.translation.YearHijri;
        // }

        // if (this.asharaList) {
        //   this.selectedAsharaIndex = this.asharaList.findIndex(x => x.InBookReference === this.translation.InBookReference);
        // }

        // if (this.bayanIdsList) {
        //   this.selectedBayanIndex = this.bayanIdsList.findIndex(x => x.Id == this.translation.Id);
        //   this.config.currentPage = this.selectedBayanIndex + 1;
        // }
      },
      error => {
      });
  }

  getBayanDetails(action): void {

    if(this.verseType == this.miqaat_type){
      this.config.currentPage = (action === 'next' ? +this.config.currentPage + 1 : +this.config.currentPage - 1);
      if(action === 'next'){
        this.getTranslationTextById(this.bayanIdsList[this.selectedBayanIndex + 1]);
      }else{
        this.getTranslationTextById(this.bayanIdsList[this.selectedBayanIndex - 1]);
      }
    }else{
      this.config.currentPage = (action === 'next' ? +this.config.currentPage + 1 : +this.config.currentPage - 1);
      if(action === 'next'){
        this.getTranslationTextById(this.bayanIdsList[this.selectedBayanIndex + 1].Id);
      }else{
        this.getTranslationTextById(this.bayanIdsList[this.selectedBayanIndex - 1].Id);
      }
    }
  }

  getByPageNo(pageNo): void {
    if (pageNo <= this.config.totalItems) {
      this.getTranslationTextById(this.bayanIdsList[pageNo - 1].Id);
    }
  }
  getDetailByPage(action)
  {
      if(action == 'next')
      {
        this.config.currentPage =  this.subArticleDetailData.number + 1
        if(this.config.currentPage <= this.config.totalItems)
        {
          const index=  this.config.currentPage -1
          this.subArticleDetailData=this.subArticleDetailDataList[index]
        }

      }
      else
      {
        this.config.currentPage =  this.subArticleDetailData.number -1
        if(this.config.currentPage <= this.config.totalItems)
        {
          const index=  this.config.currentPage -1
          this.subArticleDetailData=this.subArticleDetailDataList[index]
        }
      }
  }

  getAsharaDetails(id): void {

    this.isLoadNewTranslation = true;
    this.homeService.getAsharaBySubArticleId(id).subscribe(data=>{
      this.subArticleDetailDataList= data.data
      this.subArticleDetailData=this.subArticleDetailDataList[0]
      this.config.totalItems=this.subArticleDetailDataList.total
      this.config.currentPage=this.subArticleDetailData.number
    })
  }

  getAsharaDetailByPage(index)
  {
    // if(index)
    this.subArticleDetailData=this.subArticleDetailDataList[index]

  }

  getTranslationRelatedPageIds(verseType, chapterNumber) : void {
    this.homeService.getTranslationRelatedPageIds(this.verseType, 1).subscribe(
      data => {
        this.bayanIdsList = data.Data;

        this.config.totalItems = data.Data.length;
        this.selectedBayanIndex = this.bayanIdsList.findIndex(x => x.Id == this.translation.Id);
        this.config.currentPage = this.selectedBayanIndex + 1;
      }
    )
  }

  getAsharaListByYear(year): void {
    if (this.asharaList == null) {
      this.homeService.getAsharaListByYear(year).subscribe(
        data => {

          this.asharaList = data.Data;
          if (this.translation) {
            this.selectedAsharaIndex = this.asharaList.findIndex(x => x.InBookReference === this.translation.InBookReference);
            this.selectedBayanIndex = this.bayanIdsList.findIndex(x => x.Id == this.translation.Id);
            this.config.currentPage = this.selectedBayanIndex + 1;
          } else if(this.verseType == this.bayan_Type) {
            this.getAsharaBayanIds(year, data.Data[0].InBookReference);
          }
        },
        error => {
        });
    }
  }
  getAsharaList(articleId)
  {
    this.homeService.getSubArticlesByArticleid(articleId).subscribe(
      data => {
        this.subArticles=data
        const subId=this.subArticles[0].id
        this.getAsharaDetails(subId)
      })
  }
  getAsharaBayanIds(year, asharaName): void {
    this.homeService.getAsharaBayanIds(year, asharaName).subscribe(
      data => {
        this.bayanIdsList = data.Data;
        this.config.totalItems = data.Data.length;

        if(this.translation){
          this.selectedAsharaIndex = this.asharaList.findIndex(x => x.InBookReference === this.translation.InBookReference);
          this.selectedBayanIndex = this.bayanIdsList.findIndex(x => x.Id == this.translation.Id);
          this.config.currentPage = this.selectedBayanIndex + 1;
        } else {
          this.getTranslationTextById(data.Data[0].Id);
        }

        if(this.isLoadNewTranslation){
          this.getTranslationTextById(data.Data[0].Id);
        }
      },
      error => {
      });
  }

  getBaytListByChapterNumber(chapterNumber, verseType): void {
    this.homeService.getBaytListByChapterNumber(chapterNumber, verseType).subscribe(
      data => {
        this.qasidaBaytList = data.Data;
      }
    );
  }

  setTags(tags: string): void {
    let tagList = [];
    tagList = tags.split('#');
    this.tags = this.constantService.removeEmptyValues(tagList);
  }


  copyToClipboard(containerid): void {
    this.copy = "COPIED";
    const range = document.createRange();
    range.selectNode(document.getElementById(containerid));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    this.clickText = containerid;
  }

  changeStyle(val){
    this.clickText = '';
  }

  mouseLeave(){
    this.copy = "Copy";
  }

  checkcolor(i): number {
    return i % 3;
  }

  tagClick(tagName): void {
    this.router.navigate(['/'], {queryParams: {tag: tagName}});
  }

  getThirdName(name){
    const thirddName = name?.split('(')[2] ? name.split('(')[2] : '';
    return + ' (' + thirddName.slice(0, -1)
  }

  toggleDetails(): void {
    document.getElementsByClassName('qasida-detail-card pb-50 over-hddn')[0].classList.toggle('active');
    if (this.isTazyeenDisplayed)
      this.isTazyeenDisplayed = false;
    else
      this.isTazyeenDisplayed = true;
  }

  toggleMobileAsharaMenu(): void{
    if(this.isMobileMenuActive){
        this.isMobileMenuActive = false;
    }else{
        this.isMobileMenuActive = true;
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

  getMiqaatBayanPagesIds(yearHijri, monthNumber, chapterNumber): void {
    this.homeService.getMiqaatBayanPagesIds(yearHijri, monthNumber, chapterNumber).subscribe(
      data => {
        this.bayanIdsList = data.Data;
        this.config.totalItems = data.Data.length;

        if (this.bayanIdsList) {
          this.selectedBayanIndex = this.bayanIdsList.findIndex(x => x == this.translation.Id);
          this.config.currentPage = this.selectedBayanIndex + 1;
        }
      });
  }

  toggleMiqaatDetails(): void {
    if (this.isShowMiqaatDetails) {
      this.isShowMiqaatDetails = false;
    } else {
      this.isShowMiqaatDetails = true;
    }
  }
}
