import { Injectable } from '@angular/core';
// import * as Http from 'http';

@Injectable({
  providedIn: 'root'
})
export class SolvService {
 /*   host: string = 'http://ol.zimaa.ch';   // 'http://localhost:3010';
    constructor(private _http: Http) {
        console.log("SolvService");
    }*/
    constructor() {

    }
    /*
    getEvents(year: number) {
        return this._http.get(this.host + '/api/events?year='+year)
            .map(res => res.json());
    }

    getRunners(eventId: number) {
        return this._http.get(this.host + '/api/events/solv/'+eventId+"/runners").map(res => res.json());
    }

    getEvent(eventId: number, category: string) {
        return this._http.get(this.host + '/api/events/solv/'+eventId+"/categories/"+category).map(res => res.json());
    }*/
}
