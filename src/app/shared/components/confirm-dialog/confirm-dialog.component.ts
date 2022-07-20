import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from './confirm-dialog.service';
import { ModalService } from '@app/shared/_modal/modal.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  message: any;
  isOpen: boolean;
  constructor(
    private confirmDialogService: ConfirmDialogService,
  ) { }

  ngOnInit(): void {
    this.confirmDialogService.getMessage().subscribe(message => {
      this.message = message;
      if (message) {
        this.isOpen = true;
      } else {
        this.isOpen = false;
      }
    });
  }

  close(){
    this.isOpen = false;
  }
}
