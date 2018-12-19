import {Component, OnInit, ViewChild, Input, ChangeDetectionStrategy} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TickTableDataSource } from './tick-table-datasource';
import { Tick } from '../tick.model';

@Component({
  selector: 'app-tick-table',
  templateUrl: './tick-table.component.html',
  styleUrls: ['./tick-table.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TickTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TickTableDataSource;
  @Input() ticks: Tick[];
  displayedColumns = ['place', 'date', 'bodyLocation', 'reminder'];

  constructor() {
  }

  ngOnInit() {
    this.dataSource = new TickTableDataSource(this.paginator, this.sort);
  }
}
