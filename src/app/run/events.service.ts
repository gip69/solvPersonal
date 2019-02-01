import {Injectable} from '@angular/core';
import {StateMachine, StateEvent} from '../shared/statemachine.service';

enum EventState {
    INIT,
    EVENT_READ,
    EVENT_PERSON_FILTERED,
    EVENT_PERSON_ANALYSED,
}

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    let;
    fsm = new StateMachine({
        initial: EventState.INIT,
        events: [
            new StateEvent({
                name: 'initialized', from: [EventState.INIT], to: EventState.EVENT_READ
            }),
            new StateEvent({
                name: 'yeaChanged', from: [EventState.EVENT_READ], to: EventState.INIT
            }),
            new StateEvent({
                name: 'eventsRead', from: [EventState.EVENT_READ], to: EventState.EVENT_PERSON_FILTERED
            }),
            new StateEvent({
                name: 'eventsAnalyzed', from: [EventState.EVENT_PERSON_FILTERED], to: EventState.EVENT_PERSON_ANALYSED
            })
        ],
        states: {}
    });

    constructor() {
    }
}
