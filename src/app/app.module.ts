import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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

const appRoutes: Routes = [
    {path: '', redirectTo: 'person', pathMatch: 'full'},
    {path: 'person', component: PersonComponent, data: {title: 'Person Component'}},
    {path: 'run', component: RunComponent, data: {title: 'Run Component'}},
    {path: 'run/:id', component: RunDetailsComponent, data: {title: 'Run Details Component'}},
    {path: 'tick', component: TickComponent, data: {title: 'Tock Component'}}
];

@NgModule({
    declarations: [
        AppComponent,
        PersonComponent,
        NavmenuComponent,
        OverviewComponent,
        RunComponent,
        RunDialogComponent,
        TickComponent,
        RunDetailsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(
            appRoutes,
            {useHash: true}
        ),
        CustomMaterialModule,
        LayoutModule,
        HttpClientModule
    ],
    providers: [SolvService],
    bootstrap: [AppComponent],
    entryComponents: [RunDialogComponent]
})
export class AppModule {
}
