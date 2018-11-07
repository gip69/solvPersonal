import {Injectable, EventEmitter} from '@angular/core';
import {Message} from './message.model';

@Injectable()
export class EventMessageService {

    rcvMessageNavMenu = new EventEmitter();
    rcvMessageRun = new EventEmitter();
    rcvMessage = new EventEmitter();

    constructor() { }

    sendMessage(message: Message) {
        switch (message.receiver) {
            case 'navmenu': {
                this.rcvMessageNavMenu.emit(message);
                break;
            }
            case 'run': {
                this.rcvMessageRun.emit(message);
                break;
            }
            default: {
                this.rcvMessage.emit(message);
                break;
            }
        }
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
