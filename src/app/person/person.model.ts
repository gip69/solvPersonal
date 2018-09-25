import {Run} from '../run/run.model';

export class Person {
    constructor(
        public name: string,
        public prename: string,
        public runs: Run[]
    ) {
    }
}
