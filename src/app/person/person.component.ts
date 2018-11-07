import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Person} from './person.model';
import {Run} from '../run/run.model';
import {EventMessageService} from '../shared/event.message.service';
import {Message} from '../shared/message.model';
import {LocalStorage} from '@ngx-pwa/local-storage';

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
    @Output() activeRunner = new EventEmitter<string>();
    @Output() newRunner = new EventEmitter<boolean>();

    name: string;
    prename: string;
    club: string;
    year: number;

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
            'OLG Stäfa',
            1970)
    ];

    constructor(protected localStorage: LocalStorage, private eventMessage: EventMessageService) {
    }

    ngOnInit() {
        // read persons
        this.localStorage.getItem('persons').subscribe((persons: Person[]) => {
            persons.forEach(function (person, index, array) {
                this.persons.push(person);
            }, this);
        }, () => {});

        // distribute persons
        this.persons.forEach(function (person, index, array) {
            this.eventMessage.sendCommand('navmenu', 'person', 'NEW_PERSON', person.prename + ' ' + person.name);
        }, this);
    }

    addPerson() {
        console.log('Name: ' + this.name);
        if (this.name !== '' && this.prename !== '') {
            // save new person
            const person: Person = {name: this.name, prename: this.prename, club: this.club, year: this.year};
            this.persons.push(person);
            this.localStorage.setItem('persons', this.persons);

            // distribute new person
            this.eventMessage.sendCommand('navmenu', 'person', 'NEW_PERSON', person.prename + ' ' + person.name);
        }
    }

    showRuns(person: Person) {
        console.log('Name: ' + person.name);
        this.activeRunner.emit(person.name);

        this.eventMessage.sendCommand('run', 'person', 'CHANGE_PERSON', person.prename + ' ' + person.name);
    }

    showInfo(person: Person) {
        console.log('Name: ' + person.name);

    }

    getRunners() {
        return this.persons;
    }
}
