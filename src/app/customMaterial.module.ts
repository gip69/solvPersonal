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
    MatProgressSpinnerModule, MatSortModule, MatSelectModule, MatGridListModule
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
        MatSortModule, MatTableModule, MatSelectModule, MatGridListModule
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
        MatSortModule, MatTableModule, MatSelectModule, MatGridListModule
    ],
})
export class CustomMaterialModule { }
