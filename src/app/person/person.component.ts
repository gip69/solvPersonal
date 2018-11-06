import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Person} from './person.model';
import {Run} from '../run/run.model';
import {EventMessageService} from '../shared/event.message.service';
import {Message} from '../shared/message.model';

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
    @Output() activeRunner = new EventEmitter<string>();
    @Output() newRunner = new EventEmitter<boolean>();

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

    constructor(private eventMessage: EventMessageService) {
    }

    ngOnInit() {
        this.persons.forEach(function (person, index, array) {
            this.eventMessage.sendMsg(person.prename + ' ' + person.name);
        }, this);
    }

    addRunner() {

    }

    showRuns(person: Person) {
        console.log('Name: ' + person.name);
        this.activeRunner.emit(person.name);

        const msg: Message = { receiver: 'Run', sender: 'person', command: 'CHANGE_PERSON', value: person.prename + ' ' + person.name };
        this.eventMessage.sendMessage(msg);
    }

    showInfo(person: Person) {
        console.log('Name: ' + person.name);

    }

    getRunners() {
        return this.persons;
    }
}
