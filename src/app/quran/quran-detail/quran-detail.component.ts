import { Component, OnInit } from '@angular/core';
import { SharedDataService } from "../shared-service";
import { ActivatedRoute , Router } from "@angular/router";
import { ConstantService } from '@app/shared/services';
import { HomeService } from '../../home/shared/home.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-quran-detail',
  templateUrl: './quran-detail.component.html',
  styleUrls: ['./quran-detail.component.scss']
})
export class QuranDetailComponent implements OnInit {
  dataList:any;
  id:string
  currentData
  clickText: any;
  copy:any
  detailData:any
  isNextDisabled: boolean;
  index : number
  recordNo:number
  config = {
    itemsPerPage:this.constantService.defaultItemPerPage,
    currentPage: this.constantService.defaultPage,
    totalItems: 0,
  };
  payload={
    translationId:0 ,
    chapterId:0 ,
    verseId:0 ,
  }
  dataCollection: any = [];
  chapterId: any;
  verseId: any;
  constructor(private sharedDataService:SharedDataService ,private homeService: HomeService,private route:Router, private router:ActivatedRoute , private constantService:ConstantService ) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params=>{
      this.payload.chapterId=params.chapterId
      this.payload.verseId=params.verseId
      this.payload.translationId=params.translationId
      console.log(this.payload, 'what is in payload')
      if(this.payload)
      {
        this.getQuranVerseById(this.payload)
      }

    })
    // this.sharedDataService.currentMessage.subscribe(message => {
    //   this.dataList = message
    //   this.config.totalItems= this.dataList.length
    //   this.currentData = this.dataList.filter(f=> f.id == this.id)
    //   this.detailData=this.currentData[0]
    //   // console.log(this.detailData)
    //   // this.config.currentPage= this.recordNo

    // });
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

  getPage(event)
  {
    if(event == 'next')
    {
      this.route.navigate(['quran/quran-detail'] , {queryParams:{translationId:this.payload.translationId , chapterId: this.payload.chapterId , verseId: this.payload.verseId}})

    }
    else if (event == 'previous')
    {
      this.route.navigate(['quran/quran-detail'] , {queryParams:{id:this.id , recordNo: this.recordNo , currentPage: this.config.currentPage , totalItems:this.config.totalItems}})
    }


  }

  getQuranVerseById(payload)
  {
    forkJoin({
      arabic:this.homeService.getQuranArabicVerseById(payload),
      trans:this.homeService.getQuranEngVerseById(payload),
      eng:this.homeService.getQuranTransVerseById(payload)
    }).subscribe(({arabic, trans, eng})=>{
      this.config.totalItems = Math.max(arabic.total, trans.total, eng.total)
      this.config.currentPage = this.config.currentPage;
      let arabicData = arabic;
      let translatedData = trans;
      let engData = eng;
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
      this.dataCollection = finalCollection[0];
    })
  }

}
