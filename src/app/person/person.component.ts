import { Component, OnInit } from '@angular/core';
import { Person } from './person.model';
import {Run} from '../run/run.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
    persons: Person[] = [
        new Person(
            'Muster',
            'Fritz',
            [ new Run(17, 'OL17', 34, 1836)]
        ),
        new Person('Müller', 'Franz', []),
    ];
  constructor() { }

  ngOnInit() {

  }

    showInfo(person: Person) {
      console.log('Name: ' + person.name);

    }
}
