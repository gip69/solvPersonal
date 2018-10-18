import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Person} from './person.model';
import {Run} from '../run/run.model';

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
    @Output() activeRunner = new EventEmitter<string>();

    persons: Person[] = [
        new Person(
            'Giannini',
            'Pascal',
            'OLG Stäfa',
            1969
        ),
        new Person(
            'Fuhrer',
            'Andreas',
            'OLG Pfäffikon',
            1970)
    ];

    constructor() {
    }

    ngOnInit() {

    }

    showRuns(person: Person) {
        console.log('Name: ' + person.name);
        this.activeRunner.emit(person.name);
    }

    showInfo(person: Person) {
        console.log('Name: ' + person.name);

    }
}
