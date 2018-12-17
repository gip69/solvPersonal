import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Tick} from '../tick.model';
import * as moment from 'moment';
import 'moment/locale/de';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ICalendarEvent, NgAddToCalendarService} from '@trademe/ng-add-to-calendar';
import {CalendarTypeEnum} from '@trademe/ng-add-to-calendar/dist/model/calendar-type.enum';

export interface DialogData {
  bodyLocation: string;
}


@Component({
  selector: 'app-tick-dialog',
  templateUrl: './tick-dialog.component.html',
  styleUrls: ['./tick-dialog.component.css']
})

export class TickDialogComponent implements OnInit {
  tick: Tick = {place: '', date: new Date(), reminder: false};
  public newEvent: ICalendarEvent;

  selectedValue: number;
  clients = [
    {viewvalue: 'Google', value: this._addToCalendarService.calendarType.google},
    {viewvalue: 'Yahoo', value: this._addToCalendarService.calendarType.yahoo},
    {viewvalue: 'Apple', value: this._addToCalendarService.calendarType.iCalendar},
    {viewvalue: 'Windows', value: this._addToCalendarService.calendarType.outlook}
  ];


  public googleCalendarEventUrl: SafeUrl;
  public appleCalendarEventUrl: SafeUrl;
  private outlookCalendarEventUrl: SafeUrl;

  constructor(private _addToCalendarService: NgAddToCalendarService,
              private _sanitizer: DomSanitizer,
              private dialogRef: MatDialogRef<TickDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.tick.bodyLocation = data.bodyLocation;
    this.newEvent = {
      // Event title
      title: 'check ticks',
      // Event start date
      start: new Date('November 25, 2018 08:00'),
      // Event duration (IN MINUTES)
      duration: 5,
      // If an end time is set, this will take precedence over duration (optional)
      end: new Date('November 25, 2018 08:05'),
      // Event Address (optional)
      address: 'hier',
      // Event Description (optional)
      description: 'check tick at your body: left hand, right feet'
    };

    /*this.googleCalendarEventUrl = this._sanitizer.bypassSecurityTrustUrl(
      this._addToCalendarService.getHrefFor(this._addToCalendarService.calendarType.google, this.newEvent)
    );
    this.appleCalendarEventUrl = this._sanitizer.bypassSecurityTrustUrl(
      this._addToCalendarService.getHrefFor(this._addToCalendarService.calendarType.iCalendar, this.newEvent)
    );
    this.outlookCalendarEventUrl = this._sanitizer.bypassSecurityTrustUrl(
      this._addToCalendarService.getHrefFor(this._addToCalendarService.calendarType.outlook, this.newEvent)
    );*/
  }
  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (this.selectedValue !== undefined) {
      this.newEvent.start = moment().add(1, 'days').toDate();
      this.newEvent.end = moment().add(1.1, 'days').toDate();
      window.open(this._addToCalendarService.getHrefFor(this.selectedValue, this.newEvent), '_blank');
    }
    this.dialogRef.close(this.tick);
  }


}
