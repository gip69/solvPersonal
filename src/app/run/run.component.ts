import { Component, OnInit } from '@angular/core';
import {Run} from './run.model';
import {Time} from '@angular/common';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.css']
})
export class RunComponent implements OnInit {
  private runs: Run[] = [
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
          1756
      )
  ];
  constructor() { }

  ngOnInit() {
  }

}
