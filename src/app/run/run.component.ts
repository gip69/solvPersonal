import {Component, OnInit} from '@angular/core';
import {Run} from './run.model';
import {Time} from '@angular/common';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {RunDialogComponent} from '../run-dialog/run-dialog.component';
import {SolvService} from '../shared/solv.service';

@Component({
    selector: 'app-run',
    templateUrl: './run.component.html',
    styleUrls: ['./run.component.css']
})
export class RunComponent implements OnInit {
    events: Event[];

    constructor(private dialog: MatDialog, private solv: SolvService) {
    }

    ngOnInit() {
    }

    readEvents() {
        const events = this.solv.getEvents('Pascal Giannini');
        this.events = events['events'];
        // console.log('Events: ' + JSON.stringify(this.events));
    }

    showInfo(event) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        let t = new Date(parseInt(event.time, 10) * 1000);

        dialogConfig.data = event;

        const dialogRef = this.dialog.open(RunDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog was closed' + result);
        });
    }
}
