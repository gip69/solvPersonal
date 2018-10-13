import {AfterViewChecked, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Run} from './run.model';
import {Time} from '@angular/common';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {RunDialogComponent} from '../run-dialog/run-dialog.component';
import {SolvService} from '../shared/solv.service';
import {Subscription} from 'rxjs';
import {OlEvent} from '../shared/olEvent.model';

@Component({
    selector: 'app-run',
    templateUrl: './run.component.html',
    styleUrls: ['./run.component.css']
})
export class RunComponent implements OnInit, AfterViewChecked, OnDestroy {
    events: OlEvent[];
    // @ViewChild(SolvService) subject: SolvService;
    subscriptionInit: Subscription;
    subscriptionMyEvent: Subscription;

    constructor(private dialog: MatDialog, private solv: SolvService) {
    }

    ngOnInit() {
    }

    ngAfterViewChecked() {
        this.subscriptionInit = this.solv.initialized
            .subscribe((data) => {
                console.log('received initialized = ' + data);
                this.getEvents();
                this.solv.readMyEvents('Pascal Giannini');
            });
        this.subscriptionMyEvent = this.solv.myEventsRead
            .subscribe((data) => {
                console.log('received myEventsRead = ' + data);
                const myEvents = this.solv.getMyEvents();
                if (myEvents !== undefined) {
                    const eventsOld = this.events;
                    this.events = [];
                    myEvents.forEach(function (event, index, array) {
                        this.events.push(eventsOld.find(x => x.id === event.eventId));
                    });
                }
            });
    }

    ngOnDestroy() {
        // prevent memory leak
        this.subscriptionInit.unsubscribe();
    }

    getEvents() {
        const events = this.solv.getEvents();
        if (events !== undefined) {
            this.events = events['events'];
        } else {
            console.error('RunComponent.getEvents: events is not defined!');
        }
        // console.log('Events: ' + JSON.stringify(this.events));
    }

    readMyEvents() {
        this.solv.readMyEvents('Pascal Giannini');
    }

    showInfo(event) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = event;

        const dialogRef = this.dialog.open(RunDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog was closed' + result);
        });
    }
}
