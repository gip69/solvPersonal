import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA, Pipe, PipeTransform} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {CustomMaterialModule} from './customMaterial.module';
import {LayoutModule} from '@angular/cdk/layout';
import {PersonComponent} from './person/person.component';
import {NavmenuComponent} from './navmenu/navmenu.component';
import {RunComponent} from './run/run.component';
import {OverviewComponent} from './overview/overview.component';
import {RouterModule, Routes} from '@angular/router';
import {RunDialogComponent} from './run-dialog/run-dialog.component';
import {SolvService} from './shared/solv.service';
import { TickComponent } from './tick/tick.component';
import { RunDetailsComponent } from './run-details/run-details.component';
import {HttpClientModule} from '@angular/common/http';
import { SolvDbComponent } from './solv-db/solv-db.component';
import {SolvDbService} from './shared/solv-db.service';
import {EventMessageService} from './shared/event.message.service';
import {FormsModule} from '@angular/forms';
import { StartComponent } from './start/start.component';
import {NgAddToCalendarModule} from '@trademe/ng-add-to-calendar';

const appRoutes: Routes = [
    {path: '', redirectTo: 'person', pathMatch: 'full'},
    {path: 'person', component: PersonComponent, data: {title: 'Person Component'}},
    {path: 'start', component: StartComponent, data: {title: 'Start Component'}},
    {path: 'run', component: RunComponent, data: {title: 'Run Component'}},
    {path: 'run/:id', component: RunDetailsComponent, data: {title: 'Run Details Component'}},
    {path: 'tick', component: TickComponent, data: {title: 'Tick Component'}}
];

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(url) {
        return this.sanitizer.bypassSecurityTrustHtml(url);
    }
}

@NgModule({
    declarations: [
        AppComponent,
        PersonComponent,
        NavmenuComponent,
        OverviewComponent,
        RunComponent,
        RunDialogComponent,
        TickComponent,
        RunDetailsComponent,
        SolvDbComponent,
        StartComponent,
        SafeHtmlPipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(
            appRoutes,
            {useHash: true}
        ),
        CustomMaterialModule,
        LayoutModule,
        HttpClientModule,
        NgAddToCalendarModule
    ],
    providers: [SolvService, SolvDbService, PersonComponent, EventMessageService],
    bootstrap: [AppComponent],
    entryComponents: [RunDialogComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule {
}
