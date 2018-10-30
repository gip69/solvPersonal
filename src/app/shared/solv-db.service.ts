import { Injectable } from '@angular/core';
import {LocalStorage} from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class SolvDbService {
    request;

    constructor(protected localStorage: LocalStorage) {}

    // remove data: this.localStorage.removeItem('user').subscribe(() => {}, () => {});
    // clear database: this.localStorage.clear().subscribe(() => {}, () => {});
    // examplae save data:  this.localStorage.setItem('user', user).subscribe(() => {}, () => {});
    saveEventRunners(id: number, res: any) {
        window.localStorage.setItem('eventRunner' + id, JSON.stringify(res));
        /*this.localStorage.setItem('eventRunner' + id, res).subscribe(() => {
            // Done
            console.log('SolvDbService.saveEventRunners saved data ' + res);
        }, () => {
            console.error('SolvDbService.saveEventRunners could not save data "' + res + '" for event ' + id + '!');
        });*/
    }

    getEventRunners(id: number) {
        return JSON.parse(window.localStorage.getItem('eventRunner' + id));
        /*this.localStorage.getItem ('eventRunner' + id).subscribe((res) => {
            if (res != null) {
                return res;
            }
        }, () => {});*/
    }

    getEvent(id: number, category: string) {

    }
}
