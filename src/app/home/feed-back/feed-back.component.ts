import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '@app/shared/validators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../shared';

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.scss']
})
export class FeedBackComponent implements OnInit {
  feedbackForm: FormGroup;
  feedBackTypes: any;

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    private homeService: HomeService,
    private toastrService: ToastrService,
    private ngbActiveModal: NgbActiveModal,

  ) { }

  ngOnInit(): void {
    this.bindForm();
    this.getAllFeedbackTypes();
  }

  getAllFeedbackTypes(): void {
    this.homeService.getAllFeedbackTypes().subscribe(
      data => {
        this.feedBackTypes = data.Data;
      },
      error => {
      });
  }


  private bindForm() {
    this.feedbackForm = this.formBuilder.group({
      email: [null, Validators.compose([
        Validators.required,
        Validators.pattern(this.validationService.regEmail)
      ])],
      name: [null, Validators.compose([
        Validators.required,
      ])],
      feedbackDescription: [null, Validators.compose([
        Validators.required,
      ])],
      feedbackTypeSettingId: [null, Validators.compose([
        Validators.required,
      ])],
    });
  }


  feedbackSubmit() {
    this.feedbackForm.controls.feedbackTypeSettingId.setValue(+this.feedbackForm.value.feedbackTypeSettingId);
    this.homeService.addFeedback(this.feedbackForm.value).subscribe(
      data => {
        if (data.Data) {
          this.toastrService.success("Feedback has been submit successfully!");
          this.close();
        }
        else {
          this.toastrService.info(data.Message);
        }
      },
      error => {
      });
  }

  close(){
    this.ngbActiveModal.close();
  }

}
