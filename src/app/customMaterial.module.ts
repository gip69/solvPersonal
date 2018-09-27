import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatDialogModule
    ],
    exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatDialogModule
    ],
})
export class CustomMaterialModule { }
