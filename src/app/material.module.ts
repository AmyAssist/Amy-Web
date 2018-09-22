import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatToolbarModule
} from '@angular/material';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatTabsModule,
        MatSliderModule,
        MatDatepickerModule,
        MatSelectModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatMenuModule,
        MatListModule,
        MatGridListModule,
        MatDividerModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        MatNativeDateModule,
        BrowserModule,
        RouterModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatStepperModule,
        MatButtonToggleModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatProgressBarModule
    ],
    exports: [
        CommonModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatTabsModule,
        MatSliderModule,
        MatDatepickerModule,
        MatSelectModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatMenuModule,
        MatListModule,
        MatGridListModule,
        MatDividerModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        MatNativeDateModule,
        BrowserModule,
        RouterModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatStepperModule,
        MatButtonToggleModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatProgressBarModule
    ],
    declarations: [],
    providers: []
})
export class MaterialModule { }
