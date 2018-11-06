import {Injectable, EventEmitter} from '@angular/core';
import {Message} from './message.model';

@Injectable()
export class EventMessageService {

    rcvMessage = new EventEmitter();

    constructor() { }

    sendMessage(message: Message) {
        this.rcvMessage.emit(message);
    }

    sendMsg(message: string) {
        const msg: Message = { value: message };
        this.rcvMessage.emit(msg);
    }

    sendCommand(rcv: string, snd: string, cmd: string, val: string) {
        const msg: Message = { receiver: rcv, sender: snd, command: cmd, value: val };
        this.sendMessage(msg);
    }
}
