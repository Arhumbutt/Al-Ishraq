import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomeEndPoints } from '@app/shared/endpoints/home';
import { ApiService } from '@app/shared/services';
import { BaseService } from '@app/shared/services/base.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseService<any> {

  constructor(
    httpClient: HttpClient,
    private apiService: ApiService,
    private homeEndPoints: HomeEndPoints,
  ) {
    super(
      httpClient,
      environment.api_uri);
  }

  getAllBookNameTypes(): Observable<any> {
    return this.get(this.apiService.homeApi + this.homeEndPoints.getAllBookNameTypesEndPoint)
      .pipe(map((data: any) => data));
  }

  getAllSpeakerAuthorTypes(): Observable<any> {
    return this.get(this.apiService.homeApi + this.homeEndPoints.getAllSpeakerAuthorTypesEndPoint)
      .pipe(map((data: any) => data));
  }


  getAllTranslationTexts(verseType, config, search): Observable<any> {
    let endPoint = this.homeEndPoints.qamoosEndPoint + '?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage;
    if (verseType) {
      endPoint = endPoint + '&VerseType=' + verseType;
    }
    if (search) {
      endPoint = endPoint + '&Search=' + search;
    }
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }

   searchByCategory(verseType, config, searchtext): Observable<any> {
    if(verseType == "Qamoos")
    {
      let endPoint = this.homeEndPoints.qamoosEndPoint +'/Search/'+ searchtext +'?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage ;
      return this.get(this.apiService.homeApi + endPoint)
        .pipe(map((data: any) => data));
    }
    else if(verseType == "Kalaam")
    {
      let endPoint = this.homeEndPoints.kalamEndpoint +'/Search/'+ searchtext +'?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage ;
      return this.get(this.apiService.homeApi + endPoint)
        .pipe(map((data: any) => data));
    }
    else if(verseType == "Aqwaal")
    {
      let endPoint = this.homeEndPoints.aqwaalEndpoint +'/Search/'+ searchtext +'?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage ;
      return this.get(this.apiService.homeApi + endPoint)
        .pipe(map((data: any) => data));
    }
    else if(verseType == "Hadeeth")
    {
      let endPoint = this.homeEndPoints.hadeethEndpoint +'/Search/'+ searchtext +'?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage ;
      return this.get(this.apiService.homeApi + endPoint)
        .pipe(map((data: any) => data));
    }
    else if(verseType == "Quran")
    {
      let endPoint = this.homeEndPoints.aqwaalEndpoint +'/Search/'+ searchtext +'?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage ;
      return this.get(this.apiService.homeApi + endPoint)
        .pipe(map((data: any) => data));
    }
    else if(verseType == "Qasida")
    {
      let endPoint = this.homeEndPoints.aqwaalEndpoint +'/Search/'+ searchtext +'?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage ;
      return this.get(this.apiService.homeApi + endPoint)
        .pipe(map((data: any) => data));
    }
    else if(verseType == "Miqaat Mubarak")
    {
      let endPoint = this.homeEndPoints.getContentBySubArticleId +'/'+verseType+'/Search/'+ searchtext +'?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage ;
      return this.get(this.apiService.homeApi + endPoint)
        .pipe(map((data: any) => data));
    }
    else if(verseType == "Ashara Mubaraka")
    {
    let endPoint = this.homeEndPoints.getContentBySubArticleId +'/'+verseType+'/Search/'+ searchtext +'?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage ;
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
    }
    
  }

  getQamoose(config): Observable<any> {
    let endPoint = this.homeEndPoints.qamoosEndPoint + '?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage;
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }

  searchQamoose(config,searchtext)
  {
    let endPoint = this.homeEndPoints.qamoosEndPoint +'/Search/'+ searchtext +'?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage ;
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }
  searchHadeeth(config,searchtext)
  {
    let endPoint = this.homeEndPoints.hadeethEndpoint +'/Search/'+ searchtext +'?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage ;
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }
  getAllHadeeth(config): Observable<any> {
    let endPoint = this.homeEndPoints.hadeethEndpoint + '?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage ;
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }
  getHadeethById(id): Observable<any> {
    let endPoint = this.homeEndPoints.hadeethEndpoint ;
      endPoint = endPoint + '/' + id;

    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }

  getQuranVerseById(id): Observable<any> {
    let endPoint = this.homeEndPoints.holyQuranEndpoint ;
      endPoint = endPoint + '/' + id;

    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }
    getAllQuranArabic(config) {
    
    let endPoint = this.homeEndPoints.holyQuranEndpoint +'/'+ 1 + '?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage ; 
    return this.get(this.apiService.homeApi + endPoint)
    .pipe(map((data: any) => data));
     
  }
  getAllQuranTrans(config): Observable<any> {
    
    let endPoint = this.homeEndPoints.holyQuranEndpoint +'/'+ 63 + '?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage ; ;
    return this.get(this.apiService.homeApi + endPoint)
    .pipe(map((data: any) => data));
  }
  getAllQuranEng(config): Observable<any> {
    
    let endPoint = this.homeEndPoints.holyQuranEndpoint +'/'+ 59 + '?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage ;;
    return this.get(this.apiService.homeApi + endPoint)
    .pipe(map((data: any) => data));
  }
  getAllQuranArabicByChapter(): Observable<any> {
    
    let endPoint = this.homeEndPoints.holyQuranEndpoint +'/'+ 1 +'/Chapters';
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }
  getAllQuranEngByChapter(): Observable<any> {
    
    let endPoint = this.homeEndPoints.holyQuranEndpoint +'/'+ 1 +'/Chapters';
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }
  getAllQuranTransByChapter(): Observable<any> {
    
    let endPoint = this.homeEndPoints.holyQuranEndpoint +'/'+ 1 +'/Chapters';
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }

  searchKalam(config,searchtext)
  {
    let endPoint = this.homeEndPoints.kalamEndpoint +'/Search/'+ searchtext +'?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage ;
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }
  getAllKalam(config): Observable<any> {
    let endPoint = this.homeEndPoints.kalamEndpoint + '?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage ;
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }

  searchAqwaal(config,searchtext)
  {
    let endPoint = this.homeEndPoints.aqwaalEndpoint +'/Search/'+ searchtext +'?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage ;
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }
  getAllAqwaal(config): Observable<any> {
    let endPoint = this.homeEndPoints.aqwaalEndpoint + '?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage ;
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }

  getAllVerseTypes(): Observable<any> {
    return this.get(this.apiService.homeApi + this.homeEndPoints.getAllVerseTypesEndPoint)
      .pipe(map((data: any) => data));
  }

  getAllFeedbackTypes(): Observable<any> {
    return this.get(this.apiService.homeApi + this.homeEndPoints.getAllFeedbackTypesEndPoint)
      .pipe(map((data: any) => data));
  }

  getArticlesByCategoryName(event): Observable<any>
  {
    return this.get(this.apiService.homeApi + this.homeEndPoints.getArticlByCategoryNameEndPoint+'/' + event.categoryName +'/Articles?page='+event.currentPage+'&pageSize='+ event.itemsPerPage)
      .pipe(map((data: any) => data));
  }
  getSubArticlesByArticleid(articleId)
  {
    return this.get(this.apiService.homeApi + this.homeEndPoints.getSubArticlesByArticleid+'/' + articleId +'/SubArticles')
    .pipe(map((data: any) => data));

  }
  searchBayan(config,searchtext)
  {
    const categoryName= config.categoryName
    let endPoint = this.homeEndPoints.getContentBySubArticleId +'/'+categoryName+'/Search/'+ searchtext +'?page=' + config.currentPage + '&pageSize=' + config.itemsPerPage ;
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }
  getAllAutoCompleteSearch(text, verseType?): Observable<any> {
    return this.get(this.apiService.homeApi + this.homeEndPoints.getAllAutoCompleteSearchEndPoint + '?text=' + text + '&verseType=' + verseType)
      .pipe(map((data: any) => data));
  }

  // getTranslationTextById(id): Observable<any> {
  //   return this.get(this.apiService.homeApi + this.homeEndPoints.getTranslationTextByIdEndPoint + '?id=' + id)
  //     .pipe(map((data: any) => data));
  // }
  getTranslationTextById(id): Observable<any> {
    return this.get(this.apiService.homeApi + this.homeEndPoints.getContentByArticleId +'/'+id+'/Content?page=0&pageSize=500')
      .pipe(map((data: any) => data));
  }
  getSubArticlesByArticleId(id)
  {
    return this.get(this.apiService.homeApi + this.homeEndPoints.getContentByArticleId +'/'+id+'/SubArticles')
      .pipe(map((data: any) => data));
  }

  getDataCount(): Observable<any> {
    return this.get(this.apiService.homeApi + this.homeEndPoints.getDataCountEndPoint)
      .pipe(map((data: any) => data));
  }

  getDataOfTheDay(timezone): Observable<any> {
    return this.get(this.apiService.homeApi + this.homeEndPoints.getDataOfTheDayEndPoint + '?timezone=' + timezone)
      .pipe(map((data: any) => data));
  }


  createTranslation(body): Observable<any> {
    return this.post(body, this.apiService.homeApi + this.homeEndPoints.createTranslationEndPoint)
      .pipe(map((data: any) => data));
  }

  updateTranslation(body): Observable<any> {
    return this.post(body, this.apiService.homeApi + this.homeEndPoints.updateTranslationEndPoint)
      .pipe(map((data: any) => data));
  }

  addFeedback(body): Observable<any> {
    return this.post(body, this.apiService.homeApi + this.homeEndPoints.addFeedbackEndPoint)
      .pipe(map((data: any) => data));
  }

  subscribeEmail(body): Observable<any> {
    return this.post(body, this.apiService.homeApi + this.homeEndPoints.subscribeEmailEndPoint)
      .pipe(map((data: any) => data));
  }

  getAsharaBayanList(config): Observable<any> {
    let endPoint = this.homeEndPoints.getAsharaBayanList + '?PageNumber=' + config.currentPage + '&PageSize=' + config.itemsPerPage;
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }

  getAsharaListByYear(year): Observable<any> {
    let endPoint = this.homeEndPoints.getAsharaListByYear + '?year=' + year;
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }

  getAsharaBayanIds(year, asharaName): Observable<any> {
    let endPoint = this.homeEndPoints.getAsharaBayanIds + '?year=' + year + '&AsharaName=' + asharaName;
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }

  getAsharaBySubArticleId(id): Observable<any> {
    let endPoint =  'SubArticle/'+id+'/'+this.homeEndPoints.getContentBySubArticleId;
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }

  getMiqaatBayanCount(): Observable<any> {
    let endPoint = this.homeEndPoints.getMiqaatBayanCount;
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }

  getMiqaatBayanByYear(yearHijri): Observable<any> {
    let endPoint = this.homeEndPoints.getMiqaatBayanByYear + '?YearHijri=' + yearHijri;
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }

  getMiqaatBayanPagesIds(yearHijri, monthNumber, chapterNumber): Observable<any> {
    let endPoint = this.homeEndPoints.getMiqaatBayanPagesIds + '?YearHijri=' + yearHijri + '&Month=' + monthNumber + '&ChapterNumber=' + chapterNumber;
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }

  getAllTranslationFirstPage(verseType): Observable<any> {
    let endPoint = this.homeEndPoints.getAllTranslationFirstPage + '?VerseType=' + verseType;
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }

  getTranslationRelatedPageIds(verseType, chapterNumber): Observable<any>{
    let endPoint = this.homeEndPoints.getTranslationRelatedPageIds + '?VerseType=' + verseType + '&ChapterNumber=' + chapterNumber;
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }

  getBaytListByChapterNumber(chapterNumber, verseType): Observable<any>{
    let endPoint = this.homeEndPoints.getBaytListByChapterNumber + '?ChapterNumber=' + chapterNumber + '&VerseType=' + verseType;
    return this.get(this.apiService.homeApi + endPoint)
      .pipe(map((data: any) => data));
  }

}
