import { Component, OnInit } from '@angular/core';
import { SharedDataService } from "../shared-service";
import { ActivatedRoute , Router } from "@angular/router";
import { ConstantService } from '@app/shared/services';

@Component({
  selector: 'app-kalam-detail',
  templateUrl: './kalam-detail.component.html',
  styleUrls: ['./kalam-detail.component.scss']
})
export class KalamDetailComponent implements OnInit {
  dataList:any;
  id:string
  currentData
  clickText: any;
  copy:any
  detailData:any
  isNextDisabled: boolean;
  index : number
  qType="Kalaam"
  kalamNo:number
  config = {
    itemsPerPage:this.constantService.defaultItemPerPage,
    currentPage: this.constantService.defaultPage,
    totalItems: 0,
  };
  constructor(private sharedDataService:SharedDataService ,private route:Router, private router:ActivatedRoute , private constantService:ConstantService ) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params=>{
      this.id= params.id
      this.kalamNo = Number(params.recordNo)

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
      this.index = this.kalamNo
      this.detailData = this.dataList[this.index]
      this.id = this.detailData.id
      this.kalamNo = this.kalamNo + 1

      // this.index = this.kalamNo
      // this.detailData = this.dataList[this.index]
      // this.config.currentPage= this.kalamNo + 1

      this.route.navigate(['kalam/kalam-detail'] , {queryParams:{id:this.id , recordNo: this.kalamNo  , currentPage: this.config.currentPage , totalItems:this.config.totalItems}})
    }
    else
    {
      // this.detailData = this.dataList[this.index- 1]
      // this.config.currentPage= this.kalamNo - 1

      this.detailData=""
      this.detailData = this.dataList[this.index- 1]
      this.id= this.detailData.id
      this.kalamNo = this.kalamNo - 1

      this.route.navigate(['kalam/kalam-detail'] , {queryParams:{id:this.id , recordNo: this.kalamNo  , currentPage: this.config.currentPage , totalItems:this.config.totalItems}})
    }


  }

}
