import {Component, OnInit} from '@angular/core';
import {ICalendarEvent, NgAddToCalendarService} from '@trademe/ng-add-to-calendar';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
    olDate: Date;
    times: any = {};
    person: any = {};
    id: number;
    host = 'http://ol.zimaa.ch';
    url = 'https://www.o-l.ch/cgi-bin/fixtures?&year=2019&link=';
    public appleCalendarEventUrl: SafeUrl;
    public newEvent: ICalendarEvent;
    private events;
    selectedValue;

    calendars = [
        {viewvalue: 'Google', value: this._addToCalendarService.calendarType.google},
        {viewvalue: 'Yahoo', value: this._addToCalendarService.calendarType.yahoo},
        {viewvalue: 'Apple', value: this._addToCalendarService.calendarType.iCalendar},
        {viewvalue: 'Windows', value: this._addToCalendarService.calendarType.outlook}
    ];


    // TODO: Grafik mit Linien analog Weisungen (je nach Zeiten einfärben, wo man sein sollte)

    // TODO dropdown with all ol from solv (next first)
    public event: String = 'OL';

    ols: String[] = ['rigi1', 'rigi2', 'jomsl'];

    constructor(private http: HttpClient, private _addToCalendarService: NgAddToCalendarService,
                private _sanitizer: DomSanitizer) {
        this.id = 123;
        this.http.get(this.host + '/api/events?year=2018').subscribe(res => {
            this.events = res;
        });
        this.newEvent = {
            title: 'OL',
            start: new Date('November 25, 2018 08:00'),
            duration: 5,
            end: new Date('November 25, 2018 08:05'),
            address: 'WKZ',
            description: 'OL Event'
        };

        this.appleCalendarEventUrl = this._sanitizer.bypassSecurityTrustUrl(
            this._addToCalendarService.getHrefFor(this._addToCalendarService.calendarType.iCalendar, this.newEvent)
        );

        
    }

    printOut(event) {
        console.log(JSON.stringify(event));
    }

    ngOnInit() {
        this.times = JSON.parse(localStorage.getItem('times'));
        //this.clear();
    }

    calculate() {
        console.log('calculate'); // 2011-04-11T10:20:30
        // Starttime
        this.times.start.time = this.getDate(this.times.start.output).getTime();
        // Prestart
        this.times.prestart.time = this.times.start.time - this.inMilliseconds(this.times.start.wayDuration);
        this.times.prestart.output = this.short(this.getDate(this.times.prestart.time).toLocaleTimeString());
        // Depot
        this.times.depot.time = this.times.prestart.time - this.inMilliseconds(this.times.prestart.duration) - this.inMilliseconds(this.times.prestart.wayDuration);
        this.times.depot.output = this.short(this.getDate(this.times.depot.time).toLocaleTimeString());
        // WKZ
        this.times.wkz.time = this.times.depot.time - this.inMilliseconds(this.times.depot.duration) - this.inMilliseconds(this.times.depot.wayDuration);
        this.times.wkz.output = this.short(this.getDate(this.times.wkz.time).toLocaleTimeString());
        // Destination
        this.times.car.time = this.times.wkz.time - this.inMilliseconds(this.times.wkz.duration) - this.inMilliseconds(this.times.wkz.wayCarDuration);
        this.times.car.output = this.short(this.getDate(this.times.car.time).toLocaleTimeString());
        this.times.train.time = this.times.wkz.time - this.inMilliseconds(this.times.wkz.duration) - this.inMilliseconds(this.times.wkz.wayTrainDuration);
        this.times.train.output = this.short(this.getDate(this.times.train.time).toLocaleTimeString());
        // Home
        this.times.homeCar.time = this.times.car.time - this.inMilliseconds(this.times.car.duration) - this.inMilliseconds(this.times.car.wayDuration);
        this.times.homeCar.output = this.short(this.getDate(this.times.homeCar.time).toLocaleTimeString());
        this.times.homeTrain.time = this.times.train.time - this.inMilliseconds(this.times.train.duration) - this.inMilliseconds(this.times.train.wayDuration);
        this.times.homeTrain.output = this.short(this.getDate(this.times.homeTrain.time).toLocaleTimeString());

        this.newEvent.start = new Date(this.times.date + ' ' + this.times.homeTrain.output);
        this.newEvent.end = new Date(this.times.date + ' ' + this.times.start.output);
        this.appleCalendarEventUrl = this._sanitizer.bypassSecurityTrustUrl(
            this._addToCalendarService.getHrefFor(this._addToCalendarService.calendarType.iCalendar, this.newEvent)
        );
        localStorage.setItem('times', JSON.stringify(this.times));
    }

    clear() {
        console.log('clear');
        this.times = {
            name: 'name',
            homeCar: {time: 0, output: '', location: 'Männedorf'},
            homeTrain: {time: 0, output: ''},
            car: {time: 0, duration: 5, wayDuration: 0, output: ''},
            train: {time: 0, duration: 5, wayDuration: 0, output: ''},
            wkz: {time: 0, duration: 20, wayCarDuration: 0, wayTrainDuration: 0, output: '', location: ''},
            depot: {time: 0, duration: 0, wayDuration: 0, output: ''},
            prestart: {time: 0, duration: 10, wayDuration: 0, output: ''},
            start: {time: 0, wayDuration: 4, output: '8:00'}
        };
        this.calculate();
    }

    save() {
        console.log('save OL');
    }

    load(olname) {
        console.log('load OL');
    }

    inMilliseconds(minutes) {
        return minutes * 1000 * 60;
    }

    short(time) {
        return time.substr(0, 5);
    }

    getDate(dateString) {
        switch (dateString.length) {
            case 4:
                dateString = '0' + dateString + ':00';
                break;
            case 5:
                dateString = dateString + ':00';
                break;
            case 6:
                break;
            case 7:
                dateString = '0' + dateString;
        }
        if (dateString.length < 9) {
            let today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; // January is 0!
            var yyyy = today.getFullYear();
            var d = yyyy + '-';
            if (mm < 10) {
                d += '0' + mm;
            } else {
                d += mm;
            }
            if (dd < 10) {
                d += '-0' + dd;
            } else {
                d += '-' + dd;
            }
            d += 'T';
            dateString = d + dateString;
        }
        // console.log("Date: " + dateString);
        return new Date(dateString);
    }

    changeOl(event) {
        console.log('new ol: ' + this.selectedValue + ' oder ' + event.value);
    }
}
