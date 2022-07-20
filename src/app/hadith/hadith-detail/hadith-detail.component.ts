import { Component, OnInit } from '@angular/core';
import { SharedDataService } from "../shared-service";
import { ActivatedRoute , Router } from "@angular/router";
import { ConstantService } from '@app/shared/services';
import { HomeService } from '../../home/shared/home.service';

@Component({
  selector: 'app-hadith-detail',
  templateUrl: './hadith-detail.component.html',
  styleUrls: ['./hadith-detail.component.scss']
})
export class HadithDetailComponent implements OnInit {
  dataList:any;
  id:string
  currentData
  clickText: any;
  copy:any
  detailData:any
  isNextDisabled: boolean;
  index : number
  hadithNo:number
  qType="Hadeeth"
  config = {
    itemsPerPage:this.constantService.defaultItemPerPage,
    currentPage: this.constantService.defaultPage,
    totalItems: 0,
  };
  constructor(private sharedDataService:SharedDataService ,private homeService: HomeService,private route:Router, private router:ActivatedRoute , private constantService:ConstantService ) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params=>{
      this.id= params.id
      this.hadithNo = Number(params.recordNo)
      if(this.id)
      {
        this.getHadeethById()
      }
    })
    this.sharedDataService.currentMessage.subscribe(message => {
      this.dataList = message
      this.config.totalItems= this.dataList.length
      this.currentData = this.dataList.filter(f=> f.id == this.id)
      this.detailData=this.currentData[0]

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
      this.index = this.hadithNo
      this.detailData = this.dataList[this.index]
      this.id = this.detailData.id
      this.hadithNo = this.hadithNo + 1
      this.route.navigate(['hadith/hadith-detail'] , {queryParams:{id:this.id , recordNo: this.hadithNo , currentPage: this.config.currentPage , totalItems:this.config.totalItems}})

    }
    else if (event == 'previous')
    {
      this.detailData=""
      this.detailData = this.dataList[this.index- 1]
      this.id= this.detailData.id
      this.hadithNo = this.hadithNo - 1

      this.route.navigate(['hadith/hadith-detail'] , {queryParams:{id:this.id , recordNo: this.hadithNo , currentPage: this.config.currentPage , totalItems:this.config.totalItems}})
    }


  }

  getHadeethById()
  {
    this.homeService.getHadeethById(this.id).subscribe(data=>{
      this.detailData=data
    })
  }

}
