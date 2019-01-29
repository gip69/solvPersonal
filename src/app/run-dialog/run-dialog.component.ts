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
      this.modalTitle = data.eventData.name;
  }
}

/*
data:
    event:
        ascent: "0"
category: "H50"
controls: 30
countRunner: 30
distance: 3200
rank: 13
times:
    first: "27:16"
last: "Po.fal."
my: "32:52"
zs: ""

eventData:
club: "OLG Pfäffikon"
date: "2019-01-13"
id: 4858
map: "Bäretswil"
name: "Winter Stadt OL"
source: "solv"
subtitle: "Stadt-OL"
_link: "http://ol.zimaa.ch/api/events/solv/4858"
*/
