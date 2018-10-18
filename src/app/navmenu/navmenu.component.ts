import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PersonComponent} from '../person/person.component';

@Component({
    selector: 'app-navmenu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit, AfterViewChecked {
    subscriptionRunner: Subscription;
    activeRunner: string;

    constructor(private runner: PersonComponent) {
    }

    ngOnInit() {
    }

    ngAfterViewChecked() {
        this.subscriptionRunner = this.runner.activeRunner
            .subscribe((data) => {
                this.activeRunner = data;
            });
    }
}
