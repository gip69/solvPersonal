import { Component, OnInit } from '@angular/core';
import { Person } from './person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
    private persons: Person[] = [
        new Person(
            'Muster',
            'Fritz',[]
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
