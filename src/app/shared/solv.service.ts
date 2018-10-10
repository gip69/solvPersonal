import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import {Runner} from './runner.model';

@Injectable({
  providedIn: 'root'
})
export class SolvService {
    host = 'http://ol.zimaa.ch';   // 'http://localhost:3010';
    // events$: Observable<Event[]>;
    private events;
    myEvents: number[] = [];

    constructor(private http: HttpClient) {
        this.http.get(this.host + '/api/events?year=2018').subscribe(res => {
            this.events = res;
            console.log('SolvService initialized');
        });
    }

    getEvents(fullname: string) {
      this.updateRunner(fullname);
      return this.events;
    }

    updateRunner(fullname: string) {
        console.log('updateRunner with ' + fullname);
        if (this.events !== undefined) {
            this.events.events.forEach(function (event, index, array) {
                if (index.id === 4799) {
                    console.log('read event ' + index + ' with id ' + event.id);
                    setTimeout(this.getRunners(event.id, fullname), 100 * index);
                }
            }, this);
        } else {
          console.error('updateRunner events is not defined!');
        }
    }

    getRunners(eventId: number, fullname: string) {
       this.http.get<Runner[]>(this.host + '/api/events/solv/' + eventId + '/runners', { headers: new HttpHeaders({ timeout: `${20000}` }) }).subscribe(res => {
             for (const runner in res) {
                 if (res[runner]['fullName'] === fullname) {
                     console.log('Runner: ' + JSON.stringify(runner));
                     this.myEvents.push(eventId);
                 }
             }
       });
    }

    getEvent(eventId: number, category: string) {
        return this.http.get(this.host + '/api/events/solv/' + eventId + '/categories/' + category).subscribe(res => res);
    }
}
