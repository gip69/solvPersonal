import { Component, OnInit } from '@angular/core';
import {SolvDbService} from '../shared/solv-db.service';

@Component({
  selector: 'app-solv-db',
  templateUrl: './solv-db.component.html',
  styleUrls: ['./solv-db.component.css']
})
export class SolvDbComponent implements OnInit {

  constructor(private solvDb: SolvDbService) { }

  ngOnInit() {
  }

}
