import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const MODULES = [
  CommonModule,
  ReactiveFormsModule,
  HttpClientModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatTooltipModule,
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule
]

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class SharedModule { }
