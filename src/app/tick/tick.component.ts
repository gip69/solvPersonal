import {Component, OnInit} from '@angular/core';
import {ICalendarEvent, NgAddToCalendarService} from '@trademe/ng-add-to-calendar';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
    selector: 'app-tick',
    templateUrl: './tick.component.html',
    styleUrls: ['./tick.component.css']
})
export class TickComponent implements OnInit {
    /*    public googleCalendarEventUrl: SafeUrl;
        public appleCalendarEventUrl: SafeUrl;*/
    public newEvent: ICalendarEvent;

    selectedValue: number;
    clients = [
        {viewvalue: 'Google', value: this._addToCalendarService.calendarType.google},
        {viewvalue: 'Yahoo', value: this._addToCalendarService.calendarType.yahoo},
        {viewvalue: 'Apple', value: this._addToCalendarService.calendarType.iCalendar},
        {viewvalue: 'Windows', value: this._addToCalendarService.calendarType.outlook}
    ];

    constructor(private _addToCalendarService: NgAddToCalendarService,
                private _sanitizer: DomSanitizer) {
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

        /*     this.googleCalendarEventUrl = this._sanitizer.bypassSecurityTrustUrl(
                 this._addToCalendarService.getHrefFor(this._addToCalendarService.calendarType.google, this.newEvent)
             );
             this.appleCalendarEventUrl = this._sanitizer.bypassSecurityTrustUrl(
                 this._addToCalendarService.getHrefFor(this._addToCalendarService.calendarType.iCalendar, this.newEvent)
             );*/
    }

    ngOnInit() {
    }

    changeClient(data) {
        console.log('Data: ' + data);
    }

    addToCalendar() {
        console.log('add to calendar');
        console.log('calendar: ' + this.selectedValue);
        window.open(this._addToCalendarService.getHrefFor(this.selectedValue, this.newEvent), '_blank');
    }
}
