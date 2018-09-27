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
import {NavdemoComponent} from './navdemo/navdemo.component';
import {RunDialogComponent} from './run-dialog/run-dialog.component';

const appRoutes: Routes = [
    {path: '', component: OverviewComponent, data: {title: 'Overview'}},
    {path: 'first', component: PersonComponent, data: {title: 'Person Component'}},
    {path: 'second', component: RunComponent, data: {title: 'Run Component'}},
    {path: 'third', component: RunComponent, data: {title: 'Tick Component'}}
];

@NgModule({
    declarations: [
        AppComponent,
        PersonComponent,
        NavmenuComponent,
        OverviewComponent,
        NavdemoComponent,
        RunComponent,
        RunDialogComponent
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
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [RunDialogComponent]
})
export class AppModule {
}
