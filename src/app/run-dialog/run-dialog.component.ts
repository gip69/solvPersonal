import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Run} from '../run/run.model';

@Component({
  selector: 'app-run-dialog',
  templateUrl: './run-dialog.component.html',
  styleUrls: ['./run-dialog.component.css']
})
export class RunDialogComponent {
  modalTitle: String;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
      this.modalTitle = data.title;
      console.log(data);
  }
}
