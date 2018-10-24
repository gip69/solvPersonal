import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolvDbService {
    request;

    constructor() {
      if (!('indexedDB' in window)) {
          console.log('This browser doesn\'t support IndexedDB');
          return;
      }
      this.request = self.indexedDB.open('solveEventRunners', 1);
  }

    saveEventRunners(id: number, res: any) {

    }
}
