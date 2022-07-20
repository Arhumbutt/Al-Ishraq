import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '@app/shared/validators';
import { HomeService } from '@app/home/shared';
import { ConstantService } from '@app/shared/services';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  questionForm: FormGroup;
  allBookNameTypes: any;
  allVerseTypes: any;
  allSpeakerAuthorTypes: any;
  id: number;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private validationService: ValidationService,
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute,
    private constantService: ConstantService
  ) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.params.id;
    this.bindForm();
    this.getAllSpeakerAuthorTypes();
    this.getAllBookNameTypes();
    this.getAllVerseTypes();
    if (this.id) {
      this.getTranslationTextById(this.id);
    }
  }

  private bindForm(): void {
    this.questionForm = this.formBuilder.group({
      id: [null],
      arabicText: [null, Validators.compose([
        Validators.required,
      ])],
      gujratiText: [null, Validators.compose([
        Validators.required,
      ])],
      englishText: [null, Validators.compose([
        Validators.required,
      ])],
      tagsArray: [null],
      tags: [null],
      verseType: [null, Validators.compose([
        Validators.required,
      ])],
      bookName: [null, Validators.compose([
        Validators.required,
      ])],
      bookPageNumber: [null],
      inBookReference: [null, Validators.compose([
        Validators.required,
      ])],
      speakerAuthor: [null, Validators.compose([
        Validators.required
      ])],
      bookImageUrl: [null],
    });
  }


  getTranslationTextById(id): void {
    this.homeService.getTranslationTextById(id).subscribe(
      data => {
        const values = data.Data[0];
        if (values.Tags) {
          values.tagsArray = [];
          let vals = values.Tags.split('#');
          vals = this.constantService.removeEmptyValues(vals);
          vals.forEach((obj) => {
            values.tagsArray.push(obj);
          });
        }
        this.setValues(values);
      },
      error => {
      });
  }

  private setValues(data): void {
    let values;
    values = {};
    Object.keys(data).forEach(key => {
      values[key.toLowerCase()] = data[key];
    });
    Object.keys(this.questionForm.controls).forEach(key => {
      if (values[key.toLowerCase()] !== undefined) {
        this.questionForm.get(key).patchValue(values[key.toLowerCase()]);
      }
    });
  }

  getAllBookNameTypes(): void {
    this.homeService.getAllBookNameTypes().subscribe(
      data => {
        this.allBookNameTypes = data.Data;
      },
      error => {
      });
  }

  getAllSpeakerAuthorTypes(): void {
    this.homeService.getAllSpeakerAuthorTypes().subscribe(
      data => {
        this.allSpeakerAuthorTypes = data.Data;
      },
      error => {
      });
  }

  getAllVerseTypes(): void {
    this.homeService.getAllVerseTypes().subscribe(
      data => {
        this.allVerseTypes = data.Data;
      },
      error => {
      });
  }



  save(): void {
    if (this.questionForm.value.tagsArray && this.questionForm.value.tagsArray.length > 0) {
      this.questionForm.controls.tags.setValue(this.questionForm.value.tagsArray.join('#'));
    }
    this.questionForm.controls.speakerAuthor.setValue(+this.questionForm.value.speakerAuthor);
    this.questionForm.controls.bookName.setValue(+this.questionForm.value.bookName);
    this.questionForm.controls.verseType.setValue(+this.questionForm.value.verseType);


    if (!this.id) {
      this.homeService.createTranslation(this.questionForm.value).subscribe(
        data => {
          this.toastrService.success('Question Published successfully!');
        },
        error => {
        });
    } else {
      this.homeService.updateTranslation(this.questionForm.value).subscribe(
        data => {
          this.toastrService.success('Question Updated successfully!');
        },
        error => {
        });
    }
  }

}
