import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable,ReplaySubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  constructor(){}
  //Using any
  public editDataDetails: any = [];
  public subject = new Subject<any>();
  private messageSource = new  BehaviorSubject(this.editDataDetails);
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: any) {
  this.messageSource.next(message)
  }
  }

  export interface MetaData {
    titleEn: string;
    titleGr: string;
    titleAr: string;
    titleUr: string;
    volumeEng: string;
    volumeGr: string;
    volumeAr: string;
    volumeUr: string;
    authorEng: string;
    authorUr: string;
    authorGr: string;
    authorAr: string;
}

export interface RootObject {
    id: string;
    hadithAr: string;
    hadithGr: string;
    hadithEn: string;
    hadithUr: string;
    metaData: MetaData;
}
