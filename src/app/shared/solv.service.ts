import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SolvService {
    host = 'http://ol.zimaa.ch';   // 'http://localhost:3010';
    // events$: Observable<Event[]>;
    private events;

    constructor(private http: HttpClient) {
        this.http.get(this.host + '/api/events?year=2018').subscribe(res => {
            this.events = res;
        });
        console.log('SolvService initialized');
    }

    getEvents(fullname: string) {
      /*const self = this;
      let eventsPersonal: Event[];
        this.events.events.forEach(function(event) {
            let e;
            self.http.get(this.host + '/api/events/solv/' + event.id + '/runners').subscribe(res => { e = res; });
            e.categories.forEach(function(category) {
              category.runners.forEach(function(runner) {
                if (runner.fullname === fullname) {
                   console.log('Runner: ' + JSON.stringify(runner));
                   eventsPersonal.push(event);
                }
              });
            });
        });*/
        return this.events;
    }

    getRunners(eventId: number) {
        return this.http.get(this.host + '/api/events/solv/' + eventId + '/runners').subscribe(res => res);
    }

    getEvent(eventId: number, category: string) {
        return this.http.get(this.host + '/api/events/solv/' + eventId + '/categories/' + category).subscribe(res => res);
    }
}
