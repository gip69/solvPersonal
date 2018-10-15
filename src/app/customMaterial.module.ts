import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule, MatChipsModule, MatCardModule, MatProgressBarModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatDialogModule,
        MatChipsModule,
        MatCardModule,
        MatProgressBarModule
    ],
    exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatDialogModule,
        MatChipsModule,
        MatCardModule,
        MatProgressBarModule
    ],
})
export class CustomMaterialModule { }
