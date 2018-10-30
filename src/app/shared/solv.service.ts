import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Runner} from './runner.model';
import {EventIdRunner} from './eventIdRunner.model';
import {LocalStorage} from '@ngx-pwa/local-storage';

@Injectable({
    providedIn: 'root'
})
export class SolvService {
    @Output() initialized = new EventEmitter<boolean>();
    @Output() myEventsRead = new EventEmitter<boolean>();
    @Output() readProgress = new EventEmitter<number>();

    host = 'http://ol.zimaa.ch';   // 'http://localhost:3010';
    private events;
    myEvents: EventIdRunner[] = [];
    private counter = 0;
    private eventsRunner;
    private progress = 0;

    constructor(private http: HttpClient, protected localStorage: LocalStorage) {
        this.http.get(this.host + '/api/events?year=2018').subscribe(res => {
            this.events = res;
            console.log('SolvService initialized');
            this.initialized.emit(true);
        });
    }

    checkRunner(id: number, fullname: string, runners) {
        for (const runner in runners) {
            if (runners[runner]['fullName'] === fullname) {
                console.log('OlEvent: ' + this.events.events[this.counter]['name']);
                this.myEvents.push({eventId: id, runner: runners[runner]});
                return;
            }
        }
    }

    readMyEvents(fullname: string) {
        this.progress = this.counter / this.events.events.length * 100;
        this.readProgress.emit(this.progress);
        if (this.counter < this.events.events.length) { // TODO this.events.events.length) {
            const id: number = this.events.events[this.counter]['id'];
            this.localStorage.getItem ('eventRunner' + id).subscribe((res) => {
                if (res != null) {
                    this.checkRunner(id, fullname, res);
                    this.counter++;
                    this.readMyEvents(fullname);
                } else {
                    this.http.get<Runner[]>(this.host + '/api/events/solv/' + id + '/runners')
                        .subscribe(event => {
                                this.saveEventRunners(id, event);
                                this.checkRunner(id, fullname, event);
                                this.counter++;
                                this.readMyEvents(fullname);
                            },

                            error => {
                                console.log('error event ' + this.events.events[this.counter]['name'] + ': ' + error.statusText);
                                this.counter++;
                                this.readMyEvents(fullname);
                            }
                        );
                }
            }, () => {});
        } else {
            if (this.counter === this.events.events.length) { // TODO this.events.events.length) {
                this.counter = 0;
                console.log('read all events runner: ' + this.counter);
                // emit event to runner, that is finished!
                this.myEventsRead.emit(true);
                this.progress = 0;
                this.readProgress.emit(this.progress);
            }
        }
    }

    saveEventRunners(id: number, event) {
        this.localStorage.setItem('eventRunner' + id, event).subscribe(() => {
            // Done
            console.log('SolvDbService.saveEventRunners saved data of event ' + id);
        }, () => {
            console.error('SolvDbService.saveEventRunners could not save data of event ' + id + '!');
        });
    }

    getEvents() {
        return this.events;
    }

    getMyEvents() {
        return this.myEvents;
    }

    getEvent(id: number, category: string) {
        const event = this.getEvent(id, category);
        if (event === undefined || event === null) {
            this.http.get(this.host + '/api/events/solv/' + id + '/categories/' + category)
                .subscribe(res => {
                    // TODO ???
                });
        }
        return event;
    }
}
