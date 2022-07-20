import { Component, OnInit } from '@angular/core';
import { SharedDataService } from "../shared-service";
import { ActivatedRoute , Router } from "@angular/router";
import { ConstantService } from '@app/shared/services';

@Component({
  selector: 'app-aqwal-detail',
  templateUrl: './aqwal-detail.component.html',
  styleUrls: ['./aqwal-detail.component.scss']
})
export class AqwalDetailComponent implements OnInit {
  dataList:any;
  id:string
  currentData
  clickText: any;
  copy:any
  detailData:any
  isNextDisabled: boolean;
  index : number
  aqwalNo:number
  qType="Aqwaal"
  config = {
    currentPage: this.constantService.defaultPage,
    totalItems: 0,
  };
  constructor(private sharedDataService:SharedDataService ,private route:Router, private router:ActivatedRoute , private constantService:ConstantService ) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params=>{
      this.id= params.id
      this.aqwalNo = Number(params.Hdno)

    })
    this.sharedDataService.currentMessage.subscribe(message => {
      this.dataList = message
      this.config.totalItems= this.dataList.length
      this.currentData = this.dataList.filter(f=> f.id == this.id)
      this.detailData=this.currentData[0]
      this.config.currentPage= this.aqwalNo

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
      this.index = this.aqwalNo
      this.detailData = this.dataList[this.index]
      this.config.currentPage= this.aqwalNo + 1

      this.route.navigate(['aqwal/aqwal-detail'] , {queryParams:{id:this.id , Hdno: this.config.currentPage}})
    }
    else
    {
      this.detailData = this.dataList[this.index- 1]
      this.config.currentPage= this.aqwalNo - 1

      this.route.navigate(['aqwal/aqwal-detail'] , {queryParams:{id:this.id , Hdno: this.config.currentPage}})
    }


  }

}
