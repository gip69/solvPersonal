import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule, MatChipsModule, MatCardModule
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
        MatCardModule
    ],
    exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatDialogModule,
        MatChipsModule,
        MatCardModule
    ],
})
export class CustomMaterialModule { }
