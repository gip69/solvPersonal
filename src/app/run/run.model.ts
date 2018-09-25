import {Time} from '@angular/common';

export class Run {
    constructor(
        public nr: number,
        public name: string,
        public rank: number,
        public time: number,
    ) {
    }
}
