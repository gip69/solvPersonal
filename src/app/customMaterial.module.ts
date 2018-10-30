import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    MatChipsModule,
    MatCardModule,
    MatProgressBarModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule, MatSortModule, MatSelectModule
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
        MatProgressBarModule,
        MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
        MatSortModule, MatTableModule, MatSelectModule
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
        MatProgressBarModule,
        MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
        MatSortModule, MatTableModule, MatSelectModule
    ],
})
export class CustomMaterialModule { }
