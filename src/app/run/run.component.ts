import { Component, OnInit } from '@angular/core';
import {Run} from './run.model';
import {Time} from '@angular/common';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {RunDialogComponent} from '../run-dialog/run-dialog.component';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.css']
})
export class RunComponent implements OnInit {
    runs: Run[] = [
      new Run(
          1,
          'OL1',
          15,
          3072
      ),
      new Run(
          2,
          'OL2',
          8,
          4756
      ),
        new Run(
            3,
            'OL3',
            4,
            1694
        ),
        new Run(
            4,
            'OL4',
            26,
            3749
      )
  ];
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

    openDialog () {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true ;
        dialogConfig.autoFocus  =  true;

        this.dialog.open(RunDialogComponent, dialogConfig );
    }

    showInfo(run) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true ;
        dialogConfig.autoFocus  =  true;
        let t = new Date(parseInt(run.time, 10) * 1000);

        dialogConfig.data = {
            id: run.nr,
            title: run.name,
            rank: run.rank,
            time: (t.getHours() - 1) + ':' + t.getMinutes() + ':' + t.getSeconds()
        };

        const dialogRef = this.dialog.open(RunDialogComponent, dialogConfig );
        dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog was closed' + result);
        });

    }
}
