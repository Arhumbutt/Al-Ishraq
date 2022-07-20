import { Component, OnInit } from '@angular/core';
import { SharedDataService } from "../shared-service";
import { ActivatedRoute , Router } from "@angular/router";
import { ConstantService } from '@app/shared/services';
import { HomeService } from '../../home/shared/home.service';

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
  constructor(private sharedDataService:SharedDataService ,private homeService: HomeService,private route:Router, private router:ActivatedRoute , private constantService:ConstantService ) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params=>{
      this.id= params.id
      this.recordNo = Number(params.recordNo)
      if(this.id)
      {
        this.getQuranVerseById()
      }

    })
    this.sharedDataService.currentMessage.subscribe(message => {
      this.dataList = message
      this.config.totalItems= this.dataList.length
      this.currentData = this.dataList.filter(f=> f.id == this.id)
      this.detailData=this.currentData[0]
      // console.log(this.detailData)
      // this.config.currentPage= this.recordNo

    });
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
      this.detailData=""
      this.index = this.recordNo
      this.detailData = this.dataList[this.index]
      this.recordNo = this.recordNo + 1
      this.route.navigate(['quran/quran-detail'] , {queryParams:{id:this.id , recordNo: this.recordNo , currentPage: this.config.currentPage , totalItems:this.config.totalItems}})

    }
    else if (event == 'previous')
    {
      this.detailData=""
      this.detailData = this.dataList[this.index- 1]
      this.recordNo = this.recordNo - 1

      this.route.navigate(['quran/quran-detail'] , {queryParams:{id:this.id , recordNo: this.recordNo , currentPage: this.config.currentPage , totalItems:this.config.totalItems}})
    }


  }

  getQuranVerseById()
  {
    this.homeService.getQuranVerseById(this.id).subscribe(data=>{
      this.detailData=data
      console.log( 'detail',this.detailData)
    })
  }

}
