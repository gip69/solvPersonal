import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PersonComponent} from '../person/person.component';
import {Runner} from '../shared/runner.model';
import {Person} from '../person/person.model';
import {EventMessageService} from '../shared/event.message.service';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {Message} from '../shared/message.model';

@Component({
    selector: 'app-navmenu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit, AfterViewChecked {
    subscriptionRunner: Subscription;
    activeRunner: string;
    persons: string[] = [];
    selected: string;

    constructor(private eventMessage: EventMessageService, protected localStorage: LocalStorage) {
    }

    ngOnInit() {
        this.localStorage.getItem ('personNames').subscribe((persons: string[]) => {
            if (persons !== null) {
                this.persons = persons;
                // read saved active runner and set in drop down
                this.localStorage.getItem('activeRunner').subscribe((activeRunner: string) => {
                    if (activeRunner !== null && activeRunner !== undefined && activeRunner !== '') {
                        if (this.persons.find(person => person === activeRunner) !== undefined) {
                            this.selected = activeRunner;
                        }
                    }
                });
            }
        }, () => {});

        this.eventMessage.rcvMessageNavMenu.subscribe(message => {
            if (message.command === 'NEW_PERSON') {
                console.log('new person: ' + message.value);
                if (this.persons.find(person => person === message.value) === undefined) {
                    this.persons.push(message.value);
                    this.localStorage.setItem('personNames', this.persons).subscribe(() => {
                        // Done
                        console.log('NavmenuComponent.ngOnInit save new persons');
                    }, () => {
                        console.error('NavmenuComponent.ngOnInit save error');
                    });
                }
            }
        });
    }

    ngAfterViewChecked() {
    }

    change(event) {
        if (event.isUserInput) {
            console.log(event.source.value, event.source.selected);
            this.localStorage.setItem ('activeRunner', event.source.value).subscribe(() => {
                console.log('NavmenuComponent.change saved active person');
            }, () => {
                console.error('NavmenuComponent.change save error');
            });

            this.eventMessage.sendCommand('run', 'person', 'CHANGE_PERSON', event.source.value);
        }
    }
}
