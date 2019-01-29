import {AfterViewChecked, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {RunDialogComponent} from '../run-dialog/run-dialog.component';
import {SolvService} from '../shared/solv.service';
import {Subscription} from 'rxjs';
import {OlEvent} from '../shared/olEvent.model';
import {EventIdRunner} from '../shared/eventIdRunner.model';
import {EventMessageService} from '../shared/event.message.service';
import {LocalStorage} from '@ngx-pwa/local-storage';

enum EventState {
    INIT,
    EVENT_READ,
    EVENT_PERSON_FILTERED,
    EVENT_PERSON_ANALYSED,
}

@Component({
    selector: 'app-run',
    templateUrl: './run.component.html',
    styleUrls: ['./run.component.css']
})
export class RunComponent implements OnInit, AfterViewChecked, OnDestroy {
    stateEvent: EventState = EventState.INIT;
    events: OlEvent[] = [];
    eventsAll: OlEvent[] = [];
    eventsRunner: EventIdRunner[];
    countEvents: number = 0;
    progress = 0;
    private initialized = false;
    private dataId: number = 0;
    private updateRunning = false;
    private eventDataIds: number[] = [];
    columnsToDisplay: string[] = ['date', 'name', 'rank', 'duration', 'map', 'club', 'number', 'link'];

    // @ViewChild(SolvService) subject: SolvService;
    subscriptionInit: Subscription;
    subscriptionMyEvent: Subscription;
    subscriptionProgress: Subscription;
    subscriptionEventData: Subscription;

    constructor(protected localStorage: LocalStorage,
                private eventMessage: EventMessageService,
                private dialog: MatDialog,
                private solv: SolvService) {}

    ngOnInit() {
        this.stateEvent = EventState.INIT;

        if (this.initialized) {
            this.readPersonalEvents();
        }
        this.eventMessage.rcvMessageRun.subscribe(message => {
            if (this.initialized) {
                if (message.command === 'CHANGE_PERSON') {
                    this.readPersonalEvents();
                } else if (message.command === 'CHANGE_YEAR') {
                    console.log('receive change year ' + message.value);
                    this.readPersonalEvents();
                }
            }
        });
    }

    ngAfterViewChecked() {
        this.subscriptionInit = this.solv.initialized
            .subscribe((data) => {
                if (!this.initialized) {
                    this.initialized = true;
                    console.log('received initialized = ' + data);
                    this.readPersonalEvents();
                }
            });
        this.subscriptionMyEvent = this.solv.myEventsRead
            .subscribe((data) => {
                if (data !== this.dataId) {
                    this.dataId = data;
                    console.log('received myEventsRead = ' + data);
                    const myEvents = this.solv.getMyEvents();
                    if (myEvents !== undefined) {
                        this.events = [];
                        this.eventsRunner = [];
                        myEvents.forEach(function (event, index, array) {
                            const e = this.eventsAll.find(x => x.id === event.eventId);
                            if (e !== undefined) {
                                this.events.push(e);
                                this.eventsRunner.push(event);
                                this.countEvents = this.eventsRunner.length;

                                // TODO read Result of event an runner with event.id ==> Test
                                // this.solv.getEventData(event.eventId);
                            }
                        }, this);
                        console.log('Count events run: ' + this.countEvents);
                        this.updateRunning = false;
                        this.getAllEventDatas();
                    }
                }
            });
        this.subscriptionProgress = this.solv.readProgress
            .subscribe((data) => {
                this.progress = data;
            });
        this.subscriptionEventData = this.solv.emitReadEventsData.subscribe((eventId) => {
            this.eventDataIds.push(eventId);
        });
    }

    ngOnDestroy() {
        // prevent memory leak
        this.subscriptionInit.unsubscribe();
    }

    readPersonalEvents() {
        if (!this.updateRunning) {
            this.updateRunning = true;
            this.countEvents = 0;
            this.getEvents();
            this.localStorage.getItem('activeRunner').subscribe((person: string) => {
                if (person !== undefined && person !== '') {
                    this.solv.resetMyEvents(person);
                    this.solv.readMyEvents(person);
                }
            });
        }
    }

    getEvents() {
        const events = this.solv.getEvents();
        if (events !== undefined) {
            this.events = events['events'];
            this.eventsAll = events['events'];
        } else {
            console.error('RunComponent.getEvents: events is not defined!');
        }
        // console.log('Events: ' + JSON.stringify(this.events));
    }

    showInfo(event) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        let data = this.solv.getEventData(event.id);
        if (data === undefined) {
            data = this.solv.getEventData(event.id);
        }
        if (data !== undefined) {
            const category = this.eventsRunner.find(x => x.eventId === event.id);
            dialogConfig.data = {
                analyzedData: this.analyzeData(data.data, category),
                eventData: event
            };
            event.rank = dialogConfig.data.analyzedData.rank + '/' + dialogConfig.data.analyzedData.countRunner;
            event.duration = dialogConfig.data.analyzedData.times.my;
            const dialogRef = this.dialog.open(RunDialogComponent, dialogConfig);

            dialogRef.afterClosed().subscribe(result => {
                console.log('Dialog was closed' + result);
            });
        }
    }

    getAllEventDatas() {
        this.events.forEach(function(event) {
            let data = this.solv.getEventData(event.id);
            if (data === undefined) {
                data = this.solv.getEventData(event.id);
            }
            if (data !== undefined) {
                const category = this.eventsRunner.find(x => x.eventId === event.id);
                const analyzedData = this.analyzeData(data.data, category);
                event.rank = analyzedData.rank + '/' + analyzedData.countRunner;
                event.duration = analyzedData.times.my;
            } else {
                console.warn('event with id = ' + event.id + ' not found!');
            }
        }, this);
    }

    readEventsData() {
        if (this.eventsRunner !== undefined) {
            this.eventDataIds = [];
            this.eventsRunner.forEach(function (event, index, array) {
                this.solv.readEventsData(event.eventId);
            }, this);
        }
    }

    analyzeData(data, me) {
        const cat = data.categories.find(x => x.name === me.runner.category);
        const runner = cat.runners.find(x => x.id === me.runner.id);
        return {
            category: cat.name,
            ascent: cat.ascent,
            controls: cat.controls,
            distance: cat.distance,
            countRunner: cat.runners.length,
            times: {
                first: cat.runners[0].time,
                last: cat.runners[cat.runners.length - 1].time,
                my: runner.time,
                zs: ''
            },
            rank: runner.id - cat.runners[0].id
        };
    }
}
/*
ascent: "0"
controls: 30
distance: 3200
name: "H50"
runners: Array(30)
0: {id: 256, fullName: "Martin Schaffner", yearOfBirth: "66", city: "Othmarsingen", club: "OLK Piz Hasi", …}
1: {id: 257, fullName: "Patrick Kunz", yearOfBirth: "65", city: "St. Gallen", club: "OLG St. Gallen/App.", …}
2: {id: 258, fullName: "Stefano Brambilla", yearOfBirth: "67", city: "Montano Lucino (CO)", club: "ASCO Lugano", …}
3: {id: 259, fullName: "Dominique Müller", yearOfBirth: "68", city: "Dachsen", club: "OLG Dachsen", …}
4: {id: 260, fullName: "Thomas Bossi", yearOfBirth: "65", city: "Küsnacht ZH", club: "OLG Stäfa", …}


runners: Array(30)
0:
city: "Othmarsingen"
club: "OLK Piz Hasi"
fullName: "Martin Schaffner"
id: 256
splits: Array(30)
0: {code: "135", time: "1:51"}
1: {code: "137", time: "2:34"}
2: {code: "133", time: "3:33"}
3: {code: "140", time: "4:22"}
4: {code: "141", time: "5:52"}
5: {code: "143", time: "6:25"}
6: {code: "148", time: "7:03"}
7: {code: "150", time: "8:07"}
8: {code: "169", time: "9:22"}
9: {code: "93", time: "9:45"}
10: {code: "94", time: "9:46"}
11: {code: "154", time: "10:12"}
12: {code: "155", time: "11:05"}
13: {code: "156", time: "11:47"}
14: {code: "97", time: "12:58"}
15: {code: "162", time: "13:58"}
16: {code: "164", time: "14:40"}
17: {code: "102", time: "15:45"}
18: {code: "101", time: "17:07"}
19: {code: "172", time: "18:07"}
20: {code: "177", time: "19:37"}
21: {code: "179", time: "20:31"}
22: {code: "103", time: "21:48"}
23: {code: "105", time: "23:03"}
24: {code: "183", time: "24:52"}
25: {code: "95", time: "25:17"}
26: {code: "96", time: "25:18"}
27: {code: "186", time: "26:04"}
28: {code: "168", time: "26:48"}
29: {code: "99", time: "27:12"}
length: 30
__proto__: Array(0)
startTime: "134:08"
time: "27:16"
yearOfBirth: "66"
*/
