import {AfterViewChecked, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {RunDialogComponent} from '../run-dialog/run-dialog.component';
import {SolvService} from '../shared/solv.service';
import {Subscription} from 'rxjs';
import {OlEvent} from '../shared/olEvent.model';
import {EventIdRunner} from '../shared/eventIdRunner.model';
import {EventMessageService} from '../shared/event.message.service';
import {LocalStorage} from '@ngx-pwa/local-storage';

@Component({
    selector: 'app-run',
    templateUrl: './run.component.html',
    styleUrls: ['./run.component.css']
})
export class RunComponent implements OnInit, AfterViewChecked, OnDestroy {
    events: OlEvent[] = [];
    eventsAll: OlEvent[] = [];
    eventsRunner: EventIdRunner[];
    countEvents: number = 0;
    progress = 0;
    private initialized = false;
    private dataId: number = 0;
    private updateRunning = false;
    columnsToDisplay: string[] = ['number', 'name', 'date', 'map', 'club', 'link'];

    // @ViewChild(SolvService) subject: SolvService;
    subscriptionInit: Subscription;
    subscriptionMyEvent: Subscription;
    subscriptionProgress: Subscription;

    constructor(protected localStorage: LocalStorage,
                private eventMessage: EventMessageService,
                private dialog: MatDialog,
                private solv: SolvService) {}

    ngOnInit() {
        if (this.initialized) {
            this.readPersonalEvents();
        }
        this.eventMessage.rcvMessageRun.subscribe(message => {
            if (message.command === 'CHANGE_PERSON') {
                this.readPersonalEvents();
            } else if (message.command === 'CHANGE_YEAR') {
                console.log('receive change year ' + message.value);
                this.readPersonalEvents();
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
                            if (this.eventsAll.find(x => x.id === event.eventId) !== undefined) {
                                this.events.push(this.eventsAll.find(x => x.id === event.eventId));
                                this.eventsRunner.push(event);
                                this.countEvents = this.eventsRunner.length;

                                // TODO read Result of event an runner with event.id
                            }
                        }, this);
                        console.log('Count events run: ' + this.countEvents);
                        this.updateRunning = false;
                    }
                }
            });
        this.subscriptionProgress = this.solv.readProgress
            .subscribe((data) => {
                this.progress = data;
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

        if (this.eventsRunner !== undefined && this.eventsRunner.length > 0) {
            dialogConfig.data = {event: event, activeRunner: this.eventsRunner.find(x => x.eventId === event.id)};
        } else {
            dialogConfig.data = {event: event, activeRunner: { eventId: event.id, runner: { category: '-'}}};
        }

        const dialogRef = this.dialog.open(RunDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog was closed' + result);
        });
    }
}
